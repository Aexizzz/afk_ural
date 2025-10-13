import Reveal from '../components/Reveal'
import Editable from '../components/Editable'

export default function Home() {
  const cards = [
    { key: 'card1', title: 'Лазерная резка', href: '/metalworking/laser-cutting' },
    { key: 'card2', title: 'Гибка листового металла', href: '/metalworking/sheet-bending' },
    { key: 'card3', title: 'Сварочные работы', href: '/metalworking/welding' },
    { key: 'card4', title: 'Порошковое окрашивание', href: '/painting/powder' },
    { key: 'card5', title: 'Жидкое окрашивание', href: '/painting/liquid' },
  ]

  return (
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
  )
}