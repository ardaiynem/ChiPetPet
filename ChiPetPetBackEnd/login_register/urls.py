from django.urls import path
from .views import register, login, get_all_users, get_users_by_role, reset_password, change_password, get_shelter_by_id, get_all_shelters, get_all_shelters_with_attributes, get_all_veterinarians, get_all_veterinarians_with_attributes

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('get_all_users/', get_all_users, name='get_all_users'),
    path('get_users_by_role/', get_users_by_role, name='get_users_by_role'),
    path('reset_password/', reset_password, name='reset_password'),
    path('change_password/', change_password, name='change_password'),
    path('get_shelter_by_id/', get_shelter_by_id, name='get_shelter_by_id'),
    path('get_all_shelters/', get_all_shelters, name='get_all_shelters'),
    path('get_all_shelters_with_attributes/', get_all_shelters_with_attributes, name='get_all_shelters_with_attributes'),
    path('get_all_veterinarians/', get_all_veterinarians, name='get_all_veterinarians'),
    path('get_all_veterinarians_with_attributes/', get_all_veterinarians_with_attributes, name='get_all_veterinarians_with_attributes')

]
