from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_notifications/', views.get_notifications, name='get_notifications'),
    path('get_notification/', views.get_notification, name='get_notification'),
    path('get_recent_notifications/', views.get_recent_notifications, name='get_recent_notifications'),
    path('create_notification/', views.create_notification, name='create_notification'),
    path('delete_notification/', views.delete_notification, name='delete_notification')
]