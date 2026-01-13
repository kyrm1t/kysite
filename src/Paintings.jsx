import React from 'react'
import './Paintings.css'

function Paintings({ onNavigateHome }) {
  // This will dynamically load all images from the public/images folder
  // For now, we'll use a placeholder approach that you can update with actual image names
  const imageNames = [
    // Add your image filenames here when you add images
    // Example: 'artwork1.jpg', 'artwork2.jpg', etc.
  ]

  return (
    <div className="Paintings">
      <h2 className="paintings-title">Paintings</h2>
      <div className="gallery">
        {imageNames.length > 0 ? (
          imageNames.map((imageName, index) => (
            <div key={index} className="gallery-item">
              <img 
                src={`/images/${imageName}`} 
                alt={`Artwork ${index + 1}`}
                loading="lazy"
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
    </div>
  )
}

export default Paintings
