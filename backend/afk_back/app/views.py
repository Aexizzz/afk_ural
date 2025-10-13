from django.shortcuts import render
from rest_framework import status, generics, permissions, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.conf import settings
from .models import AdminUser, ContactRequest, ContentBlock, GalleryImage
from django.db import IntegrityError
from .serializers import (
    AdminUserSerializer, 
    AdminLoginSerializer, 
    AdminRegistrationSerializer,
    ContactRequestSerializer,
    ContactRequestAdminSerializer,
    ContentBlockSerializer,
    GalleryImageSerializer
)

# Create your views here.

class AdminRegistrationView(generics.CreateAPIView):
    """Представление для регистрации администратора"""
    queryset = AdminUser.objects.all()
    serializer_class = AdminRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            
            # Генерируем токены
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'message': 'Администратор успешно зарегистрирован',
                'user': AdminUserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def admin_login(request):
    """Представление для входа администратора"""
    serializer = AdminLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # Генерируем токены
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'message': 'Успешный вход',
            'user': AdminUserSerializer(user).data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        })
    
    return Response({'detail': 'Неверные учетные данные'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def admin_logout(request):
    """Представление для выхода администратора"""
    try:
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        
        return Response({'message': 'Успешный выход'})
    except Exception as e:
        return Response({'error': 'Ошибка при выходе'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def admin_profile(request):
    """Представление для получения профиля администратора"""
    serializer = AdminUserSerializer(request.user)
    return Response(serializer.data)

class ContactRequestCreateView(generics.CreateAPIView):
    """Представление для создания заявки на связь (доступно всем)"""
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        contact_request = serializer.save()
        
        return Response({
            'message': 'Заявка успешно отправлена',
            'contact_request': ContactRequestSerializer(contact_request).data
        }, status=status.HTTP_201_CREATED)

class ContactRequestListView(generics.ListAPIView):
    """Представление для просмотра списка заявок (только для админов)"""
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestAdminSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = ContactRequest.objects.all()
        
        # Фильтрация по статусу
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Поиск по ФИО
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(full_name__icontains=search)
        
        return queryset

class ContactRequestDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Представление для просмотра, обновления и удаления заявки (только для админов)"""
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestAdminSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        
        # Автоматически устанавливаем обработавшего админа
        if 'status' in request.data:
            serializer.save(processed_by=request.user)
        else:
            serializer.save()
        
        return Response({
            'message': 'Заявка успешно обновлена',
            'contact_request': serializer.data
        })

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def contact_request_stats(request):
    """Представление для получения статистики заявок"""
    total_requests = ContactRequest.objects.count()
    new_requests = ContactRequest.objects.filter(status='new').count()
    in_progress_requests = ContactRequest.objects.filter(status='in_progress').count()
    completed_requests = ContactRequest.objects.filter(status='completed').count()
    cancelled_requests = ContactRequest.objects.filter(status='cancelled').count()
    
    return Response({
        'total': total_requests,
        'new': new_requests,
        'in_progress': in_progress_requests,
        'completed': completed_requests,
        'cancelled': cancelled_requests,
    })


class ContentBlockListCreateView(generics.ListCreateAPIView):
    """Список/создание блоков контента. GET доступен всем, POST — только админам."""
    serializer_class = ContentBlockSerializer
    queryset = ContentBlock.objects.all()

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        qs = super().get_queryset()
        page_key = self.request.query_params.get('page_key')
        if page_key:
            qs = qs.filter(page_key=page_key)
        return qs

    def perform_create(self, serializer):
        try:
            serializer.save(updated_by=self.request.user)
        except IntegrityError:
            # Если блок с таким page_key и block_key уже существует — обновляем его
            page_key = serializer.validated_data.get('page_key')
            block_key = serializer.validated_data.get('block_key')
            content = serializer.validated_data.get('content', '')
            content_type = serializer.validated_data.get('content_type', 'text')
            try:
                block = ContentBlock.objects.get(page_key=page_key, block_key=block_key)
                block.content = content
                block.content_type = content_type
                block.updated_by = self.request.user
                block.save(update_fields=['content', 'content_type', 'updated_by', 'updated_at'])
                # Обновляем instance у сериализатора для корректного ответа
                serializer.instance = block
            except ContentBlock.DoesNotExist:
                raise


class ContentBlockDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Получение/обновление/удаление блока контента. Обновление и удаление — только админы."""
    serializer_class = ContentBlockSerializer
    queryset = ContentBlock.objects.all()

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)


class GalleryImageListCreateView(generics.ListCreateAPIView):
    serializer_class = GalleryImageSerializer
    queryset = GalleryImage.objects.all()

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        qs = super().get_queryset()
        page_key = self.request.query_params.get('page_key')
        if page_key:
            qs = qs.filter(page_key=page_key)
        return qs

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)


class GalleryImageDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GalleryImageSerializer
    queryset = GalleryImage.objects.all()
    permission_classes = [permissions.IsAuthenticated]
