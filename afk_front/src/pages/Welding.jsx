import './Welding.css'
import Reveal from '../components/Reveal'
import Editable from '../components/Editable'

export default function Welding() {
  return (
    <section className="welding">
      <Reveal as="div" className="welding-hero">
        <div className="container">
          <Editable pageKey="welding" blockKey="title" tag="h1" className="welding-title" placeholder="Сварочные работы" />
          <Editable pageKey="welding" blockKey="subtitle" tag="p" className="welding-subtitle" placeholder="Надежные сварные соединения для промышленных и индивидуальных проектов" />
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="card intro" y={18}>
          <Editable pageKey="welding" blockKey="equip_title" tag="h2" placeholder="Оборудование" />
          <Editable pageKey="welding" blockKey="equip_muted" tag="p" className="muted" placeholder="Современные сварочные аппараты для различных процессов сварки" />
          
            <div className="specs-grid">
              <div className="spec-card">
                <Editable pageKey="welding" blockKey="specs_title" tag="h3" placeholder="Технические характеристики" />
                <ul>
                  <li><Editable pageKey="welding" blockKey="specs_li1" tag="span" placeholder="TIG сварочные аппараты" /></li>
                  <li><Editable pageKey="welding" blockKey="specs_li2" tag="span" placeholder="MAG полуавтоматические аппараты" /></li>
                  <li><Editable pageKey="welding" blockKey="specs_li3" tag="span" placeholder="Электродуговые сварочные аппараты" /></li>
                  <li><Editable pageKey="welding" blockKey="specs_li4" tag="span" placeholder="Системы подачи защитного газа" /></li>
                </ul>
              </div>
              <div className="spec-card">
                <Editable pageKey="welding" blockKey="cap_title" tag="h3" placeholder="Возможности" />
                <ul>
                  <li><Editable pageKey="welding" blockKey="cap_li1" tag="span" placeholder="Сварка стали, нержавеющей стали, алюминия" /></li>
                  <li><Editable pageKey="welding" blockKey="cap_li2" tag="span" placeholder="Различные типы соединений" /></li>
                  <li><Editable pageKey="welding" blockKey="cap_li3" tag="span" placeholder="Контроль качества швов" /></li>
                  <li><Editable pageKey="welding" blockKey="cap_li4" tag="span" placeholder="Механическая обработка после сварки" /></li>
                </ul>
              </div>
            </div>
        </Reveal>

        

        <Reveal className="card" y={18}>
          <Editable pageKey="welding" blockKey="adv_title" tag="h2" placeholder="Преимущества наших сварочных работ" />
          <div className="features-grid">
            <Reveal className="feature" delay={60}>
              <Editable pageKey="welding" blockKey="adv1_title" tag="h4" placeholder="Качество" />
              <Editable pageKey="welding" blockKey="adv1_text" tag="p" placeholder="Высокое качество сварных соединений" />
            </Reveal>
            <Reveal className="feature" delay={100}>
              <Editable pageKey="welding" blockKey="adv2_title" tag="h4" placeholder="Универсальность" />
              <Editable pageKey="welding" blockKey="adv2_text" tag="p" placeholder="Работаем с различными материалами" />
            </Reveal>
            <Reveal className="feature" delay={140}>
              <Editable pageKey="welding" blockKey="adv3_title" tag="h4" placeholder="Контроль" />
              <Editable pageKey="welding" blockKey="adv3_text" tag="p" placeholder="Визуальный и измерительный контроль" />
            </Reveal>
          </div>
        </Reveal>

        <Reveal className="cta card" y={20}>
          <Editable pageKey="welding" blockKey="cta_title" tag="h3" placeholder="Нужны сварочные работы под ваш проект?" />
          <Editable pageKey="welding" blockKey="cta_text" tag="p" placeholder="Опишите задачу — предложим технологию, сроки и стоимость" />
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
  )
} 