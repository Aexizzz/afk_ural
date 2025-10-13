import Reveal from '../components/Reveal'
import Editable from '../components/Editable'

export default function Requisites() {
  return (
    <section className="requisites">
      <Reveal as="div" className="requisites-hero">
        <div className="container">
          <Editable pageKey="requisites" blockKey="title" tag="h1" className="requisites-title" placeholder="Реквизиты" />
          <Editable pageKey="requisites" blockKey="subtitle" tag="p" className="requisites-subtitle" placeholder="ООО АФК «Урал»" />
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="card" y={18}>
          <Editable pageKey="requisites" blockKey="card_title" tag="h2" placeholder="Карточка предприятия" />
          
          <div className="requisites-section">
            <Editable pageKey="requisites" blockKey="name_h" tag="h3" placeholder="Наименование" />
            <p><strong>Полное наименование:</strong> <Editable pageKey="requisites" blockKey="name_full" tag="span" placeholder="Общество с ограниченной ответственностью АФК «Урал»" /></p>
            <p><strong>Сокращенное наименование:</strong> <Editable pageKey="requisites" blockKey="name_short" tag="span" placeholder="ООО АФК «Урал»" /></p>
          </div>

          <div className="requisites-section">
            <Editable pageKey="requisites" blockKey="reg_h" tag="h3" placeholder="Регистрационные данные" />
            <p><strong>ИНН/КПП:</strong> <Editable pageKey="requisites" blockKey="innkpp" tag="span" placeholder="7447206357/745101001" /></p>
            <p><strong>ОГРН:</strong> <Editable pageKey="requisites" blockKey="ogrn" tag="span" placeholder="1127447003408" /></p>
            <p><strong>ОКТМО:</strong> <Editable pageKey="requisites" blockKey="oktmo" tag="span" placeholder="75701000001" /></p>
            <p><strong>ОКАТО:</strong> <Editable pageKey="requisites" blockKey="okato" tag="span" placeholder="75401376000" /></p>
            <p><strong>ОКПО:</strong> <Editable pageKey="requisites" blockKey="okpo" tag="span" placeholder="37885594" /></p>
          </div>

          <div className="requisites-section">
            <Editable pageKey="requisites" blockKey="addr_h" tag="h3" placeholder="Адреса" />
            <p><strong>Юридический адрес:</strong> <Editable pageKey="requisites" blockKey="addr_legal" tag="span" placeholder="454048, Челябинская область, ..." /></p>
            <p><strong>Почтовый адрес:</strong> <Editable pageKey="requisites" blockKey="addr_post" tag="span" placeholder="454111, г. Челябинск, ул. Монакова, д. 1" /></p>
          </div>

          <div className="requisites-section">
            <Editable pageKey="requisites" blockKey="bank_h" tag="h3" placeholder="Банковские реквизиты" />
            <p><strong>Банк:</strong> <Editable pageKey="requisites" blockKey="bank_name" tag="span" placeholder="ООО Банк Точка" /></p>
            <p><strong>БИК:</strong> <Editable pageKey="requisites" blockKey="bank_bik" tag="span" placeholder="044525104" /></p>
            <p><strong>Расчетный счет:</strong> <Editable pageKey="requisites" blockKey="bank_rs" tag="span" placeholder="40702810720000167578" /></p>
            <p><strong>Корреспондентский счет:</strong> <Editable pageKey="requisites" blockKey="bank_ks" tag="span" placeholder="30101810745374525104" /></p>
          </div>

          <div className="requisites-section">
            <Editable pageKey="requisites" blockKey="contacts_h" tag="h3" placeholder="Руководство и контакты" />
            <p><strong>Генеральный директор:</strong> <Editable pageKey="requisites" blockKey="ceo" tag="span" placeholder="Мелихов Михаил Владимирович" /></p>
            <p><strong>Телефон:</strong> <a href="tel:+79227018941"><Editable pageKey="requisites" blockKey="phone" tag="span" placeholder="8 922 701 89 41" /></a></p>
            <p><strong>Email:</strong> <a href="mailto:office@afkural.ru"><Editable pageKey="requisites" blockKey="email" tag="span" placeholder="office@afkural.ru" /></a></p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


