from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("send", views.createMessage, name="sendMessage"),
    path("get", views.getAllMessages, name="allMessages"),
    path("getAfter", views.getAllMessagesAfter, name="getAfter"),
]