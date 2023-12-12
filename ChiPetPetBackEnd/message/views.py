import json
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.conf import settings
from django.db import connection
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
@require_http_methods(["GET", "POST"])
def index(request):
    return HttpResponse(JsonResponse({"message": "Message"}))


@csrf_exempt
@require_http_methods(["POST"])
def createMessage(request):

    data = json.loads(request.body)

    cursor = connection.cursor()
    cursor.execute("INSERT INTO message VALUES(%s, %s, %s, %s);", (data['date_and_time'], data['content'], data['user_id'], data['receiver_id']))
    connection.commit()
    

    cursor.close()
    return HttpResponse(status=200)

@csrf_exempt
@require_http_methods(["GET"])
def getAllMessages(request):
    
    user_id = request.GET.get('user_id')

    cursor = connection.cursor()
    query = "SELECT * FROM message where sender_id = %s or receiver_id = %s"
    cursor.execute(query, (user_id, user_id))
    messages = cursor.fetchall()
    
    cursor.close()
    
    return JsonResponse({"messages": [{
        "date": message[0],
        "content": message[1],
        "sender_id": message[2],
        "receiver_id": message[3]
        } for message in messages]}, status=200)

@csrf_exempt
@require_http_methods(["GET"])
def getAllMessagesAfter(request):
    
    user_id = request.GET.get('user_id')
    date = request.GET.get('date')

    cursor = connection.cursor()
    query = "SELECT * FROM message where date_and_time > %s AND (sender_id = %s or receiver_id = %s)"
    cursor.execute(query, (date, user_id, user_id))
    messages = cursor.fetchall()
    
    cursor.close()
    
    return JsonResponse({"messages": [{
        "date": message[0],
        "content": message[1],
        "sender_id": message[2],
        "receiver_id": message[3]
        } for message in messages]}, status=200)