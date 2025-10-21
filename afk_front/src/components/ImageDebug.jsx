import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ImageDebug({ pageKey }) {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true)
        console.log('Загружаем изображения для страницы:', pageKey)
        console.log('Base URL:', axios.defaults.baseURL)
        
        const resp = await axios.get(`/gallery-images/?page_key=${encodeURIComponent(pageKey)}`)
        console.log('Ответ сервера:', resp.data)
        
        const list = Array.isArray(resp.data) ? resp.data : (resp.data?.results || [])
        console.log('Список изображений:', list)
        
        setImages(list)
      } catch (error) {
        console.error('Ошибка загрузки изображений:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadImages()
  }, [pageKey])

  if (loading) return <div>Загрузка...</div>

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px 0' }}>
      <h3>Отладка изображений для страницы: {pageKey}</h3>
      <p>Base URL: {axios.defaults.baseURL}</p>
      <p>Количество изображений: {images.length}</p>
      
      {images.map((img, idx) => (
        <div key={idx} style={{ margin: '10px 0', padding: '10px', border: '1px solid #eee' }}>
          <p><strong>ID:</strong> {img.id}</p>
          <p><strong>Оригинальный URL:</strong> {img.image}</p>
          <p><strong>Обработанный URL:</strong> {img.image?.startsWith('http') ? img.image : `${axios.defaults.baseURL?.replace('/api', '')}${img.image}`}</p>
          <p><strong>Подпись:</strong> {img.caption || 'Нет подписи'}</p>
          <img 
            src={img.image?.startsWith('http') ? img.image : `${axios.defaults.baseURL?.replace('/api', '')}${img.image}`}
            alt={img.caption || `Тест ${idx+1}`}
            style={{ maxWidth: '200px', maxHeight: '200px', border: '1px solid #ddd' }}
            onLoad={() => console.log('Изображение загружено:', img.image)}
            onError={(e) => console.error('Ошибка загрузки:', img.image, e)}
          />
        </div>
      ))}
    </div>
  )
}
