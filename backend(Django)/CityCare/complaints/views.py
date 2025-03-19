from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import ComplaintCreateSerializer
from .services import create_complaint

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
            
            # Check if an error occurred during complaint creation
            if 'error' in result:
                return Response({"error": result['error']}, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({"message": "Complaint created successfully."}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)