from django.urls import path
from . import views

urlpatterns = [
     path('get_top_vets/', views.get_top_vets, name='get_top_vets'),
     path('get_top_adopters/', views.get_top_adopters, name='get_top_adopters'),
     path('get_top_shelters/', views.get_top_shelters, name='get_top_shelters'),
     path('get_most_adopted_breed/', views.get_most_adopted_breed, name='get_most_adopted_breed'),


]
