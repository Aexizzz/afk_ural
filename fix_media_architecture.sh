#!/bin/bash

echo "🔧 Исправление архитектуры медиафайлов..."

echo "📋 Текущая архитектура:"
echo "  - Backend API: https://afkural.ru/api/ (Django)"
echo "  - Медиафайлы: https://afkural.ru/media/ (Nginx напрямую)"
echo "  - Frontend: https://afkural.ru/ (React)"

echo ""
echo "⏹️ Остановка контейнеров..."
docker-compose down

echo ""
echo "🔨 Пересборка frontend с новой конфигурацией Nginx..."
docker-compose build frontend

echo ""
echo "🚀 Запуск контейнеров..."
docker-compose up -d

echo ""
echo "📊 Проверка статуса контейнеров..."
docker-compose ps

echo ""
echo "🔍 Проверка доступности медиафайлов в Nginx контейнере..."
docker exec -it afk_frontend ls -la /app/media/gallery/ 2>/dev/null || echo "❌ Папка медиафайлов недоступна в Nginx контейнере"

echo ""
echo "✅ Перезапуск завершен!"
echo "🌐 Проверьте:"
echo "  - https://afkural.ru/products (загрузка изображений)"
echo "  - https://afkural.ru/media/gallery/ (прямой доступ к файлам)"
echo ""
echo "📝 Логи для отладки:"
echo "  docker-compose logs frontend -f"
echo "  docker-compose logs backend -f"
