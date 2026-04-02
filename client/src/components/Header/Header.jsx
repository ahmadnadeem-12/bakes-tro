import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaFacebook, FaInstagram, FaTiktok, FaUser } from 'react-icons/fa'
import './Header.css'

const Header = () => {
  const cartCount = 0 // Will connect to CartContext later

  return (
    <header className="header glass">
      <div className="container header-content">
        <div className="header-left">
          <Link to="/" className="header-logoContainer">
            <img src="/images/logo.png" alt="Bakestro" className="header-logo" />
            <span className="header-brand">Bakestro</span>
          </Link>
        </div>

        <div className="header-right">
          <div className="header-socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="header-socialIcon"><FaFacebook /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="header-socialIcon"><FaInstagram /></a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="header-socialIcon"><FaTiktok /></a>
          </div>
          
          <div className="header-divider"></div>

          <div className="header-actions">
            <Link to="/login" className="header-actionLink">
              <FaUser className="header-actionIcon" />
              <span>Login</span>
            </Link>
            
            <Link to="/cart" className="header-cartContainer">
              <FaShoppingCart className="header-actionIcon" />
              {cartCount > 0 && <span className="header-cartBadge">{cartCount}</span>}
              <span className="header-cartLabel">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
