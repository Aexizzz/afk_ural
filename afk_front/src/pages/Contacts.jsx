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
      // Отправляем заявку на бэкенд (бэкенд сам отправит email на office@afkural.ru)
      const response = await axios.post('/contact-requests/', form)
      
      setSuccess('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.')
      setForm({ full_name: '', phone: '', email: '', comment: '' })
    } catch (err) {
      console.error('Ошибка отправки заявки:', err)
      
      let errMsg = 'Ошибка при отправке. Проверьте данные и повторите попытку.'
      
      if (err.response?.data) {
        // Обрабатываем ошибки валидации Django
        if (typeof err.response.data === 'object') {
          const errors = []
          for (const key in err.response.data) {
            if (Array.isArray(err.response.data[key])) {
              errors.push(...err.response.data[key])
            } else {
              errors.push(err.response.data[key])
            }
          }
          errMsg = errors.join(', ')
        } else if (typeof err.response.data === 'string') {
          errMsg = err.response.data
        } else if (err.response.data.detail) {
          errMsg = err.response.data.detail
        }
      } else if (err.request) {
        errMsg = 'Не удалось подключиться к серверу. Проверьте интернет-соединение.'
      }
      
      setError(errMsg)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <StructuredData data={ContactPageData} />
      <StructuredData data={breadcrumbData} />
      <section className="contacts">
        <Reveal as="div" className="contacts-hero">
          <div className="container">
            <Editable 
              pageKey="contacts" 
              blockKey="title" 
              tag="h1" 
              className="contacts-title" 
              placeholder="Контакты" 
            />
            <Editable 
              pageKey="contacts" 
              blockKey="subtitle" 
              tag="p" 
              className="contacts-subtitle" 
              placeholder="Будем рады обсудить вашу задачу" 
            />
          </div>
        </Reveal>

        <div className="container">
          <div className="grid">
            <Reveal className="card info" y={18}>
              <Editable 
                pageKey="contacts" 
                blockKey="info_title" 
                tag="h2" 
                placeholder="Свяжитесь с нами" 
              />
              <ul className="details">
                <li>
                  <strong>Адрес:</strong>{' '}
                  <Editable 
                    pageKey="contacts" 
                    blockKey="addr" 
                    tag="span" 
                    placeholder="г. Челябинск, ул. Строительная, 3" 
                  />
                </li>
                <li>
                  <strong>Телефон:</strong>{' '}
                  <a href="tel:+79823363480">
                    <Editable 
                      pageKey="contacts" 
                      blockKey="phone" 
                      tag="span" 
                      placeholder="+7 982 336 3480" 
                    />
                  </a>
                </li>
                <li>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:office@afkural.ru">
                    <Editable 
                      pageKey="contacts" 
                      blockKey="email" 
                      tag="span" 
                      placeholder="office@afkural.ru" 
                    />
                  </a>
                </li>
                <li>
                  <strong>Режим работы:</strong>{' '}
                  <Editable 
                    pageKey="contacts" 
                    blockKey="work_hours" 
                    tag="span" 
                    placeholder="Пн-Пт: 9:00-18:00" 
                  />
                </li>
              </ul>
            </Reveal>

            <Reveal className="card form-card" y={18}>
              <Editable 
                pageKey="contacts" 
                blockKey="form_title" 
                tag="h2" 
                placeholder="Оставить заявку" 
              />
              <Editable 
                pageKey="contacts" 
                blockKey="form_subtitle" 
                tag="p" 
                className="form-subtitle" 
                placeholder="Заполните форму и мы свяжемся с вами в течение 30 минут" 
              />
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row">
                  <div className="field">
                    <label htmlFor="full_name">
                      <Editable 
                        pageKey="contacts" 
                        blockKey="label_fullname" 
                        tag="span" 
                        placeholder="ФИО *" 
                      />
                    </label>
                    <input 
                      id="full_name" 
                      name="full_name" 
                      value={form.full_name} 
                      onChange={handleChange} 
                      required 
                      disabled={sending}
                      placeholder="Иванов Иван Иванович"
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">
                      <Editable 
                        pageKey="contacts" 
                        blockKey="label_phone" 
                        tag="span" 
                        placeholder="Телефон *" 
                      />
                    </label>
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
                  <label htmlFor="email">
                    <Editable 
                      pageKey="contacts" 
                      blockKey="label_email" 
                      tag="span" 
                      placeholder="Электронная почта *" 
                    />
                  </label>
                  <input 
                    id="email" 
                    type="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                    disabled={sending} 
                    placeholder="example@mail.ru" 
                  />
                </div>

                <div className="field">
                  <label htmlFor="comment">
                    <Editable 
                      pageKey="contacts" 
                      blockKey="label_comment" 
                      tag="span" 
                      placeholder="Комментарий" 
                    />
                  </label>
                  <textarea 
                    id="comment" 
                    name="comment" 
                    value={form.comment} 
                    onChange={handleChange} 
                    rows={4} 
                    disabled={sending} 
                    placeholder="Кратко опишите задачу, например: 'Нужна лазерная резка металла толщиной 3 мм'"
                  />
                </div>

                <button 
                  type="submit" 
                  className={`btn ${sending ? 'btn-loading' : ''}`} 
                  disabled={sending || phoneError}
                >
                  {sending ? (
                    <>
                      <span className="spinner"></span>
                      Отправка...
                    </>
                  ) : (
                    'Отправить заявку'
                  )}
                </button>

                <p className="policy-note">
                  <Editable 
                    pageKey="contacts" 
                    blockKey="policy_text" 
                    tag="span" 
                    placeholder="Отправляя заявку, вы соглашаетесь с политикой конфиденциальности" 
                  />
                  {' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer">
                    <Editable 
                      pageKey="contacts" 
                      blockKey="policy_link" 
                      tag="span" 
                      placeholder="политикой конфиденциальности" 
                    />
                  </a>
                </p>

                {success && (
                  <div className="alert success">
                    <div className="alert-icon">✓</div>
                    <div className="alert-content">
                      <strong>Успешно!</strong>
                      <br />
                      {success}
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="alert error">
                    <div className="alert-icon">⚠</div>
                    <div className="alert-content">
                      <strong>Ошибка!</strong>
                      <br />
                      {error}
                    </div>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}