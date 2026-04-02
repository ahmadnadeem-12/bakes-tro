import React, { useState, useEffect } from 'react'
import { FaX } from 'react-icons/fa6'
import { announcementAPI } from '../../services/api'
import './AnnouncementBar.css'

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await announcementAPI.getAnnouncements()
        if (data && data.length > 0) {
          setAnnouncements(data.map(a => a.text))
        } else {
          // Fallback to default announcements
          setAnnouncements([
            "🎉 Free delivery on orders above Rs. 2000",
            "✨ New collections added every week",
            "🎁 Subscribe to our newsletter for exclusive deals",
            "⏰ Same-day delivery available in Faisalabad"
          ])
        }
      } catch (error) {
        // Use default announcements if API fails
        setAnnouncements([
          "🎉 Free delivery on orders above Rs. 2000",
          "✨ New collections added every week",
          "🎁 Subscribe to our newsletter for exclusive deals",
          "⏰ Same-day delivery available in Faisalabad"
        ])
      }
    }

    fetchAnnouncements()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isVisible, announcements.length])

  if (!isVisible) return null

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <span className="announcement-text fade-in">{announcements[currentIndex]}</span>
      </div>
      <button 
        className="announcement-close" 
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement"
      >
        <FaX />
      </button>
    </div>
  )
}

export default AnnouncementBar
