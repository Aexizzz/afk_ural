from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.conf import settings
from .models import ContactRequest
from django.utils import timezone

def send_contact_request_email(contact_request):
    """
    Отправляет email уведомление о новой заявке
    """
    try:
        subject = f'Новая заявка с сайта от {contact_request.full_name}'
        
        # HTML контент письма (генерируем напрямую без шаблона)
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: #1e40af; color: white; padding: 20px; text-align: center; }}
                .content {{ background: #f9fafb; padding: 20px; border-radius: 0 0 5px 5px; }}
                .field {{ margin-bottom: 15px; }}
                .field-label {{ font-weight: bold; color: #374151; }}
                .footer {{ margin-top: 20px; padding: 20px; background: #e5e7eb; text-align: center; font-size: 12px; color: #6b7280; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Новая заявка с сайта АФК Урал</h1>
                </div>
                <div class="content">
                    <div class="field">
                        <span class="field-label">ФИО:</span>
                        <span>{contact_request.full_name}</span>
                    </div>
                    <div class="field">
                        <span class="field-label">Телефон:</span>
                        <span>{contact_request.phone}</span>
                    </div>
                    <div class="field">
                        <span class="field-label">Email:</span>
                        <span>{contact_request.email}</span>
                    </div>
                    <div class="field">
                        <span class="field-label">Комментарий:</span>
                        <span>{contact_request.comment or "Не указан"}</span>
                    </div>
                    <div class="field">
                        <span class="field-label">Дата и время:</span>
                        <span>{contact_request.created_at.strftime('%d.%m.%Y %H:%M')}</span>
                    </div>
                </div>
                <div class="footer">
                    <p>Это письмо было отправлено автоматически с сайта <a href="https://afk-ural.ru">afk-ural.ru</a></p>
                    <p>Пожалуйста, не отвечайте на это письмо</p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Текстовая версия письма
        text_content = f"""
        Новая заявка с сайта АФК Урал
        
        ФИО: {contact_request.full_name}
        Телефон: {contact_request.phone}
        Email: {contact_request.email}
        Комментарий: {contact_request.comment or "Не указан"}
        Дата и время: {contact_request.created_at.strftime('%d.%m.%Y %H:%M')}
        
        Это письмо было отправлено автоматически с сайта https://afk-ural.ru
        Пожалуйста, не отвечайте на это письмо
        """
        
        # Создаем письмо
        email = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.ADMIN_EMAIL],
            reply_to=[contact_request.email]  # Чтобы ответы шли клиенту
        )
        email.attach_alternative(html_content, "text/html")
        
        # Отправляем
        email.send(fail_silently=False)
        
        # Обновляем запись о отправке email
        contact_request.email_sent = True
        contact_request.email_sent_at = timezone.now()
        contact_request.save(update_fields=['email_sent', 'email_sent_at'])
        
        print(f"✅ Email уведомление отправлено для заявки #{contact_request.id}")
        return True
        
    except Exception as e:
        print(f"❌ Ошибка отправки email: {e}")
        return False