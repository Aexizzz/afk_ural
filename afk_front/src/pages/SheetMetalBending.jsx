import React from 'react';
import Reveal from '../components/Reveal';
import '../styles/services.css';
import './SheetMetalBending.css';

const SheetMetalBending = () => {
  return (
    <div className="sheet-bending service-page">
      <Reveal>
        <section className="sheet-bending-hero service-hero">
          <div className="container">
            <h1 className="sheet-bending-title service-title">Гибка листового металла</h1>
            <p className="sheet-bending-subtitle service-subtitle">Профессиональная гибка металла на современном оборудовании</p>
          </div>
        </section>
      </Reveal>

      <div className="container">
        <Reveal>
          <div className="card">
            <h2>Оборудование PBA 170-3200-4С</h2>
            <p className="muted">Листогибочный гидравлический пресс с ЧПУ для точной гибки металла</p>
            
            <div className="specs-grid">
              <div className="spec-card">
                <h3>Технические характеристики</h3>
                <ul>
                  <li>Длина пуансона: 3200 мм</li>
                  <li>Максимальная толщина: 10 мм</li>
                  <li>Система ЧПУ: ESA630</li>
                  <li>Компенсация прогиба: Y1 Y2 X R</li>
                </ul>
              </div>
              <div className="spec-card">
                <h3>Возможности</h3>
                <ul>
                  <li>Гибка под различными углами</li>
                  <li>Обработка листов большой длины</li>
                  <li>Высокая точность углов</li>
                  <li>Автоматическая компенсация</li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="card">
            <h2>Преимущества гибки на прессе</h2>
            <div className="features-grid">
              <div className="feature">
                <h4>Точность</h4>
                <p>Высокая точность углов гибки с минимальными отклонениями</p>
              </div>
              <div className="feature">
                <h4>Производительность</h4>
                <p>Быстрая обработка деталей различной сложности</p>
              </div>
              <div className="feature">
                <h4>Качество</h4>
                <p>Отсутствие деформаций и царапин на поверхности</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="card">
            <h2>Процесс работы</h2>
            <p>Гибка листового металла выполняется на гидравлическом прессе с использованием специальных пуансонов и матриц. Система ЧПУ обеспечивает точное позиционирование и контроль углов гибки.</p>
            
            <div className="note">
              <strong>Важно:</strong> Для получения точного результата необходимо учитывать особенности материала и толщину листа при расчете углов гибки.
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="card cta">
            <h3>Нужна гибка металла?</h3>
            <p>Свяжитесь с нами для обсуждения вашего проекта</p>
            <a href="/contacts" className="btn">Оставить заявку</a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default SheetMetalBending; 