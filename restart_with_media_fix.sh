#!/bin/bash

echo "🔄 Перезапуск сервера с исправлением медиафайлов..."

# Остановка контейнеров
echo "⏹️ Остановка контейнеров..."
docker-compose down

# Пересборка frontend с новыми настройками Nginx
echo "🔨 Пересборка frontend..."
docker-compose build frontend

# Запуск контейнеров
echo "🚀 Запуск контейнеров..."
docker-compose up -d

# Проверка статуса
echo "📊 Проверка статуса контейнеров..."
docker-compose ps

echo "✅ Перезапуск завершен!"
echo "🌐 Проверьте сайт: https://afkural.ru/products"
echo "📸 Попробуйте загрузить новое изображение"
