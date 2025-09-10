from rest_framework import serializers
from django.contrib.auth import authenticate
from django.conf import settings
from .models import AdminUser, ContactRequest

class AdminUserSerializer(serializers.ModelSerializer):
    """Сериализатор для модели AdminUser"""
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    
    class Meta:
        model = AdminUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone', 
                 'password', 'password_confirm', 'is_verified', 'created_at']
        read_only_fields = ['id', 'is_verified', 'created_at']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Пароли не совпадают")
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = AdminUser.objects.create_user(**validated_data)
        return user

class AdminLoginSerializer(serializers.Serializer):
    """Сериализатор для входа администратора"""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            if not user:
                raise serializers.ValidationError({'detail': 'Неверные учетные данные'})
            if not user.is_active:
                raise serializers.ValidationError({'detail': 'Пользователь заблокирован'})
            if not user.is_verified:
                raise serializers.ValidationError({'detail': 'Пользователь не подтвержден'})
        else:
            raise serializers.ValidationError({'detail': 'Необходимо указать имя пользователя и пароль'})
        
        attrs['user'] = user
        return attrs

class AdminRegistrationSerializer(serializers.ModelSerializer):
    """Сериализатор для регистрации администратора с проверкой кода"""
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True)
    registration_code = serializers.CharField(write_only=True)
    
    class Meta:
        model = AdminUser
        fields = ['username', 'email', 'first_name', 'last_name', 'phone', 
                 'password', 'password_confirm', 'registration_code']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"detail": "Пароли не совпадают"})
        
        registration_code = attrs.get('registration_code')
        if registration_code != settings.ADMIN_REGISTRATION_CODE:
            raise serializers.ValidationError({"detail": "Неверный код регистрации"})
        
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password_confirm')
        validated_data.pop('registration_code')
        validated_data['is_verified'] = True  # Автоматически подтверждаем при правильном коде
        user = AdminUser.objects.create_user(**validated_data)
        return user

class ContactRequestSerializer(serializers.ModelSerializer):
    """Сериализатор для заявок на связь"""
    class Meta:
        model = ContactRequest
        fields = ['id', 'full_name', 'phone', 'email', 'comment', 'status', 
                 'created_at', 'processed_by']
        read_only_fields = ['id', 'status', 'created_at', 'processed_by']

class ContactRequestAdminSerializer(serializers.ModelSerializer):
    """Сериализатор для административного просмотра заявок"""
    processed_by_name = serializers.CharField(source='processed_by.get_full_name', read_only=True)
    
    class Meta:
        model = ContactRequest
        fields = ['id', 'full_name', 'phone', 'email', 'comment', 'status', 
                 'created_at', 'updated_at', 'processed_by', 'processed_by_name']
        read_only_fields = ['id', 'created_at', 'updated_at', 'processed_by_name'] 