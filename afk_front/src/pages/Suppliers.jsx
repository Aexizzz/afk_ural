import './Suppliers.css'
import Reveal from '../components/Reveal'
import Editable from '../components/Editable'

export default function Suppliers() {
  return (
    <section className="suppliers">
      <Reveal as="div" className="suppliers-hero">
        <div className="container">
          <Editable pageKey="suppliers" blockKey="title" tag="h1" className="suppliers-title" placeholder="Поставщикам" />
          <Editable pageKey="suppliers" blockKey="subtitle" tag="p" className="suppliers-subtitle" placeholder="Партнёрство и надежные поставки материалов и ЛКМ" />
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="card proposal" y={18}>
          <Editable pageKey="suppliers" blockKey="block1_title" tag="h2" placeholder="Предложения по поставкам" />
          <Editable pageKey="suppliers" blockKey="block1_p1" tag="p" placeholder="Текст блока" />
          <p>
            Почта: <a href="mailto:office@afkural.ru"><Editable pageKey="suppliers" blockKey="email" tag="span" placeholder="office@afkural.ru" /></a>
          </p>
        </Reveal>

        <Reveal className="card requirements" y={18}>
          <Editable pageKey="suppliers" blockKey="block2_title" tag="h2" placeholder="Что важно в предложении" />
          <ul className="list">
            <li><Editable pageKey="suppliers" blockKey="req1" tag="span" placeholder="Ассортимент и объёмы" /></li>
            <li><Editable pageKey="suppliers" blockKey="req2" tag="span" placeholder="Условия и сроки" /></li>
            <li><Editable pageKey="suppliers" blockKey="req3" tag="span" placeholder="Цены и оплата" /></li>
            <li><Editable pageKey="suppliers" blockKey="req4" tag="span" placeholder="Сертификаты и документы" /></li>
          </ul>
        </Reveal>

        <Reveal className="cta card" y={20}>
          <Editable pageKey="suppliers" blockKey="cta_title" tag="h3" placeholder="Готовы сотрудничать" />
          <Editable pageKey="suppliers" blockKey="cta_text" tag="p" placeholder="Ждём ваши предложения" />
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
  )
} 