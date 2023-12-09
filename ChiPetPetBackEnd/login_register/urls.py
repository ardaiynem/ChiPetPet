from django.urls import path
from .views import register, login, get_all_users, get_users_by_role, reset_password

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('get_all_users/', get_all_users, name='get_all_users'),
    path('get_users_by_role/', get_users_by_role, name='get_users_by_role'),
    path('reset_password/', reset_password, name='reset_password'),
]
