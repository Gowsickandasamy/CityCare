from django.urls import path
from .views import ComplaintCreateView, ComplaintListView

urlpatterns = [
    path('create/', ComplaintCreateView.as_view(), name='create_complaint'),
    path('list/', ComplaintListView.as_view(), name='list_complaints'),
]
