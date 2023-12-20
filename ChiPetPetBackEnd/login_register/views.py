from django.shortcuts import render
from django.conf import settings
from django.db import connection
from django.http import JsonResponse
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
import json
import base64
from django.core.mail import send_mail
import random
import string
from django.views.decorators.http import require_http_methods
# Create your views here.


@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)         # may cause problem
        first_name = data['first_name']
        last_name = data['last_name']
        username = data['username']
        email = data['email']
        password = make_password(data['password'])
        verified = "False"
        role = "user"  # default

        cursor = connection.cursor()
        cursor.execute("SELECT * FROM user WHERE username = %s", (username, ))
        user = cursor.fetchall()

        if user:
            # user already exists error
            return JsonResponse({'status': 'User with this username already exists'}, status=400)

        cursor.execute("SELECT * FROM user WHERE email = %s", (email, ))
        user = cursor.fetchall()

        if user:
            # user already exists error
            return JsonResponse({'status': 'User with this email already exists'}, status=400)

        cursor.execute("""INSERT INTO user (first_name, last_name, username, email, password, verified, role) 
                           VALUES (%s, % s, % s, %s, %s, %s, %s)""", (first_name, last_name, username, email, password, verified, role, ))
        
        cursor.execute("""INSERT INTO adopter (user_id) 
                           VALUES (LAST_INSERT_ID())""")
        
        connection.commit()
        # register successfull
        return JsonResponse({'status': 'Registration successful'}, status=201)

    return JsonResponse({'status': 'Invalid request method'}, status=405)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']

        cursor = connection.cursor()

        cursor.execute("""SELECT * 
                           FROM user 
                           WHERE username = %s""", (username, ))
        user = cursor.fetchone()

        if user:
            # login successfull
            if check_password(password, user[5]):

                user_info = {
                    'user_id': user[0],
                    'first_name': user[1],
                    'last_name': user[2],
                    'username': user[3],
                    'email': user[4],
                    'verified': user[6],
                    'role': user[7]
                }
                return JsonResponse({'status': 'Login successful', 'user_info': user_info}, status=200)
            else:
                return JsonResponse({'status': 'Wrong password'}, status=401)

        else:
            # login failed
            return JsonResponse({'status': 'Invalid credentials'}, status=401)

    return JsonResponse({'status': 'Invalid request method'}, status=405)


@csrf_exempt
def get_all_users(request):
    if request.method == 'GET':
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM user;")
        users = cursor.fetchall()

        # Convert the result to a list of dictionaries
        users_list = [{'user_id': user[0], 'first_name': user[1], 'last_name': user[2], 'username': user[3],
                       'email': user[4], 'password': user[5], 'verified': user[6], 'role': user[7]} for user in users]

        return JsonResponse({'users': users_list}, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_shelter_by_id(request):
    if request.method == 'GET':
        userid = request.GET.get('userid')

        cursor = connection.cursor()
        cursor.execute("""SELECT user_id, first_name, last_name, username, email, verified, role, address, contact
                       FROM user NATURAL JOIN animal_shelter
                       WHERE user_id = %s""", (userid, ))
        user = cursor.fetchone()

        # Convert the result to a list of dictionaries
        user_info = {'shelter': {'user_id': user[0], 'first_name': user[1], 'last_name': user[2], 'username': user[3],
                                 'email': user[4], 'verified': user[5], 'role': user[6], 'address': user[7], 'contact': user[8]}}

        return JsonResponse(user_info, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_all_shelters(request):
    if request.method == 'GET':

        cursor = connection.cursor()
        role = 'animal_shelter'
        cursor.execute("""SELECT user_id, first_name, last_name, username, email, verified, role, address, contact
                       FROM user NATURAL JOIN animal_shelter
                       WHERE role = %s""", (role, ))
        shelters = cursor.fetchall()

        # Convert the result to a list of dictionaries
        shelter_info = {'shelters': [{'user_id': user[0], 'first_name': user[1], 'last_name': user[2], 'username': user[3],
                                      'email': user[4], 'verified': user[5], 'role': user[6], 'address': user[7], 'contact': user[8]} for user in shelters]}

        return JsonResponse(shelter_info, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
@require_http_methods(["GET"])
def get_all_shelters_with_attributes(request):

    name = request.GET.get('name')
    address = request.GET.get('address')
    sortOption = request.GET.get('sortOption')
    role = 'animal_shelter'

    cursor = connection.cursor()

    query = """SELECT * FROM animal_shelter_info
                    WHERE role = %s AND username LIKE %s AND address LIKE %s {}""".format(";" if sortOption == "None" else f"ORDER BY {sortOption}")

    cursor.execute(query, (role, f"%{name}%", f"%{address}%"))
    shelters = cursor.fetchall()

    shelter_info = {'shelters': [{'user_id': user[0], 'first_name': user[1], 'last_name': user[2], 'username': user[3],
                                  'email': user[4], 'verified': user[5], 'role': user[6], 'address': user[7], 'contact': user[8]} for user in shelters]}

    cursor.close()

    return JsonResponse(shelter_info, status=200)


@csrf_exempt
def get_all_veterinarians(request):
    if request.method == 'GET':

        cursor = connection.cursor()
        role = 'veterinarian'
        cursor.execute("""SELECT user_id, first_name, last_name, username, email, verified, role, address, contact, expertise
                       FROM user NATURAL JOIN veterinarian
                       WHERE role = %s""", (role, ))
        veterinarians = cursor.fetchall()

        # Convert the result to a list of dictionaries
        veterinarian_info = {'veterinarians': [{'user_id': user[0], 'first_name': user[1], 'last_name': user[2], 'username': user[3], 'email': user[4],
                                                'verified': user[5], 'role': user[6], 'address': user[7], 'contact': user[8], 'expertise': user[9]} for user in veterinarians]}

        return JsonResponse(veterinarian_info, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_users_by_role(request):
    if request.method == 'GET':
        cursor = connection.cursor()

        # Fetch all users from animal_shelter, veterinarian, and field_expert tables
        cursor.execute("SELECT * FROM animal_shelter")
        animal_shelters = cursor.fetchall()

        cursor.execute("SELECT * FROM veterinarian")
        veterinarians = cursor.fetchall()

        cursor.execute("SELECT * FROM field_expert")
        field_experts = cursor.fetchall()

        cursor.execute("SELECT * FROM admin")
        admins = cursor.fetchall()

        # Convert the results to JSON objects
        animal_shelters_json = [
            {
                'user_id': user[0],
                'address': user[1],
                'contact': user[2],
                'verification_documents': base64.b64encode(user[3]).decode('utf-8') if user[3] else None,
            }
            for user in animal_shelters
        ]

        veterinarians_json = [
            {
                'user_id': user[0],
                'address': user[1],
                'contact': user[2],
                'verification_documents': base64.b64encode(user[3]).decode('utf-8') if user[3] else None,
                'expertise': user[4],
            }
            for user in veterinarians
        ]

        field_experts_json = [
            {
                'user_id': user[0],
                'speciality': user[1],
                'verification_documents': base64.b64encode(user[2]).decode('utf-8') if user[2] else None,
            }
            for user in field_experts
        ]

        admins_json = [
            {
                'user_id': user[0],
                'verification_documents': base64.b64encode(user[1]).decode('utf-8') if user[1] else None,
            }
            for user in admins
        ]

        # Create the final response
        final_response = {
            'animal_shelters': animal_shelters_json,
            'veterinarians': veterinarians_json,
            'field_experts': field_experts_json,
            'admins': admins_json,
        }

        return JsonResponse(final_response, safe=False)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def reset_password(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data['username']

            # Generate a new random password
            new_password = ''.join(random.choices(
                string.ascii_letters + string.digits, k=12))
            hashed_password = make_password(new_password)

            # Update the password in the database
            cursor = connection.cursor()
            cursor.execute(
                'SELECT email FROM user WHERE username = %s', (username, ))
            email = cursor.fetchone()

            if not email:
                return JsonResponse(status=200)

            cursor.execute(
                'UPDATE user SET password = %s WHERE username = %s', (hashed_password, username))

            connection.commit()

            # Send an email with the new password
            send_mail(
                'Password Reset',
                f'Your new password is: {new_password}',
                'chipetpet.app@gmail.com',
                [email[0]],
                fail_silently=False,
            )

            return JsonResponse({'status': 'Password reset successful. Check your email.'}, status=200)

        except Exception as e:
            return JsonResponse({'error': f'Internal server error: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def change_user_info(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            userid = data['user_id']
            firstName = data['first_name']
            lastName = data['last_name']
            username = data['username']

            cursor = connection.cursor()
            cursor.execute("SELECT * FROM user WHERE username = %s", (username, ))
            user = cursor.fetchone()

            if user:
                return JsonResponse({'user': user, 'status': 'A user with given username already exists.'}, status=200)


            # update user info
            cursor.execute("""UPDATE user 
                           SET first_name = %s, last_name = %s, username = %s 
                           WHERE user_id = %s""", (firstName, lastName, username, userid, ))
            connection.commit()

            return JsonResponse({'status': 'User info changed successfully'}, status=200)

        except Exception as e:
            return JsonResponse({'error': f'Internal server error: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_address_and_contact(request):
    if request.method == 'GET':
        role = request.GET.get('role')
        userid = request.GET.get('user_id')

        cursor = connection.cursor()

        cursor.execute("""SELECT address, contact
                       FROM {table}
                       WHERE user_id = %s""".format(table = role.lower()), (userid, ))
        addressAndContact = cursor.fetchone()

        result = {'address': addressAndContact[0], 'contact': addressAndContact[1]}

        return JsonResponse(result, status = 200)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def change_address_and_contact(request):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            userid = data['user_id']
            address = data['address']
            contact = data['contact']
            role = data['role']

            # update user info
            cursor = connection.cursor()
            cursor.execute("""UPDATE {table} 
                           SET address = %s, contact = %s
                           WHERE user_id = %s""".format(table = role.lower()), (address, contact, userid, ))
            connection.commit()

            return JsonResponse({'status': 'User address and contact changed successfully'}, status=200)

        except Exception as e:
            return JsonResponse({'error': f'Internal server error: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)



@csrf_exempt
@require_http_methods(["PATCH"])
def change_password(request):
        
        data = json.loads(request.body)
        username = data['username']
        old_password = data['old_password']
        new_password = data['new_password'] 

        cursor = connection.cursor()

        cursor.execute("""SELECT * 
                        FROM user 
                        WHERE username = %s""", (username, ))
        user = cursor.fetchone()


        if user is None or check_password(old_password, user[5]):
            cursor.execute('UPDATE user SET password = %s WHERE username = %s', (make_password(new_password), username))
            return JsonResponse({'status': 'Password changed successfully'}, status=200)
                
        return HttpResponse(status=403)
        

   
        
   
   

    


@csrf_exempt
@require_http_methods(["GET"])
def get_all_veterinarians_with_attributes(request):

    username = request.GET.get('username')
    address = request.GET.get('address')
    expertise = request.GET.get('expertise')
    sortOption = request.GET.get('sortOption')

    cursor = connection.cursor()
    role = 'veterinarian'
    query = """SELECT * FROM veterinarian_info
           WHERE role = %s AND username LIKE %s AND address LIKE %s AND expertise LIKE %s {}""".format(";" if sortOption == "None" else f"ORDER BY {sortOption}")

    cursor.execute(
        query, (role, f"%{username}%", f"%{address}%", f"%{expertise}%"))
    veterinarians = cursor.fetchall()

    cursor.close()

    # Convert the result to a list of dictionaries
    veterinarian_info = {'veterinarians': [{'user_id': user[0],
                                            'first_name': user[1],
                                            'last_name': user[2],
                                            'username': user[3],
                                            'email': user[4],
                                            'verified': user[5],
                                            'role': user[6],
                                            'address': user[7],
                                            'contact': user[8],
                                            'expertise': user[9]} for user in veterinarians],
                         'query': query % (role,  f"%{username}%", f"%{address}%", f"%{expertise}%")}

    return JsonResponse(veterinarian_info, status=200)
