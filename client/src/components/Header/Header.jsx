import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaShoppingCart, FaFacebook, FaInstagram, FaTiktok, FaUser, FaSignOutAlt, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import './Header.css'

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();
  const cartCount = getCartCount();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/category/deals', label: 'Deals' },
    { path: '/category/nankhatai', label: 'Nankhatai' },
    { path: '/category/speciality', label: 'Speciality' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Location' },
  ];

  const dessertLinks = [
    { path: '/category/cookies', label: 'Cookies' },
    { path: '/category/biscuits', label: 'Biscuits' },
    { path: '/category/cupcakes', label: 'Cupcakes' },
    { path: '/category/cakes', label: 'Cakes' },
    { path: '/category/brownies', label: 'Brownies' },
    { path: '/category/donuts', label: 'Donuts' },
  ];

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
            {isAuthenticated ? (
              <div 
                className="header-userInfo"
                onMouseEnter={() => setUserDropdown(true)}
                onMouseLeave={() => setUserDropdown(false)}
              >
                <div className="header-userAvatar">
                  {user?.profilePicture ? (
                    <img src={user.profilePicture} alt={user.name} />
                  ) : (
                    <span>{user?.name?.charAt(0)?.toUpperCase()}</span>
                  )}
                </div>
                <span className="header-userName">{user?.name?.split(' ')[0]}</span>
                <FaChevronDown className="header-userChevron" />
                
                {userDropdown && (
                  <div className="header-userDropdown glass">
                    <div className="dropdown-userHeader">
                      <strong>{user?.name}</strong>
                      <span>{user?.email}</span>
                    </div>
                    <div className="dropdown-divider"></div>
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="dropdown-item">🎛️ Admin Panel</Link>
                    )}
                    <Link to="/cart" className="dropdown-item">🛒 My Cart</Link>
                    <button className="dropdown-item logout" onClick={logout}>
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="header-actionLink">
                <FaUser className="header-actionIcon" />
                <span>Login</span>
              </Link>
            )}
            
            <Link to="/cart" className="header-cartContainer">
              <FaShoppingCart className="header-actionIcon" />
              {cartCount > 0 && <span className="header-cartBadge">{cartCount}</span>}
              <span className="header-cartLabel">Cart</span>
            </Link>
          </div>

          <button 
            className="header-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        <div className="mobile-drawer-content">
          <div className="mobile-drawer-header">
            <Link to="/" className="mobile-logo" onClick={() => setMobileMenuOpen(false)}>
              <img src="/images/logo.png" alt="Bakestro" />
              <span>Bakestro</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {isAuthenticated && (
            <div className="mobile-user-section">
              <div className="mobile-user-avatar">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} />
                ) : (
                  <span>{user?.name?.charAt(0)?.toUpperCase()}</span>
                )}
              </div>
              <div>
                <strong>{user?.name}</strong>
                <span>{user?.email}</span>
              </div>
            </div>
          )}

          <nav className="mobile-nav">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="mobile-nav-divider"></div>
            <span className="mobile-nav-label">Desserts</span>
            {dessertLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`mobile-nav-link sub ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mobile-drawer-footer">
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="clay-button-secondary" onClick={() => setMobileMenuOpen(false)}>
                    🎛️ Admin Panel
                  </Link>
                )}
                <button className="clay-button-outline" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="clay-button" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="clay-button-outline" onClick={() => setMobileMenuOpen(false)}>Register</Link>
              </>
            )}
            
            <div className="mobile-socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer"><FaTiktok /></a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
