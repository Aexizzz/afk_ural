#!/bin/bash

echo "🔍 Диагностика проблемы с медиафайлами..."

echo "📊 Статус контейнеров:"
docker-compose ps

echo ""
echo "📁 Содержимое папки медиафайлов:"
docker exec -it afk_backend ls -la /app/media/
docker exec -it afk_backend ls -la /app/media/gallery/

echo ""
echo "🔐 Права доступа к папкам:"
docker exec -it afk_backend ls -ld /app/media/
docker exec -it afk_backend ls -ld /app/media/gallery/

echo ""
echo "📝 Логи backend (последние 20 строк):"
docker-compose logs backend --tail=20

echo ""
echo "🌐 Тест доступности медиафайлов:"
echo "Проверяем существующие файлы:"
docker exec -it afk_backend ls -la /app/media/gallery/ | grep -E "\.(jpg|png|jpeg)$"

echo ""
echo "🔧 Перезапуск backend с новыми настройками:"
docker-compose restart backend

echo ""
echo "✅ Диагностика завершена!"
echo "🌐 Попробуйте загрузить новое изображение и проверьте логи:"
echo "docker-compose logs backend -f"
