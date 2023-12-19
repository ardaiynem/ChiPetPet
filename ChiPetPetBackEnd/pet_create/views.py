from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import pandas as pd
from django.views.decorators.http import require_http_methods
import base64


@csrf_exempt
@require_http_methods(["POST"])
def insert_pet(request):

    shelter_id = request.POST.get('shelter_id')
    name = request.POST.get('name')
    species = request.POST.get('species')
    breed = request.POST.get('breed')
    gender = request.POST.get('gender')
    age = request.POST.get('age')
    health_status = request.POST.get('health_status')
    description = request.POST.get('description')
    photo = request.FILES.get('photo')
    adoption_status = request.POST.get('adoption_status')

    # Convert base64-encoded photo to bytes
    if photo:
        # Read the photo file content and convert it to base64
        photo_content = base64.b64encode(photo.read()).decode('utf-8')
    else:
        photo_content = None

    # Insert into the pet table
    cursor = connection.cursor()

    cursor.execute("""INSERT INTO pet (
                    shelter_id, name, species, breed, gender, age, health_status,
                    description, photo, adoption_status
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                   (shelter_id, name, species, breed, gender, age, health_status,
                    description, photo_content, adoption_status))

    return JsonResponse({'status': 'Pet inserted successfully'}, status=201)


@csrf_exempt
def get_pets(request):
    if request.method == 'GET':
        try:
            # Retrieve all pets from the pet table
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT * FROM pet
                    """
                )
                pets = cursor.fetchall()

            # Convert the results to a list of dictionaries
            pets_list = {"pets": [
                {
                    'pet_id': pet[0],
                    'shelter_id': pet[1],
                    'name': pet[2],
                    'species': pet[3],
                    'breed': pet[4],
                    'gender': pet[5],
                    'age': pet[6],
                    'health_status': pet[7],
                    'description': pet[8],
                    # Decode photo from bytes to string
                    'photo': pet[9].decode('utf-8') if pet[9] else None,
                    'adoption_status': pet[10],
                }
                for pet in pets
            ]}

            return JsonResponse(pets_list, safe=False)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_pet_by_id(request):
    if request.method == 'GET':
        try:
            petid = request.GET.get('petid')

            # Retrieve all pets from the pet table
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT pet_id, shelter_id, pet.name, species, breed, gender, age, health_status, description, photo, adoption_status, user.username
                    FROM pet JOIN user on pet.shelter_id = user.user_id
                    WHERE pet_id = %s
                    """, (petid, )
                )
                pet = cursor.fetchone()

            # Convert the results to a list of dictionaries
            pet = {"pet":
                   {
                       'pet_id': pet[0],
                       'shelter_id': pet[1],
                       'name': pet[2],
                       'species': pet[3],
                       'breed': pet[4],
                       'gender': pet[5],
                       'age': pet[6],
                       'health_status': pet[7],
                       'description': pet[8],
                       # Decode photo from bytes to string
                       'photo': pet[9].decode('utf-8') if pet[9] else None,
                       'adoption_status': pet[10],
                       'shelter_name': pet[11],
                   }
                   }

            return JsonResponse(pet, safe=False)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_pets_by_type(request):
    if request.method == 'GET':
        try:
            type = request.GET.get('type')

            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT * FROM pet
                    WHERE LOWER(species) = LOWER(%s)
                    """, (type.lower(), )
                )
                pets = cursor.fetchall()

            # Convert the results to a list of dictionaries
            pets_list = {"pets": [
                {
                    'pet_id': pet[0],
                    'shelter_id': pet[1],
                    'name': pet[2],
                    'species': pet[3],
                    'breed': pet[4],
                    'gender': pet[5],
                    'age': pet[6],
                    'health_status': pet[7],
                    'description': pet[8],
                    # Decode photo from bytes to string
                    'photo': pet[9].decode('utf-8') if pet[9] else None,
                    'adoption_status': pet[10],
                }
                for pet in pets
            ]}

            return JsonResponse(pets_list, safe=False)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_pets_by_shelter(request):
    if request.method == 'GET':
        try:
            # Get the shelter ID from the request parameters
            shelter_id = request.GET.get('user_id')

            # Validate shelter_id
            if shelter_id is None:
                return JsonResponse({'error': 'shelter_id is required'}, status=400)

            # Retrieve pets from the pet table based on the shelter ID
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT * FROM pet
                    WHERE shelter_id = %s
                    """,
                    [shelter_id],
                )
                pets = cursor.fetchall()

            # Convert the results to a list of dictionaries
            pets_list = {"pets": [
                {
                    'pet_id': pet[0],
                    'shelter_id': pet[1],
                    'name': pet[2],
                    'species': pet[3],
                    'breed': pet[4],
                    'gender': pet[5],
                    'age': pet[6],
                    'health_status': pet[7],
                    'description': pet[8],
                    # Decode photo from bytes to string
                    'photo': pet[9].decode('utf-8') if pet[9] else None,
                    'adoption_status': pet[10],
                }
                for pet in pets
            ]}

            return JsonResponse(pets_list, safe=False)

        except Exception as e:
            return JsonResponse({'error': f'Internal server error: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
@require_http_methods(["GET"])
def get_pets_by_adopter_id(request):
    adopter_id = request.GET.get('adopter_id')
    cursor = connection.cursor()

    cursor.execute("""SELECT * FROM pet, owns, user
                    WHERE pet.pet_id = owns.pet_id
                    AND owns.adopter_id = user.user_id
                    AND user.user_id = %s
                    """, [adopter_id])
    
    pets = cursor.fetchall()
    cursor.close()

    if pets is None:
        return JsonResponse({
            'error': 'Pet does not exist'
        }, status=404)
    
    return JsonResponse({"pets": [{
        'pet_id': row[0],
        'pet_name': row[2],
    } for row in pets]}, status=200)


@csrf_exempt
def insert_pets_from_excel(request):
    if request.method == 'POST':
        try:
            # Get the Excel file from the request
            excel_file = request.FILES.get('excel_file')
            shelter_id = request.POST.get('shelter_id')

            # Validate that an Excel file is provided
            if not excel_file or not excel_file.name.endswith('.xlsx'):
                return JsonResponse({'error': 'Please provide a valid Excel file (.xlsx)'}, status=400)

            # Read data from the Excel file using pandas
            df = pd.read_excel(excel_file)

            # Validate that the required columns are present in the Excel file
            required_columns = ['name', 'species', 'breed', 'gender', 'age',
                                'health_status', 'description', 'photo', 'adoption_status']
            if not set(required_columns).issubset(df.columns):
                return JsonResponse({'error': 'The Excel file is missing required columns'}, status=400)

            # Replace NaN values with None
            df = df.where(pd.notna(df), None)

            # Convert DataFrame to list of dictionaries
            pets_data = df.to_dict(orient='records')

            # Insert pets into the pet table
            with connection.cursor() as cursor:
                for pet_data in pets_data:
                    # Add shelter_id to each row before inserting
                    pet_data['shelter_id'] = shelter_id
                    cursor.execute(
                        """
                        INSERT INTO pet (shelter_id, name, species, breed, gender, age, health_status, description, photo, adoption_status)
                        VALUES (%(shelter_id)s, %(name)s, %(species)s, %(breed)s, %(gender)s, %(age)s, %(health_status)s, %(description)s, %(photo)s, %(adoption_status)s)
                        """,
                        pet_data,
                    )

            return JsonResponse({'status': 'Pets inserted successfully'}, status=201)

        except Exception as e:
            return JsonResponse({'error': f'Internal server error: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@require_http_methods(["GET"])
@csrf_exempt
def get_pets_by_type_with_attributes(request):

    type = request.GET.get('type')
    name = request.GET.get('name')
    breed = request.GET.get('breed')
    sortOption = request.GET.get('sortOption')

    cursor = connection.cursor()

    query = """SELECT * FROM pet 
          WHERE LOWER(species) = LOWER(%s) AND breed LIKE %s AND name LIKE %s {}""".format(";" if sortOption == "None" else f"ORDER BY {sortOption}")

    cursor.execute(
        query, (type.lower(), f"%{breed}%", f"%{name}%")
    )

    pets = cursor.fetchall()

    pets_list = {"pets": [
        {
            'pet_id': pet[0],
            'shelter_id': pet[1],
            'name': pet[2],
            'species': pet[3],
            'breed': pet[4],
            'gender': pet[5],
            'age': pet[6],
            'health_status': pet[7],
            'description': pet[8],
            # Decode photo from bytes to string
            'photo': pet[9].decode('utf-8') if pet[9] else None,
            'adoption_status': pet[10],
        }
        for pet in pets
    ]}

    cursor.close()

    return JsonResponse(pets_list, status=200)


@require_http_methods(["GET"])
@csrf_exempt
def get_pets_by_shelter_with_attributes(request):

    shelter_id = request.GET.get('user_id')
    name = request.GET.get('name')
    breed = request.GET.get('breed')
    sortOption = request.GET.get('sortOption')

    cursor = connection.cursor()

    query = """SELECT * FROM pet 
          WHERE shelter_id = %s AND breed LIKE %s AND name LIKE %s {}""".format(";" if sortOption == "None" else f"ORDER BY {sortOption}")

    cursor.execute(
        query, (shelter_id, f"%{breed}%", f"%{name}%")
    )

    pets = cursor.fetchall()

    pets_list = {"pets": [
        {
            'pet_id': pet[0],
            'shelter_id': pet[1],
            'name': pet[2],
            'species': pet[3],
            'breed': pet[4],
            'gender': pet[5],
            'age': pet[6],
            'health_status': pet[7],
            'description': pet[8],
            'photo': pet[9].decode('utf-8') if pet[9] else None,
            'adoption_status': pet[10],
        }
        for pet in pets
    ]}

    cursor.close()

    return JsonResponse(pets_list, status=200)
