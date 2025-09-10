import './PowderCoating.css'
import Reveal from '../components/Reveal'

export default function PowderCoating() {
  return (
    <section className="powder">
      <Reveal as="div" className="powder-hero">
        <div className="container">
          <h1 className="powder-title">Порошковое окрашивание</h1>
          <p className="powder-subtitle">Промышленная окраска изделий с высокой стойкостью покрытия</p>
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="card intro" y={18}>
          <h2>Производственные возможности</h2>
          <ul className="list large">
            <li>
              <strong>Камера полимеризации проходного типа</strong> — внутренние размеры
              4000×1600×2000 мм (Д×Ш×В)
            </li>
            <li>
              <strong>Камера напыления ОБИТАЕМАЯ</strong> — внутренние размеры
              5000×3000×2000 мм (Д×Ш×В)
            </li>
            <li>
              <strong>Транспортная система кольцевого типа</strong> — высокое качество нанесения
              и высокая скорость выдачи заказов
            </li>
          </ul>
        </Reveal>

        <Reveal className="card" y={18}>
          <h2>Преимущества порошковой окраски</h2>
          <div className="features-grid">
            <Reveal className="feature" delay={60}><h4>Износостойкость</h4>
              <p>Покрытие устойчиво к механическим повреждениям и воздействию окружающей среды.</p>
            </Reveal>
            <Reveal className="feature" delay={100}><h4>Равномерность слоя</h4>
              <p>Ровное нанесение без подтеков и шагрени даже на сложной геометрии.</p>
            </Reveal>
            <Reveal className="feature" delay={140}><h4>Экономичность</h4>
              <p>Минимальный перерасход материала и быстрый производственный цикл.</p>
            </Reveal>
          </div>
        </Reveal>

        <Reveal className="card" y={18}>
          <h2>Материалы и цвета</h2>
          <p>
            Используем качественные порошковые материалы с широкой палитрой цветов RAL и
            фактур (глянец, мат, шагрень, металлики). Возможен подбор под образец.
          </p>
        </Reveal>

        <Reveal className="cta card" y={20}>
          <h3>Нужно окрасить изделия?</h3>
          <p>Пришлите чертежи или габариты — подскажем технологию подготовки и рассчитаем сроки.</p>
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
  )
} 