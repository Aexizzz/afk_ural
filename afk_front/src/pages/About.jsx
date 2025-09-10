import './About.css'
import Reveal from '../components/Reveal'

export default function About() {
  return (
    <section className="about">
      <Reveal as="div" className="about-hero">
        <div className="container">
          <h1 className="about-title">О нас</h1>
          <p className="about-subtitle">Как мы работаем — от вашей идеи до готового изделия</p>
        </div>
      </Reveal>

      <div className="container">
        <div className="flow">
          <Reveal className="flow-item" y={16}>
            <div className="flow-node">
              <div className="step">1</div>
              <h3>Присылаете чертёж или фото от руки</h3>
              <p>
                Принимаем чертежи в любом виде: от профессионального DXF до обычного фото наброска на бумаге. 
                Если нужно — поможем перевести вашу идею в технический чертёж, подходящий для резки.
              </p>
            </div>
            <div className="connector">
              <span className="arrow" />
            </div>
          </Reveal>

          <Reveal className="flow-item" y={16} delay={80}>
            <div className="flow-node">
              <div className="step">2</div>
              <h3>Уточняем детали и делаем точный расчёт</h3>
              <p>Связываемся с вами, чтобы уточнить:</p>
              <ul>
                <li>материал (сталь, алюминий, нержавейка),</li>
                <li>толщину листа (до 40 мм),</li>
                <li>газ резки (воздух, кислород или азот),</li>
                <li>нужные допуски и количество изделий.</li>
              </ul>
              <p>
                На основе этих данных рассчитываем стоимость, расход материала и время производства. 
                Честно и прозрачно — без «скрытых» доплат.
              </p>
            </div>
            <div className="connector">
              <span className="arrow" />
            </div>
          </Reveal>

          <Reveal className="flow-item" y={16} delay={140}>
            <div className="flow-node">
              <div className="step">3</div>
              <h3>Запускаем в работу и доставляем результат</h3>
              <p>
                После вашего подтверждения передаём задание на станки. Работаем на современном оборудовании с ЧПУ, обеспечивая:
              </p>
              <ul>
                <li>чистый срез без окалины и обгораний,</li>
                <li>точность до 0,1 мм,</li>
                <li>обработку листов до 6000 мм.</li>
              </ul>
              <p>
                Готовые изделия аккуратно упаковываются и либо передаются на самовывоз, либо доставляются по вашему адресу.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal className="cta card" y={18}>
          <h3>Готовы начать?</h3>
          <p>Пришлите чертеж или набросок — предложим технологию и расчёт сроков.</p>
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
  )
} 