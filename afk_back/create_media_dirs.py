#!/usr/bin/env python3
"""
Скрипт для создания необходимых папок для медиафайлов
"""
import os
import sys
from pathlib import Path

# Добавляем путь к проекту Django
sys.path.append('/app')

# Настройки Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'afk_back.settings')

import django
django.setup()

from django.conf import settings

def create_media_directories():
    """Создает необходимые папки для медиафайлов"""
    
    # Получаем путь к MEDIA_ROOT
    media_root = Path(settings.MEDIA_ROOT)
    print(f"MEDIA_ROOT: {media_root}")
    
    # Создаем основную папку media, если не существует
    media_root.mkdir(parents=True, exist_ok=True)
    print(f"✅ Создана папка: {media_root}")
    
    # Создаем папку gallery
    gallery_dir = media_root / 'gallery'
    gallery_dir.mkdir(parents=True, exist_ok=True)
    print(f"✅ Создана папка: {gallery_dir}")
    
    # Создаем .gitkeep файл, чтобы папка не была пустой в git
    gitkeep_file = gallery_dir / '.gitkeep'
    if not gitkeep_file.exists():
        gitkeep_file.write_text('')
        print(f"✅ Создан файл: {gitkeep_file}")
    
    # Проверяем права доступа
    if os.access(media_root, os.W_OK):
        print("✅ Права на запись в MEDIA_ROOT: OK")
    else:
        print("❌ Нет прав на запись в MEDIA_ROOT")
    
    if os.access(gallery_dir, os.W_OK):
        print("✅ Права на запись в gallery/: OK")
    else:
        print("❌ Нет прав на запись в gallery/")
    
    print("\n🎉 Все папки созданы успешно!")

if __name__ == '__main__':
    create_media_directories()
