from django.urls import path
from .views import insert_pet, get_pets, get_pets_by_shelter, insert_pets_from_excel, get_pets_by_type, get_pet_by_id

urlpatterns = [
    path('insert_pet/', insert_pet, name='insert_pet'),
    path('get_pets/', get_pets, name='get_pets'),
    path('get_pets_by_shelter/', get_pets_by_shelter, name='get_pets_by_shelter'),
    path('insert_pets_from_excel/', insert_pets_from_excel, name='insert_pets_from_excel'),
    path('get_pets_by_type/', get_pets_by_type, name='get_pets_by_type'),
    path('get_pet_by_id/', get_pet_by_id, name='get_pet_by_id'),
]