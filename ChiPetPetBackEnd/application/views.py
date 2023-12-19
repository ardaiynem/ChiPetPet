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
def get_applications_admin(request):
    cursor = connection.cursor()
    cursor.execute("""SELECT * 
                    FROM applies, user as u1, user as u2, animal_shelter, pet 
                    WHERE applies.adopter_id = u1.user_id AND applies.animal_shelter_id = animal_shelter.user_id 
                    AND u2.user_id = animal_shelter.user_id AND applies.pet_id = pet.pet_id 
                    AND (applies.application_status = 'SHELTER_APPROVED' OR applies.application_status = 'PENDING') """)
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
        'pet_id': row[5],
        'adopter_first_name': row[7],
        'adopter_last_name': row[8],
        'adopter_username': row[9],
        'adopter_email': row[10],
        'adopter_verified': row[12],
        'adopter_role': row[13],
        'animal_shelter_first_name': row[15],
        'animal_shelter_last_name': row[16],
        'animal_shelter_username': row[17],
        'animal_shelter_email': row[18],
        'animal_shelter_verified': row[20],
        'animal_shelter_role': row[21],
        'animal_shelter_address': row[23],
        'animal_shelter_contact': row[24],
        'pet_name': row[28],
        'pet_species': row[29],
        'pet_breed': row[30],
        'pet_gender': row[31],
        'pet_age': row[32],
        'pet_health_status': row[33],
        'pet_description': row[34],
        'pet_photo': row[35].decode('utf-8') if row[35] else None,
        'pet_adoption_status': row[36]
    } for row in applications]}, status=200)


@csrf_exempt
@require_http_methods(["GET"])
def get_application_by_adopter(request):
    adopter_id = request.GET.get('adopter_id')
    # cursor = connection.cursor()
    # cursor.execute(""" SELECT *
    #                FROM applies""" )
    # applications = cursor.fetchall()
    # return JsonResponse({"applications": applications}, status=200)

    cursor = connection.cursor()
    cursor.execute(""" SELECT *
                        FROM applies, user as u1, user as u2, animal_shelter, pet
                        WHERE applies.adopter_id = u1.user_id AND
                        applies.animal_shelter_id = animal_shelter.user_id AND u2.user_id = animal_shelter.user_id AND
                        applies.pet_id = pet.pet_id AND applies.adopter_id = %s""", [adopter_id]) 
    applications = cursor.fetchall()
    cursor.close()

    if applications is None:
        return JsonResponse({
            'error': 'No applications found'
        }, status=404)
    # return HttpResponse(applications, status=200)
    return JsonResponse({"applications": [{
        'application_id': row[0],
        'application_status': row[1],
        'application_text': row[2],
        'adopter_id': row[3],
        'animal_shelter_id': row[4],
        'pet_id': row[5],
        'adopter_first_name': row[7],
        'adopter_last_name': row[8],
        'adopter_username': row[9],
        'adopter_email': row[10],
        'adopter_verified': row[12],
        'adopter_role': row[13],
        'animal_shelter_first_name': row[15],
        'animal_shelter_last_name': row[16],
        'animal_shelter_username': row[17],
        'animal_shelter_email': row[18],
        'animal_shelter_verified': row[20],
        'animal_shelter_role': row[21],
        'animal_shelter_address': row[23],
        'animal_shelter_contact': row[24],
        'pet_name': row[28],
        'pet_species': row[29],
        'pet_breed': row[30],
        'pet_gender': row[31],
        'pet_age': row[32],
        'pet_health_status': row[33],
        'pet_description': row[34],
        'pet_photo': row[35].decode('utf-8') if row[35] else None,
        'pet_adoption_status': row[36]
    } for row in applications]}, status=200)


@csrf_exempt
@require_http_methods(["GET"])
def get_application_by_shelter(request):
    animal_shelter_id = request.GET.get('animal_shelter_id')
    cursor = connection.cursor()
    cursor.execute("""
                    SELECT *
                    FROM applies, user as u1, user as u2, animal_shelter, pet
                    WHERE applies.adopter_id = u1.user_id AND
                    applies.animal_shelter_id = animal_shelter.user_id AND u2.user_id = animal_shelter.user_id AND
                    applies.pet_id = pet.pet_id AND applies.animal_shelter_id = %s AND
                    applies.application_status = 'PENDING'""", [animal_shelter_id])
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
        'pet_id': row[5],
        'adopter_first_name': row[7],
        'adopter_last_name': row[8],
        'adopter_username': row[9],
        'adopter_email': row[10],
        'adopter_verified': row[12],
        'adopter_role': row[13],
        'animal_shelter_first_name': row[15],
        'animal_shelter_last_name': row[16],
        'animal_shelter_username': row[17],
        'animal_shelter_email': row[18],
        'animal_shelter_verified': row[20],
        'animal_shelter_role': row[21],
        'animal_shelter_address': row[23],
        'animal_shelter_contact': row[24],
        'pet_name': row[28],
        'pet_species': row[29],
        'pet_breed': row[30],
        'pet_gender': row[31],
        'pet_age': row[32],
        'pet_health_status': row[33],
        'pet_description': row[34],
        'pet_photo': row[35].decode('utf-8') if row[35] else None,
        'pet_adoption_status': row[36]
    } for row in applications]}, status=200)


@csrf_exempt
@require_http_methods(["GET"])
def get_application_by_pet(request):
    pet_id = request.GET.get('pet_id')
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
    # data = json.loads(request.body)
    # application_id = data.get('application_id')
    application_id = request.GET.get('application_id')
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
    application_text = data.get('application_text')
    adopter_id = data.get('adopter_id')
    animal_shelter_id = data.get('animal_shelter_id')
    pet_id = data.get('pet_id')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM applies WHERE application_status = 'PENDING' AND application_text = %s AND adopter_id = %s AND animal_shelter_id = %s AND pet_id = %s", [application_text, adopter_id, animal_shelter_id, pet_id])
    application = cursor.fetchone()

    if application is not None:
        return JsonResponse({
            'error': 'Application already exists'
        }, status=400)

    cursor.execute("INSERT INTO applies (application_status, application_text, adopter_id, animal_shelter_id, pet_id) VALUES ('PENDING', %s, %s, %s, %s)", [application_text, adopter_id, animal_shelter_id, pet_id])
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
    # data = json.loads(request.body)
    # application_id = data.get('application_id')
    application_id = request.GET.get('application_id')
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