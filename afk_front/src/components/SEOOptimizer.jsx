import { useEffect } from 'react'

// Компонент для оптимизации SEO и производительности
export default function SEOOptimizer() {
  useEffect(() => {
    // Предзагрузка критических ресурсов
    const preloadCriticalResources = () => {
      // Предзагрузка логотипа
      const logoLink = document.createElement('link')
      logoLink.rel = 'preload'
      logoLink.as = 'image'
      logoLink.href = '/src/assets/logo_afk.jpg'
      document.head.appendChild(logoLink)

      // Предзагрузка шрифтов
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.as = 'font'
      fontLink.type = 'font/woff2'
      fontLink.crossOrigin = 'anonymous'
      fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2'
      document.head.appendChild(fontLink)
    }

    // Оптимизация загрузки изображений
    const optimizeImages = () => {
      const images = document.querySelectorAll('img')
      images.forEach(img => {
        // Добавляем loading="lazy" для изображений ниже сгиба
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy')
        }
        
        // Добавляем decoding="async" для асинхронной декодировки
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async')
        }
      })
    }

    // Установка мета-тегов для производительности
    const setPerformanceMeta = () => {
      // DNS prefetch для внешних доменов
      const dnsPrefetch = document.createElement('link')
      dnsPrefetch.rel = 'dns-prefetch'
      dnsPrefetch.href = '//fonts.googleapis.com'
      document.head.appendChild(dnsPrefetch)

      const dnsPrefetch2 = document.createElement('link')
      dnsPrefetch2.rel = 'dns-prefetch'
      dnsPrefetch2.href = '//fonts.gstatic.com'
      document.head.appendChild(dnsPrefetch2)
    }

    // Инициализация оптимизаций
    preloadCriticalResources()
    optimizeImages()
    setPerformanceMeta()

    // Оптимизация для мобильных устройств
    const optimizeForMobile = () => {
      // Добавляем viewport meta тег если его нет
      if (!document.querySelector('meta[name="viewport"]')) {
        const viewport = document.createElement('meta')
        viewport.name = 'viewport'
        viewport.content = 'width=device-width, initial-scale=1.0'
        document.head.appendChild(viewport)
      }
    }

    optimizeForMobile()

    // Cleanup функция
    return () => {
      // Удаляем добавленные элементы при размонтировании
      const preloadLinks = document.querySelectorAll('link[rel="preload"]')
      preloadLinks.forEach(link => link.remove())
    }
  }, [])

  return null
}

// Хук для отслеживания производительности
export const usePerformanceTracking = () => {
  useEffect(() => {
    // Отслеживание Core Web Vitals
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log)
        getFID(console.log)
        getFCP(console.log)
        getLCP(console.log)
        getTTFB(console.log)
      })
    }

    // Отслеживание времени загрузки страницы
    window.addEventListener('load', () => {
      const loadTime = performance.now()
      console.log(`Страница загружена за ${loadTime.toFixed(2)}ms`)
    })
  }, [])
}
