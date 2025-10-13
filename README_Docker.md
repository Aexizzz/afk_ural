# Развертывание проекта AFK Ural с Docker

Этот проект состоит из Django backend и React frontend, упакованных в Docker контейнеры.

## Структура проекта

```
afk_ural/
├── backend/                 # Django API
│   ├── Dockerfile
│   ├── requirements.txt
│   └── afk_back/
├── frontend/               # React приложение
│   ├── Dockerfile
│   ├── nginx.conf
│   └── afk_front/
├── nginx/                  # Nginx конфигурация
│   └── nginx.conf
├── docker-compose.yml      # Оркестрация сервисов
└── .dockerignore
```

## Быстрый старт

### 1. Клонирование и подготовка

```bash
# Клонируйте репозиторий
git clone <your-repo-url>
cd afk_ural

# Создайте директорию для логов
mkdir -p backend/logs
```

### 2. Запуск с Docker Compose

```bash
# Сборка и запуск всех сервисов
docker-compose up --build

# Или в фоновом режиме
docker-compose up -d --build
```

### 3. Доступ к приложению

- **Frontend (React)**: http://localhost:80
- **Backend API**: http://localhost:8000
- **С Nginx прокси**: http://localhost:8080

## Управление сервисами

### Остановка
```bash
docker-compose down
```

### Перезапуск
```bash
docker-compose restart
```

### Просмотр логов
```bash
# Все сервисы
docker-compose logs

# Конкретный сервис
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx
```

### Обновление кода
```bash
# Пересборка и перезапуск
docker-compose up --build
```

## Отдельные сервисы

### Только Backend
```bash
cd backend
docker build -t afk_backend .
docker run -p 8000:8000 afk_backend
```

### Только Frontend
```bash
cd frontend
docker build -t afk_frontend .
docker run -p 80:80 afk_frontend
```

## Настройка для продакшена

### 1. Переменные окружения

Создайте файл `.env` в корне проекта:

```env
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
DEBUG=False
```

### 2. Обновите docker-compose.yml

```yaml
services:
  backend:
    environment:
      - SECRET_KEY=${SECRET_KEY}
      - ALLOWED_HOSTS=${ALLOWED_HOSTS}
      - DEBUG=${DEBUG}
```

### 3. Настройка базы данных

Для продакшена рекомендуется использовать PostgreSQL:

```yaml
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: afk_ural
      POSTGRES_USER: afk_user
      POSTGRES_PASSWORD: your_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://afk_user:your_password@db:5432/afk_ural
```

## Полезные команды

### Очистка
```bash
# Удаление контейнеров и сетей
docker-compose down

# Удаление образов
docker-compose down --rmi all

# Полная очистка (включая volumes)
docker-compose down -v --rmi all
```

### Отладка
```bash
# Вход в контейнер
docker-compose exec backend bash
docker-compose exec frontend sh

# Выполнение команд Django
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser
docker-compose exec backend python manage.py collectstatic
```

## Мониторинг

### Статус сервисов
```bash
docker-compose ps
```

### Использование ресурсов
```bash
docker stats
```

## Безопасность

1. **Смените SECRET_KEY** в продакшене
2. **Настройте ALLOWED_HOSTS** для вашего домена
3. **Используйте HTTPS** в продакшене
4. **Настройте файрвол** для ограничения доступа к портам
5. **Регулярно обновляйте** базовые образы

## Troubleshooting

### Проблемы с портами
```bash
# Проверка занятых портов
netstat -tulpn | grep :80
netstat -tulpn | grep :8000

# Остановка процессов
sudo fuser -k 80/tcp
sudo fuser -k 8000/tcp
```

### Проблемы с правами доступа
```bash
# Исправление прав на медиа файлы
sudo chown -R 1000:1000 backend/media
```

### Проблемы с базой данных
```bash
# Сброс миграций
docker-compose exec backend python manage.py migrate --fake-initial
```
