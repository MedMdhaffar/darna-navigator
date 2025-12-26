from rest_framework import serializers
from django.core.validators import validate_email as django_validate_email
from django.core.exceptions import ValidationError
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_username(self, username):
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Username is already taken.")
        if len(username) < 3:
            raise serializers.ValidationError("Username must be at least 3 characters long.")
        return username

    def validate_email(self, email):
        email = email.lower()
        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError("Email is already registered.")
        try:
            django_validate_email(email)  # format-only validation, no network calls
        except ValidationError:
            raise serializers.ValidationError("Invalid email address format.")
        return email

    def validate_password(self, password):
        if len(password) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return password

    def create(self, validated_data):
        validated_data['email'] = validated_data['email'].lower()
        return User.objects.create_user(**validated_data)

        
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email

        return token

    