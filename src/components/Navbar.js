// frontend/src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import styles from './Navbar.css';

import logo from '../pages/images/dark_logo.png';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false)

    const handleMenuClick = () => {
        setIsMobile(!isMobile);
    }

    const handleHomeClick = () => {
        setIsMobile(false);
    }

  return (
      <nav className={`navbar ${isMobile ? 'mobile' : ''}`}>
          <Link to="/" onClick={handleHomeClick} className={styles.navLogo}>
              <img src={logo} alt="Company Logo" className="logo" onClick={handleHomeClick}/>
          </Link>
          <div className="menu-icon" onClick={handleMenuClick}>
              <div className={`bar ${isMobile ? 'open' : ''}`}/>
              <div className={`bar ${isMobile ? 'open' : ''}`}/>
              <div className={`bar ${isMobile ? 'open' : ''}`}/>
          </div>
          <ul className={`nav-list ${isMobile ? 'mobile' : ''}`}>
              <li className="nav-item" onClick={handleMenuClick}><Link to="/about">About</Link></li>
              <li className="nav-item" onClick={handleMenuClick}><Link to="/tour_dates">Tour Dates</Link></li>
              <li className="nav-item" onClick={handleMenuClick}><Link to="/tour_standings">Tour Standings</Link></li>
              <li className="nav-item" onClick={handleMenuClick}><Link to="/contact">Contact</Link></li>
          </ul>
      </nav>
  )
}

export default Navbar
