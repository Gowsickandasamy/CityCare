from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from authentication_app.models import User

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['id','username','email','phone_number','role','password']
        extra_kwargs={
            'password':{'write_only':True}
        }
        
    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            
        instance.save()
        return instance
    
class LoginSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['role'] = user.role  # Assuming the user model has a 'role' field

        return token