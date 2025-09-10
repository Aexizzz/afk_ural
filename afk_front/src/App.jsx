import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header.jsx'
import Products from './pages/Products.jsx'
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
          {/* Редирект с корня на О нас */}
          <Route path="/" element={<Navigate to="/about" replace />} />

          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/metalworking/laser-cutting" element={<LaserCutting />} />
          <Route path="/metalworking/sheet-bending" element={<SheetMetalBending />} />
          <Route path="/metalworking/welding" element={<Welding />} />
          <Route path="/painting/powder" element={<PowderCoating />} />
          <Route path="/painting/liquid" element={<LiquidCoating />} />
          {/* Любой неизвестный путь тоже на О нас */}
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </main>
      <ScrollTopButton />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
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
