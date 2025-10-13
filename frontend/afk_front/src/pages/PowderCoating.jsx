import './PowderCoating.css'
import Reveal from '../components/Reveal'
import Editable from '../components/Editable'

export default function PowderCoating() {
  return (
    <section className="powder">
      <Reveal as="div" className="powder-hero">
        <div className="container">
          <Editable pageKey="powder" blockKey="title" tag="h1" className="powder-title" placeholder="Порошковое окрашивание" />
          <Editable pageKey="powder" blockKey="subtitle" tag="p" className="powder-subtitle" placeholder="Промышленная окраска изделий с высокой стойкостью покрытия" />
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="card intro" y={18}>
          <Editable pageKey="powder" blockKey="equip_title" tag="h2" placeholder="Оборудование" />
          <Editable pageKey="powder" blockKey="equip_muted" tag="p" className="muted" placeholder="Современная линия порошкового окрашивания" />
          
          <div className="specs-grid">
            <div className="spec-card">
              <Editable pageKey="powder" blockKey="specs_title" tag="h3" placeholder="Технические характеристики" />
              <ul>
                <li><Editable pageKey="powder" blockKey="specs_li1" tag="span" placeholder="Камера полимеризации: 4000×1600×2000 мм" /></li>
                <li><Editable pageKey="powder" blockKey="specs_li2" tag="span" placeholder="Камера напыления: 5000×3000×2000 мм" /></li>
                <li><Editable pageKey="powder" blockKey="specs_li3" tag="span" placeholder="Транспортная система кольцевого типа" /></li>
                <li><Editable pageKey="powder" blockKey="specs_li4" tag="span" placeholder="Система рекуперации порошка" /></li>
              </ul>
            </div>
            <div className="spec-card">
              <Editable pageKey="powder" blockKey="cap_title" tag="h3" placeholder="Возможности" />
              <ul>
                <li><Editable pageKey="powder" blockKey="cap_li1" tag="span" placeholder="Окрашивание крупногабаритных изделий" /></li>
                <li><Editable pageKey="powder" blockKey="cap_li2" tag="span" placeholder="Широкая палитра цветов RAL" /></li>
                <li><Editable pageKey="powder" blockKey="cap_li3" tag="span" placeholder="Различные фактуры покрытия" /></li>
                <li><Editable pageKey="powder" blockKey="cap_li4" tag="span" placeholder="Высокая производительность" /></li>
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="card" y={18}>
          <Editable pageKey="powder" blockKey="adv_title" tag="h2" placeholder="Преимущества порошковой окраски" />
          <div className="features-grid">
            <Reveal className="feature" delay={60}>
              <Editable pageKey="powder" blockKey="adv1_title" tag="h4" placeholder="Износостойкость" />
              <Editable pageKey="powder" blockKey="adv1_text" tag="p" placeholder="Покрытие устойчиво к повреждениям" />
            </Reveal>
            <Reveal className="feature" delay={100}>
              <Editable pageKey="powder" blockKey="adv2_title" tag="h4" placeholder="Равномерность слоя" />
              <Editable pageKey="powder" blockKey="adv2_text" tag="p" placeholder="Ровное нанесение без подтеков" />
            </Reveal>
            <Reveal className="feature" delay={140}>
              <Editable pageKey="powder" blockKey="adv3_title" tag="h4" placeholder="Экономичность" />
              <Editable pageKey="powder" blockKey="adv3_text" tag="p" placeholder="Быстрый производственный цикл" />
            </Reveal>
          </div>
        </Reveal>

        <Reveal className="cta card" y={20}>
          <Editable pageKey="powder" blockKey="cta_title" tag="h3" placeholder="Нужно окрасить изделия?" />
          <Editable pageKey="powder" blockKey="cta_text" tag="p" placeholder="Пришлите чертежи — подскажем технологию и сроки" />
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
  )
} 