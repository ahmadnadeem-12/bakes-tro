import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Preloader.css'

const Preloader = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100))
    }, 25)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div 
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="preloader-contentContainer">
        <motion.img 
          src="/images/logo.png" 
          alt="Bakestro Logo" 
          className="preloader-logo"
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: [0.5, 1.1, 1], rotate: [10, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
        />
        
        <div className="preloader-progressContainer">
          <motion.div 
            className="preloader-progressBar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        
        <motion.p 
          className="preloader-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {progress < 100 ? `Baking ${progress}%...` : "Ready to Taste!"}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Preloader
