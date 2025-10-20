import { useEffect } from 'react'

const StructuredData = ({ data }) => {
  useEffect(() => {
    // Удаляем предыдущие структурированные данные
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Добавляем новые структурированные данные
    if (data) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
    }
  }, [data])

  return null
}

// Данные организации для главной страницы
export const OrganizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ООО АФК «Урал»",
  "alternateName": "АФК Урал",
  "url": "https://afk-ural.ru",
  "logo": "https://afk-ural.ru/src/assets/logo_afk.jpg",
  "description": "Производство аппаратных контейнеров, ферм, опор, мачт для антенных конструкций. Лазерная резка, гибка, сварка, порошковая и жидкая окраска металла.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "RU",
    "addressRegion": "Свердловская область",
    "addressLocality": "Екатеринбург"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-XXX-XXX-XX-XX",
    "contactType": "customer service",
    "availableLanguage": "Russian"
  },
  "sameAs": [],
  "foundingDate": "2020",
  "numberOfEmployees": "10-50",
  "industry": "Металлообработка",
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 56.8431,
      "longitude": 60.6454
    },
    "geoRadius": "500000"
  }
}

// Данные для страницы услуг
export const ServiceData = (serviceName, serviceDescription, serviceUrl) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": serviceDescription,
  "url": serviceUrl,
  "provider": {
    "@type": "Organization",
    "name": "ООО АФК «Урал»",
    "url": "https://afk-ural.ru"
  },
  "serviceType": "Металлообработка",
  "areaServed": {
    "@type": "Country",
    "name": "Россия"
  }
})

// Данные для страницы контактов
export const ContactPageData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Контакты - ООО АФК «Урал»",
  "description": "Свяжитесь с нами для заказа услуг металлообработки",
  "url": "https://afk-ural.ru/contacts",
  "mainEntity": {
    "@type": "Organization",
    "name": "ООО АФК «Урал»",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-XXX-XXX-XX-XX",
      "contactType": "customer service",
      "availableLanguage": "Russian"
    }
  }
}

// Данные для хлебных крошек
export const BreadcrumbData = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export default StructuredData
