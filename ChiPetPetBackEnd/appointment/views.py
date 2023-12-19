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
    return HttpResponse("You're at the appointment index.")


@csrf_exempt
@require_http_methods(["GET"])
def get_appointment(request):
    appointment_id = request.GET.get('appointment_id')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM appointment WHERE appointment_id = %s", [appointment_id])
    appointment = cursor.fetchone()
    cursor.close()
    
    if appointment is None:
        return JsonResponse({
            'error': 'Appointment does not exist'
        }, status=404)
    
    return JsonResponse({
        'appointment_id': appointment[0],
        'date': appointment[1],
        'location': appointment[2],
        'appointment_text': appointment[3],
        'user_id': appointment[4],
        'veterinarian_id': appointment[5],
        'pet_id': appointment[6]
    }, status=200)
    

@csrf_exempt
@require_http_methods(["GET"])
def get_appointment_by_user(request):
    user_id = request.GET.get('user_id')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM appointment WHERE user_id = %s", [user_id])
    appointments = cursor.fetchall()
    cursor.close()

    if appointments is None:
        return JsonResponse({
            'error': 'Appointment does not exist'
        }, status=404)
    
    return JsonResponse({"appointments": [{
        'appointment_id': row[0],
        'date': row[1],
        'location': row[2],
        'appointment_text': row[3],
        'user_id': row[4],
        'veterinarian_id': row[5],
        'pet_id': row[6]
    } for row in appointments]}, status=200)

    
@csrf_exempt
@require_http_methods(["GET"])
def get_appointment_by_veterinarian(request):
    veterinarian_id = request.GET.get('veterinarian_id')
    cursor = connection.cursor()

    cursor.execute("""SELECT * FROM appointment, user, pet 
                    WHERE veterinarian_id = %s 
                    AND appointment.user_id = user.user_id
                    AND appointment.pet_id = pet.pet_id
                    """, [veterinarian_id]) 
    appointments = cursor.fetchall()
    cursor.close()

    if appointments is None:
        return JsonResponse({
            'error': 'Appointment does not exist'
        }, status=404)
    
    return JsonResponse({"appointments": [{
        'appointment_id': row[0],
        'date': row[1],
        'location': row[2],
        'appointment_text': row[3],
        'user_id': row[4],
        'veterinarian_id': row[5],
        'pet_id': row[6],
        'first_name': row[8],
        'last_name': row[9],
        'username': row[10],
        'email': row[11],
        'verified': row[13],
        'role': row[14],
        'pet_id': row[15],
        'animal_shelter_id': row[16],
        'name': row[17],
        'species': row[18],
        'breed': row[19],
        'gender': row[20],
        'age': row[21],
        'health_status': row[22],
        'description': row[23],
        'photo': row[24],
        'adoption_status': row[25]
    } for row in appointments]}, status=200)


@csrf_exempt
@require_http_methods(["GET"])
def get_veterinarian_appointment_dates(request):
    veterinarian_id = request.GET.get('veterinarian_id')
    cursor = connection.cursor()

    cursor.execute("""SELECT date_and_time FROM appointment WHERE veterinarian_id = %s""", [veterinarian_id]) 
    appointments = cursor.fetchall()
    cursor.close()

    if appointments is None:
        return JsonResponse({
            'error': 'Appointment does not exist'
        }, status=404)

    return JsonResponse({"appointments": appointments}, status=200)


@csrf_exempt
@require_http_methods(["POST"])
def create_appointment(request):
    data = json.loads(request.body)
    date_and_time = data.get('date_and_time')
    location = data.get('location')
    appointment_text = data.get('appointment_text')
    user_id = data.get('user_id')
    veterinarian_id = data.get('veterinarian_id')
    pet_id = data.get('pet_id')
    cursor = connection.cursor()

    cursor.execute("""SELECT * FROM appointment WHERE date_and_time = %s AND user_id = %s AND veterinarian_id = %s 
                   AND pet_id = %s""", [date_and_time, user_id, veterinarian_id, pet_id])
    appointment = cursor.fetchone()

    if appointment is not None:
        return JsonResponse({
            'error': 'Appointment already exists'
        }, status=404)

    cursor.execute("""INSERT INTO appointment (date_and_time, location, appointment_text, user_id, veterinarian_id, pet_id) 
                   VALUES (%s, %s, %s, %s, %s, %s)""", [date_and_time, location, appointment_text, user_id, veterinarian_id, pet_id])
    connection.commit()
    cursor.close()
    return JsonResponse({
        'success': 'Appointment created successfully'
    }, status=200)


@csrf_exempt
@require_http_methods(["PUT"])
def update_appointment(request):
    data = json.loads(request.body)
    appointment_id = data.get('appointment_id')
    date = data.get('date')
    location = data.get('location')
    appointment_text = data.get('appointment_text')
    user_id = data.get('user_id')
    veterinarian_id = data.get('veterinarian_id')
    pet_id = data.get('pet_id')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM appointment WHERE appointment_id = %s", [appointment_id])
    appointment = cursor.fetchone()

    if appointment is None:
        return JsonResponse({
            'error': 'Appointment does not exist'
        }, status=404)

    cursor.execute("""UPDATE appointment SET date = %s, location = %s, appointment_text = %s, user_id = %s, 
                   veterinarian_id = %s, pet_id = %s WHERE appointment_id = %s""", 
                   [date, location, appointment_text, user_id, veterinarian_id, pet_id, appointment_id])
    connection.commit()
    cursor.close()

    return JsonResponse({
        'success': 'Appointment updated successfully'
    }, status=200)


@csrf_exempt
@require_http_methods(["DELETE"])
def delete_appointment(request):
    appointment_id = request.GET.get('appointment_id')
    cursor = connection.cursor()
    
    cursor.execute("SELECT * FROM appointment WHERE appointment_id = %s", [appointment_id])
    appointment = cursor.fetchone()

    if appointment is None:
        return JsonResponse({
            'error': 'Appointment does not exist'
        }, status=404)

    cursor.execute("DELETE FROM appointment WHERE appointment_id = %s", [appointment_id])
    connection.commit()
    cursor.close()
    
    return JsonResponse({
        'success': 'Appointment deleted successfully'
    }, status=200)















    
