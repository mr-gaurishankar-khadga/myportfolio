import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import profileImage from './mrx.jpg'; 

const About = () => {
  const containerRef = useRef(null);
  const parallaxElements = useRef([]);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    header: true,
    bioSection: false,
    statsSection: false
  });
  
  useEffect(() => {
    // Handle parallax effect for decorative elements
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate how far the mouse is from the center in percentage
      const moveX = (clientX - centerX) / (rect.width / 2);
      const moveY = (clientY - centerY) / (rect.height / 2);
      
      // Apply parallax effect to elements
      parallaxElements.current.forEach((element, index) => {
        if (!element) return;
        
        // Different elements move at different speeds
        const factor = 15 + (index * 5);
        const x = moveX * factor;
        const y = moveY * factor;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    
    // Detect scroll direction and control visibility
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Determine scroll direction
      if (scrollTop > lastScrollTop) {
        // Scrolling DOWN
        setScrollDirection('down');
      } else {
        // Scrolling UP
        setScrollDirection('up');
      }
      
      // Save current scroll position
      setLastScrollTop(scrollTop);
      
      // Update visibility of sections based on scroll position
      const scrollTriggers = document.querySelectorAll('.animated');
      const windowHeight = window.innerHeight;
      
      // Check header visibility
      const header = document.querySelector('.about-header');
      if (header) {
        const headerTop = header.getBoundingClientRect().top;
        const isHeaderVisible = headerTop < windowHeight * 0.9 && headerTop > -header.offsetHeight;
        setVisibleSections(prev => ({ ...prev, header: isHeaderVisible }));
      }
      
      // Check bio section visibility
      const bioSection = document.querySelector('.bio-section');
      if (bioSection) {
        const bioTop = bioSection.getBoundingClientRect().top;
        const isBioVisible = bioTop < windowHeight * 0.9 && bioTop > -bioSection.offsetHeight * 0.7;
        setVisibleSections(prev => ({ ...prev, bioSection: isBioVisible }));
      }
      
      // Check stats section visibility
      const statsSection = document.querySelector('.stats-container');
      if (statsSection) {
        const statsTop = statsSection.getBoundingClientRect().top;
        const isStatsVisible = statsTop < windowHeight * 0.9 && statsTop > -statsSection.offsetHeight;
        setVisibleSections(prev => ({ ...prev, statsSection: isStatsVisible }));
      }
      
      // Apply animations based on visibility
      scrollTriggers.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Element is in viewport
        if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
          element.classList.add('show');
        } else {
          // Only remove the class if we're moving in the opposite direction of its appearance
          if ((scrollDirection === 'up' && elementTop > windowHeight * 0.9) || 
              (scrollDirection === 'down' && elementBottom < 0)) {
            element.classList.remove('show');
          }
        }
      });
    };
    
    // Set initial position for elements
    const setupParallaxElements = () => {
      const elements = document.querySelectorAll('.parallax-element');
      parallaxElements.current = Array.from(elements);
    };
    
    setupParallaxElements();
    handleScroll(); 
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop, scrollDirection]);
  
  return (
    <div className="about-container" ref={containerRef} style={{backgroundColor:'#181818'}}>
      <div className="noise-overlay"></div>
      <div className="about-cosmic"></div>
      
      
      
      <div className="about-content">
        <div className={`about-header animated ${visibleSections.header ? 'show' : 'hide-up'}`}>
        <div className="contact-header">
            <h1>ABOUT ME</h1>
          </div>
          
        </div>
        
        <div className="about-grid">
          {/* Bio Section */}
          <div className={`bio-section animated ${visibleSections.bioSection ? 'show' : scrollDirection === 'down' ? 'hide-up' : 'hide-down'}`}>
            <div className={`profile-image-container animated ${visibleSections.bioSection ? 'show' : scrollDirection === 'down' ? 'hide-up' : 'hide-down'}`}>
              <img src={profileImage} alt="Gauri Shankar" className="profile-image" />
              <div className="image-glow"></div>
            </div>
            
            <div className="bio-content">
              {/* <div className="section-header">
                <h2>WHO AM I</h2>
                <div className="small-underline"></div>
              </div> */}
              <p className={visibleSections.bioSection ? 'show' : 'hide'}>I'm <span className="highlight-text">Gauri Shankar</span>, a passionate full-stack developer with expertise in both frontend and backend technologies. With a strong foundation in DevOps practices, I bridge the gap between development and operations to create seamless digital experiences.</p>
              <p className={visibleSections.bioSection ? 'show' : 'hide'}>My journey in tech began 6th  Month ago, and I've since collaborated with startups and established companies to build scalable applications that solve real-world problems. I believe in clean code, continuous learning, and pushing the boundaries of what's possible with modern web technologies.</p>
              
              <div className={`stats-container ${visibleSections.statsSection ? 'show' : scrollDirection === 'down' ? 'hide-up' : 'hide-down'}`}>
                <div className="stat-item animated">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-item animated">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
                <div className="stat-item animated">
                  <span className="stat-number">7+</span>
                  <span className="stat-label">Happy Clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;