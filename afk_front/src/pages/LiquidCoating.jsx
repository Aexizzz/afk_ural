import './LiquidCoating.css'
import Reveal from '../components/Reveal'

export default function LiquidCoating() {
  return (
    <section className="liquid">
      <Reveal as="div" className="liquid-hero">
        <div className="container">
          <h1 className="liquid-title">Жидкое окрашивание</h1>
          <p className="liquid-subtitle">Качественная покраска изделий с широкими возможностями по цветам и фактурам</p>
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="card intro" y={18}>
          <h2>Производственные возможности</h2>
          <ul className="list large">
            <li>
              <strong>Камера окрашивания ОБИТАЕМАЯ</strong> — внутренние размеры 5000×5000×6000 мм (Д×Ш×В)
            </li>
          </ul>
        </Reveal>

        <Reveal className="card" y={18}>
          <h2>Преимущества жидкой окраски</h2>
          <div className="features-grid">
            <Reveal className="feature" delay={60}><h4>Гибкость по материалам</h4>
              <p>Подходит для деталей сложной формы, тонкостенных конструкций и узлов, чувствительных к температуре.</p>
            </Reveal>
            <Reveal className="feature" delay={100}><h4>Широкая палитра</h4>
              <p>Окраска в любые RAL/по образцу, использование специализированных эмалей и грунтовочных систем.</p>
            </Reveal>
            <Reveal className="feature" delay={140}><h4>Хорошая адгезия</h4>
              <p>Правильная подготовка поверхности и подбор системы материалов обеспечивают стойкое покрытие.</p>
            </Reveal>
          </div>
        </Reveal>

        <Reveal className="card" y={18}>
          <h2>Подготовка поверхности</h2>
          <ul className="list">
            <li>Обезжиривание, шлифование, маскирование</li>
            <li>Грунтование под тип покрытия и условия эксплуатации</li>
            <li>Контроль толщины слоя и равномерности нанесения</li>
          </ul>
        </Reveal>

        <Reveal className="cta card" y={20}>
          <h3>Нужно жидкое окрашивание изделий?</h3>
          <p>Опишите задачу и требования к покрытию — подберём материалы и рассчитаем сроки.</p>
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
  )
} 