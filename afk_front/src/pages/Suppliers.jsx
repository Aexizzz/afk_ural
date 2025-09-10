import './Suppliers.css'
import Reveal from '../components/Reveal'

export default function Suppliers() {
  return (
    <section className="suppliers">
      <Reveal as="div" className="suppliers-hero">
        <div className="container">
          <h1 className="suppliers-title">Поставщикам</h1>
          <p className="suppliers-subtitle">Партнёрство и надежные поставки материалов и ЛКМ</p>
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="card proposal" y={18}>
          <h2>Предложения по поставкам</h2>
          <p>
            Готовы рассмотреть предложения по поставке металлопроката, ЛКП.
          </p>
          <p>
            Почта для направления предложений: <a href="mailto:office@afkural.ru">office@afkural.ru</a>
          </p>
        </Reveal>

        <Reveal className="card requirements" y={18}>
          <h2>Что важно в предложении</h2>
          <ul className="list">
            <li>Ассортимент, марка материала/тип ЛКМ и доступные объёмы</li>
            <li>Условия и сроки поставки, логистика</li>
            <li>Цены, условия оплаты и отсрочки</li>
            <li>Сертификаты качества и сопроводительная документация</li>
          </ul>
        </Reveal>

        <Reveal className="cta card" y={20}>
          <h3>Готовы сотрудничать</h3>
          <p>Ждём ваших коммерческих предложений на почту. Рассматриваем долгосрочных партнёров.</p>
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
  )
} 