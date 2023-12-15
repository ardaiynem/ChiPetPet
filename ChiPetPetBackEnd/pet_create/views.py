from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import pandas as pd

@csrf_exempt
def insert_pet(request):
    if request.method == 'POST':
        try:
            # Assuming the data is sent as JSON in the request body
            data = json.loads(request.body)

            shelter_id = data.get('shelter_id')
            name = data.get('name')
            species = data.get('species')
            breed = data.get('breed')
            gender = data.get('gender')
            age = data.get('age')
            health_status = data.get('health_status')
            description = data.get('description')
            photo = data.get('photo')
            adoption_status = data.get('adoption_status')

            # Convert base64-encoded photo to bytes
            photo_bytes = photo.encode('utf-8') if photo is not None else None

            # Insert into the pet table
            cursor = connection.cursor()
            
            cursor.execute("""INSERT INTO pet (
                            shelter_id, name, species, breed, gender, age, health_status,
                            description, photo, adoption_status
                            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                            ( shelter_id, name, species, breed, gender, age, health_status,
                            description, photo_bytes, adoption_status ) )

            return JsonResponse({'status': 'Pet inserted successfully'}, status=201)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON format: {}'.format(str(e))}, status=400)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


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
            pets_list = [
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
                    'photo': pet[9].decode('utf-8') if pet[9] else None,  # Decode photo from bytes to string
                    'adoption_status': pet[10],
                }
                for pet in pets
            ]

            return JsonResponse(pets_list, safe=False)

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
                    'photo': pet[9].decode('utf-8') if pet[9] else None,  # Decode photo from bytes to string
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
            pets_list = [
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
                    'photo': pet[9].decode('utf-8') if pet[9] else None,  # Decode photo from bytes to string
                    'adoption_status': pet[10],
                }
                for pet in pets
            ]

            return JsonResponse(pets_list, safe=False)

        except Exception as e:
            return JsonResponse({'error': f'Internal server error: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

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
            required_columns = ['name', 'species', 'breed', 'gender', 'age', 'health_status', 'description', 'photo', 'adoption_status']
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