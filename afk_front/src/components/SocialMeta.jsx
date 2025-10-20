import { useEffect } from 'react'

// Компонент для управления мета-тегами социальных сетей
export default function SocialMeta({ 
  title, 
  description, 
  image, 
  url, 
  type = 'website',
  siteName = 'АФК Урал'
}) {
  useEffect(() => {
    // Open Graph теги
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: 'ru_RU' }
    ]

    // Twitter Card теги
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:site', content: '@afk_ural' },
      { name: 'twitter:creator', content: '@afk_ural' }
    ]

    // Функция для обновления или создания мета-тегов
    const updateMetaTags = (tags, attribute) => {
      tags.forEach(tag => {
        if (!tag.content) return

        let meta = document.querySelector(`meta[${attribute}="${tag[attribute]}"]`)
        if (!meta) {
          meta = document.createElement('meta')
          meta.setAttribute(attribute, tag[attribute])
          document.head.appendChild(meta)
        }
        meta.setAttribute('content', tag.content)
      })
    }

    // Обновляем теги
    updateMetaTags(ogTags, 'property')
    updateMetaTags(twitterTags, 'name')

    // Дополнительные мета-теги для лучшего SEO
    const additionalTags = [
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'bingbot', content: 'index, follow' },
      { name: 'author', content: 'ООО АФК «Урал»' },
      { name: 'publisher', content: 'ООО АФК «Урал»' },
      { name: 'copyright', content: '© 2024 ООО АФК «Урал». Все права защищены.' },
      { name: 'language', content: 'ru' },
      { name: 'geo.region', content: 'RU-SVE' },
      { name: 'geo.placename', content: 'Екатеринбург' },
      { name: 'geo.position', content: '56.8431;60.6454' },
      { name: 'ICBM', content: '56.8431, 60.6454' }
    ]

    updateMetaTags(additionalTags, 'name')

  }, [title, description, image, url, type, siteName])

  return null
}

// Хук для управления мета-тегами страницы
export const usePageMeta = (meta) => {
  useEffect(() => {
    // Обновляем title
    if (meta.title) {
      document.title = meta.title
    }

    // Обновляем description
    if (meta.description) {
      let desc = document.querySelector('meta[name="description"]')
      if (!desc) {
        desc = document.createElement('meta')
        desc.name = 'description'
        document.head.appendChild(desc)
      }
      desc.content = meta.description
    }

    // Обновляем keywords
    if (meta.keywords) {
      let keywords = document.querySelector('meta[name="keywords"]')
      if (!keywords) {
        keywords = document.createElement('meta')
        keywords.name = 'keywords'
        document.head.appendChild(keywords)
      }
      keywords.content = meta.keywords
    }

    // Обновляем canonical URL
    if (meta.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = meta.canonical
    }

  }, [meta])
}
