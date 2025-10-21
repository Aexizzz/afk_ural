import { useState } from 'react'

export default function ImageTest() {
  const [testResults, setTestResults] = useState([])

  const testImage = (url, name) => {
    const img = new Image()
    img.onload = () => {
      setTestResults(prev => [...prev, { name, url, status: '✅ Загружено', error: null }])
    }
    img.onerror = (e) => {
      setTestResults(prev => [...prev, { name, url, status: '❌ Ошибка', error: e.toString() }])
    }
    img.src = url
  }

  const runTests = () => {
    setTestResults([])
    
    // Тест 1: Прямой URL изображения
    testImage('http://afkural.ru/media/gallery/бердик_KCeGqBY.jpg', 'Прямой URL')
    
    // Тест 2: URL с параметром времени
    testImage(`http://afkural.ru/media/gallery/бердик_KCeGqBY.jpg?t=${Date.now()}`, 'URL с параметром')
    
    // Тест 3: Проверка доступности сервера
    fetch('http://afkural.ru/media/gallery/бердик_KCeGqBY.jpg', { method: 'HEAD' })
      .then(response => {
        setTestResults(prev => [...prev, { 
          name: 'HEAD запрос', 
          url: 'http://afkural.ru/media/gallery/бердик_KCeGqBY.jpg', 
          status: `✅ ${response.status} ${response.statusText}`, 
          error: null 
        }])
      })
      .catch(error => {
        setTestResults(prev => [...prev, { 
          name: 'HEAD запрос', 
          url: 'http://afkural.ru/media/gallery/бердик_KCeGqBY.jpg', 
          status: '❌ Ошибка', 
          error: error.toString() 
        }])
      })
  }

  return (
    <div style={{ padding: '20px', border: '2px solid #ff6b6b', margin: '20px 0', backgroundColor: '#fff5f5' }}>
      <h3 style={{ color: '#d63031' }}>🔧 Тест доступности изображений</h3>
      <button onClick={runTests} style={{ 
        padding: '10px 20px', 
        backgroundColor: '#00b894', 
        color: 'white', 
        border: 'none', 
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px'
      }}>
        Запустить тесты
      </button>
      
      {testResults.length > 0 && (
        <div>
          <h4>Результаты тестов:</h4>
          {testResults.map((result, idx) => (
            <div key={idx} style={{ 
              padding: '10px', 
              margin: '5px 0', 
              backgroundColor: result.status.includes('✅') ? '#d1f2eb' : '#fadbd8',
              border: `1px solid ${result.status.includes('✅') ? '#00b894' : '#e74c3c'}`,
              borderRadius: '5px'
            }}>
              <strong>{result.name}:</strong> {result.status}
              <br />
              <small>URL: {result.url}</small>
              {result.error && <div style={{ color: '#e74c3c', fontSize: '12px' }}>Ошибка: {result.error}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
