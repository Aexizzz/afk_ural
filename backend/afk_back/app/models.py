from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class AdminUser(AbstractUser):
    """Модель для администраторов с дополнительными полями"""
    phone_regex = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Номер телефона должен быть в формате: '+999999999'. До 15 цифр."
    )
    
    phone = models.CharField(validators=[phone_regex], max_length=17, blank=True, verbose_name="Телефон")
    is_verified = models.BooleanField(default=False, verbose_name="Подтвержден")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")

    class Meta:
        verbose_name = "Администратор"
        verbose_name_plural = "Администраторы"
        ordering = ['-date_joined']

    def __str__(self):
        return f"{self.get_full_name()} ({self.username})"

class ContactRequest(models.Model):
    """Модель для заявок на связь от пользователей"""
    STATUS_CHOICES = [
        ('new', 'Новая'),
        ('in_progress', 'В обработке'),
        ('completed', 'Завершена'),
        ('cancelled', 'Отменена'),
    ]

    full_name = models.CharField(max_length=255, verbose_name="ФИО")
    phone = models.CharField(max_length=17, verbose_name="Телефон")
    email = models.EmailField(verbose_name="Электронная почта")
    comment = models.TextField(blank=True, null=True, verbose_name="Комментарий")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new', verbose_name="Статус")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")
    processed_by = models.ForeignKey(
        AdminUser, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        verbose_name="Обработал"
    )

    class Meta:
        verbose_name = "Заявка на связь"
        verbose_name_plural = "Заявки на связь"
        ordering = ['-created_at']

    def __str__(self):
        return f"Заявка от {self.full_name} - {self.created_at.strftime('%d.%m.%Y %H:%M')}"
