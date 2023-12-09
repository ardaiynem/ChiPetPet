from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.db import connection
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
@require_http_methods(["GET", "POST"])
def index(request):
    return HttpResponse("You're at the application index.")
    

@csrf_exempt
@require_http_methods(["GET"])
def get_application_by_adopter(request):
    data = json.loads(request.body)
    user_id = data.get('user_id')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM applies WHERE adopter_id = %s", [user_id])
    applications = cursor.fetchall()
    cursor.close()

    if applications is None:
        return JsonResponse({
            'error': 'No applications found'
        }, status=404)
    
    return JsonResponse({"applications": [{
        'application_id': row[0],
        'application_status': row[1],
        'application_text': row[2],
        'adopter_id': row[3],
        'animal_shelter_id': row[4],
        'pet_id': row[5]
    } for row in applications]}, status=200)
    

@csrf_exempt
@require_http_methods(["GET"])
def get_application_by_shelter(request):
    data = json.loads(request.body)
    animal_shelter_id = data.get('animal_shelter_id')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM applies WHERE animal_shelter_id = %s", [animal_shelter_id])
    applications = cursor.fetchall()
    cursor.close()

    if applications is None:
        return JsonResponse({
            'error': 'No applications found'
        }, status=404)
    
    return JsonResponse({"applications": [{
        'application_id': row[0],
        'application_status': row[1],
        'application_text': row[2],
        'adopter_id': row[3],
        'animal_shelter_id': row[4],
        'pet_id': row[5]
    } for row in applications]}, status=200)


@csrf_exempt
@require_http_methods(["GET"])
def get_application_by_pet(request):
    data = json.loads(request.body)
    pet_id = data.get('pet_id')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM applies WHERE pet_id = %s", [pet_id])
    applications = cursor.fetchall()
    cursor.close()

    if applications is None:
        return JsonResponse({
            'error': 'No applications found'
        }, status=404)

    return JsonResponse({"applications": [{
        'application_id': row[0],
        'application_status': row[1],
        'application_text': row[2],
        'adopter_id': row[3],
        'animal_shelter_id': row[4],
        'pet_id': row[5]
    } for row in applications]}, status=200)


@csrf_exempt
@require_http_methods(["GET"])
def get_application(request):
    data = json.loads(request.body)
    application_id = data.get('application_id')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM applies WHERE application_id = %s", [application_id])
    application = cursor.fetchone()
    cursor.close()
    
    if application is None:
        return JsonResponse({
            'error': 'Application does not exist'
        }, status=404)

    return JsonResponse({
        'application_id': application[0],
        'application_status': application[1],
        'application_text': application[2],
        'adopter_id': application[3],
        'animal_shelter_id': application[4],
        'pet_id': application[5]
    }, status=200)        


@csrf_exempt
@require_http_methods(["POST"])
def create_application(request):
    data = json.loads(request.body)
    application_status = data.get('application_status')
    application_text = data.get('application_text')
    adopter_id = data.get('adopter_id')
    animal_shelter_id = data.get('animal_shelter_id')
    pet_id = data.get('pet_id')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM applies WHERE application_status = %s AND application_text = %s AND adopter_id = %s AND animal_shelter_id = %s AND pet_id = %s", [application_status, application_text, adopter_id, animal_shelter_id, pet_id])
    application = cursor.fetchone()

    if application is not None:
        return JsonResponse({
            'error': 'Application already exists'
        }, status=400)

    cursor.execute("INSERT INTO applies (application_status, application_text, adopter_id, animal_shelter_id, pet_id) VALUES (%s, %s, %s, %s, %s)", [application_status, application_text, adopter_id, animal_shelter_id, pet_id])
    connection.commit()
    cursor.close()

    return JsonResponse({
        'success': 'Application created successfully'
    }, status=200)


@csrf_exempt
@require_http_methods(["PUT"])
def update_application(request):
    data = json.loads(request.body)
    application_id = data.get('application_id')
    application_status = data.get('application_status')
    application_text = data.get('application_text')
    adopter_id = data.get('adopter_id')
    animal_shelter_id = data.get('animal_shelter_id')
    pet_id = data.get('pet_id')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM applies WHERE application_id = %s", [application_id])
    application = cursor.fetchone()

    if application is None:
        return JsonResponse({
            'error': 'Application does not exist'
        }, status=404)
    
    cursor.execute("UPDATE applies SET application_status = %s, application_text = %s, adopter_id = %s, animal_shelter_id = %s, pet_id = %s WHERE application_id = %s", [application_status, application_text, adopter_id, animal_shelter_id, pet_id, application_id])
    connection.commit()
    cursor.close()

    return JsonResponse({
        'success': 'Application updated successfully'
    }, status=200)
    

@csrf_exempt
@require_http_methods(["PUT"])
def update_application_status(request):
    data = json.loads(request.body)
    application_id = data.get('application_id')
    application_status = data.get('application_status')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM applies WHERE application_id = %s", [application_id])
    application = cursor.fetchone()

    if application is None:
        return JsonResponse({
            'error': 'Application does not exist'
        }, status=404)

    cursor.execute("UPDATE applies SET application_status = %s WHERE application_id = %s", [application_status, application_id])
    connection.commit()
    cursor.close()

    return JsonResponse({
        'success': 'Application updated successfully'
    }, status=200)


@csrf_exempt
@require_http_methods(["DELETE"])
def delete_application(request):
    data = json.loads(request.body)
    application_id = data.get('application_id')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM applies WHERE application_id = %s", [application_id])
    application = cursor.fetchone()

    if application is None:
        return JsonResponse({
            'error': 'Application does not exist'
        }, status=404)

    cursor.execute("DELETE FROM applies WHERE application_id = %s", [application_id])
    connection.commit()
    cursor.close()

    return JsonResponse({
        'success': 'Application deleted successfully'
    }, status=200)