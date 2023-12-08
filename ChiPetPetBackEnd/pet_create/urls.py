from django.urls import path
from .views import insert_pet, get_pets

urlpatterns = [
    path('insert_pet/', insert_pet, name='insert_pet'),
    path('get_pets/', get_pets, name='get_pets'),
]