from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AdminUser, ContactRequest

@admin.register(AdminUser)
class AdminUserAdmin(UserAdmin):
    """Админ-панель для модели AdminUser"""
    list_display = ['username', 'email', 'first_name', 'last_name', 'phone', 'is_verified', 'is_active', 'date_joined']
    list_filter = ['is_verified', 'is_active', 'is_staff', 'date_joined']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'phone']
    ordering = ['-date_joined']
    
    fieldsets = UserAdmin.fieldsets + (
        ('Дополнительная информация', {'fields': ('phone', 'is_verified')}),
    )
    
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Дополнительная информация', {'fields': ('phone', 'is_verified')}),
    )

@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    """Админ-панель для модели ContactRequest"""
    list_display = ['full_name', 'phone', 'email', 'status', 'created_at', 'processed_by']
    list_filter = ['status', 'created_at', 'processed_by']
    search_fields = ['full_name', 'phone', 'email', 'comment']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('full_name', 'phone', 'email', 'comment')
        }),
        ('Статус и обработка', {
            'fields': ('status', 'processed_by')
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def save_model(self, request, obj, form, change):
        if not obj.processed_by and 'status' in form.changed_data:
            obj.processed_by = request.user
        super().save_model(request, obj, form, change)
