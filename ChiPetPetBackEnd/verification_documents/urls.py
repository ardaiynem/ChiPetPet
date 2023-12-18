from django.urls import path
from .views import upload_verification_document, get_own_verification_documents, get_unverified_documents, verify_user, reject_verification_request

urlpatterns = [
    path('upload_verification_document/', upload_verification_document, name='upload_verification_document'),
    path('get_own_verification_documents/', get_own_verification_documents, name='get_own_verification_documents'),
    path('get_unverified_documents/', get_unverified_documents, name='get_unverified_documents'),
    path('verify_user/', verify_user, name='verify_user'),
    path('reject_verification_request/', reject_verification_request, name='reject_verification_request'),

]