import { useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

export default function Editable({ pageKey, blockKey, contentType = 'text', tag = 'div', className, placeholder = 'Нажмите для редактирования' }) {
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [value, setValue] = useState('')
  const [blockId, setBlockId] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const editorRef = useRef(null)

  const Tag = useMemo(() => tag, [tag])

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        setLoading(true)
        const resp = await axios.get(`/content-blocks/?page_key=${encodeURIComponent(pageKey)}`)
        const list = Array.isArray(resp.data) ? resp.data : (resp.data?.results || [])
        const found = list.find(b => b.block_key === blockKey)
        if (found) {
          setBlockId(found.id)
          setValue(found.content || '')
        } else {
          setBlockId(null)
          setValue('')
        }
      } catch (e) {
        console.error('Ошибка загрузки контента', e)
      } finally {
        setLoading(false)
      }
    }
    fetchBlock()
  }, [pageKey, blockKey])

  const save = async (next) => {
    try {
      setSaving(true)
      if (blockId) {
        await axios.patch(`/content-blocks/${blockId}/`, { content: next, content_type: contentType })
      } else {
        try {
          const resp = await axios.post(`/content-blocks/`, { page_key: pageKey, block_key: blockKey, content: next, content_type: contentType })
          setBlockId(resp.data.id)
        } catch (e) {
          // Если уникальность сработала на бэке, пробуем найти блок и обновить
          const resp = await axios.get(`/content-blocks/?page_key=${encodeURIComponent(pageKey)}`)
          const list = Array.isArray(resp.data) ? resp.data : (resp.data?.results || [])
          const found = list.find(b => b.block_key === blockKey)
          if (found) {
            setBlockId(found.id)
            await axios.patch(`/content-blocks/${found.id}/`, { content: next, content_type: contentType })
          } else {
            throw e
          }
        }
      }
    } catch (e) {
      console.error('Ошибка сохранения контента', e)
    } finally {
      setSaving(false)
    }
  }

  const onBlur = async () => {
    if (!isAuthenticated) return
    const next = editorRef.current?.innerText ?? ''
    if (next !== value) {
      setValue(next)
      await save(next)
    }
    setIsEditing(false)
  }

  if (loading && !value) {
    return <Tag className={className} style={{opacity:.6}}>{placeholder}</Tag>
  }

  if (!isAuthenticated) {
    return <Tag className={className}>{value || placeholder}</Tag>
  }

  return (
    <Tag
      className={className}
      contentEditable
      suppressContentEditableWarning
      ref={editorRef}
      onFocus={() => { setIsEditing(true); requestAnimationFrame(() => { if (editorRef.current && value) { const r = document.createRange(); r.selectNodeContents(editorRef.current); const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r); } }) }}
      onBlur={onBlur}
      data-editable="true"
      style={{ outline: isEditing ? '2px solid rgba(31,111,235,.4)' : 'none', borderRadius: isEditing ? 6 : undefined, paddingInline: isEditing ? 2 : undefined }}
    >
      {value || placeholder}
      {saving && <span style={{marginLeft:8, fontSize:12, color:'#6b7280'}}>Сохранение…</span>}
    </Tag>
  )
}


