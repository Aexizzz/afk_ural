import { useState } from 'react'
import axios from 'axios'

export default function ServerDiagnostics() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const runDiagnostics = async () => {
    setLoading(true)
    setResults([])
    
    const tests = [
      {
        name: 'Проверка базового URL',
        test: () => {
          const baseURL = axios.defaults.baseURL
          return {
            success: !!baseURL,
            message: baseURL ? `Base URL: ${baseURL}` : 'Base URL не настроен',
            details: { baseURL }
          }
        }
      },
      {
        name: 'Проверка доступности API',
        test: async () => {
          try {
            const response = await axios.get('/gallery-images/', { timeout: 5000 })
            return {
              success: true,
              message: `API доступен, статус: ${response.status}`,
              details: { status: response.status, data: response.data }
            }
          } catch (error) {
            return {
              success: false,
              message: `API недоступен: ${error.message}`,
              details: { 
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data,
                code: error.code
              }
            }
          }
        }
      },
      {
        name: 'Проверка CORS',
        test: async () => {
          try {
            const response = await fetch(axios.defaults.baseURL + '/gallery-images/', {
              method: 'OPTIONS',
              headers: {
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
              }
            })
            return {
              success: response.ok,
              message: `CORS: ${response.ok ? 'OK' : 'Проблемы'}`,
              details: { 
                status: response.status,
                headers: Object.fromEntries(response.headers.entries())
              }
            }
          } catch (error) {
            return {
              success: false,
              message: `CORS ошибка: ${error.message}`,
              details: { error: error.toString() }
            }
          }
        }
      },
      {
        name: 'Проверка статических файлов',
        test: async () => {
          try {
            const testUrl = axios.defaults.baseURL?.replace('/api', '') + '/media/gallery/test.jpg'
            const response = await fetch(testUrl, { method: 'HEAD' })
            return {
              success: response.ok,
              message: `Статические файлы: ${response.ok ? 'OK' : 'Проблемы'}`,
              details: { 
                status: response.status,
                url: testUrl
              }
            }
          } catch (error) {
            return {
              success: false,
              message: `Статические файлы недоступны: ${error.message}`,
              details: { error: error.toString() }
            }
          }
        }
      }
    ]

    for (const test of tests) {
      try {
        const result = await test.test()
        setResults(prev => [...prev, { name: test.name, ...result }])
      } catch (error) {
        setResults(prev => [...prev, { 
          name: test.name, 
          success: false, 
          message: `Ошибка теста: ${error.message}`,
          details: { error: error.toString() }
        }])
      }
    }
    
    setLoading(false)
  }

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #6c5ce7', 
      margin: '20px 0', 
      backgroundColor: '#f8f9fa',
      borderRadius: '8px'
    }}>
      <h3 style={{ color: '#6c5ce7', marginTop: 0 }}>🔧 Диагностика сервера</h3>
      <button 
        onClick={runDiagnostics} 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: loading ? '#ddd' : '#6c5ce7', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Проверяем...' : 'Запустить диагностику'}
      </button>
      
      {results.length > 0 && (
        <div>
          <h4>Результаты диагностики:</h4>
          {results.map((result, idx) => (
            <div key={idx} style={{ 
              padding: '15px', 
              margin: '10px 0', 
              backgroundColor: result.success ? '#d1f2eb' : '#fadbd8',
              border: `1px solid ${result.success ? '#00b894' : '#e74c3c'}`,
              borderRadius: '5px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ 
                  fontSize: '20px', 
                  marginRight: '10px' 
                }}>
                  {result.success ? '✅' : '❌'}
                </span>
                <strong>{result.name}</strong>
              </div>
              <div style={{ marginLeft: '30px', fontSize: '14px' }}>
                {result.message}
              </div>
              {result.details && (
                <details style={{ marginLeft: '30px', marginTop: '8px' }}>
                  <summary style={{ cursor: 'pointer', fontSize: '12px', color: '#666' }}>
                    Подробности
                  </summary>
                  <pre style={{ 
                    fontSize: '11px', 
                    backgroundColor: '#f8f9fa', 
                    padding: '8px', 
                    borderRadius: '4px',
                    overflow: 'auto',
                    marginTop: '5px'
                  }}>
                    {JSON.stringify(result.details, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
