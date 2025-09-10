import { useState } from 'react'
import axios from 'axios'
import './Contacts.css'
import Reveal from '../components/Reveal'

export default function Contacts() {
  const [form, setForm] = useState({ full_name: '', phone: '', email: '', comment: '' })
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // базовый URL уже настроен в AuthContext, но на странице контактов мы не требуем авторизации
  if (!axios.defaults.baseURL) {
    axios.defaults.baseURL = 'http://localhost:8000/api'
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setSuccess('')
    setError('')

    try {
      await axios.post('/contact-requests/', form)
      setSuccess('Заявка успешно отправлена!')
      setForm({ full_name: '', phone: '', email: '', comment: '' })
    } catch (err) {
      const errMsg = err.response?.data?.detail || 'Ошибка при отправке. Проверьте данные и повторите попытку.'
      setError(errMsg)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="contacts">
      <Reveal as="div" className="contacts-hero">
        <div className="container">
          <h1 className="contacts-title">Контакты</h1>
          <p className="contacts-subtitle">Будем рады обсудить вашу задачу и предложить решение</p>
        </div>
      </Reveal>

      <div className="container">
        <div className="grid">
          <Reveal className="card info" y={18}>
            <h2>Свяжитесь с нами</h2>
            <ul className="details">
              <li><strong>Адрес:</strong> г.Челябинск, ул. Строительная, 3</li>
              <li><strong>Телефон:</strong> <a href="tel:+79823363480">+7 982 336 3480</a></li>
              <li><strong>Email:</strong> <a href="mailto:office@afkural.ru">office@afkural.ru</a></li>
            </ul>
          </Reveal>

          <Reveal className="card form-card" y={18}>
            <h2>Оставить заявку</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="row">
                <div className="field">
                  <label htmlFor="full_name">ФИО *</label>
                  <input id="full_name" name="full_name" value={form.full_name} onChange={handleChange} required disabled={sending} />
                </div>
                <div className="field">
                  <label htmlFor="phone">Телефон *</label>
                  <input id="phone" name="phone" value={form.phone} onChange={handleChange} required disabled={sending} placeholder="+7 900 000 00 00" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="email">Электронная почта *</label>
                <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required disabled={sending} placeholder="example@mail.ru" />
              </div>

              <div className="field">
                <label htmlFor="comment">Комментарий</label>
                <textarea id="comment" name="comment" value={form.comment} onChange={handleChange} rows={4} disabled={sending} placeholder="Кратко опишите задачу" />
              </div>

              <button type="submit" className="btn" disabled={sending}>
                {sending ? 'Отправка...' : 'Отправить заявку'}
              </button>

              {success && <div className="alert success">{success}</div>}
              {error && <div className="alert error">{error}</div>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
} 