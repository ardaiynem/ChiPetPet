from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_appointment', views.get_appointment, name='get_appointment'),
    path('get_appointment_by_user', views.get_appointment_by_user, name='get_appointment_by_user'),
    path('get_appointment_by_veterinarian', views.get_appointment_by_veterinarian, name='get_appointment_by_veterinarian'),
    path('create_appointment', views.create_appointment, name='create_appointment'),
    path('update_appointment', views.update_appointment, name='update_appointment'),
    path('delete_appointment', views.delete_appointment, name='delete_appointment'),
]

