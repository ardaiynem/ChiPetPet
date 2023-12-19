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
                           ORDER BY count
                            
            """)
            topVets = cursor.fetchall()
            return JsonResponse({'top_vets': topVets}, status=200)

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
                           ORDER BY count
                            
            """)
            topAdopters = cursor.fetchall()
            return JsonResponse({'top_adopters': topAdopters}, status=200)

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
                           ORDER BY animal_count
                            
            """)
            topShelters = cursor.fetchall()
            return JsonResponse({'top_adopters': topShelters}, status=200)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_most_adopted_breed(request):
    if request.method == 'GET':
        try:
            cursor = connection.cursor()
            cursor.execute("""SELECT pet.breed, count(*) as breed_count
                           FROM pet NATURAL JOIN owns
                           GROUP BY pet.breed
                           ORDER BY breed_count
                            
            """)
            mostAdoptedBreed = cursor.fetchall()
            return JsonResponse({'most_adopted_breed': mostAdoptedBreed}, status=200)

        except Exception as e:
            return JsonResponse({'error': 'Internal server error: {}'.format(str(e))}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)