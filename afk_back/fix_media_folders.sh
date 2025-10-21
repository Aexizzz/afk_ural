#!/bin/bash

echo "🔧 Исправление папок медиафайлов..."

# Создаем папки если они не существуют
mkdir -p /app/media/gallery
mkdir -p /app/media

# Устанавливаем правильные права доступа
chmod -R 755 /app/media
chmod 755 /app/media/gallery

# Создаем .gitkeep файл
touch /app/media/gallery/.gitkeep

# Проверяем права доступа
echo "📁 Проверка папок:"
ls -la /app/media/
echo ""
ls -la /app/media/gallery/

# Проверяем права на запись
if [ -w "/app/media/gallery" ]; then
    echo "✅ Права на запись в /app/media/gallery: OK"
else
    echo "❌ Нет прав на запись в /app/media/gallery"
fi

echo "🎉 Папки созданы успешно!"
