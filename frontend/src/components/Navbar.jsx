import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo" data-text="SHANKAR">SHANKAR</div>

        {isMobile && (
          <button className="menu-button" onClick={toggleMenu}>
            {isMenuOpen ? "X" : "☰"}
          </button>
        )}

        <div className={`menu-items ${isMenuOpen ? "show" : ""}`}>
          <a href="#home" className="menu-item" onClick={closeMenu}>
            Home
          </a>
          <a href="#about" className="menu-item" onClick={closeMenu}>
            About
          </a>
          <a href="#projects" className="menu-item" onClick={closeMenu}>
            Projects
          </a>
          <a href="#skill" className="menu-item" onClick={closeMenu}>
            Skills
          </a>
          <a href="#contact" className="menu-item" onClick={closeMenu}>
            Contact
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;