# 🔧 Исправление проблемы с медиафайлами

## Проблема
- Изображения загружаются на сервер, но не отображаются
- HEAD запросы возвращают 200 OK, но изображения не загружаются
- Mixed Content ошибки для старых изображений

## ✅ Исправления

### 1. Обновлена конфигурация Nginx
- Добавлен блок `location /media/` в `afk_front/nginx-test.conf`
- Настроен прокси для медиафайлов на backend:8001
- Добавлены заголовки для кэширования и CORS

### 2. Исправлен EditableGallery.jsx
- Принудительное использование HTTPS для всех URL
- Декодирование URL-кодированных символов
- Предотвращение бесконечных циклов загрузки
- Показ placeholder при ошибках

## 🚀 Перезапуск сервера

```bash
# Остановка
docker-compose down

# Пересборка frontend
docker-compose build frontend

# Запуск
docker-compose up -d

# Проверка
docker-compose ps
```

## 🧪 Тестирование

1. Откройте https://afkural.ru/products
2. Попробуйте загрузить новое изображение
3. Проверьте, что изображения отображаются
4. Убедитесь, что нет Mixed Content ошибок

## 📋 Логи для отладки

```bash
# Логи frontend
docker-compose logs frontend

# Логи backend
docker-compose logs backend

# Проверка медиафайлов в контейнере
docker exec -it afk_backend ls -la /app/media/gallery/
```
