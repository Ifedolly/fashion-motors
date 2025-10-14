import React, { useState } from "react";
import Modal from "../common/Modal";
import SignUp from "../auth/SignUp";
import { Link } from "react-router-dom";
import { User, Menu, X } from "lucide-react";
import "../../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  return (
    <>
      {/* Hamburger/X Icon */}
      <button className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className="navbar">
        <div className="nav-left" />

        {/* Center Logo */}
        <div className="nav-center">
          <Link to="/" className="nav-logo">
            FASHION MOTORS
          </Link>
        </div>

        {/* Right: User Icon */}
        <div className="nav-right">
          <div className="user-icon-container">
            <User className="user-icon" size={22} onClick={toggleUserMenu} />
            {showUserMenu && (
              <div className="user-dropdown">
                <button onClick={() => setShowSignUpModal(true)}>SIGN UP</button>
                <Link to="/login" onClick={() => setShowUserMenu(false)}>
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Fullscreen Dropdown Menu */}
      <div className={`fullscreen-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/services" className="menu-link" onClick={closeMenu}>
          All Services
        </Link>
        <Link to="/services?type=repair" className="menu-link" onClick={closeMenu}>
          Repair
        </Link>
        <Link to="/services?type=enhancement" className="menu-link" onClick={closeMenu}>
          Enhancement
        </Link>
      </div>

      {/* Sign Up Modal */}
      <Modal isOpen={showSignUpModal} onClose={() => setShowSignUpModal(false)}>
        <SignUp onClose={() => setShowSignUpModal(false)} />
      </Modal>
    </>
  );
};

export default Navbar;
