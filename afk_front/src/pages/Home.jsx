import Reveal from '../components/Reveal'
import Editable from '../components/Editable'
import { useSEO } from '../hooks/useSEO'
import StructuredData, { OrganizationData } from '../components/StructuredData'

export default function Home() {
  // SEO настройки для главной страницы
  useSEO({
    title: 'АФК УРАЛ — официальный сайт ООО АФК «Урал» | Металлообработка и окрашивание',
    description: 'Официальный сайт ООО АФК «Урал». Производство аппаратных контейнеров, ферм, опор, мачт для антенных конструкций. Лазерная резка, гибка, сварка, порошковая и жидкая окраска металла в Екатеринбурге.',
    keywords: 'АФК Урал, металлообработка, лазерная резка, гибка металла, сварка, порошковая окраска, жидкая окраска, Екатеринбург, аппаратные контейнеры, фермы, опоры, мачты',
    canonical: 'https://afk-ural.ru/',
    ogImage: 'https://afk-ural.ru/src/assets/logo_afk.jpg'
  })
  const cards = [
    { key: 'card1', title: 'Лазерная резка', href: '/metalworking/laser-cutting' },
    { key: 'card2', title: 'Гибка листового металла', href: '/metalworking/sheet-bending' },
    { key: 'card3', title: 'Сварочные работы', href: '/metalworking/welding' },
    { key: 'card4', title: 'Порошковое окрашивание', href: '/painting/powder' },
    { key: 'card5', title: 'Жидкое окрашивание', href: '/painting/liquid' },
  ]

  return (
    <>
      <StructuredData data={OrganizationData} />
      <section className="home">
        <div className="container">
        <Reveal y={16}>
          <Editable pageKey="home" blockKey="title" tag="h1" placeholder="ООО АФК «Урал»" />
          <Editable pageKey="home" blockKey="subtitle" tag="p" placeholder="Официальный сайт. Металлообработка и окрашивание." />
        </Reveal>

        <div className="home-grid">
          {cards.map((card, idx) => (
            <Reveal key={card.title} className="home-card card" delay={idx*40} y={16}>
              <a href={card.href} className="home-card-link">
                <Editable pageKey="home" blockKey={`${card.key}_title`} tag="h3" placeholder={card.title} />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}