from django.shortcuts import render
from django.conf import settings
from django.db import connection
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.views.decorators.csrf import csrf_exempt
import json
import base64

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
        cursor.execute("SELECT * FROM user WHERE username = %s", (username, ) )
        user = cursor.fetchall()

        if user:
            # user already exists error
            return JsonResponse({'status': 'User with this username already exists'}, status=400)
        else:
            cursor.execute("""INSERT INTO user (first_name, last_name, username, email, password, verified, role) 
                           VALUES (%s, % s, % s, %s, %s, %s, %s)""", (first_name, last_name, username, email, password, verified, role, ))
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
                           WHERE username = %s""", (username, ) )
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

def get_all_users(request):
    if request.method == 'GET':
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM user;")
        users = cursor.fetchall()

        # Convert the result to a list of dictionaries
        users_list = [{'user_id': user[0], 'first_name': user[1], 'last_name': user[2], 'username': user[3], 'email': user[4], 'password': user[5], 'verified': user[6], 'role': user[7]} for user in users]

        return JsonResponse({'users': users_list}, safe=False)

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
                'verification_documents': base64.b64encode(user[2]).decode('utf-8') if user[3] else None,
            }
            for user in field_experts
        ]

        admins_json = [
            {
                'user_id': user[0],
                'verification_documents': base64.b64encode(user[1]).decode('utf-8') if user[3] else None,
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