import Reveal from '../components/Reveal'
import Editable from '../components/Editable'

export default function Privacy() {
  return (
    <section className="privacy">
      <Reveal as="div" className="privacy-hero">
        <div className="container">
          <Editable pageKey="privacy" blockKey="title" tag="h1" className="privacy-title" placeholder="Политика конфиденциальности" />
          <Editable pageKey="privacy" blockKey="subtitle" tag="p" className="privacy-subtitle" placeholder="ООО АФК «Урал»" />
        </div>
      </Reveal>

      <div className="container">
        <div className="card">
          <Editable pageKey="privacy" blockKey="p1" tag="p" placeholder="Текст 1" />
          <Editable pageKey="privacy" blockKey="p2" tag="p" placeholder="Текст 2" />
          <Editable pageKey="privacy" blockKey="h1" tag="h3" placeholder="1. Какие данные мы обрабатываем" />
          <ul>
            <li><Editable pageKey="privacy" blockKey="l1" tag="span" placeholder="ФИО" /></li>
            <li><Editable pageKey="privacy" blockKey="l2" tag="span" placeholder="Контактный телефон" /></li>
            <li><Editable pageKey="privacy" blockKey="l3" tag="span" placeholder="Адрес электронной почты" /></li>
            <li><Editable pageKey="privacy" blockKey="l4" tag="span" placeholder="Комментарий к заявке" /></li>
          </ul>
          <Editable pageKey="privacy" blockKey="h2" tag="h3" placeholder="2. Цели обработки" />
          <Editable pageKey="privacy" blockKey="p3" tag="p" placeholder="Текст о целях" />
          <Editable pageKey="privacy" blockKey="h3" tag="h3" placeholder="3. Передача данных" />
          <Editable pageKey="privacy" blockKey="p4" tag="p" placeholder="Текст о передаче" />
          <Editable pageKey="privacy" blockKey="h4" tag="h3" placeholder="4. Срок хранения" />
          <Editable pageKey="privacy" blockKey="p5" tag="p" placeholder="Текст о сроках" />
          <Editable pageKey="privacy" blockKey="h5" tag="h3" placeholder="5. Контакты оператора" />
          <Editable pageKey="privacy" blockKey="p6" tag="p" placeholder="ООО АФК «Урал». Email: office@afkural.ru" />
        </div>
      </div>
    </section>
  )
}


