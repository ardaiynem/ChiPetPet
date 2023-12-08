from django.urls import path
from .views import upload_health_record, get_health_records_by_pet

urlpatterns = [
    path('upload_health_record/', upload_health_record, name='upload_health_record'),
    path('get_health_records_by_pet/', get_health_records_by_pet, name='get_health_records_by_pet'),
]