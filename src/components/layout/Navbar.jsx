import React from 'react'
import { Link } from 'react-router-dom'
import "../../styles/Navbar.css"

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="nav-left">
            <Link to="/register" className='nav-link'>Sign Up</Link>
        </div>

        <div className="nav-center">
            <Link to="/" className='nav-logo'>Sign Up</Link>
        </div>

        <div className="nav-right">
            <Link to="/login" className='nav-link'>Login</Link>
        </div>
    </nav>
  )
}

export default Navbar