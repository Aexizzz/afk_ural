import './Products.css'
import Reveal from '../components/Reveal'

export default function Products() {
  return (
    <section className="products">
      <Reveal as="div" className="products-hero">
        <div className="container">
          <h1 className="products-title">Продукция</h1>
          <p className="products-subtitle">Производим металлоизделия по вашим чертежам и задачам</p>
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="products-intro card" y={22}>
          <h2>Металлические конструкции</h2>
          <p>
            Изготавливаем нестандартные конструкции по чертежам заказчика.
            Вы можете обратиться к нам с вашими идеями и чертежами, а мы постараемся
            реализовать задуманное.
          </p>
        </Reveal>

        <div className="products-grid">
          <Reveal className="product-card" delay={60}>
            <div className="product-card__header">
              <h3>Индивидуальные проекты</h3>
            </div>
            <p>Полный цикл работ: от консультации и проработки до изготовления и постобработки.</p>
            <ul className="features">
              <li>Подбор материалов и толщин</li>
              <li>Оптимизация конструкции под производство</li>
              <li>Пилотные образцы и мелкосерийное производство</li>
            </ul>
          </Reveal>

          <Reveal className="product-card" delay={120}>
            <div className="product-card__header">
              <h3>Листовой металл</h3>
            </div>
            <p>Резка, гибка, сварка и окраска изделий из листового металла с высокой точностью.</p>
            <ul className="features">
              <li>Лазерная резка по DXF/DWG</li>
              <li>Точная гибка по КД</li>
              <li>Порошковая и жидкая окраска</li>
            </ul>
          </Reveal>

          <Reveal className="product-card" delay={180}>
            <div className="product-card__header">
              <h3>Корпуса и рамы</h3>
            </div>
            <p>Изготовление силовых рам и корпусов для оборудования по вашим чертежам.</p>
            <ul className="features">
              <li>Конструкционная сталь, нержавеющая сталь, алюминий</li>
              <li>Сварочные работы любой сложности</li>
              <li>Грунтование и финишная отделка</li>
            </ul>
          </Reveal>
        </div>

        <Reveal className="cta card" y={22}>
          <h3>Нужна консультация?</h3>
          <p>Отправьте нам чертежи и краткое описание задачи — предложим решение и сроки.</p>
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
  )
} 