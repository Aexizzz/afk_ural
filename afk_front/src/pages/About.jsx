import './About.css'
import Reveal from '../components/Reveal'
import Editable from '../components/Editable'
import { useSEO } from '../hooks/useSEO'
import StructuredData, { BreadcrumbData } from '../components/StructuredData'

export default function About() {
  // SEO настройки для страницы "О нас"
  useSEO({
    title: 'Как мы работаем — ООО АФК «Урал» | Процесс производства металлоизделий',
    description: 'Узнайте, как работает ООО АФК «Урал»: от вашей идеи до готового изделия. Профессиональная металлообработка в Екатеринбурге. Лазерная резка, гибка, сварка, окрашивание.',
    keywords: 'как мы работаем, процесс производства, металлообработка, лазерная резка, гибка металла, сварка, окрашивание, Екатеринбург, АФК Урал',
    canonical: 'https://afk-ural.ru/about',
    ogImage: 'https://afk-ural.ru/src/assets/logo_afk.jpg'
  })

  const breadcrumbData = BreadcrumbData([
    { name: 'Главная', url: 'https://afk-ural.ru/' },
    { name: 'Как мы работаем', url: 'https://afk-ural.ru/about' }
  ])
  return (
    <>
      <StructuredData data={breadcrumbData} />
      <section className="about">
      <Reveal as="div" className="about-hero">
        <div className="container">
          <Editable pageKey="about" blockKey="title" tag="h1" className="about-title" placeholder="О нас" />
          <Editable pageKey="about" blockKey="subtitle" tag="p" className="about-subtitle" placeholder="Как мы работаем — от вашей идеи до готового изделия" />
        </div>
      </Reveal>

      <div className="container">
        <div className="flow">
          <Reveal className="flow-item" y={16}>
            <div className="flow-node">
              <div className="step">1</div>
              <Editable pageKey="about" blockKey="step1_title" tag="h3" placeholder="Присылаете чертёж или фото от руки" />
              <Editable pageKey="about" blockKey="step1_text" tag="p" placeholder="Текст шага 1" />
            </div>
            <div className="connector">
              <span className="arrow" />
            </div>
          </Reveal>

          <Reveal className="flow-item" y={16} delay={80}>
            <div className="flow-node">
              <div className="step">2</div>
              <Editable pageKey="about" blockKey="step2_title" tag="h3" placeholder="Уточняем детали и делаем точный расчёт" />
              <Editable pageKey="about" blockKey="step2_text1" tag="p" placeholder="Краткое описание" />
              <Editable pageKey="about" blockKey="step2_text2" tag="p" placeholder="Подробности" />
            </div>
            <div className="connector">
              <span className="arrow" />
            </div>
          </Reveal>

          <Reveal className="flow-item" y={16} delay={140}>
            <div className="flow-node">
              <div className="step">3</div>
              <Editable pageKey="about" blockKey="step3_title" tag="h3" placeholder="Запускаем в работу и доставляем результат" />
              <Editable pageKey="about" blockKey="step3_text" tag="p" placeholder="Описание шага 3" />
            </div>
          </Reveal>
        </div>

        <Reveal className="cta card" y={18}>
          <Editable pageKey="about" blockKey="cta_title" tag="h3" placeholder="Готовы начать?" />
          <Editable pageKey="about" blockKey="cta_text" tag="p" placeholder="Призыв к действию" />
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
    </>
  )
} 