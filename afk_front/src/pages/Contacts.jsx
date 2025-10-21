import { useState } from 'react'
import axios from 'axios'
import './Contacts.css'
import Reveal from '../components/Reveal'
import Editable from '../components/Editable'
import { useSEO } from '../hooks/useSEO'
import StructuredData, { ContactPageData, BreadcrumbData } from '../components/StructuredData'

export default function Contacts() {
  // SEO настройки для страницы контактов
  useSEO({
    title: 'Контакты — ООО АФК «Урал» | Свяжитесь с нами для заказа металлообработки',
    description: 'Свяжитесь с ООО АФК «Урал» для заказа услуг металлообработки. Лазерная резка, гибка, сварка, окрашивание в Екатеринбурге. Телефон, email, форма обратной связи.',
    keywords: 'контакты, связаться, заказ, металлообработка, лазерная резка, гибка, сварка, окрашивание, Екатеринбург, АФК Урал, телефон, email',
    canonical: 'https://afk-ural.ru/contacts',
    ogImage: 'https://afk-ural.ru/src/assets/logo_afk.jpg'
  })

  const breadcrumbData = BreadcrumbData([
    { name: 'Главная', url: 'https://afk-ural.ru/' },
    { name: 'Контакты', url: 'https://afk-ural.ru/contacts' }
  ])
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', comment: '' })
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  // Базовый URL настраивается из переменных окружения Vite
  if (!axios.defaults.baseURL) {
    let apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://afkural.ru/api'
    
    // Принудительно используем HTTPS для предотвращения Mixed Content
    if (apiBaseUrl.startsWith('http://')) {
      apiBaseUrl = apiBaseUrl.replace('http://', 'https://')
      console.log('🔄 Изменен baseURL на HTTPS:', apiBaseUrl)
    }
    
    axios.defaults.baseURL = apiBaseUrl
  }

  // Функция валидации телефона
  const validatePhone = (phone) => {
    // Удаляем все нецифровые символы
    const cleaned = phone.replace(/\D/g, '')
    
    // Проверяем формат: начинается с 8, затем 10 цифр
    const phoneRegex = /^8\d{10}$/
    
    if (!phoneRegex.test(cleaned)) {
      return 'Телефон должен начинаться с 8 и содержать 10 цифр после этого (всего 11 цифр)'
    }
    
    return ''
  }

  // Функция отправки email через EmailJS или аналогичный сервис
  const sendEmailNotification = async (formData) => {
    // Вариант 1: Использование EmailJS (нужно установить npm install emailjs-com)
    try {
      // Если используете EmailJS, раскомментируйте этот код
      /*
      const emailjs = await import('emailjs-com')
      const templateParams = {
        from_name: formData.full_name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.comment || 'Не указано',
        to_email: 'office@afkural.ru',
        subject: `Новая заявка с сайта от ${formData.full_name}`
      }

      await emailjs.send(
        'YOUR_SERVICE_ID', // Замените на ваш Service ID
        'YOUR_TEMPLATE_ID', // Замените на ваш Template ID
        templateParams,
        'YOUR_PUBLIC_KEY' // Замените на ваш Public Key
      )
      */

      // Вариант 2: Отправка через собственный API endpoint
      await axios.post('/send-email/', {
        to: 'ammelihov@gmail.com',
        subject: `Новая заявка с сайта от ${formData.full_name}`,
        html: `
          <h2>Новая заявка с сайта АФК Урал</h2>
          <p><strong>ФИО:</strong> ${formData.full_name}</p>
          <p><strong>Телефон:</strong> ${formData.phone}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Комментарий:</strong> ${formData.comment || 'Не указан'}</p>
          <p><strong>Дата:</strong> ${new Date().toLocaleString('ru-RU')}</p>
        `
      })
    } catch (emailError) {
      console.warn('Не удалось отправить email уведомление:', emailError)
      // Не прерываем основной поток, просто логируем ошибку
    }
  }

  // Вариант 3: Отправка через Formspree или аналогичный сервис
  const sendFormspreeNotification = async (formData) => {
    try {
      await axios.post('https://formspree.io/f/your-form-id', {
        name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        message: formData.comment,
        _subject: `Новая заявка с сайта от ${formData.full_name}`
      })
    } catch (formspreeError) {
      console.warn('Не удалось отправить уведомление через Formspree:', formspreeError)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    // Валидация телефона в реальном времени
    if (name === 'phone') {
      if (value.trim() === '') {
        setPhoneError('')
      } else {
        setPhoneError(validatePhone(value))
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Проверяем валидность телефона перед отправкой
    const phoneValidationError = validatePhone(form.phone)
    if (phoneValidationError) {
      setPhoneError(phoneValidationError)
      return
    }

    setSending(true)
    setSuccess('')
    setError('')
    setPhoneError('')

    try {
      // 1. Отправляем заявку на бэкенд
      await axios.post('/contact-requests/', form)
      
      // 2. Отправляем уведомление на email
      await sendEmailNotification(form)
      
      // 3. Дополнительно можно отправить через Formspree (раскомментируйте если нужно)
      // await sendFormspreeNotification(form)

      setSuccess('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.')
      setForm({ full_name: '', phone: '', email: '', comment: '' })
    } catch (err) {
      console.error('Ошибка отправки заявки:', err)
      const errMsg = err.response?.data?.detail || 'Ошибка при отправке. Проверьте данные и повторите попытку.'
      setError(errMsg)
    } finally {
      setSending(false)
    }
  }

  // Функция для форматирования телефона
  const formatPhone = (value) => {
    // Удаляем все нецифровые символы
    const cleaned = value.replace(/\D/g, '')
    
    // Если начинается не с 8, заменяем на 8
    let processed = cleaned
    if (cleaned.length > 0 && !cleaned.startsWith('8')) {
      processed = '8' + cleaned.replace(/^8/, '').slice(0, 10)
    }
    
    // Форматируем номер по маске
    if (processed.length === 0) return ''
    if (processed.length === 1) return processed
    if (processed.length <= 4) return `8 (${processed.slice(1, 4)}`
    if (processed.length <= 7) return `8 (${processed.slice(1, 4)}) ${processed.slice(4, 7)}`
    if (processed.length <= 9) return `8 (${processed.slice(1, 4)}) ${processed.slice(4, 7)}-${processed.slice(7, 9)}`
    return `8 (${processed.slice(1, 4)}) ${processed.slice(4, 7)}-${processed.slice(7, 9)}-${processed.slice(9, 11)}`
  }

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhone(e.target.value)
    setForm({ ...form, phone: formattedPhone })
    
    // Валидация в реальном времени
    if (formattedPhone.trim() === '') {
      setPhoneError('')
    } else {
      setPhoneError(validatePhone(formattedPhone))
    }
  }

  return (
    <>
      <StructuredData data={ContactPageData} />
      <StructuredData data={breadcrumbData} />
      <section className="contacts">
      <Reveal as="div" className="contacts-hero">
        <div className="container">
          <Editable pageKey="contacts" blockKey="title" tag="h1" className="contacts-title" placeholder="Контакты" />
          <Editable pageKey="contacts" blockKey="subtitle" tag="p" className="contacts-subtitle" placeholder="Будем рады обсудить вашу задачу" />
        </div>
      </Reveal>

      <div className="container">
        <div className="grid">
          <Reveal className="card info" y={18}>
            <Editable pageKey="contacts" blockKey="info_title" tag="h2" placeholder="Свяжитесь с нами" />
            <ul className="details">
              <li><strong>Адрес:</strong> <Editable pageKey="contacts" blockKey="addr" tag="span" placeholder="г. Челябинск, ул. Строительная, 3" /></li>
              <li><strong>Телефон:</strong> <a href="tel:+79823363480"><Editable pageKey="contacts" blockKey="phone" tag="span" placeholder="+7 982 336 3480" /></a></li>
              <li><strong>Email:</strong> <a href="mailto:office@afkural.ru"><Editable pageKey="contacts" blockKey="email" tag="span" placeholder="office@afkural.ru" /></a></li>
            </ul>
          </Reveal>

          <Reveal className="card form-card" y={18}>
            <Editable pageKey="contacts" blockKey="form_title" tag="h2" placeholder="Оставить заявку" />
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="row">
                <div className="field">
                  <label htmlFor="full_name"><Editable pageKey="contacts" blockKey="label_fullname" tag="span" placeholder="ФИО *" /></label>
                  <input id="full_name" name="full_name" value={form.full_name} onChange={handleChange} required disabled={sending} />
                </div>
                <div className="field">
                  <label htmlFor="phone"><Editable pageKey="contacts" blockKey="label_phone" tag="span" placeholder="Телефон *" /></label>
                  <input 
                    id="phone" 
                    name="phone" 
                    value={form.phone} 
                    onChange={handlePhoneChange} 
                    required 
                    disabled={sending} 
                    placeholder="8 900 000 00 00" 
                  />
                  {phoneError && <div className="field-error">{phoneError}</div>}
                </div>
              </div>

              <div className="field">
                <label htmlFor="email"><Editable pageKey="contacts" blockKey="label_email" tag="span" placeholder="Электронная почта *" /></label>
                <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required disabled={sending} placeholder="example@mail.ru" />
              </div>

              <div className="field">
                <label htmlFor="comment"><Editable pageKey="contacts" blockKey="label_comment" tag="span" placeholder="Комментарий" /></label>
                <textarea id="comment" name="comment" value={form.comment} onChange={handleChange} rows={4} disabled={sending} placeholder="Кратко опишите задачу" />
              </div>

              <button type="submit" className="btn" disabled={sending || phoneError}>
                {sending ? 'Отправка...' : 'Отправить заявку'}
              </button>

              <p className="policy-note" style={{fontSize: 12, color: '#6b7280', marginTop: 8}}>
                Отправляя заявку, вы соглашаетесь с <a href="/privacy" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</a>.
              </p>

              {success && <div className="alert success">{success}</div>}
              {error && <div className="alert error">{error}</div>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
    </>
  )
}