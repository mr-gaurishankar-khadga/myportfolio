import React, { useEffect, useRef, useState } from 'react';
import './Skills.css';

const Skills = () => {
  const skillsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillsData = {
    frontend: [
      { name: 'React', level: 90, description: 'Building complex UI components & state management' },
      { name: 'JavaScript', level: 85, description: 'Modern ES6+, async/await, functional programming' },
      { name: 'HTML/CSS', level: 95, description: 'Semantic markup, Flexbox/Grid, animations' },
      { name: 'TypeScript', level: 80, description: 'Type safety, interfaces, generics' },
      { name: 'Next.js', level: 85, description: 'Server-side rendering, API routes, static generation' },
      { name: 'PHP', level: 70, description: 'Schema design, aggregation framework' },
    ],
    backend: [
      { name: 'Node.js', level: 85, description: 'RESTful APIs, middleware, authentication' },
      { name: 'JAVA', level: 85, description: 'RESTful APIs, middleware, authentication' },
      { name: 'Express', level: 80, description: 'Route handling, middleware architecture' },
      { name: 'Python', level: 75, description: 'Data processing, automation, scripting' },
      { name: 'MongoDB', level: 80, description: 'Schema design, aggregation framework' },
      { name: 'SQL', level: 75, description: 'Complex queries, database optimization' }
    ],
    devops: [
      { name: 'Docker', level: 80, description: 'Containerization, multi-container applications' },
      { name: 'CI/CD', level: 75, description: 'Automated testing, deployment pipelines' },
      { name: 'AWS', level: 70, description: 'S3, EC2, Lambda, CloudFront, Route53' },
      { name: 'Git', level: 90, description: 'Advanced branching strategies, workflow automation' },
      { name: 'Linux', level: 85, description: 'Server configuration, shell scripting' }
    ]
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When component is in view
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsInViewport(true);
        } else {
          // When component is out of view
          setIsInViewport(false);
          
          // Add a small delay before hiding to make the transition smoother
          setTimeout(() => {
            if (!entry.isIntersecting) {
              setIsVisible(false);
            }
          }, 300);
        }
      },
      { threshold: 0.2, rootMargin: '-100px 0px' }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    const handleMouseMove = (e) => {
      if (!skillsRef.current || !isInViewport) return;

      const { clientX, clientY } = e;
      const rect = skillsRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const cards = document.querySelectorAll('.skill-section-category');
      cards.forEach(card => {
        const cardX = deltaX * 10;
        const cardY = deltaY * 10;
        card.style.transform = `translate3d(${cardX}px, ${cardY}px, 0) rotateX(${-deltaY * 5}deg) rotateY(${deltaX * 5}deg)`;
      });

      const icons = document.querySelectorAll('.parallax-floating-icon');
      icons.forEach((icon, index) => {
        const factor = (index + 1) * 5;
        const iconX = deltaX * factor;
        const iconY = deltaY * factor;
        icon.style.transform = `translate3d(${iconX}px, ${iconY}px, 0)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle scroll events to apply additional effects
    const handleScroll = () => {
      if (!skillsRef.current) return;
      
      const rect = skillsRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the element is from the center of the viewport
      const distanceFromCenter = Math.abs((rect.top + rect.height / 2) - (windowHeight / 2));
      const maxDistance = windowHeight;
      
      // Calculate opacity based on distance from center (1 when centered, fading as it moves away)
      const opacity = Math.max(0, 1 - (distanceFromCenter / maxDistance));
      
      // Apply subtle parallax effect on scroll
      if (isInViewport) {
        const parallaxElements = document.querySelectorAll('.parallax-floating-icon');
        const scrollY = window.scrollY;
        
        parallaxElements.forEach((el, index) => {
          const speed = (index + 1) * 0.05;
          el.style.transform = `translateY(${scrollY * speed}px)`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (skillsRef.current) {
        observer.disconnect();
      }
      // window.removeEventListener('mousemove', handleMouseMove);
      // window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [isInViewport]);

  const SkillCategory = ({ title, skills }) => {
    return (
      <div className="skill-section-category skill-section-animated">
        <div className="skill-section-header">
          <h3>{title}</h3>
          <div className="skill-section-underline"></div>
        </div>
        <div className="skill-section-list">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-section-item"
              style={{ animationDelay: `${index * 0.1}s` }}
              // onMouseEnter={() => setHoveredSkill(`${title}-${index}`)}
              // onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="skill-section-info">
                <span className="skill-section-name">{skill.name}</span>
                <span className="skill-section-percentage">{skill.level}%</span>
              </div>
              <div className="skill-section-bar-bg">
                <div 
                  className="skill-section-bar-fill"
                  style={{ 
                    width: isVisible ? `${skill.level}%` : '0%',
                    transitionDelay: `${index * 0.1}s`
                  }}
                ></div>
              </div>

            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      className={`skill-section-container ${isLoading ? 'skill-section-loading' : ''} ${isVisible ? 'visible' : 'hidden'}`} 
      ref={skillsRef}
    >
      <div className="skill-section-noise-overlay"></div>
      <div className="skill-section-cosmic"></div>

      {isLoading && (
        <div className="skill-section-loading-indicator">
          <div className="skill-section-spinner"></div>
          <p>Loading skills...</p>
        </div>
      )}

      <div className="parallax-floating-icon parallax-icon-1"></div>
      <div className="parallax-floating-icon parallax-icon-2"></div>
      <div className="parallax-floating-icon parallax-icon-3"></div>
      <div className="parallax-floating-icon parallax-icon-4"></div>

      <div className="skill-section-content">
        <div className="skill-section-header animated-skill-section">
          <h1>MY <span className="skill-section-accent-text">SKILLS</span></h1>
          <div className="skill-section-underline"></div>
          <p className="skill-section-subtitle">Crafting digital experiences with modern technologies</p>
        </div>

        <div className="skill-section-grid" style={{display:''}}>
          <SkillCategory title="FRONTEND" skills={skillsData.frontend} />
          <SkillCategory title="BACKEND" skills={skillsData.backend} />
          <SkillCategory title="DEVOPS" skills={skillsData.devops} />
        </div>
      </div>
    </div>
  );
};

export default Skills;