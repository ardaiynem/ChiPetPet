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
    
    query = "(SELECT receiver_id, username, role FROM message INNER JOIN user ON receiver_id = user_id WHERE sender_id = %s) UNION (SELECT sender_id, username, role FROM message INNER JOIN user ON sender_id = user_id WHERE receiver_id = %s)"
    cursor.execute(query, (user_id, user_id))
    chats = cursor.fetchall()

    query = "SELECT * FROM message WHERE (sender_id = %s OR receiver_id = %s) AND (sender_id = %s OR receiver_id = %s) ORDER BY date_and_time"
    
    messages = []

    for c in chats: 
        cursor.execute(query, (user_id, user_id, c[0], c[0]))   
        messages.append(cursor.fetchall())

    
    cursor.close()              

    return JsonResponse({
        "chats": [
            {
                "chat_id": chats[i][0],
                "username": chats[i][1],
                "role": chats[i][2],
                "messages": [
                    {
                        "date": message[0],
                        "content": message[1],
                        "sender_id": message[2],
                        "receiver_id": message[3]
                    }
                    for message in messages[i]
                ]
            }
            for i in range(len(chats))
        ]
    }, status=200)

@csrf_exempt
@require_http_methods(["GET"])
def getAllMessagesAfter(request):
    
    user_id = request.GET.get('user_id')
    date = request.GET.get('date')

    cursor = connection.cursor()
    query = "(SELECT receiver_id, username, role FROM message INNER JOIN user ON receiver_id = user_id WHERE sender_id = %s AND date_and_time > %s) UNION (SELECT receiver_id, username, role FROM message INNER JOIN user ON receiver_id = user_id WHERE receiver_id = %s AND date_and_time > %s)"
    cursor.execute(query, (user_id, date, user_id, date))
    chats = cursor.fetchall()

    query = "SELECT * FROM message WHERE date_and_time > %s AND (sender_id = %s OR receiver_id = %s) AND (sender_id = %s OR receiver_id = %s) ORDER BY date_and_time"
    
    messages = []

    for c in chats: 
        cursor.execute(query, (date, user_id, user_id, c[0], c[0]))   
        messages.append(cursor.fetchall())

    
    cursor.close()              

    return JsonResponse({
        "chats": [
            {
                "chat_id": chats[i][0],
                "username": chats[i][1],
                "role": chats[i][2],
                "messages": [
                    {
                        "date": message[0],
                        "content": message[1],
                        "sender_id": message[2],
                        "receiver_id": message[3]
                    }
                    for message in messages[i]
                ]
            }
            for i in range(len(chats))
        ]
    }, status=200)

@csrf_exempt
@require_http_methods(["GET"])
def getUser(request):
    
    username = request.GET.get('username')
    
    cursor = connection.cursor()
    
    query = "SELECT username, user_id, role FROM user where username= %s"
    
    cursor.execute(query, (username,))
    user = cursor.fetchone()

    cursor.close()              

    if user is None: 
        return HttpResponse(status=404)

    return JsonResponse({
        "username": user[0],
        "user_id": user[1],
        "role": user[2]
    }, status=200)