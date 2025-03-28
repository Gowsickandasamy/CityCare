from django.urls import path
from .views import ComplaintCreateView, ComplaintEditView, ComplaintListView,ComplaintView, ComplaintStatusView

urlpatterns = [
    path('create/', ComplaintCreateView.as_view(), name='create_complaint'),
    path('list/', ComplaintListView.as_view(), name='list_complaints'),
    path('<int:id>/', ComplaintView.as_view(), name='get_complaint'),
    path('<int:id>/edit/', ComplaintEditView.as_view(), name='edit-complaint'),
    path('<int:id>/status/', ComplaintStatusView.as_view(), name='complaint-status')
]
