from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_applications_admin', views.get_applications_admin, name='get_applications_admin'),
    path('get_application_by_adopter/', views.get_application_by_adopter, name='get_application_by_adopter'),
    path('get_application_by_shelter/', views.get_application_by_shelter, name='get_application_by_shelter'),
    path('get_application_by_pet/', views.get_application_by_pet, name='get_application_by_pet'),
    path('get_application/', views.get_application, name='get_application'),
    path('create_application', views.create_application, name='create_application'),
    path('update_application', views.update_application, name='update_application'),
    path('update_application_status', views.update_application_status, name='update_application_status'),
    path('delete_application/', views.delete_application, name='delete_application'),
]