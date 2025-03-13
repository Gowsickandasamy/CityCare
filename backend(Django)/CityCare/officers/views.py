from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from officers.serializers import OfficerCreateSerializer
from officers.services import create_officer
from rest_framework.views import APIView

# Create your views here.
class OfficerCreateView(APIView):
    permission_class = [IsAuthenticated]
    def post(self, request):
        if request.user.role != 'ADMIN':
            return Response({"error":"Only Admins can add the officers"},status= status.HTTP_403_FORBIDDEN)
        
        serializer = OfficerCreateSerializer(data = request.data)
        
        if serializer.is_valid():
            data = serializer.validated_data
            officer = create_officer(
                username= data['username'],
                email = data['email'],
                phone_number= data['phone_number'],
                area_of_control= data['area_of_control'],
                created_by= request.user
            )
            
            return Response({"meeage":"Officer creates Successfully"}, status = status.HTTP_201_CREATED)
    
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)