from rest_framework import serializers

from .models import Officer

class OfficerSerializer(serializers.ModelSerializer):
    userId = serializers.IntegerField(source='user.id')
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    class Meta:
        model = Officer
        fields = ['userId','username','email', 'area_of_control','average_rating', 'reports_to']

class OfficerCreateSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=255)
    area_of_control = serializers.CharField(max_length=255)
    reports_to = serializers.IntegerField(required=False) 

