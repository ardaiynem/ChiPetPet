from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection


# Create your views here.
@csrf_exempt
def get_top_vets(request):
    if request.method == 'GET':
        try:
            cursor = connection.cursor()
            cursor.execute("""SELECT user.username, count(*) as count
                           FROM user JOIN appointment ON appointment.veterinarian_id = user.user_id
                           GROUP BY user.username
                           ORDER BY count DESC
                            
            """)
            topVets = cursor.fetchall()

            topVetsList = {"top_vets": [
                {
                    'username': vet[0],
                    'count': vet[1],
                }
                for vet in topVets
            ]}
            return JsonResponse(topVetsList, status=200)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_top_adopters(request):
    if request.method == 'GET':
        try:
            cursor = connection.cursor()
            cursor.execute("""SELECT user.username, count(*) as count
                           FROM user JOIN owns ON owns.adopter_id = user.user_id
                           GROUP BY user.username
                           ORDER BY count DESC
                            
            """)
            topAdopters = cursor.fetchall()

            topAdoptersList = {"top_adopters": [
                {
                    'username': adopter[0],
                    'count': adopter[1],
                }
                for adopter in topAdopters
            ]}

            return JsonResponse(topAdoptersList, status=200)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Shelters with highest number of animals
@csrf_exempt
def get_top_shelters(request):
    if request.method == 'GET':
        try:
            cursor = connection.cursor()
            cursor.execute("""SELECT user.username, count(*) as animal_count
                           FROM user JOIN pet ON pet.shelter_id = user.user_id
                           GROUP BY user.username
                           ORDER BY animal_count DESC
                            
            """)
            topShelters = cursor.fetchall()

            topSheltersList = {"top_shelters": [
                {
                    'username': shelter[0],
                    'animal_count': shelter[1],
                }
                for shelter in topShelters
            ]}

            return JsonResponse(topSheltersList, status=200)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_most_adopted_breed(request):
    if request.method == 'GET':
        try:
            cursor = connection.cursor()
            cursor.execute("""SELECT LOWER(pet.breed) as lowercase_breed, count(*) as breed_count
                           FROM pet NATURAL JOIN owns
                           GROUP BY LOWER(pet.breed)
                           ORDER BY breed_count DESC
                            
            """)
            mostAdoptedBreed = cursor.fetchall()

            mostAdoptedBreedList = {"most_adopted_breed": [
                {
                    'breed': breed[0],
                    'breed_count': breed[1],
                }
                for breed in mostAdoptedBreed
            ]}

            return JsonResponse(mostAdoptedBreedList, status=200)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)