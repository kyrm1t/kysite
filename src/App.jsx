import React, { useState, useEffect } from 'react'
import './App.css'
import Home from './Home'
import Paintings from './Paintings'
import Shop from './Shop'
import AnimatedHeader from './AnimatedHeader'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [shopBreadcrumb, setShopBreadcrumb] = useState(null)
  const [shopResetKey, setShopResetKey] = useState(0)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    if (currentPage !== 'shop') setShopBreadcrumb(null)
  }, [currentPage])

  useEffect(() => {
    if (!mobileNavOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileNavOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [mobileNavOpen])

  useEffect(() => {
    if (!mobileNavOpen) return
    const mq = window.matchMedia('(min-width: 769px)')
    const onResize = () => {
      if (mq.matches) setMobileNavOpen(false)
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [mobileNavOpen])

  const closeMobileNav = () => setMobileNavOpen(false)

  const renderPage = () => {
    switch (currentPage) {
      case 'paintings':
        return <Paintings onNavigateHome={() => setCurrentPage('home')} />
      case 'shop':
        return (
          <Shop
            onDetailNavChange={setShopBreadcrumb}
            shopResetKey={shopResetKey}
          />
        )
      case 'bio':
        return (
          <div className="page-content bio-page">
            <AnimatedHeader>Bio</AnimatedHeader>
            <div className="bio-container">
              <div className="bio-text">
              <p>Based in New York City, My name is Kyriell and I am a multidisciplinary artist working primarily in oil paint. My work explores the connection between mental states of being expressed through places, people, and collected objects. My time spent in New York has allowed to me to refine my skill set to express more deeply the ideas and mental places I want to share. </p>
              <p> I have studied at the New York Academy of Art and the Art Students League of New York, participating in classes and workshops that have grounded my work via rigorous technical training. My work has been exhibited in galleries in New York City and Atlanta. Through impasto and heightened chromatic intensity, my paintings are an invitation to close inspection and reward close attention. I engage the viewer both visually and mentally for a fully transportive experience. I am deeply influenced by Richard Mayhew's concept of 'mindscapes'. Richard Mayhew defined "mindscapes" as internalized, emotional interpretations of landscapes rather than literal, external representations. I use this concept in areas outside of landscapes and invite into the world of both people and still life objects. </p>
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
        <div className="home-header-cluster">
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
          {shopBreadcrumb ? (
            <nav className="shop-breadcrumb-under-name" aria-label="Breadcrumb">
              <button
                type="button"
                className="shop-breadcrumb-under-name__shop"
                onClick={() => shopBreadcrumb.onBack()}
              >
                Shop
              </button>
              <span className="shop-breadcrumb-under-name__sep" aria-hidden="true">
                {' > '}
              </span>
              <span className="shop-breadcrumb-under-name__current">{shopBreadcrumb.title}</span>
            </nav>
          ) : null}
        </div>
      )}
      <nav className="App-nav" aria-label="Main navigation">
        <div className="App-nav-desktop">
          <button
            type="button"
            className={`nav-button ${currentPage === 'paintings' ? 'active' : ''}`}
            onClick={() => setCurrentPage('paintings')}
          >
            Paintings
          </button>
          <button
            type="button"
            className={`nav-button ${currentPage === 'bio' ? 'active' : ''}`}
            onClick={() => setCurrentPage('bio')}
          >
            Bio
          </button>
          <button
            type="button"
            className={`nav-button ${currentPage === 'shop' ? 'active' : ''}`}
            onClick={() => {
              if (currentPage === 'shop') {
                setShopResetKey((k) => k + 1)
              }
              setCurrentPage('shop')
            }}
          >
            Shop
          </button>
          <button
            type="button"
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
                fill="#252525"
              />
            </svg>
          </a>
        </div>

        <div className="App-nav-mobile">
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav-panel"
            aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileNavOpen ? (
              <svg className="mobile-menu-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg className="mobile-menu-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
          {mobileNavOpen ? (
            <>
              <div
                className="mobile-menu-backdrop"
                aria-hidden="true"
                onClick={closeMobileNav}
              />
              <div
                id="mobile-nav-panel"
                className="mobile-menu-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
              >
                <button
                  type="button"
                  className={`nav-button mobile-menu-link ${currentPage === 'paintings' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage('paintings')
                    closeMobileNav()
                  }}
                >
                  Paintings
                </button>
                <button
                  type="button"
                  className={`nav-button mobile-menu-link ${currentPage === 'bio' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage('bio')
                    closeMobileNav()
                  }}
                >
                  Bio
                </button>
                <button
                  type="button"
                  className={`nav-button mobile-menu-link ${currentPage === 'shop' ? 'active' : ''}`}
                  onClick={() => {
                    if (currentPage === 'shop') {
                      setShopResetKey((k) => k + 1)
                    }
                    setCurrentPage('shop')
                    closeMobileNav()
                  }}
                >
                  Shop
                </button>
                <button
                  type="button"
                  className={`nav-button mobile-menu-link ${currentPage === 'contact' ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentPage('contact')
                    closeMobileNav()
                  }}
                >
                  Contact
                </button>
              </div>
            </>
          ) : null}
        </div>
      </nav>
      {renderPage()}
    </div>
  )
}

export default App
