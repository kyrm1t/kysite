import React, { useEffect, useState, useCallback, useMemo } from 'react'
import './ImageModal.css'

function ImageModal({ images, imageSrc, imageAlt, onClose, initialIndex = 0 }) {
  const list = useMemo(() => {
    if (Array.isArray(images) && images.length > 0) return images
    if (imageSrc) return [imageSrc]
    return []
  }, [images, imageSrc])

  const [idx, setIdx] = useState(0)
  const listKey = list.join('|')

  useEffect(() => {
    const max = Math.max(0, list.length - 1)
    const i = Math.min(Math.max(0, initialIndex), max)
    setIdx(i)
  }, [initialIndex, list.length, listKey])

  const goPrev = useCallback(() => {
    if (list.length <= 1) return
    setIdx((i) => (i <= 0 ? list.length - 1 : i - 1))
  }, [list.length])

  const goNext = useCallback(() => {
    if (list.length <= 1) return
    setIdx((i) => (i >= list.length - 1 ? 0 : i + 1))
  }, [list.length])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (list.length <= 1) return
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, list.length, goPrev, goNext])

  const current = list[idx]
  const showNav = list.length > 1
  const altText =
    showNav && imageAlt
      ? `${imageAlt} — ${idx + 1} of ${list.length}`
      : imageAlt || ''

  if (!current) return null

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="image-modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>
        {showNav ? (
          <button
            type="button"
            className="image-modal-nav image-modal-nav--prev"
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
        ) : null}
        <img src={current} alt={altText} className="image-modal-image" />
        {showNav ? (
          <button
            type="button"
            className="image-modal-nav image-modal-nav--next"
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Next image"
          >
            ›
          </button>
        ) : null}
        {showNav ? (
          <div className="image-modal-counter" aria-live="polite">
            {idx + 1} / {list.length}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ImageModal
