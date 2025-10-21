FROM python:3.11-slim

WORKDIR /app

# Устанавливаем системные зависимости включая SSL
RUN apt-get update && apt-get install -y \
    gcc \
    sqlite3 \
    openssl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Копируем SSL сертификаты
#COPY ssl_certs/server.crt /app/ssl/server.crt
#COPY ssl_certs/server.key /app/ssl/server.key
#RUN mkdir -p /app/ssl

# Создаем исправленные настройки Django
RUN echo "ALLOWED_HOSTS = ['*']" >> /app/afk_back/settings.py
RUN echo "CORS_ALLOW_ALL_ORIGINS = True" >> /app/afk_back/settings.py

# Создаем необходимые папки для медиафайлов
RUN mkdir -p /app/media/gallery
RUN touch /app/media/gallery/.gitkeep

# Устанавливаем права доступа
RUN chmod -R 755 /app/media

# Создаем скрипт запуска
RUN echo '#!/bin/bash' > /app/start.sh && \
    echo 'python manage.py setup_media' >> /app/start.sh && \
    echo 'python manage.py runserver 0.0.0.0:8000' >> /app/start.sh && \
    chmod +x /app/start.sh

# Запускаем Django с созданием папок
CMD ["/app/start.sh"]
