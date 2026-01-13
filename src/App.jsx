import React, { useState } from 'react'
import './App.css'
import Home from './Home'
import Paintings from './Paintings'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'paintings':
        return <Paintings onNavigateHome={() => setCurrentPage('home')} />
      case 'shop':
        return (
          <div className="page-content">
            <h2>Shop</h2>
            <p>Coming soon...</p>
          </div>
        )
      case 'about':
        return (
          <div className="page-content">
            <h2>About</h2>
            <p>Coming soon...</p>
          </div>
        )
      default:
        return <Home onNavigateToPaintings={() => setCurrentPage('paintings')} />
    }
  }

  return (
    <div className="App">
      <nav className="App-nav">
        <button 
          className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentPage('home')}
        >
          Home
        </button>
        <button 
          className={`nav-button ${currentPage === 'shop' ? 'active' : ''}`}
          onClick={() => setCurrentPage('shop')}
        >
          Shop
        </button>
        <button 
          className={`nav-button ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => setCurrentPage('about')}
        >
          About
        </button>
        <button 
          className={`nav-button ${currentPage === 'paintings' ? 'active' : ''}`}
          onClick={() => setCurrentPage('paintings')}
        >
          Paintings
        </button>
      </nav>
      {renderPage()}
      {currentPage === 'home' && (
        <footer className="App-footer">
          <a 
            href="https://www.instagram.com/kyriell_art/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="instagram-link"
          >
            @kyriell_art
          </a>
        </footer>
      )}
    </div>
  )
}

export default App
