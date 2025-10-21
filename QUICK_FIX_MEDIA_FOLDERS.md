# 🚨 СРОЧНОЕ ИСПРАВЛЕНИЕ: Папки медиафайлов

## Проблема
Сервер все еще возвращает ошибку 500: `FileNotFoundError: [Errno 2] No such file or directory: '/app/media/gallery'`

## ⚡ БЫСТРОЕ РЕШЕНИЕ

### Вариант 1: Ручное создание папок (самый быстрый)
```bash
# Подключитесь к контейнеру
docker exec -it afk_ural-afk_back-1 bash

# Создайте папки вручную
mkdir -p /app/media/gallery
chmod -R 755 /app/media
touch /app/media/gallery/.gitkeep

# Проверьте результат
ls -la /app/media/
ls -la /app/media/gallery/

# Перезапустите Django
python manage.py runserver 0.0.0.0:8000
```

### Вариант 2: Пересборка контейнера
```bash
# Остановите контейнеры
docker-compose down

# Пересоберите бэкенд с новыми настройками
docker-compose build afk_back

# Запустите заново
docker-compose up -d
```

### Вариант 3: Использование скрипта исправления
```bash
# Подключитесь к контейнеру
docker exec -it afk_ural-afk_back-1 bash

# Запустите скрипт исправления
/app/fix_media_folders.sh

# Перезапустите сервер
python manage.py runserver 0.0.0.0:8000
```

## 🔍 Проверка исправления

### 1. Проверьте папки в контейнере:
```bash
docker exec -it afk_ural-afk_back-1 ls -la /app/media/
# Должна быть папка gallery/

docker exec -it afk_ural-afk_back-1 ls -la /app/media/gallery/
# Должны быть права на запись
```

### 2. Проверьте права доступа:
```bash
docker exec -it afk_ural-afk_back-1 touch /app/media/gallery/test.txt
# Должно работать без ошибок

docker exec -it afk_ural-afk_back-1 rm /app/media/gallery/test.txt
```

### 3. Проверьте загрузку изображений:
- Откройте страницу "Продукция"
- Попробуйте загрузить изображение
- Должно работать без ошибки 500

## 📋 Что было обновлено

### Dockerfile
- Добавлен скрипт автоматического создания папок
- Улучшены права доступа
- Добавлено логирование процесса

### Скрипт исправления
```bash
#!/bin/bash
mkdir -p /app/media/gallery
chmod -R 755 /app/media
touch /app/media/gallery/.gitkeep
echo "Папки созданы: $(ls -la /app/media/)"
```

## 🎯 Ожидаемый результат

После исправления:
- ✅ Папка `/app/media/gallery/` существует
- ✅ Права на запись установлены
- ✅ Загрузка изображений работает без ошибки 500
- ✅ Изображения отображаются в галерее

## 🚨 Если проблема остается

Если после всех исправлений проблема остается:

1. **Проверьте логи контейнера:**
   ```bash
   docker logs afk_ural-afk_back-1
   ```

2. **Проверьте права пользователя:**
   ```bash
   docker exec -it afk_ural-afk_back-1 whoami
   docker exec -it afk_ural-afk_back-1 id
   ```

3. **Пересоздайте контейнер полностью:**
   ```bash
   docker-compose down -v
   docker-compose up -d --build
   ```

Проблема должна быть решена! 🎉
