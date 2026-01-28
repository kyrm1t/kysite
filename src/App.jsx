import React, { useState } from 'react'
import './App.css'
import Home from './Home'
import Paintings from './Paintings'
import AnimatedHeader from './AnimatedHeader'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'paintings':
        return <Paintings onNavigateHome={() => setCurrentPage('home')} />
      case 'shop':
        return (
          <div className="page-content">
            <AnimatedHeader>Shop</AnimatedHeader>
            <p>Coming soon...</p>
          </div>
        )
      case 'bio':
        return (
          <div className="page-content bio-page">
            <AnimatedHeader>Bio</AnimatedHeader>
            <div className="bio-container">
              <div className="bio-text">
                <p>Based in New York City, Kyriell is a multidisciplinary artist working primarily in oil paint, whose practice explores color, form, and perception through both traditional and technological means. His work moves fluidly between physical media—oil on canvas—and experimental approaches that incorporate technology and hardware to create immersive, evolving visual experiences.</p>
                <p>Kyriell has studied at the New York Academy of Art and the Art Students League of New York, participating in classes and workshops that ground his work in rigorous technical training. His work has been exhibited in galleries in New York City and Atlanta. Through layered compositions and heightened chromatic intensity, his paintings invite sustained looking and reward close attention, engaging viewers in a contemplative and visually expansive experience.</p>
              </div>
              <div className="bio-image-right">
                <img 
                  src="/images/painting-pac-park.jpg" 
                  alt="Painting at Pac Park"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )
      case 'contact':
        return (
          <div className="page-content">
            <AnimatedHeader>Contact</AnimatedHeader>
            <div className="contact-info">
              <div className="contact-item">
                <h3>Email</h3>
                <a href="mailto:sp3c114lk.art@gmail.com" className="contact-link">
                  sp3c114lk.art@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <h3>Instagram</h3>
                <a 
                  href="https://www.instagram.com/kyriell_art/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  @kyriell_art
                </a>
              </div>
            </div>
          </div>
        )
      default:
        return <Home />
    }
  }

  return (
    <div className="App">
      {currentPage !== 'home' && (
        <button 
          className="home-name-button"
          onClick={() => setCurrentPage('home')}
          aria-label="Home"
        >
          <span className="home-button-text">Kyriell Paris-Agafonov</span>
          <svg className="home-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
      <nav className="App-nav">
        <button 
          className={`nav-button ${currentPage === 'paintings' ? 'active' : ''}`}
          onClick={() => setCurrentPage('paintings')}
        >
          Paintings
        </button>
        <button 
          className={`nav-button ${currentPage === 'bio' ? 'active' : ''}`}
          onClick={() => setCurrentPage('bio')}
        >
          Bio
        </button>
        <button 
          className={`nav-button ${currentPage === 'shop' ? 'active' : ''}`}
          onClick={() => setCurrentPage('shop')}
        >
          Shop
        </button>
        <button 
          className={`nav-button ${currentPage === 'contact' ? 'active' : ''}`}
          onClick={() => setCurrentPage('contact')}
        >
          Contact
        </button>
        <a 
          href="https://www.instagram.com/kyriell_art/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="instagram-icon-link"
          aria-label="Instagram"
        >
          <svg 
            className="instagram-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4 2.209 0 4 1.791 4 4 0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" 
              fill="#333"
            />
          </svg>
        </a>
      </nav>
      {renderPage()}
    </div>
  )
}

export default App
