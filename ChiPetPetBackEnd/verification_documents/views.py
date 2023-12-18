from django.shortcuts import render
import json
from django.db import connection
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import base64
from django.http import FileResponse
import io

@csrf_exempt
def get_unverified_documents(request):
    if request.method == 'GET':
        user_types = ['animal_shelter', 'veterinarian', 'field_expert', 'admin']

        unverified_documents = []

        cursor = connection.cursor()

        for user_type in user_types:
            # Fetch verification documents for each user type where 'verified' is false
            cursor.execute("""
                SELECT user.user_id, user.username, {user_type}.verification_documents, user.role
                FROM user
                INNER JOIN {user_type} ON user.user_id = {user_type}.user_id
                WHERE user.verified = %s
            """.format(user_type=user_type), ('False',))

            documents = cursor.fetchall()

            for document in documents:
                user_id = document[0]
                username = document[1]
                verification_documents = document[2]
                role = document[3]

                response = base64.b64encode(verification_documents).decode('utf-8')

                user_info = {
                    'user_id': user_id,
                    'username': username,
                    'verification_documents': response,
                    'role': role
                }
                unverified_documents.append(user_info)

        return JsonResponse({'unverified_documents': unverified_documents}, status=200)

    return JsonResponse({'status': 'Invalid request method'}, status=405)

@csrf_exempt
@require_http_methods(["POST"])
def upload_verification_document(request):
    if request.method == 'POST':
        try:
            user_id = request.POST.get('user_id')
            verification_document = request.FILES.get('verification_document')
            user_role = request.POST.get('role')

            user_type = user_role.lower()

            cursor = connection.cursor()

            cursor.execute("""SELECT * FROM {table} WHERE user_id = %s""".format(table = user_type), (user_id, ))
            user = cursor.fetchone()

            # change user role
            cursor.execute("""
                        UPDATE user
                        SET role = %s
                        WHERE user_id = %s
                        """, (user_role, user_id, ))

            connection.commit()
            cursor.execute("""UPDATE user SET verified = %s WHERE user_id = %s""", ("False", user_id,))
            connection.commit()
            
            if not user:
                cursor.execute("""INSERT INTO {table} (user_id) 
                                VALUES (%s)""".format(table = user_type), (user_id, ))
                connection.commit()


            pdf_data = verification_document.read()     # may be problematic


            # Update the verification document for the specific user type
            cursor.execute("""
                        UPDATE {user_type}
                        SET verification_documents = %s
                        WHERE user_id = %s
                        """.format(user_type=user_type), (pdf_data, user_id, ))

            connection.commit()

            return JsonResponse({'status': 'Verification document uploaded successfully'}, status=200)
        
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON format: {}'.format(str(e))}, status=400)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)
    return JsonResponse({'status': 'Invalid request method'}, status=405)

@csrf_exempt
def get_own_verification_documents(request):
    if request.method == 'GET':
        try:

            user_id = request.GET.get('user_id')

            # Fetch the user's role to determine the type
            cursor = connection.cursor()
            cursor.execute("SELECT role FROM user WHERE user_id = %s", (user_id,))
            user_role = cursor.fetchone()
            
            if not user_role:
                return JsonResponse({'status': 'User not found'}, status=200)
            
            if user_role[0] == 'user':
                return JsonResponse({'verification_documents': [], 'status': 'A user with role user cannot have a verification document'}, status=200)


            user_role = user_role[0]  # get role of user
            user_type = user_role.lower()  # name of the table

            # Fetch the user's verification documents
            cursor.execute("""
                SELECT {user_type}.verification_documents
                FROM {user_type}
                WHERE user_id = %s
            """.format(user_type=user_type), (user_id,))

            verification_document = cursor.fetchone()

            if verification_document:
                verification_document = verification_document[0]

                # Assuming the blob data is a PDF file
                response = base64.b64encode(verification_document).decode('utf-8')

                return JsonResponse({'verification_documents': response, 'content_type': 'application/pdf'}, status=200)
            else:
                return JsonResponse({'status': 'Verification documents not found for the user'}, status=404)
            
        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'status': 'Invalid request method'}, status=405)

@csrf_exempt
def verify_user(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        user_id = data.get('user_id')

        # Update the 'verified' field to True for the specified user ID
        cursor = connection.cursor()
        cursor.execute("UPDATE user SET verified = %s WHERE user_id = %s", ("True", user_id))
        connection.commit()

        return JsonResponse({'status': 'User verified successfully'}, status=200)

    return JsonResponse({'status': 'Invalid request method'}, status=405)

@csrf_exempt
def reject_verification_request(request):
    if request.method == 'PUT':
        data = json.loads(request.body)
        user_id = data.get('user_id')

        # Update the 'verified' field to True for the specified user ID
        cursor = connection.cursor()
        cursor.execute("UPDATE user SET verified = %s WHERE user_id = %s", ("Rejected", user_id))
        connection.commit()

        return JsonResponse({'status': 'User rejected successfully'}, status=200)

    return JsonResponse({'status': 'Invalid request method'}, status=405)