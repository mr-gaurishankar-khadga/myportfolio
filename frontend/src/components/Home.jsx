import React, { useEffect, useState, useRef } from 'react';
import './Home.css';
import myimage from './mrx.jpg';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const cursorRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = [
    "MR GAURI SHANKAR",
    "BACKEND DEVELOPER",
    "FRONTEND DEVELOPER", 
    "DEVOPS ENGINEER"
  ];

  useEffect(() => {
    // Typing animation logic
    const typingAnimation = () => {
      const currentTitle = titles[currentTitleIndex];
      
      // If deleting text
      if (isDeleting) {
        setDisplayText(currentTitle.substring(0, displayText.length - 1));
        setTypingSpeed(50); // Faster when deleting
        
        // When text is fully deleted
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentTitleIndex((currentTitleIndex + 1) % titles.length);
          setTypingSpeed(150); // Reset typing speed
        }
      } 
      // If typing text
      else {
        setDisplayText(currentTitle.substring(0, displayText.length + 1));
        
        // When text is fully typed
        if (displayText === currentTitle) {
          // Pause at the end of typing before deleting
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      }
    };
    
    const timer = setTimeout(typingAnimation, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex, typingSpeed, titles]);

  useEffect(() => {
    // Show elements after a short delay for better entrance animation
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Enhanced animate on scroll with threshold control
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Adjust the trigger area
      }
    );

    document.querySelectorAll('.animated').forEach((el) => {
      observer.observe(el);
    });

    // Enhanced smooth cursor follower effect
    const follower = document.getElementById('cursor-follower');
    
    // Define handleMouseMove function here so it's accessible in the cleanup
    const handleMouseMove = (e) => {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    // Define handleParallax function here so it's accessible in the cleanup
    const handleParallax = (e) => {
      const circles = document.querySelectorAll('.glowing-circle');
      const moveX = (e.clientX - window.innerWidth / 2) / 50;
      const moveY = (e.clientY - window.innerHeight / 2) / 50;
      
      circles.forEach((circle, index) => {
        const depth = (index + 1) * 0.5;
        circle.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
    };
    
    if (follower) {
      cursorRef.current = follower;
      
      // Add event listener using the defined function
      document.addEventListener('mousemove', handleMouseMove);
      
      // Define hover event handlers
      const handleMouseEnter = () => {
        if (follower) {
          follower.style.width = '40px';
          follower.style.height = '40px';
          follower.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }
      };
      
      const handleMouseLeave = () => {
        if (follower) {
          follower.style.width = '20px';
          follower.style.height = '20px';
          follower.style.backgroundColor = 'transparent';
        }
      };
      
      // Add hover effects for interactive elements
      const interactiveElements = document.querySelectorAll('button, a, .image-container');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      
      // Smooth cursor animation using requestAnimationFrame
      const animateCursor = () => {
        if (!cursorRef.current) return;
        
        // Calculate smoothed position
        targetPositionRef.current.x += (mousePositionRef.current.x - targetPositionRef.current.x) * 0.15;
        targetPositionRef.current.y += (mousePositionRef.current.y - targetPositionRef.current.y) * 0.15;
        
        // Apply position
        cursorRef.current.style.left = `${targetPositionRef.current.x}px`;
        cursorRef.current.style.top = `${targetPositionRef.current.y}px`;
        
        // Continue animation loop
        animationFrameRef.current = requestAnimationFrame(animateCursor);
      };
      
      // Start animation
      animationFrameRef.current = requestAnimationFrame(animateCursor);
    }

    // Add parallax effect
    document.addEventListener('mousemove', handleParallax);

    // Clean up all event listeners and animations
    return () => {
      clearTimeout(loadTimer);
      document.querySelectorAll('.animated').forEach((el) => {
        observer.unobserve(el);
      });
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousemove', handleParallax);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Define event handlers for cleanup
      const handleMouseEnter = () => {};
      const handleMouseLeave = () => {};
      
      const interactiveElements = document.querySelectorAll('button, a, .image-container');
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="home">
      <div id="cursor-follower"></div>
      <div className="noise-overlay"></div>
      
      <div className="container">
        <div className="glowing-circle circle-1"></div>
        <div className="glowing-circle circle-2"></div>
        <div className="glowing-circle circle-3"></div>
        
        <header className="hero-header">
          {/* Enhanced header content */}
        </header>
        
        <div className="content-wrapper">
          <div className="hero-content">
            <div className={`animated title-container ${isLoaded ? 'show' : ''}`}>
              <h1 className="main-title">
                <div className="typing-wrapper">
                  <span className="iam">I AM </span>
                </div>
               
                <div className="typing-wrapper delay-typing">
                   <span className="typing outline">{displayText}</span>
                </div>
              </h1>
            </div>
            
            <div className="animated info-box">
              <div className="info-content">
                <p className="specialization">FRONTEND • BACKEND • DEVOPS</p>
                <div className="separator"></div>
                <p className="description">
                  Creating digital experiences with clean code and innovative solutions.
                </p>
              </div>
            </div>
            
            <div className="animated cta-container">
              <button className="cta-button primary" style={{backgroundColor:'#181818'}}>
                <span className="cta-text"> EXPLORE</span>
                <span className="cta-icon">→</span>
              </button>
            </div>

            
          </div>
          
          <div className="hero-visual" >
            <div className={`animated image-container ${isLoaded ? 'show' : ''}`}>
              <div className="image-placeholder">
                <img src={myimage} alt="Profile" />
              </div>

              {/* Social Media Links */}
            <div className={`animated social-links-container ${isLoaded ? 'show' : ''}`}>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link github">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://leetcode.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link leetcode">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z"/>
                </svg>
              </a>
              <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
             
            </div>
            </div>
          </div>

        </div>
        
        <div className="scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;