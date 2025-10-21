import { useState } from 'react'

export default function ImageUrlTest() {
  const [testUrl, setTestUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testImageUrl = async (url) => {
    setLoading(true)
    setResult(null)
    
    try {
      console.log('Тестируем URL:', url)
      
      // Тест 1: Проверка доступности через fetch
      const fetchResult = await fetch(url, { method: 'HEAD' })
      console.log('HEAD запрос:', fetchResult.status, fetchResult.statusText)
      
      // Тест 2: Проверка через Image объект
      const img = new Image()
      const imgPromise = new Promise((resolve, reject) => {
        img.onload = () => resolve({ success: true, width: img.width, height: img.height })
        img.onerror = (e) => reject({ success: false, error: e })
        img.src = url
      })
      
      const imgResult = await imgPromise
      console.log('Image загрузка:', imgResult)
      
      setResult({
        success: true,
        fetchStatus: fetchResult.status,
        fetchStatusText: fetchResult.statusText,
        imageWidth: imgResult.width,
        imageHeight: imgResult.height,
        url: url
      })
      
    } catch (error) {
      console.error('Ошибка тестирования:', error)
      setResult({
        success: false,
        error: error.message || error.toString(),
        url: url
      })
    } finally {
      setLoading(false)
    }
  }

  const testCurrentImage = () => {
    const url = 'https://afkural.ru/media/gallery/бердик_bnsawFY.jpg'
    setTestUrl(url)
    testImageUrl(url)
  }

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #00b894', 
      margin: '20px 0', 
      backgroundColor: '#f0fff4',
      borderRadius: '8px'
    }}>
      <h3 style={{ color: '#00b894', marginTop: 0 }}>🖼️ Тест URL изображения</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={testUrl}
          onChange={(e) => setTestUrl(e.target.value)}
          placeholder="Введите URL изображения"
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            marginBottom: '10px'
          }}
        />
        <button
          onClick={() => testImageUrl(testUrl)}
          disabled={loading || !testUrl}
          style={{
            padding: '8px 16px',
            backgroundColor: loading ? '#ddd' : '#00b894',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginRight: '10px'
          }}
        >
          {loading ? 'Тестируем...' : 'Тестировать URL'}
        </button>
        <button
          onClick={testCurrentImage}
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: loading ? '#ddd' : '#6c5ce7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Тест текущего изображения
        </button>
      </div>
      
      {result && (
        <div style={{
          padding: '15px',
          backgroundColor: result.success ? '#d1f2eb' : '#fadbd8',
          border: `1px solid ${result.success ? '#00b894' : '#e74c3c'}`,
          borderRadius: '5px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '20px', marginRight: '10px' }}>
              {result.success ? '✅' : '❌'}
            </span>
            <strong>Результат тестирования</strong>
          </div>
          
          {result.success ? (
            <div>
              <p><strong>URL:</strong> {result.url}</p>
              <p><strong>HTTP статус:</strong> {result.fetchStatus} {result.fetchStatusText}</p>
              <p><strong>Размеры:</strong> {result.imageWidth}×{result.imageHeight}px</p>
              <p><strong>Статус:</strong> Изображение доступно</p>
            </div>
          ) : (
            <div>
              <p><strong>URL:</strong> {result.url}</p>
              <p><strong>Ошибка:</strong> {result.error}</p>
              <p><strong>Статус:</strong> Изображение недоступно</p>
            </div>
          )}
        </div>
      )}
      
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Подсказка:</strong> Попробуйте скопировать URL изображения из консоли и вставить его в поле выше для тестирования.</p>
      </div>
    </div>
  )
}
