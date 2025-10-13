import './Products.css'
import Reveal from '../components/Reveal'
import Editable from '../components/Editable'
import EditableGallery from '../components/EditableGallery'

export default function Products() {
  return (
    <section className="products">
      <Reveal as="div" className="products-hero">
        <div className="container">
          <Editable pageKey="products" blockKey="title" tag="h1" className="products-title" placeholder="Продукция" />
          <Editable pageKey="products" blockKey="subtitle" tag="p" className="products-subtitle" placeholder="Официальный сайт ООО АФК «Урал»" />
        </div>
      </Reveal>

      <div className="container">
        <Reveal className="products-intro card" y={22}>
          <Editable pageKey="products" blockKey="intro_title" tag="h2" placeholder="О компании" />
          <Editable pageKey="products" blockKey="intro_p1" tag="p" placeholder="Первый абзац" />
          <Editable pageKey="products" blockKey="intro_p2" tag="p" placeholder="Второй абзац" />
          <Editable pageKey="products" blockKey="intro_p3" tag="p" placeholder="Третий абзац" />
          <Editable pageKey="products" blockKey="intro_p4" tag="p" placeholder="Четвертый абзац" />
          <Editable pageKey="products" blockKey="intro_p5" tag="p" placeholder="Пятый абзац" />
        </Reveal>

        <Reveal y={22}>
          <EditableGallery pageKey="products" />
        </Reveal>

        <Reveal className="cta card" y={22}>
          <Editable pageKey="products" blockKey="cta_title" tag="h3" placeholder="Нужна консультация?" />
          <Editable pageKey="products" blockKey="cta_text" tag="p" placeholder="Призыв к действию" />
          <a className="btn" href="/contacts">Оставить заявку</a>
        </Reveal>
      </div>
    </section>
  )
} 