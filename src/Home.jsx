import React from 'react'
import './Home.css'

function Home({ onNavigateToPaintings }) {
  // Featured images to show on landing page (first few images)
  const featuredImages = [
    'night-2.JPG',
    'self-zoom.JPG',
    'donut-brown.JPG'
  ]

  return (
    <div className="Home">
      <header className="App-header">
        <h1>Kyriell Paris-Agafonov</h1>
      </header>
      {featuredImages.length > 0 && (
        <div className="view-all-container">
          <button className="view-all-button" onClick={onNavigateToPaintings}>
            View All Paintings →
          </button>
        </div>
      )}
      {featuredImages.length > 0 && (
        <div className="featured-gallery">
          {featuredImages.map((imageName, index) => (
            <div key={index} className="featured-item">
              <img 
                src={`/images/${imageName}`} 
                alt={`Featured artwork ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
