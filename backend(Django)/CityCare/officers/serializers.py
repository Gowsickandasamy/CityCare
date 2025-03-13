from rest_framework import serializers

from .models import Officer

class OfficerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Officer
        fields = ['user', 'area_of_control', 'reports_to']

class OfficerCreateSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=255)
    area_of_control = serializers.CharField(max_length=255)
    reports_to = serializers.IntegerField(required=False) 

