import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

export default function EditableGallery({ pageKey, blockKey = 'gallery' }) {
  const { isAuthenticated } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [blockId, setBlockId] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        console.log('Загружаем изображения для страницы:', pageKey)
        const resp = await axios.get(`/gallery-images/?page_key=${encodeURIComponent(pageKey)}`)
        console.log('Ответ сервера:', resp.data)
        
        const list = Array.isArray(resp.data) ? resp.data : (resp.data?.results || [])
        console.log('Найдено изображений:', list.length)
        
        setItems(list.map(it => {
          let imageUrl = it.image?.startsWith('http') ? it.image : `${axios.defaults.baseURL?.replace('/api', '')}${it.image}`
          
          // Принудительно используем HTTPS для предотвращения Mixed Content
          if (imageUrl.startsWith('http://')) {
            imageUrl = imageUrl.replace('http://', 'https://')
            console.log('🔄 Изменен протокол на HTTPS:', imageUrl)
          }
          
          // Декодируем URL если он содержит URL-кодированные символы
          try {
            imageUrl = decodeURIComponent(imageUrl)
          } catch (e) {
            console.warn('Не удалось декодировать URL:', imageUrl)
          }
          
          console.log('Обработка изображения:', { 
            original: it.image, 
            processed: imageUrl, 
            baseURL: axios.defaults.baseURL,
            fullUrl: imageUrl
          })
          
          return { 
            id: it.id, 
            url: imageUrl, 
            caption: it.caption 
          }
        }))
      } catch (error) {
        console.error('Ошибка загрузки изображений:', error)
        console.error('Статус ошибки:', error.response?.status)
        console.error('Данные ошибки:', error.response?.data)
        
        // Показываем сообщение об ошибке вместо пустой галереи
        setItems([{
          id: 'error',
          url: '',
          caption: 'Ошибка загрузки изображений. Проверьте подключение к серверу.'
        }])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [pageKey])

  const uploadFile = async (file) => {
    try {
      const form = new FormData()
      form.append('page_key', pageKey)
      form.append('image', file)
      
      console.log('Загружаем файл:', file.name, 'размер:', file.size)
      
      const resp = await axios.post('/gallery-images/', form, { 
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000 // 30 секунд таймаут
      })
      
      console.log('Файл загружен успешно:', resp.data)
      
      let imageUrl = resp.data.image?.startsWith('http') ? resp.data.image : `${axios.defaults.baseURL?.replace('/api', '')}${resp.data.image}`
      
      // Принудительно используем HTTPS для предотвращения Mixed Content
      if (imageUrl.startsWith('http://')) {
        imageUrl = imageUrl.replace('http://', 'https://')
        console.log('🔄 Изменен протокол на HTTPS:', imageUrl)
      }
      
      // Декодируем URL если он содержит URL-кодированные символы
      try {
        imageUrl = decodeURIComponent(imageUrl)
      } catch (e) {
        console.warn('Не удалось декодировать URL:', imageUrl)
      }
      
      return { 
        id: resp.data.id, 
        url: imageUrl, 
        caption: resp.data.caption 
      }
    } catch (error) {
      console.error('Ошибка загрузки файла:', error)
      console.error('Статус ошибки:', error.response?.status)
      console.error('Данные ошибки:', error.response?.data)
      
      throw new Error(`Ошибка загрузки файла: ${error.response?.data?.detail || error.message}`)
    }
  }

  const onAdd = async () => {
    if (!isAuthenticated) return
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      
      try {
        console.log('Начинаем загрузку файла:', file.name)
        const uploaded = await uploadFile(file)
        const caption = window.prompt('Подпись (необязательно)') || ''
        const next = [...items, { ...uploaded, caption }]
        setItems(next)
        
        if (uploaded.id) {
          try {
            await axios.patch(`/gallery-images/${uploaded.id}/`, { caption })
            console.log('Подпись обновлена')
          } catch (error) {
            console.error('Ошибка обновления подписи:', error)
          }
        }
      } catch (error) {
        console.error('Ошибка при добавлении файла:', error)
        alert(`Ошибка загрузки файла: ${error.message}`)
      }
    }
    input.click()
  }

  const onRemove = async (idx) => {
    const target = items[idx]
    const next = items.filter((_, i) => i !== idx)
    setItems(next)
    if (target?.id) {
      await axios.delete(`/gallery-images/${target.id}/`)
    }
  }

  return (
    <div className="gallery card">
      <div className="gallery-header">
        <h3>Примеры работ</h3>
        {isAuthenticated && (
          <button className="btn" onClick={onAdd} title="Добавить фото">+</button>
        )}
      </div>
      {loading ? (
        <div className="loading" style={{padding:16}}>Загрузка…</div>
      ) : items.length === 0 ? (
        <div className="muted" style={{padding:16}}>Пока нет фото</div>
      ) : items[0]?.id === 'error' ? (
        <div style={{padding:16, backgroundColor:'#fee', border:'1px solid #fcc', borderRadius:'8px', color:'#c33'}}>
          <strong>Ошибка загрузки изображений</strong><br/>
          {items[0].caption}<br/>
          <small>Проверьте подключение к серверу и попробуйте обновить страницу.</small>
        </div>
      ) : (
        <div className="gallery-grid">
          {items.map((it, idx) => (
            <div key={idx} className="gallery-card">
              <div className="gallery-image-wrap">
                <img 
                  src={`${it.url}?t=${Date.now()}`}
                  alt={it.caption || `Фото ${idx+1}`}
                  onError={(e) => {
                    console.error('❌ Ошибка загрузки изображения:', it.url)
                    console.error('❌ Ошибка элемента:', e.target)
                    
                    // Предотвращаем бесконечный цикл
                    if (e.target.dataset.retryAttempted) {
                      console.log('🔄 Повторная попытка уже была, показываем placeholder')
                      e.target.style.display = 'none'
                      const placeholder = document.createElement('div')
                      placeholder.style.cssText = `
                        width: 100%; 
                        height: 100%; 
                        background: #f0f0f0; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        color: #666; 
                        font-size: 12px;
                        text-align: center;
                        padding: 10px;
                      `
                      placeholder.textContent = 'Изображение недоступно'
                      e.target.parentNode.appendChild(placeholder)
                      return
                    }
                    
                    // Пробуем загрузить оригинальный URL без параметров
                    const originalUrl = it.url.split('?')[0]
                    if (e.target.src !== originalUrl) {
                      console.log('🔄 Пробуем загрузить оригинальный URL:', originalUrl)
                      e.target.dataset.retryAttempted = 'true'
                      e.target.src = originalUrl
                    } else {
                      // Показываем placeholder если изображение не загружается
                      e.target.style.display = 'none'
                      const placeholder = document.createElement('div')
                      placeholder.style.cssText = `
                        width: 100%; 
                        height: 100%; 
                        background: #f0f0f0; 
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        color: #666; 
                        font-size: 12px;
                        text-align: center;
                        padding: 10px;
                      `
                      placeholder.textContent = 'Изображение недоступно'
                      e.target.parentNode.appendChild(placeholder)
                    }
                  }}
                  onLoad={() => {
                    console.log('✅ Изображение загружено в DOM:', it.url)
                  }}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                {isAuthenticated && (
                  <button className="gallery-remove" onClick={() => onRemove(idx)} title="Удалить">×</button>
                )}
              </div>
              {it.caption ? <div className="gallery-caption">{it.caption}</div> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


