import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTiktok, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section brand">
          <div className="footer-logo">
            <img src="/images/logo.png" alt="Bakestro" />
            <h3>Bakestro</h3>
          </div>
          <p>Baking memories since our first oven. We bring the authentic taste of Faisalabad to your doorstep.</p>
          <div className="footer-socials">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTiktok /></a>
          </div>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/deals">Deals</Link></li>
            <li><Link to="/speciality">Speciality</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Info</h4>
          <ul>
            <li><FaMapMarkerAlt /> Faisalabad, Punjab, Pakistan</li>
            <li><FaPhoneAlt /> 0329-6032936</li>
            <li><FaEnvelope /> info@bakestro.com</li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h4>Newsletter</h4>
          <p>Get the latest updates on our freshly baked items.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Email Address" />
            <button className="newsletter-btn"><FaPaperPlane /></button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Bakestro Bakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
