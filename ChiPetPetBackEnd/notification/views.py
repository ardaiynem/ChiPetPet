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
    return HttpResponse("You're at the notification index.")


@csrf_exempt
@require_http_methods(["GET"])
def get_notifications(request):
    # data = json.loads(request.body)
    # user_id = data.get('user_id')
    user_id = request.GET.get('user_id')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM notification WHERE user_id = %s", [user_id])
    notifications = cursor.fetchall()

    if notifications is None:
        return JsonResponse({
            'error': 'no notifications found'
        }, status=404)
    
    return JsonResponse({ 'notifications': [{
        'user_id': row[0],
        'date_and_time': row[1],
        'topic': row[2],
        'description': row[3]
    } for row in notifications]}, status=200)
    

@csrf_exempt
@require_http_methods(["GET"])
def get_notification(request):
    # data = json.loads(request.body)
    # user_id = data.get('user_id')
    # date_and_time = data.get('date_and_time')
    user_id = request.GET.get('user_id')
    date_and_time = request.GET.get('date_and_time')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM notification WHERE user_id = %s AND date_and_time = %s", [user_id, date_and_time])
    notification = cursor.fetchone()

    if notification is None:
        return JsonResponse({
            'error': 'no notification found'
        }, status=404)
    
    return JsonResponse({
        'user_id': notification[0],
        'date_and_time': notification[1],
        'topic': notification[2],
        'description': notification[3]
    }, status=200)
    

@csrf_exempt
@require_http_methods(["GET"])
def get_recent_notifications(request):
    # data = json.loads(request.body)
    # user_id = data.get('user_id')
    # date_and_time = data.get('date_and_time')
    user_id = request.GET.get('user_id')
    date_and_time = request.GET.get('date_and_time')
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM notification WHERE user_id = %s AND date_and_time > %s", [user_id, date_and_time])
    notifications = cursor.fetchall()

    if notifications is None:
        return JsonResponse({
            'error': 'no notifications found'
        }, status=404)
    
    return JsonResponse({ 'notifications': [{
        'user_id': row[0],
        'date_and_time': row[1],
        'topic': row[2],
        'description': row[3]
    } for row in notifications]}, status=200)
    

@csrf_exempt
@require_http_methods(["POST"])
def create_notification(request):
    data = json.loads(request.body)
    user_id = data.get('user_id')
    date_and_time = data.get('date_and_time')
    topic = data.get('topic')
    description = data.get('description')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM notification WHERE user_id = %s AND date_and_time = %s", [user_id, date_and_time])
    notification = cursor.fetchone()

    if notification is not None:
        return JsonResponse({
            'error': 'notification already exists'
        }, status=400)

    cursor.execute("INSERT INTO notification VALUES (%s, %s, %s, %s)", [user_id, date_and_time, topic, description])
    return JsonResponse({
        'message': 'notification created'
    }, status=200)


@csrf_exempt
@require_http_methods(["DELETE"])
def delete_notification(request):
    # data = json.loads(request.body)
    # user_id = data.get('user_id')
    # date_and_time = data.get('date_and_time')
    user_id = request.GET.get('user_id')
    date_and_time = request.GET.get('date_and_time')
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM notification WHERE user_id = %s AND date_and_time = %s", [user_id, date_and_time])
    notification = cursor.fetchone()

    if notification is None:
        return JsonResponse({
            'error': 'no notification found'
        }, status=404)

    cursor.execute("DELETE FROM notification WHERE user_id = %s AND date_and_time = %s", [user_id, date_and_time])
    return JsonResponse({
        'message': 'notification deleted'
    }, status=200)