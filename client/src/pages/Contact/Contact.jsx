import React from 'react'
import { motion } from 'framer-motion'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact container">
      <motion.h1 
        className="contact-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Get In Touch
      </motion.h1>
      <p className="contact-subtitle">We'd love to hear from you. Visit us or reach out via any channel.</p>

      <div className="contact-grid">
        {/* Contact info cards */}
        <div className="contact-info">
          <div className="info-card clay-card fade-in">
            <FaMapMarkerAlt className="info-icon" />
            <div className="info-details">
              <h3>Our Location</h3>
              <p>Faisalabad Main Road, near Clock Tower, FSD, Pakistan</p>
            </div>
          </div>
          
          <div className="info-card clay-card fade-in">
            <FaPhoneAlt className="info-icon" />
            <div className="info-details">
              <h3>Phone Number</h3>
              <p>0329-6032936</p>
            </div>
          </div>

          <div className="info-card clay-card fade-in">
            <FaEnvelope className="info-icon" />
            <div className="info-details">
              <h3>Email Address</h3>
              <p>info@bakestro.com</p>
            </div>
          </div>

          <div className="info-card clay-card fade-in">
            <FaClock className="info-icon" />
            <div className="info-details">
              <h3>Business Hours</h3>
              <p>Mon - Sun: 09:00 AM - 11:00 PM</p>
            </div>
          </div>

          <div className="contact-socials fade-in">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTiktok /></a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div 
          className="contact-form-container clay-card"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Send us a Message</h2>
          <form className="contact-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Your Name" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="Your Email" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="clay-button">Send Message</button>
          </form>
        </motion.div>
      </div>

      {/* Google Maps Embed */}
      <section className="map-section fade-in">
        <h2>Find us on Map</h2>
        <div className="map-container clay-card">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108930.22295663738!2d73.01357916531398!3d31.418715014846743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a895a55ca9%3A0xdec58f88932671c6!2sFaisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1711985341234!5m2!1sen!2s" 
            width="100%" 
            height="450" 
            style={{ border: 0, borderRadius: '20px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  )
}

export default Contact
