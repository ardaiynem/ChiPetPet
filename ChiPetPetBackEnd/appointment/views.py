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
    data = json.loads(request.body)
    appointment_id = data.get('appointment_id')
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
        'veterinarian_id': appointment[5]
    }, status=200)
    

@csrf_exempt
@require_http_methods(["GET"])
def get_appointment_by_user(request):
    data = json.loads(request.body)
    user_id = data.get('user_id')
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
        'veterinarian_id': row[5]
    } for row in appointments]}, status=200)

    
@csrf_exempt
@require_http_methods(["GET"])
def get_appointment_by_veterinarian(request):
    data = json.loads(request.body)
    veterinarian_id = data.get('veterinarian_id')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM appointment WHERE veterinarian_id = %s", [veterinarian_id])
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
        'veterinarian_id': row[5]
    } for row in appointments]}, status=200)
    

@csrf_exempt
@require_http_methods(["POST"])
def create_appointment(request):
    data = json.loads(request.body)
    date = data.get('date')
    location = data.get('location')
    appointment_text = data.get('appointment_text')
    user_id = data.get('user_id')
    veterinarian_id = data.get('veterinarian_id')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM appointment WHERE date = %s AND location = %s AND appointment_text = %s AND user_id = %s AND veterinarian_id = %s", [date, location, appointment_text, user_id, veterinarian_id])
    appointment = cursor.fetchone()

    if appointment is not None:
        return JsonResponse({
            'error': 'Appointment already exists'
        }, status=404)

    cursor.execute("INSERT INTO appointment (date, location, appointment_text, user_id, veterinarian_id) VALUES (%s, %s, %s, %s, %s)", [date, location, appointment_text, user_id, veterinarian_id])
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
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM appointment WHERE appointment_id = %s", [appointment_id])
    appointment = cursor.fetchone()

    if appointment is None:
        return JsonResponse({
            'error': 'Appointment does not exist'
        }, status=404)

    cursor.execute("UPDATE appointment SET date = %s, location = %s, appointment_text = %s, user_id = %s, veterinarian_id = %s WHERE appointment_id = %s", [date, location, appointment_text, user_id, veterinarian_id, appointment_id])
    connection.commit()
    cursor.close()

    return JsonResponse({
        'success': 'Appointment updated successfully'
    }, status=200)


@csrf_exempt
@require_http_methods(["DELETE"])
def delete_appointment(request):
    data = json.loads(request.body)
    appointment_id = data.get('appointment_id')
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















    
