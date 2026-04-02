import React, { useState } from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import './Newsletter.css'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Subscribe:', email)
      setIsSubscribed(true)
      setEmail('')
      
      setTimeout(() => setIsSubscribed(false), 3000)
    } catch (error) {
      console.error('Subscription error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="newsletter">
      <div className="container newsletter-content">
        <div className="newsletter-left">
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-subtitle">
            Subscribe to our newsletter and get 10% off your first order. 
            Plus exclusive deals and new product launches directly to your inbox!
          </p>
        </div>

        <form className="newsletter-form" onSubmit={handleSubscribe}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email address"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button 
              type="submit" 
              className="newsletter-btn clay-button"
              disabled={loading}
            >
              {loading ? 'Subscribing...' : (
                <>
                  <FaPaperPlane /> Subscribe
                </>
              )}
            </button>
          </div>
          
          {isSubscribed && (
            <p className="success-message fade-in">
              ✓ Thanks for subscribing! Check your email for your exclusive discount code.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Newsletter
