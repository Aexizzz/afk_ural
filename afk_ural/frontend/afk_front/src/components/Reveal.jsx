import { useEffect, useRef, useState } from 'react'
import './reveal.css'

export default function Reveal({ children, as: Tag = 'div', delay = 0, y = 16, once = true, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (once) observer.unobserve(el)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once])

  const style = {
    '--reveal-delay': `${delay}ms`,
    '--reveal-translate-y': `${y}px`
  }

  return (
    <Tag ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  )
} 