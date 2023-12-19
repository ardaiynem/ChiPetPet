from django.urls import path
from . import views

urlpatterns = [
     path('insert_pet/', views.insert_pet, name='insert_pet'),
     path('update_pet/', views.update_pet, name='update_pet'),
     path('get_pets/', views.get_pets, name='get_pets'),
     path('get_pets_by_shelter/', views.get_pets_by_shelter, name='get_pets_by_shelter'),
     path('insert_pets_from_excel/', views.insert_pets_from_excel,
         name='insert_pets_from_excel'),
     path('get_pets_by_type/', views.get_pets_by_type, name='get_pets_by_type'),
     path('get_pet_by_id/', views.get_pet_by_id, name='get_pet_by_id'),
     path('get_pets_by_type_with_attributes/', views.get_pets_by_type_with_attributes,
         name='get_pets_by_type_with_attributes'),
     path('get_pets_by_shelter_with_attributes/', views.get_pets_by_shelter_with_attributes,
         name='get_pets_by_shelter_with_attributes'), 
     path('get_pets_by_adopter_id/', views.get_pets_by_adopter_id, name='get_pets_by_adopter_id'),
     path('get_pets_by_adopter_id_for_shelter/', views.get_pets_by_adopter_id_for_shelter, name='get_pets_by_adopter_id_for_shelter')
]
