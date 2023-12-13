from django.urls import path
from .views import insert_pet, get_pets, get_pets_by_shelter

urlpatterns = [
    path('insert_pet/', insert_pet, name='insert_pet'),
    path('get_pets/', get_pets, name='get_pets'),
    path('get_pets_by_shelter/', get_pets_by_shelter, name='get_pets_by_shelter'),
]