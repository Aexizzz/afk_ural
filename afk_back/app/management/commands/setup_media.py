from django.core.management.base import BaseCommand
from django.conf import settings
from pathlib import Path
import os

class Command(BaseCommand):
    help = 'Создает необходимые папки для медиафайлов'

    def handle(self, *args, **options):
        # Получаем путь к MEDIA_ROOT
        media_root = Path(settings.MEDIA_ROOT)
        self.stdout.write(f"MEDIA_ROOT: {media_root}")
        
        # Создаем основную папку media, если не существует
        media_root.mkdir(parents=True, exist_ok=True)
        self.stdout.write(self.style.SUCCESS(f"✅ Создана папка: {media_root}"))
        
        # Создаем папку gallery
        gallery_dir = media_root / 'gallery'
        gallery_dir.mkdir(parents=True, exist_ok=True)
        self.stdout.write(self.style.SUCCESS(f"✅ Создана папка: {gallery_dir}"))
        
        # Создаем .gitkeep файл, чтобы папка не была пустой в git
        gitkeep_file = gallery_dir / '.gitkeep'
        if not gitkeep_file.exists():
            gitkeep_file.write_text('')
            self.stdout.write(self.style.SUCCESS(f"✅ Создан файл: {gitkeep_file}"))
        
        # Проверяем права доступа
        if os.access(media_root, os.W_OK):
            self.stdout.write(self.style.SUCCESS("✅ Права на запись в MEDIA_ROOT: OK"))
        else:
            self.stdout.write(self.style.ERROR("❌ Нет прав на запись в MEDIA_ROOT"))
        
        if os.access(gallery_dir, os.W_OK):
            self.stdout.write(self.style.SUCCESS("✅ Права на запись в gallery/: OK"))
        else:
            self.stdout.write(self.style.ERROR("❌ Нет прав на запись в gallery/"))
        
        self.stdout.write(self.style.SUCCESS("\n🎉 Все папки созданы успешно!"))
