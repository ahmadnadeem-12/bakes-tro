import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const dessertSubcategories = [
    { name: 'Cookies', path: '/category/cookies' },
    { name: 'Biscuits', path: '/category/biscuits' },
    { name: 'Cupcakes', path: '/category/cupcakes' },
    { name: 'Cakes', path: '/category/cakes' },
    { name: 'Brownies', path: '/category/brownies' }
  ]

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <ul className="navbar-links">
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${activeTab === 'home' ? 'active' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/deals" 
              className={`navbar-link ${activeTab === 'deals' ? 'active' : ''}`}
              onClick={() => setActiveTab('deals')}
            >
              Deals
            </Link>
          </li>
          <li>
            <Link 
              to="/speciality" 
              className={`navbar-link ${activeTab === 'speciality' ? 'active' : ''}`}
              onClick={() => setActiveTab('speciality')}
            >
              Speciality
            </Link>
          </li>
          
          <li 
            className="navbar-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className={`navbar-link ${activeTab === 'desserts' ? 'active' : ''}`}>
              Desserts <FaChevronDown className={`dropdown-icon ${dropdownOpen ? 'rotate' : ''}`} />
            </div>
            
            {dropdownOpen && (
              <div className="navbar-dropdownMenu glass fade-in">
                {dessertSubcategories.map((sub) => (
                  <Link 
                    key={sub.name} 
                    to={sub.path} 
                    className="navbar-dropdownItem"
                    onClick={() => setActiveTab('desserts')}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link 
              to="/about" 
              className={`navbar-link ${activeTab === 'about' ? 'active' : ''}`}
              onClick={() => setActiveTab('about')}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`navbar-link ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
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
