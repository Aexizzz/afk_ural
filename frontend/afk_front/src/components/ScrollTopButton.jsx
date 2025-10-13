import { useEffect, useState } from 'react'
import './scrolltop.css'

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`scrolltop ${visible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Вернуться наверх"
    >
      ↑
    </button>
  )
} 