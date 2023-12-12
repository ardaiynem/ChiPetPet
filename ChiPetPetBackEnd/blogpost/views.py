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
    return HttpResponse("Blog")


@csrf_exempt
@require_http_methods(["GET"])
def getTopics(request):

    cursor = connection.cursor()
    cursor.execute("SELECT DISTINCT topic FROM blog_post")
    topics = cursor.fetchall()
    
    cursor.close()
    return JsonResponse({'topics': topics}, status=200)

@csrf_exempt
@require_http_methods(["GET"])
def getTopicBlogs(request):
    
    topic = request.GET.get('topic')

    cursor = connection.cursor()
    cursor.execute("SELECT post_id, user_id, date_and_time, topic, content, username FROM blog_post NATURAL JOIN user where topic = %s", (topic, ))
    blogs = cursor.fetchall()
    
    cursor.close()

    return JsonResponse({'blogs': [{
        "post_id": blog[0],
        "user_id": blog[1],
        "date_and_time": blog[2],
        "topic": blog[3],
        "content": blog[4]
    } for blog in blogs]}, status=200)

@csrf_exempt
@require_http_methods(["POST"])
def createBlog(request):

    data = json.loads(request.body)

    cursor = connection.cursor()

    cursor.execute("INSERT INTO blog_post(user_id, date_and_time, topic, content) VALUES(%s, %s, %s, %s)", 
                    (data['user_id'], data['date_and_time'], data['topic'], data['content']))
    
    connection.commit()

    cursor.close()

    return HttpResponse(status=200)



@csrf_exempt
@require_http_methods(["PATCH"])
def updateBlog(request):
    
    data = json.loads(request.body)

    cursor = connection.cursor()
    cursor.execute("UPDATE blog_post SET date_and_time = %s, topic = %s, content = %s WHERE post_id = %s", 
                   (data['date_and_time'], data['topic'], data['content'], data['post_id']))
    
    connection.commit()

    cursor.close()
    
    return HttpResponse(status=200)

@csrf_exempt
@require_http_methods(["DELETE"])
def deleteBlog(request):
    
    post_id = request.GET.get('post_id')
    user_id = request.GET.get('user_id')

    cursor = connection.cursor()
    cursor.execute("DELETE FROM blog_post WHERE post_id = %s AND user_id = %s", (post_id, user_id))
    
    connection.commit()

    return HttpResponse(status=200)


@csrf_exempt
@require_http_methods(["GET"])
def getBlogComments(request):
    
    cursor = connection.cursor()

    post_id = request.GET.get('post_id')

    cursor.execute("SELECT comment_id, date_and_time, content, user_id, username FROM comment NATURAL JOIN user where post_id = %s", (post_id, ))

    comments = cursor.fetchall()
    
    cursor.close()

    return JsonResponse({"comments": [{
        "comment_id": comment[0],
        "date_and_time": comment[1],
        "content": comment[2],
        "user_id": comment[3],
        "user_name": comment[4]} for comment in comments]}, status=200)

@csrf_exempt
@require_http_methods(["POST"])
def createComment(request):

    data = json.loads(request.body)

    cursor = connection.cursor()
    cursor.execute("INSERT INTO comment SELECT %s, COUNT(*) + 1, %s, %s, %s FROM comment WHERE post_id = %s", 
                   (data['post_id'], data['user_id'], data['date_and_time'], data['content'], data['post_id']))
    
    connection.commit()

    cursor.close()

    return HttpResponse(status=200)



@csrf_exempt
@require_http_methods(["PATCH"])
def updateComment(request):

    data = json.loads(request.body)

    cursor = connection.cursor()
    cursor.execute("UPDATE comment SET date_and_time = %s, content = %s WHERE (post_id, comment_id, user_id) = (%s, %s, %s)", 
                   (data['date_and_time'], data['content'], data['post_id'], data['comment_id'], data['user_id']))
    
    connection.commit()

    cursor.close()

    return HttpResponse(status=200)

@csrf_exempt
@require_http_methods(["DELETE"])
def deleteComment(request):

    post_id = request.GET.get('post_id')
    comment_id = request.GET.get('comment_id')
    user_id = request.GET.get('user_id')

    cursor = connection.cursor()
    cursor.execute("DELETE FROM comment WHERE (post_id, comment_id, user_id) = (%s, %s, %s)", 
                   (post_id, comment_id, user_id))
    
    connection.commit()

    cursor.close()

    return HttpResponse(status=200)