from django.urls import path
from .views import OfficerCreateView, OfficerListView,OfficerDeleteView


urlpatterns = [
    path('create/', OfficerCreateView.as_view(), name='create_officer'),
    path('getOfficer/',OfficerListView.as_view(), name = 'list_officers'),
    path('deleteOfficer/<int:id>/', OfficerDeleteView.as_view(), name='delete_officer')
]
