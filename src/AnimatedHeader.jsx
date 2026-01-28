import React, { useEffect, useState } from 'react'

function AnimatedHeader({ children, className = '' }) {
  const [animatedLetterIndex, setAnimatedLetterIndex] = useState(null)
  const [initialAnimate, setInitialAnimate] = useState(true)
  const text = String(children)
  const letters = text.split('')

  useEffect(() => {
    // Initial animation on mount (full header)
    const initialTimer = setTimeout(() => {
      setInitialAnimate(false)
      setAnimatedLetterIndex(null)
    }, 1500)
    
    // Random letter animation every 2 minutes
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * letters.length)
      setAnimatedLetterIndex(randomIndex)
      
      // Reset after animation completes
      setTimeout(() => {
        setAnimatedLetterIndex(null)
      }, 1500)
    }, 120000) // 2 minutes = 120000ms

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [letters.length])

  return (
    <h2 className={`${className} ${initialAnimate ? 'animate-rainbow' : ''}`}>
      {letters.map((letter, index) => (
        <span
          key={index}
          className={animatedLetterIndex === index ? 'letter-rainbow-glitch' : ''}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </h2>
  )
}

export default AnimatedHeader
