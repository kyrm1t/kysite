import React, { useEffect, useRef, useState, useCallback } from 'react'
import './Paintings.css'
import AnimatedHeader from './AnimatedHeader'
import ImageModal from './ImageModal'

function Paintings({ onNavigateHome }) {
  // All images from the public/images folder
  const imageNames = [
    'night-2.JPG',
    'donuts.JPG',
    'acidum-fortuna.JPG',
    'bubber.JPG',
    'summer-sun.JPG',
    'self-portrait.JPG',
    'sun.JPG',
    'fall-church.JPG',
    'space-objs.JPG', 
    'self-portrait2.JPG',
    'studying-slew.JPG',
    '20230903_140605.JPG',
    'studying-nyc.JPG',
    '20230903_140618~2.JPG',
    '20230903_140712.JPG',
    'Evening Sun, Kyriell Paris-Agafonov, Oil on Canvas Board, 10x8, $350.JPG',
    'night-talk.JPG',
    'chick-big.JPG',
    'Fade Fast, Kyriell Paris-Agafonov, Oil on Woodboard, 12x9, $500.JPG',
    'Magpie & Peacock, Kyriell Paris-Agafonov, Mixed Media on Woodboard, 12x18, $700.jpg',
    'Reclaim, Kyriell Paris-Agafonov, Oil on Woodboard, 6x6, $200.JPG',
    'Still Burning, Kyriell Paris-Agafonov, Mixed Media on Woodboard, 22x34, $2500.JPG',
    'Xander, Kyriell Paris-Agafonov, Mixed Media on Woodboard, 10x10, $400.JPG',
    'Egg, Kyriell Paris-Agafonov, Mixed Media on Woodboard, 10x10, $400.JPG',
    'Edgar, Kyriell Paris-Agafonov, Mixed Media on Woodboard, 10x10, $400.JPG',
    'Josephine, Kyriell Paris-Agafonov, Mixed Media on Woodboard, 10x10, $400.JPG',
    'Called Before Dawn, Kyriell Paris-Agafonov, Mixed Media on Woodboard, 30x24, $1200.JPG',
    '20240930_194634~2.JPG',
    'Time to Fade Out, Kyriell Paris-Agafonov, Oil on Woodboard, 12x12, $500.JPG',
    'Two Tailed Tale, Kyriell Paris-Agafonov, Mixed Media on Woodboard, 30x30, $2000.jpg',
    'Bubblegum Breakup, Kyriell Paris-Agafonov, Mixed Media on Woodboard, 24x30, $1500.JPG',
    'studying-3.JPG',
    '20230825_182301~2.JPG',
    '20240521_140631~2.JPG',
    '20240521_141402~3.JPG',
    'aasquare.JPG',
    'Take Two, Kyriell Paris-Agafonov, Mixed Media on Woodboard, 12x16, $60.JPG',
    'IMG_20220101_143431_640.jpg',
    'IMG_20220123_180418_458.jpg',
    'PXL_20210503_230954676~3.jpg',
    'PXL_20210528_200947442~3.jpg',
    'PXL_20210808_171421204~2.jpg',
  ]

  const galleryRef = useRef(null)
  const [loadedImages, setLoadedImages] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const positionImagesRef = useRef(null)

  const positionImages = useCallback(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    const items = Array.from(gallery.querySelectorAll('.gallery-item'))
    if (items.length === 0) return

    const gap = window.innerWidth <= 768 ? 24 : 32
    
    // Get the actual available width, accounting for padding
    const isMobile = window.innerWidth <= 480
    const isTablet = window.innerWidth <= 768
    const padding = isMobile ? 16 : isTablet ? 24 : 32
    const containerWidth = gallery.offsetWidth || gallery.clientWidth || gallery.parentElement?.offsetWidth || window.innerWidth - (padding * 2)
    if (containerWidth === 0 || containerWidth < 200) return
    
    let minColumnWidth = 250
    
    if (isMobile) {
      minColumnWidth = Math.max(280, containerWidth - padding)
    } else if (isTablet) {
      minColumnWidth = 220
    }
    
    // Calculate optimal number of columns - max 4 columns on desktop
    const numColumns = window.innerWidth > 768 
      ? Math.min(4, Math.max(2, Math.floor((containerWidth + gap) / (minColumnWidth + gap))))
      : window.innerWidth <= 480 
        ? 1 
        : Math.max(2, Math.floor((containerWidth + gap) / (minColumnWidth + gap)))
    
    const actualColumnWidth = numColumns === 1 
      ? containerWidth 
      : (containerWidth - (gap * (numColumns - 1))) / numColumns

    const columnHeights = new Array(numColumns).fill(0)
    let positionedCount = 0

    items.forEach((item) => {
      const img = item.querySelector('img')
      if (!img) return
      
      // Wait for image to load if not already loaded
      if (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
        if (!img.hasAttribute('data-loading-handled')) {
          img.setAttribute('data-loading-handled', 'true')
          img.onload = () => {
            positionImages()
          }
        }
        return
      }

      const aspectRatio = img.naturalHeight / img.naturalWidth
      const imgHeight = aspectRatio * actualColumnWidth
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights))
      
      item.style.position = 'absolute'
      item.style.width = `${actualColumnWidth}px`
      item.style.left = `${shortestColumn * (actualColumnWidth + gap)}px`
      item.style.top = `${columnHeights[shortestColumn]}px`
      item.classList.add('loaded')
      
      columnHeights[shortestColumn] += imgHeight + gap
      positionedCount++
    })

    const maxHeight = Math.max(...columnHeights, 0)
    if (maxHeight > 0 && positionedCount > 0) {
      gallery.style.height = `${maxHeight}px`
    }
  }, [])

  positionImagesRef.current = positionImages

  useEffect(() => {
    const handleResize = () => {
      if (galleryRef.current && positionImagesRef.current) {
        positionImagesRef.current()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    // Initial positioning attempt after a short delay
    if (galleryRef.current && positionImagesRef.current) {
      const timer = setTimeout(() => {
        positionImagesRef.current()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [positionImages])

  const handleImageLoad = () => {
    setLoadedImages(prev => {
      const newCount = prev + 1
      if (positionImagesRef.current) {
        setTimeout(() => {
          positionImagesRef.current()
        }, newCount === imageNames.length ? 200 : 50)
      }
      return newCount
    })
  }

  return (
    <div className="Paintings">
      <AnimatedHeader className="paintings-title">Paintings</AnimatedHeader>
      <div ref={galleryRef} className="gallery">
        {imageNames.length > 0 ? (
          imageNames.map((imageName, index) => (
            <div 
              key={index} 
              className="gallery-item"
              onClick={() => setSelectedImage(`/images/${imageName}`)}
            >
              <img 
                src={`/images/${imageName}`} 
                alt={`Artwork ${index + 1}`}
                loading="lazy"
                onLoad={handleImageLoad}
              />
            </div>
          ))
        ) : (
          <div className="placeholder-message"> 
            <p>Add your artwork images to the <code>public/images</code> folder</p>
            <p>Then update the <code>imageNames</code> array in <code>src/Paintings.jsx</code></p>
          </div>
        )}
      </div>
      {selectedImage && (
        <ImageModal
          imageSrc={selectedImage}
          imageAlt="Artwork"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}

export default Paintings
