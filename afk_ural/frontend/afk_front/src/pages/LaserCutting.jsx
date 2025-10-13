import React from 'react';
import Reveal from '../components/Reveal';
import Editable from '../components/Editable';
import '../styles/services.css';
import './LaserCutting.css';

const LaserCutting = () => {
  return (
    <div className="laser service-page">
      <Reveal>
        <section className="laser-hero service-hero">
          <div className="container">
            <Editable pageKey="laser" blockKey="title" tag="h1" className="laser-title service-title" placeholder="Лазерная резка" />
            <Editable pageKey="laser" blockKey="subtitle" tag="p" className="laser-subtitle service-subtitle" placeholder="Современное оборудование для точной резки металла" />
          </div>
        </section>
      </Reveal>

      <div className="container">
        <Reveal>
          <div className="card">
            <Editable pageKey="laser" blockKey="equip_title" tag="h2" placeholder="Оборудование IRON MAC 3015D-EP Т6" />
            <Editable pageKey="laser" blockKey="equip_muted" tag="p" className="muted" placeholder="Краткое описание оборудования" />
            
            <div className="specs-grid">
              <div className="spec-card">
                <Editable pageKey="laser" blockKey="specs_title" tag="h3" placeholder="Технические характеристики" />
                <ul>
                  <li><Editable pageKey="laser" blockKey="specs_li1" tag="span" placeholder="Мощность лазера: 6 кВт" /></li>
                  <li><Editable pageKey="laser" blockKey="specs_li2" tag="span" placeholder="Рабочая область: 3000×1500 мм" /></li>
                  <li><Editable pageKey="laser" blockKey="specs_li3" tag="span" placeholder="Толщина резки: до 25 мм" /></li>
                  <li><Editable pageKey="laser" blockKey="specs_li4" tag="span" placeholder="Точность позиционирования: ±0.1 мм" /></li>
                </ul>
              </div>
              <div className="spec-card">
                <Editable pageKey="laser" blockKey="cap_title" tag="h3" placeholder="Возможности" />
                <ul>
                  <li><Editable pageKey="laser" blockKey="cap_li1" tag="span" placeholder="Резка различных металлов" /></li>
                  <li><Editable pageKey="laser" blockKey="cap_li2" tag="span" placeholder="Сложные геометрические формы" /></li>
                  <li><Editable pageKey="laser" blockKey="cap_li3" tag="span" placeholder="Высокое качество кромки" /></li>
                  <li><Editable pageKey="laser" blockKey="cap_li4" tag="span" placeholder="Минимальные отходы материала" /></li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="card">
            <Editable pageKey="laser" blockKey="adv_title" tag="h2" placeholder="Преимущества лазерной резки" />
            <div className="features-grid">
              <div className="feature">
                <Editable pageKey="laser" blockKey="adv1_title" tag="h4" placeholder="Точность" />
                <Editable pageKey="laser" blockKey="adv1_text" tag="p" placeholder="Высокая точность резки с минимальными допусками" />
              </div>
              <div className="feature">
                <Editable pageKey="laser" blockKey="adv2_title" tag="h4" placeholder="Скорость" />
                <Editable pageKey="laser" blockKey="adv2_text" tag="p" placeholder="Быстрая обработка деталей любой сложности" />
              </div>
              <div className="feature">
                <Editable pageKey="laser" blockKey="adv3_title" tag="h4" placeholder="Качество" />
                <Editable pageKey="laser" blockKey="adv3_text" tag="p" placeholder="Чистые кромки без дополнительной обработки" />
              </div>
            </div>
          </div>
        </Reveal>

        

        <Reveal>
          <div className="card cta">
            <Editable pageKey="laser" blockKey="cta_title" tag="h3" placeholder="Готовы к сотрудничеству?" />
            <Editable pageKey="laser" blockKey="cta_text" tag="p" placeholder="Свяжитесь с нами для обсуждения вашего проекта" />
            <a href="/contacts" className="btn">Оставить заявку</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default LaserCutting; 