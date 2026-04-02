import React from 'react'
import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  return (
    <div className="about container">
      {/* Brand Story */}
      <section className="about-hero">
        <motion.h1 
          className="about-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Sweet Story
        </motion.h1>
        <p className="about-subtitle">Bringing the authentic taste of tradition to your table since 2010.</p>
        
        <div className="about-grid">
          <motion.div 
            className="about-image-container clay-card"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img src="/images/Packaging.png" alt="Our Bakery" className="about-image" />
          </motion.div>
          
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2>Mission & Vision</h2>
            <p>At Bakestro, our mission is to preserve the rich heritage of Pakistani baking while embracing modern techniques. We believe every bite should tell a story of quality, tradition, and love.</p>
            <p>Our vision is to become the leading provider of premium traditional bakery items, known for our uncompromising quality and authentic flavors that evoke nostalgic memories of childhood sweets.</p>
            
            <div className="about-stats">
              <div className="stat-item">
                <h3>15+</h3>
                <p>Years Experience</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Unique Recipes</p>
              </div>
              <div className="stat-item">
                <h3>10k+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chef Section */}
      <section className="chef-section clay-card">
        <div className="chef-content">
          <div className="chef-info">
            <span className="chef-label">Master Baker</span>
            <h2>Meet Chef Ahmad</h2>
            <p className="chef-bio">With over 15 years of experience in traditional baking, Chef Ahmad is the artisan behind Bakestro's famous Nan Khatais. His secret lies in using locally sourced ingredients and family recipes passed down through generations.</p>
            <ul className="chef-specialities">
              <li><strong>Signature Item:</strong> Almond Nan Khatai</li>
              <li><strong>Experience:</strong> 15+ years in Artisan Bakery</li>
              <li><strong>Philosophy:</strong> "Baking is an act of love."</li>
            </ul>
          </div>
          <div className="chef-image-wrapper">
             <img src="/images/product 3.png" alt="Chef Ahmad" className="chef-image" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
