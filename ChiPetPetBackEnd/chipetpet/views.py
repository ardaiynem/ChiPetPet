from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.db import connection

# Create your views here.

def index(request):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM user")
    users = cursor.fetchall()
    return HttpResponse(users)
    # return HttpResponse("Hello, world. You're at the index")
