# 🔒 Исправление проблемы Mixed Content (HTTPS)

## Проблема
Ошибка `Mixed Content: The page at 'https://afkural.ru/products' was loaded over HTTPS, but requested an insecure resource 'http://afkural.ru/media/gallery/...'`

## ✅ Исправления внесены

1. **EditableGallery.jsx** - автоматически заменяет HTTP на HTTPS
2. **AuthContext.jsx** - принудительно использует HTTPS для API
3. **Contacts.jsx** - обновлен для использования HTTPS
4. **ImageUrlTest.jsx** - тестирует HTTPS URL

## 🔍 Что изменилось

### Автоматическая замена HTTP на HTTPS
```javascript
// Принудительно используем HTTPS для предотвращения Mixed Content
if (imageUrl.startsWith('http://')) {
  imageUrl = imageUrl.replace('http://', 'https://')
  console.log('🔄 Изменен протокол на HTTPS:', imageUrl)
}
```

### Обновление baseURL
```javascript
// Принудительно используем HTTPS для предотвращения Mixed Content
if (axios.defaults.baseURL?.startsWith('http://')) {
  axios.defaults.baseURL = axios.defaults.baseURL.replace('http://', 'https://');
  console.log('🔄 Изменен baseURL на HTTPS:', axios.defaults.baseURL);
}
```

## 🚀 Проверка исправления

### 1. Обновите страницу
- Откройте страницу "Продукция"
- Проверьте консоль браузера

### 2. Ожидаемые логи в консоли:
```
🔄 Изменен baseURL на HTTPS: https://afkural.ru/api
🔄 Изменен протокол на HTTPS: https://afkural.ru/media/gallery/бердик_bnsawFY.jpg
✅ Изображение загружено в DOM: https://afkural.ru/media/gallery/бердик_bnsawFY.jpg
```

### 3. Тест URL изображения
- Нажмите "Тест текущего изображения" в зеленом блоке
- Должен показать "Изображение доступно" с HTTPS URL

### 4. Проверка в Network tab
- Откройте DevTools → Network
- Обновите страницу
- Все запросы к изображениям должны идти по HTTPS
- Не должно быть ошибок Mixed Content

## 📋 Технические детали

### Проблема Mixed Content
- Браузеры блокируют HTTP ресурсы на HTTPS страницах
- Это мера безопасности для защиты пользователей
- Решение: использовать HTTPS для всех ресурсов

### Автоматическое исправление
- Все HTTP URL автоматически заменяются на HTTPS
- Работает для изображений, API запросов и тестов
- Логирование изменений для отладки

## 🎯 Ожидаемый результат

После обновления:
- ✅ Все изображения загружаются по HTTPS
- ✅ Нет ошибок Mixed Content в консоли
- ✅ Изображения отображаются в галерее
- ✅ Тест URL показывает "Изображение доступно"

## 🔧 Дополнительные проверки

### Проверка SSL сертификата
```bash
# Проверьте SSL сертификат для медиафайлов
curl -I https://afkural.ru/media/gallery/бердик_bnsawFY.jpg
# Должен вернуть HTTP 200 без ошибок SSL
```

### Проверка в браузере
- Откройте `https://afkural.ru/media/gallery/бердик_bnsawFY.jpg`
- Должно отобразиться изображение без предупреждений безопасности

Проблема Mixed Content должна быть полностью решена! 🎉
