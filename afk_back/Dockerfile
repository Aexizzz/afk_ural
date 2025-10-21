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

# Создаем скрипт исправления папок
RUN echo '#!/bin/bash' > /app/fix_media_folders.sh && \
    echo 'mkdir -p /app/media/gallery' >> /app/fix_media_folders.sh && \
    echo 'chmod -R 755 /app/media' >> /app/fix_media_folders.sh && \
    echo 'touch /app/media/gallery/.gitkeep' >> /app/fix_media_folders.sh && \
    echo 'echo "Папки созданы: $(ls -la /app/media/)"' >> /app/fix_media_folders.sh && \
    chmod +x /app/fix_media_folders.sh

# Создаем скрипт запуска
RUN echo '#!/bin/bash' > /app/start.sh && \
    echo 'echo "🔧 Создание папок медиафайлов..."' >> /app/start.sh && \
    echo '/app/fix_media_folders.sh' >> /app/start.sh && \
    echo 'echo "🚀 Запуск Django сервера..."' >> /app/start.sh && \
    echo 'python manage.py runserver 0.0.0.0:8000' >> /app/start.sh && \
    chmod +x /app/start.sh

# Запускаем Django с созданием папок
CMD ["/app/start.sh"]
