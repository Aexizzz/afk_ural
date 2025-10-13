import './LiquidCoating.css'
import Reveal from '../components/Reveal'
import Editable from '../components/Editable'

export default function LiquidCoating() {
  return (
    <section className="liquid">
      <Reveal as="div" className="liquid-hero">
        <div className="container">
          <Editable pageKey="liquid" blockKey="title" tag="h1" className="liquid-title" placeholder="Жидкое окрашивание" />
          <Editable pageKey="liquid" blockKey="subtitle" tag="p" className="liquid-subtitle" placeholder="Качественная покраска изделий" />
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="card intro" y={18}>
          <Editable pageKey="liquid" blockKey="equip_title" tag="h2" placeholder="Оборудование" />
          <Editable pageKey="liquid" blockKey="equip_muted" tag="p" className="muted" placeholder="Современная камера для жидкого окрашивания" />
          
          <div className="specs-grid">
            <div className="spec-card">
              <Editable pageKey="liquid" blockKey="specs_title" tag="h3" placeholder="Технические характеристики" />
              <ul>
                <li><Editable pageKey="liquid" blockKey="specs_li1" tag="span" placeholder="Камера окрашивания: 5000×5000×6000 мм" /></li>
                <li><Editable pageKey="liquid" blockKey="specs_li2" tag="span" placeholder="Система подготовки поверхности" /></li>
                <li><Editable pageKey="liquid" blockKey="specs_li3" tag="span" placeholder="Оборудование для грунтования" /></li>
                <li><Editable pageKey="liquid" blockKey="specs_li4" tag="span" placeholder="Система сушки покрытия" /></li>
              </ul>
            </div>
            <div className="spec-card">
              <Editable pageKey="liquid" blockKey="cap_title" tag="h3" placeholder="Возможности" />
              <ul>
                <li><Editable pageKey="liquid" blockKey="cap_li1" tag="span" placeholder="Окрашивание крупногабаритных изделий" /></li>
                <li><Editable pageKey="liquid" blockKey="cap_li2" tag="span" placeholder="Широкая палитра цветов RAL" /></li>
                <li><Editable pageKey="liquid" blockKey="cap_li3" tag="span" placeholder="Специализированные эмали и грунты" /></li>
                <li><Editable pageKey="liquid" blockKey="cap_li4" tag="span" placeholder="Окрашивание по образцу" /></li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="card" y={18}>
          <Editable pageKey="liquid" blockKey="adv_title" tag="h2" placeholder="Преимущества жидкой окраски" />
          <div className="features-grid">
            <Reveal className="feature" delay={60}>
              <Editable pageKey="liquid" blockKey="adv1_title" tag="h4" placeholder="Гибкость по материалам" />
              <Editable pageKey="liquid" blockKey="adv1_text" tag="p" placeholder="Подходит для сложной формы" />
            </Reveal>
            <Reveal className="feature" delay={100}>
              <Editable pageKey="liquid" blockKey="adv2_title" tag="h4" placeholder="Широкая палитра" />
              <Editable pageKey="liquid" blockKey="adv2_text" tag="p" placeholder="Окраска в любые RAL" />
            </Reveal>
            <Reveal className="feature" delay={140}>
              <Editable pageKey="liquid" blockKey="adv3_title" tag="h4" placeholder="Хорошая адгезия" />
              <Editable pageKey="liquid" blockKey="adv3_text" tag="p" placeholder="Правильная подготовка обеспечивает стойкость" />
            </Reveal>
          </div>
        </Reveal>

        <Reveal className="cta card" y={20}>
          <Editable pageKey="liquid" blockKey="cta_title" tag="h3" placeholder="Нужно жидкое окрашивание изделий?" />
          <Editable pageKey="liquid" blockKey="cta_text" tag="p" placeholder="Опишите задачу — подберём материалы и рассчитаем сроки" />
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
  )
} 