import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header.jsx'
import Products from './pages/Products.jsx'
import Home from './pages/Home.jsx'
import Privacy from './pages/Privacy.jsx'
import Requisites from './pages/Requisites.jsx'
import About from './pages/About.jsx'
import Suppliers from './pages/Suppliers.jsx'
import Contacts from './pages/Contacts.jsx'
import LaserCutting from './pages/LaserCutting.jsx'
import SheetMetalBending from './pages/SheetMetalBending.jsx'
import Welding from './pages/Welding.jsx'
import PowderCoating from './pages/PowderCoating.jsx'
import LiquidCoating from './pages/LiquidCoating.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import ScrollTopButton from './components/ScrollTopButton'
import SEOOptimizer from './components/SEOOptimizer'
import { useEffect } from 'react'

function ScrollToTopOnRoute() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function AppShell() {
  return (
    <>
      <Header />
      <main style={{ padding: '16px' }}>
        <ScrollToTopOnRoute />
        <Routes>
          {/* Главная */}
          <Route path="/" element={<Home />} />
          {/* Страница "Как мы работаем" (бывшее О нас) */}
          <Route path="/about" element={<About />} />
          {/* Скрытая страница политики конфиденциальности */}
          <Route path="/privacy" element={<Privacy />} />
          {/* Реквизиты */}
          <Route path="/requisites" element={<Requisites />} />

          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/metalworking/laser-cutting" element={<LaserCutting />} />
          <Route path="/metalworking/sheet-bending" element={<SheetMetalBending />} />
          <Route path="/metalworking/welding" element={<Welding />} />
          <Route path="/painting/powder" element={<PowderCoating />} />
          <Route path="/painting/liquid" element={<LiquidCoating />} />
          {/* Любой неизвестный путь тоже на главную */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <ScrollTopButton />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <SEOOptimizer />
      <Routes>
        {/* Админ-панель - доступна только по прямому URL */}
        <Route path="/admin" element={<AdminPanel />} />
        {/* Основной сайт */}
        <Route path="/*" element={<AppShell />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
