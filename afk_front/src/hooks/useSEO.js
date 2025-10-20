import { useEffect } from 'react'

export const useSEO = ({ title, description, keywords, canonical, ogImage, ogType = 'website' }) => {
  useEffect(() => {
    // Обновляем title
    if (title) {
      document.title = title
    }

    // Обновляем или создаем meta description
    updateMetaTag('name', 'description', description)
    
    // Обновляем или создаем meta keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords)
    }

    // Обновляем или создаем canonical URL
    if (canonical) {
      updateCanonical(canonical)
    }

    // Open Graph теги
    updateMetaTag('property', 'og:title', title)
    updateMetaTag('property', 'og:description', description)
    updateMetaTag('property', 'og:type', ogType)
    if (canonical) {
      updateMetaTag('property', 'og:url', canonical)
    }
    if (ogImage) {
      updateMetaTag('property', 'og:image', ogImage)
    }

    // Twitter Card теги
    updateMetaTag('name', 'twitter:card', 'summary_large_image')
    updateMetaTag('name', 'twitter:title', title)
    updateMetaTag('name', 'twitter:description', description)
    if (ogImage) {
      updateMetaTag('name', 'twitter:image', ogImage)
    }

  }, [title, description, keywords, canonical, ogImage, ogType])
}

// Вспомогательная функция для обновления meta тегов
const updateMetaTag = (attribute, name, content) => {
  if (!content) return

  let meta = document.querySelector(`meta[${attribute}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', content)
}

// Вспомогательная функция для обновления canonical URL
const updateCanonical = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', url)
}
