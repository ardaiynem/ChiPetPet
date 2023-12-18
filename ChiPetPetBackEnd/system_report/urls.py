from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_system_report', views.get_system_report, name='get_system_report'),
]