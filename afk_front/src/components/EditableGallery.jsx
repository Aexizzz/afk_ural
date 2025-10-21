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
        const resp = await axios.get(`/gallery-images/?page_key=${encodeURIComponent(pageKey)}`)
        const list = Array.isArray(resp.data) ? resp.data : (resp.data?.results || [])
        setItems(list.map(it => {
          const imageUrl = it.image?.startsWith('http') ? it.image : `${axios.defaults.baseURL?.replace('/api', '')}${it.image}`
          console.log('Обработка изображения:', { 
            original: it.image, 
            processed: imageUrl, 
            baseURL: axios.defaults.baseURL,
            fullUrl: imageUrl
          })
          
          // Тестируем загрузку изображения
          const testImg = new Image()
          testImg.onload = () => console.log('✅ Изображение доступно:', imageUrl)
          testImg.onerror = () => console.error('❌ Ошибка загрузки изображения:', imageUrl)
          testImg.src = imageUrl
          
          return { 
            id: it.id, 
            url: imageUrl, 
            caption: it.caption 
          }
        }))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [pageKey])

  const uploadFile = async (file) => {
    const form = new FormData()
    form.append('page_key', pageKey)
    form.append('image', file)
    const resp = await axios.post('/gallery-images/', form, { headers: { 'Content-Type': 'multipart/form-data' }})
    return { 
      id: resp.data.id, 
      url: resp.data.image?.startsWith('http') ? resp.data.image : `${axios.defaults.baseURL?.replace('/api', '')}${resp.data.image}`, 
      caption: resp.data.caption 
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
      const uploaded = await uploadFile(file)
      const caption = window.prompt('Подпись (необязательно)') || ''
      const next = [...items, { ...uploaded, caption }]
      setItems(next)
      if (uploaded.id) {
        await axios.patch(`/gallery-images/${uploaded.id}/`, { caption })
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
                    e.target.style.display = 'none'
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


