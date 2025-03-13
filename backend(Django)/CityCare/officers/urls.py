from django.urls import path
from .views import OfficerCreateView

urlpatterns = [
    path('create/', OfficerCreateView.as_view(), name='create_officer'),
]
