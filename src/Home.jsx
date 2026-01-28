import React, { useEffect, useState } from 'react'
import './Home.css'
import ImageModal from './ImageModal'

function Home() {
  // Featured images to show on landing page (first few images)
  const featuredImages = [
    'night-2.JPG',
    'acidum-fortuna.JPG',
    'self-portrait.JPG',
  ]

  const [animatedLetters, setAnimatedLetters] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const name = 'Kyriell Paris-Agafonov'
  const letters = name.split('')

  useEffect(() => {
    // Select 3 random letters on mount
    const letterIndices = []
    const availableIndices = letters
      .map((letter, index) => letter !== ' ' ? index : null)
      .filter(index => index !== null)
    
    // Shuffle and pick 3
    const shuffled = [...availableIndices].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 3)
    
    setAnimatedLetters(selected)
    
    // Reset after animation
    const timer = setTimeout(() => {
      setAnimatedLetters([])
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="Home">
      <header className="App-header">
        <h1>
          {letters.map((letter, index) => (
            <span
              key={index}
              className={animatedLetters.includes(index) ? 'letter-rainbow-glitch' : ''}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
      </header>
      {featuredImages.length > 0 && (
        <div className="featured-gallery">
          {featuredImages.map((imageName, index) => (
            <div 
              key={index} 
              className="featured-item"
              onClick={() => setSelectedImage(`/images/${imageName}`)}
            >
              <img 
                src={`/images/${imageName}`} 
                alt={`Featured artwork ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
      {selectedImage && (
        <ImageModal
          imageSrc={selectedImage}
          imageAlt="Featured artwork"
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}

export default Home
