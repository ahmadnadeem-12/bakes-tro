import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dessertSubcategories = [
    { name: 'Cookies', path: '/category/cookies' },
    { name: 'Biscuits', path: '/category/biscuits' },
    { name: 'Cupcakes', path: '/category/cupcakes' },
    { name: 'Cakes', path: '/category/cakes' },
    { name: 'Brownies', path: '/category/brownies' },
    { name: 'Donuts', path: '/category/donuts' }
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isDessertActive = dessertSubcategories.some(sub => location.pathname === sub.path);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <ul className="navbar-links">
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/category/deals" 
              className={`navbar-link ${isActive('/category/deals') ? 'active' : ''}`}
            >
              Deals
            </Link>
          </li>
          <li>
            <Link 
              to="/category/nankhatai" 
              className={`navbar-link ${isActive('/category/nankhatai') ? 'active' : ''}`}
            >
              Nankhatai
            </Link>
          </li>
          <li>
            <Link 
              to="/category/speciality" 
              className={`navbar-link ${isActive('/category/speciality') ? 'active' : ''}`}
            >
              Speciality
            </Link>
          </li>
          
          <li 
            className="navbar-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className={`navbar-link ${isDessertActive ? 'active' : ''}`}>
              Desserts <FaChevronDown className={`dropdown-icon ${dropdownOpen ? 'rotate' : ''}`} />
            </div>
            
            <div className={`navbar-dropdownMenu glass ${dropdownOpen ? 'show' : ''}`}>
              {dessertSubcategories.map((sub) => (
                <Link 
                  key={sub.name} 
                  to={sub.path} 
                  className={`navbar-dropdownItem ${location.pathname === sub.path ? 'active' : ''}`}
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </li>

          <li>
            <Link 
              to="/about" 
              className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
            >
              Location
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
