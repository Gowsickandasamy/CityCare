from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import ComplaintCreateSerializer, ComplaintSerializer
from .services import create_complaint, get_complaints

# Create your views here.
class ComplaintCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = ComplaintCreateSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            result = create_complaint(
                user=request.user,
                title=data['title'],
                description=data['description'],
                area_name=data['area_name'],
                location_link=data['location_link']
            )
            
            if 'error' in result:
                return Response({"error": result['error']}, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({"message": "Complaint created successfully."}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ComplaintListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Check user's role
        if user.role == 'ADMIN':
            complaints = get_complaints(admin_id=user.id)
        elif user.role == 'OFFICER':
            complaints = get_complaints(officer_id=user.id)
        elif user.role == 'USER':
            complaints = get_complaints(user_id=user.id)
        else:
            return Response({"error": "Invalid user role"}, status=status.HTTP_403_FORBIDDEN)

        if complaints == "No Complaints":
            return Response({"message": "No Complaints found"}, status=status.HTTP_200_OK)
       
        return Response(complaints, status=status.HTTP_200_OK)