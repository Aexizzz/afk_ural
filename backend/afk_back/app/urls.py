from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Аутентификация администраторов
    path('auth/register/', views.AdminRegistrationView.as_view(), name='admin-register'),
    path('auth/login/', views.admin_login, name='admin-login'),
    path('auth/logout/', views.admin_logout, name='admin-logout'),
    path('auth/profile/', views.admin_profile, name='admin-profile'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # Заявки на связь
    path('contact-requests/', views.ContactRequestCreateView.as_view(), name='contact-request-create'),
    path('admin/contact-requests/', views.ContactRequestListView.as_view(), name='contact-request-list'),
    path('admin/contact-requests/<int:pk>/', views.ContactRequestDetailView.as_view(), name='contact-request-detail'),
    path('admin/contact-requests/stats/', views.contact_request_stats, name='contact-request-stats'),

    # Контент-блоки (inline CMS)
    path('content-blocks/', views.ContentBlockListCreateView.as_view(), name='content-block-list-create'),
    path('content-blocks/<int:pk>/', views.ContentBlockDetailView.as_view(), name='content-block-detail'),

    # Галерея (медиа загрузки)
    path('gallery-images/', views.GalleryImageListCreateView.as_view(), name='gallery-image-list-create'),
    path('gallery-images/<int:pk>/', views.GalleryImageDetailView.as_view(), name='gallery-image-detail'),
] 