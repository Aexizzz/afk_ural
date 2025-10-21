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
    email_sent = models.BooleanField(default=False, verbose_name="Email отправлен")
    email_sent_at = models.DateTimeField(null=True, blank=True, verbose_name="Время отправки email")

    class Meta:
        verbose_name = "Заявка на связь"
        verbose_name_plural = "Заявки на связь"
        ordering = ['-created_at']

    def __str__(self):
        return f"Заявка от {self.full_name} - {self.created_at.strftime('%d.%m.%Y %H:%M')}"


class ContentBlock(models.Model):
    """Универсальные редактируемые блоки контента для страниц.
    Идентифицируются по ключу страницы и ключу блока.
    """
    page_key = models.CharField(max_length=128, db_index=True, verbose_name="Ключ страницы")
    block_key = models.CharField(max_length=128, db_index=True, verbose_name="Ключ блока")
    content = models.TextField(blank=True, default="", verbose_name="Контент (HTML/Markdown/текст)")
    content_type = models.CharField(
        max_length=32,
        choices=[('text', 'Текст'), ('html', 'HTML'), ('markdown', 'Markdown')],
        default='text',
        verbose_name="Тип контента"
    )
    updated_by = models.ForeignKey('AdminUser', null=True, blank=True, on_delete=models.SET_NULL, verbose_name="Кем обновлено")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    class Meta:
        verbose_name = "Блок контента"
        verbose_name_plural = "Блоки контента"
        unique_together = (('page_key', 'block_key'),)
        indexes = [
            models.Index(fields=['page_key', 'block_key']),
        ]

    def __str__(self):
        return f"{self.page_key}:{self.block_key}"


class GalleryImage(models.Model):
    """Изображение галереи для страницы."""
    page_key = models.CharField(max_length=128, db_index=True, verbose_name="Ключ страницы")
    image = models.ImageField(upload_to='gallery/', verbose_name="Изображение")
    caption = models.CharField(max_length=255, blank=True, default='', verbose_name="Подпись")
    order = models.PositiveIntegerField(default=0, verbose_name="Порядок")
    uploaded_by = models.ForeignKey('AdminUser', null=True, blank=True, on_delete=models.SET_NULL, verbose_name="Кем загружено")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    class Meta:
        verbose_name = "Изображение галереи"
        verbose_name_plural = "Изображения галереи"
        indexes = [models.Index(fields=['page_key', 'order'])]
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.page_key}:{self.id}"

