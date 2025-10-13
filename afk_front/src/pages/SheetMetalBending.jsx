import React from 'react';
import Reveal from '../components/Reveal';
import '../styles/services.css';
import './SheetMetalBending.css';
import Editable from '../components/Editable';

const SheetMetalBending = () => {
  return (
    <div className="sheet-bending service-page">
      <Reveal>
        <section className="sheet-bending-hero service-hero">
          <div className="container">
            <Editable pageKey="bending" blockKey="title" tag="h1" className="sheet-bending-title service-title" placeholder="Гибка листового металла" />
            <Editable pageKey="bending" blockKey="subtitle" tag="p" className="sheet-bending-subtitle service-subtitle" placeholder="Профессиональная гибка металла на современном оборудовании" />
          </div>
        </section>
      </Reveal>

      <div className="container">
        <Reveal>
          <div className="card">
            <Editable pageKey="bending" blockKey="equip_title" tag="h2" placeholder="Оборудование PBA 170-3200-4С" />
            <Editable pageKey="bending" blockKey="equip_muted" tag="p" className="muted" placeholder="Листогибочный гидравлический пресс с ЧПУ" />
            
            <div className="specs-grid">
              <div className="spec-card">
                <Editable pageKey="bending" blockKey="specs_title" tag="h3" placeholder="Технические характеристики" />
                <ul>
                  <li><Editable pageKey="bending" blockKey="specs_li1" tag="span" placeholder="Длина пуансона: 3200 мм" /></li>
                  <li><Editable pageKey="bending" blockKey="specs_li2" tag="span" placeholder="Максимальная толщина: 10 мм" /></li>
                  <li><Editable pageKey="bending" blockKey="specs_li3" tag="span" placeholder="Система ЧПУ: ESA630" /></li>
                  <li><Editable pageKey="bending" blockKey="specs_li4" tag="span" placeholder="Компенсация прогиба: Y1 Y2 X R" /></li>
                </ul>
              </div>
              <div className="spec-card">
                <Editable pageKey="bending" blockKey="cap_title" tag="h3" placeholder="Возможности" />
                <ul>
                  <li><Editable pageKey="bending" blockKey="cap_li1" tag="span" placeholder="Гибка под различными углами" /></li>
                  <li><Editable pageKey="bending" blockKey="cap_li2" tag="span" placeholder="Обработка листов большой длины" /></li>
                  <li><Editable pageKey="bending" blockKey="cap_li3" tag="span" placeholder="Высокая точность углов" /></li>
                  <li><Editable pageKey="bending" blockKey="cap_li4" tag="span" placeholder="Автоматическая компенсация" /></li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="card">
            <Editable pageKey="bending" blockKey="adv_title" tag="h2" placeholder="Преимущества гибки на прессе" />
            <div className="features-grid">
              <div className="feature">
                <Editable pageKey="bending" blockKey="adv1_title" tag="h4" placeholder="Точность" />
                <Editable pageKey="bending" blockKey="adv1_text" tag="p" placeholder="Высокая точность углов гибки" />
              </div>
              <div className="feature">
                <Editable pageKey="bending" blockKey="adv2_title" tag="h4" placeholder="Производительность" />
                <Editable pageKey="bending" blockKey="adv2_text" tag="p" placeholder="Быстрая обработка деталей" />
              </div>
              <div className="feature">
                <Editable pageKey="bending" blockKey="adv3_title" tag="h4" placeholder="Качество" />
                <Editable pageKey="bending" blockKey="adv3_text" tag="p" placeholder="Отсутствие деформаций" />
              </div>
            </div>
          </div>
        </Reveal>

        

        <Reveal>
          <div className="card cta">
            <Editable pageKey="bending" blockKey="cta_title" tag="h3" placeholder="Нужна гибка металла?" />
            <Editable pageKey="bending" blockKey="cta_text" tag="p" placeholder="Свяжитесь с нами для обсуждения вашего проекта" />
            <a href="/contacts" className="btn">Оставить заявку</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default SheetMetalBending; 