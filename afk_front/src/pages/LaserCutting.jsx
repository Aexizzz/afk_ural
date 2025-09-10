import React from 'react';
import Reveal from '../components/Reveal';
import '../styles/services.css';
import './LaserCutting.css';

const LaserCutting = () => {
  return (
    <div className="laser service-page">
      <Reveal>
        <section className="laser-hero service-hero">
          <div className="container">
            <h1 className="laser-title service-title">Лазерная резка</h1>
            <p className="laser-subtitle service-subtitle">Современное оборудование для точной резки металла</p>
          </div>
        </section>
      </Reveal>

      <div className="container">
        <Reveal>
          <div className="card">
            <h2>Оборудование IRON MAC 3015D-EP Т6</h2>
            <p className="muted">Высокоточная лазерная резка с использованием современного оборудования</p>
            
            <div className="specs-grid">
              <div className="spec-card">
                <h3>Технические характеристики</h3>
                <ul>
                  <li>Мощность лазера: 6 кВт</li>
                  <li>Рабочая область: 3000×1500 мм</li>
                  <li>Толщина резки: до 25 мм</li>
                  <li>Точность позиционирования: ±0.1 мм</li>
                </ul>
              </div>
              <div className="spec-card">
                <h3>Возможности</h3>
                <ul>
                  <li>Резка различных металлов</li>
                  <li>Сложные геометрические формы</li>
                  <li>Высокое качество кромки</li>
                  <li>Минимальные отходы материала</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="card">
            <h2>Преимущества лазерной резки</h2>
            <div className="features-grid">
              <div className="feature">
                <h4>Точность</h4>
                <p>Высокая точность резки с минимальными допусками</p>
              </div>
              <div className="feature">
                <h4>Скорость</h4>
                <p>Быстрая обработка деталей любой сложности</p>
              </div>
              <div className="feature">
                <h4>Качество</h4>
                <p>Чистые кромки без дополнительной обработки</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="card">
            <h2>Процесс работы</h2>
            <p>Лазерная резка выполняется с использованием сфокусированного лазерного луча, который плавит и испаряет материал по заданной траектории. Процесс контролируется компьютером, что обеспечивает высокую точность и повторяемость.</p>
            
            <div className="note">
              <strong>Важно:</strong> Для получения оптимального результата необходимо предоставить точные чертежи или CAD-модели деталей.
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="card cta">
            <h3>Готовы к сотрудничеству?</h3>
            <p>Свяжитесь с нами для обсуждения вашего проекта</p>
            <a href="/contacts" className="btn">Оставить заявку</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default LaserCutting; 