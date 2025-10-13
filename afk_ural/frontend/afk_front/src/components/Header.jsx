import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import logo from '../assets/logo_afk.jpg'

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleMobile = () => setIsMobileOpen(v => !v)
  const closeMobile = () => setIsMobileOpen(false)

  return (
    <nav className="header">
      <div className="brand">
        <Link to="/" aria-label="АФК УРАЛ" onClick={closeMobile}>
          <img src={logo} alt="АФК УРАЛ" className="brand-logo" />
        </Link>
      </div>

      <button
        className="mobile-menu-toggle"
        aria-label="Меню"
        aria-expanded={isMobileOpen}
        onClick={toggleMobile}
      >
        ☰
      </button>

      <ul className={`nav ${isMobileOpen ? 'mobile-open' : ''}`}>
        <li className="dropdown">
          <button className="dropbtn">О компании</button>
          <div className="dropdown-content">
            <Link to="/products" onClick={closeMobile}>Продукция</Link>
            <Link to="/about" onClick={closeMobile}>Как мы работаем</Link>
            <Link to="/contacts" onClick={closeMobile}>Контакты</Link>
            <Link to="/requisites" onClick={closeMobile}>Реквизиты</Link>
            <Link to="/suppliers" onClick={closeMobile}>Поставщикам</Link>
          </div>
        </li>
        <li className="dropdown">
          <button className="dropbtn">Металлообработка</button>
          <div className="dropdown-content">
            <Link to="/metalworking/laser-cutting" onClick={closeMobile}>Лазерная резка</Link>
            <Link to="/metalworking/sheet-bending" onClick={closeMobile}>Гибка листового металла</Link>
            <Link to="/metalworking/welding" onClick={closeMobile}>Сварочные работы</Link>
          </div>
        </li>
        <li className="dropdown">
          <button className="dropbtn">Услуги окрашивания</button>
          <div className="dropdown-content">
            <Link to="/painting/powder" onClick={closeMobile}>Порошковое окрашивание</Link>
            <Link to="/painting/liquid" onClick={closeMobile}>Жидкое окрашивание</Link>
          </div>
        </li>
        <li>
          <Link to="/contacts" onClick={closeMobile}><button className="dropbtn">Контакты</button></Link>
        </li>
      </ul>
    </nav>
  )
} 