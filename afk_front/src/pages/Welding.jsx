import './Welding.css'
import Reveal from '../components/Reveal'

export default function Welding() {
  return (
    <section className="welding">
      <Reveal as="div" className="welding-hero">
        <div className="container">
          <h1 className="welding-title">Сварочные работы</h1>
          <p className="welding-subtitle">Надежные сварные соединения для промышленных и индивидуальных проектов</p>
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="card intro" y={18}>
          <h2>Наши возможности</h2>
          <p>
            Выполнение сварочных работ полуавтаматическими сварочными аппаратами <strong>TIG</strong>, <strong>MAG</strong>,
            электродуговая сварка. Работаем со сталью, нержавеющей сталью и алюминием.
          </p>
        </Reveal>

        <Reveal className="card" y={18}>
          <h2>Процессы сварки</h2>
          <div className="process-grid">
            <Reveal className="process" delay={60}><h4>TIG (аргонодуговая сварка)</h4>
              <p>Высокая чистота и точность шва. Подходит для нержавеющих сталей и алюминия, когда важны аккуратность и внешний вид.</p>
            </Reveal>
            <Reveal className="process" delay={100}><h4>MAG (полуавтоматическая сварка)</h4>
              <p>Производительная сварка в защитном газе. Оптимальна для конструкционных сталей и серийного производства.</p>
            </Reveal>
            <Reveal className="process" delay={140}><h4>Электродуговая сварка (MMA)</h4>
              <p>Универсальный метод для монтажа и ремонта, в том числе на открытых площадках и труднодоступных участках.</p>
            </Reveal>
          </div>
        </Reveal>

        <Reveal className="card" y={18}>
          <h2>Контроль качества</h2>
          <ul className="list">
            <li>Визуальный и измерительный контроль геометрии и качества шва</li>
            <li>Соблюдение технологических карт и режимов сварки</li>
            <li>Механическая обработка и зачистка кромок при необходимости</li>
          </ul>
        </Reveal>

        <Reveal className="card" y={18}>
          <h2>Что изготавливаем</h2>
          <ul className="list">
            <li>Рамы, опорные конструкции, металлокаркасы</li>
            <li>Кожухи, корпуса, ограждения и площадки обслуживания</li>
            <li>Нестандартные узлы и детали по КД заказчика</li>
          </ul>
        </Reveal>

        <Reveal className="cta card" y={20}>
          <h3>Нужны сварочные работы под ваш проект?</h3>
          <p>Опишите задачу или прикрепите чертежи — предложим технологию, сроки и стоимость.</p>
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
  )
} 