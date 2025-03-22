import React, { useState, useEffect } from "react";
import "./Navbar2.css";
import "./Navbar.css";
import { Gshankarworld } from "./Gshankarworld";
import myimage from './myimage.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showGshankarWorld, setShowGshankarWorld] = useState(false);

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

  const activateHidden = (e) => {
    e.preventDefault();
    closeMenu();

  
    const overlay = document.createElement("div");
    overlay.className = "dimension-transition-overlay";
    document.body.appendChild(overlay);

   
    document.body.classList.add("dimension-transition");

   
    setTimeout(() => {
      overlay.classList.add("active");

      const portalRing = document.createElement("div");
      portalRing.className = "portal-ring";
      overlay.appendChild(portalRing);

      const portalCore = document.createElement("div");
      portalCore.className = "portal-core";
      overlay.appendChild(portalCore);

      const energyField = document.createElement("div");
      energyField.className = "energy-field";
      overlay.appendChild(energyField);

    
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.className = "portal-particle";
        
      
        const colors = ['var(--neon-blue)', 'var(--neon-pink)', 'var(--neon-green)', 'var(--neon-purple)', 'var(--neon-yellow)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty("--color", randomColor);
        
        particle.style.setProperty("--delay", `${Math.random() * 2}s`);
        particle.style.setProperty("--size", `${3 + Math.random() * 8}px`);
        particle.style.setProperty("--angle", `${Math.random() * 360}deg`);
        particle.style.setProperty("--distance", `${50 + Math.random() * 150}px`);
        particle.style.setProperty("--duration", `${2 + Math.random() * 4}s`);
        overlay.appendChild(particle);
      }

    
      for (let i = 0; i < 15; i++) {
        const line = document.createElement("div");
        line.className = "distortion-line";
        
   
        const colors = ['var(--neon-blue)', 'var(--neon-pink)', 'var(--neon-green)', 'var(--neon-purple)', 'var(--neon-yellow)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        line.style.setProperty("--color", randomColor);
        
        line.style.setProperty("--angle", `${Math.random() * 360}deg`);
        line.style.setProperty("--delay", `${Math.random() * 1.5}s`);
        overlay.appendChild(line);
      }

  
      for (let i = 0; i < 5; i++) {
        const ripple = document.createElement("div");
        ripple.className = "energy-ripple";
        ripple.style.setProperty("--delay", `${0.5 + i * 0.5}s`);
        ripple.style.setProperty("--max-size", `${500 + i * 200}px`);
        ripple.style.setProperty("--duration", `${2 + i * 0.5}s`);
        overlay.appendChild(ripple);
      }

      for (let i = 0; i < 12; i++) {
        const orb = document.createElement("div");
        orb.className = "light-orb";
        
        
        const colors = ['var(--neon-blue)', 'var(--neon-pink)', 'var(--neon-green)', 'var(--neon-purple)', 'var(--neon-yellow)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        orb.style.setProperty("--color", randomColor);
        
        orb.style.setProperty("--size", `${5 + Math.random() * 15}px`);
        orb.style.setProperty("--start-x", `${Math.random() * 100 - 50}`);
        orb.style.setProperty("--start-y", `${Math.random() * 100 - 50}`);
        orb.style.setProperty("--end-x", `${Math.random() * 100 - 50}`);
        orb.style.setProperty("--end-y", `${Math.random() * 100 - 50}`);
        orb.style.setProperty("--float-duration", `${15 + Math.random() * 10}s`);
        orb.style.setProperty("--delay", `${Math.random() * 5}s`);
        orb.style.setProperty("--glow-delay", `${Math.random() * 3}s`);
        overlay.appendChild(orb);
      }

      for (let i = 0; i < 150; i++) {
        const quantum = document.createElement("div");
        quantum.className = "quantum-particle";
        quantum.style.setProperty("--start-x", `${Math.random() * 100 - 50}`);
        quantum.style.setProperty("--start-y", `${Math.random() * 100 - 50}`);
        quantum.style.setProperty("--end-x", `${Math.random() * 100 - 50}`);
        quantum.style.setProperty("--end-y", `${Math.random() * 100 - 50}`);
        quantum.style.setProperty("--duration", `${10 + Math.random() * 20}s`);
        quantum.style.setProperty("--delay", `${Math.random() * 10}s`);
        quantum.style.setProperty("--blink-delay", `${Math.random() * 2}s`);
        quantum.style.setProperty("--max-opacity", `${0.3 + Math.random() * 0.5}`);
        overlay.appendChild(quantum);
      }

      setTimeout(() => {
        setShowGshankarWorld(true);

        setTimeout(() => {
          overlay.classList.add("fade-out");
          setTimeout(() => {
            overlay.remove();
          }, 1500);
        }, 100);
      }, 3000);
    }, 100);
  };

  const handleReturn = () => {
    const overlay = document.createElement("div");
    overlay.className = "dimension-transition-overlay";
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.classList.add("active");

   
      const portalRing = document.createElement("div");
      portalRing.className = "portal-ring";
      overlay.appendChild(portalRing);

      const portalCore = document.createElement("div");
      portalCore.className = "portal-core";
      overlay.appendChild(portalCore);

    
      const energyField = document.createElement("div");
      energyField.className = "energy-field";
      overlay.appendChild(energyField);

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.className = "portal-particle";
        
      
        const colors = ['var(--neon-blue)', 'var(--neon-pink)', 'var(--neon-green)', 'var(--neon-purple)', 'var(--neon-yellow)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty("--color", randomColor);
        
        particle.style.setProperty("--delay", `${Math.random() * 2}s`);
        particle.style.setProperty("--size", `${3 + Math.random() * 8}px`);
        particle.style.setProperty("--angle", `${Math.random() * 360}deg`);
        particle.style.setProperty("--distance", `${70 + Math.random() * 150}px`);
        particle.style.setProperty("--duration", `${3 + Math.random() * 5}s`);
        overlay.appendChild(particle);
      }

   
      for (let i = 0; i < 15; i++) {
        const line = document.createElement("div");
        line.className = "distortion-line";
        
     
        const colors = ['var(--neon-blue)', 'var(--neon-pink)', 'var(--neon-green)', 'var(--neon-purple)', 'var(--neon-yellow)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        line.style.setProperty("--color", randomColor);
        
        line.style.setProperty("--angle", `${Math.random() * 360}deg`);
        line.style.setProperty("--delay", `${Math.random() * 1.5}s`);
        overlay.appendChild(line);
      }

      
      for (let i = 0; i < 5; i++) {
        const ripple = document.createElement("div");
        ripple.className = "energy-ripple";
        ripple.style.setProperty("--delay", `${0.5 + i * 0.5}s`);
        ripple.style.setProperty("--max-size", `${500 + i * 200}px`);
        ripple.style.setProperty("--duration", `${2 + i * 0.5}s`);
        overlay.appendChild(ripple);
      }

    
      setTimeout(() => {
        setShowGshankarWorld(false);

  
        setTimeout(() => {
          overlay.classList.add("fade-out");
          setTimeout(() => {
            overlay.remove();
          }, 1500);
        }, 100);
      }, 3000);
    }, 500);
  };

  return (
    <div>
      {!showGshankarWorld && (
        <div className="navbar-container">
          <nav className="navbar">
            <div className="logo" data-text="SHANKAR">SHANKAR</div>

            {isMobile && (
              // <img src={myimage} alt="gs" className="myimage"/>
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
              <a href="#hidden" className="menu-item" onClick={activateHidden}>
                Hidden
              </a>
            </div>
          </nav>
        </div>
      )}

      {showGshankarWorld && <Gshankarworld onReturn={handleReturn} />}
    </div>
  );
};

export default Navbar;