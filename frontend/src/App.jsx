import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import myimage from './components/myimage.png';
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { ChevronUp, ChevronDown } from "lucide-react";

const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAtBottom, setIsAtBottom] = useState(false);
  
  const sections = ["home", "about", "skill", "projects", "contact"];

  useEffect(() => {
    // Check if we're at the bottom section
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Consider at bottom when in the last section
      const lastSectionElement = document.getElementById(sections[sections.length - 1]);
      if (lastSectionElement) {
        const lastSectionTop = lastSectionElement.offsetTop;
        setIsAtBottom(scrollTop >= lastSectionTop - windowHeight / 2);
      }
    };

    // Intersection Observer for section visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('in-viewport', entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0.15,
        rootMargin: '0px'
      }
    );

    // Observe sections after DOM load
    const observeTimer = setTimeout(() => {
      document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
      });
    }, 1000);

    // Parallax effect for circles
    const handleParallax = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      
      const circles = document.querySelectorAll('.glowing-circle');
      const moveX = (e.clientX - window.innerWidth / 2) / 35;
      const moveY = (e.clientY - window.innerHeight / 2) / 35;
      
      circles.forEach((circle, index) => {
        const depth = (index + 1) * 0.6;
        circle.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`;
      });
    };

    document.addEventListener('mousemove', handleParallax);
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    return () => {
      clearTimeout(observeTimer);
      observer.disconnect();
      document.removeEventListener('mousemove', handleParallax);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const handleScrollButton = () => {
    if (isAtBottom) {
      // If at bottom, scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Find the next section to scroll to
      const currentScrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Get all section positions
      const sectionElements = [];
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          sectionElements.push({
            id,
            offsetTop: element.offsetTop
          });
        }
      });
      
      // Find the next section based on current scroll position
      let nextSection = null;
      for (let i = 0; i < sectionElements.length; i++) {
        if (sectionElements[i].offsetTop > currentScrollPosition + (viewportHeight * 0.1)) {
          nextSection = sectionElements[i];
          break;
        }
      }
      
      // If next section found, scroll to it
      if (nextSection) {
        document.getElementById(nextSection.id).scrollIntoView({ behavior: 'smooth' });
      } else {
        // If no next section found, go to the last one
        const lastSection = document.getElementById(sections[sections.length - 1]);
        if (lastSection) {
          lastSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-container loaded">
        <div id="cursor-follower"></div>
        <div className="noise-overlay"></div>
        
        {/* Glowing circles moved from Home to App */}
        <div className="glowing-circle circle-1"></div>
        <div className="glowing-circle circle-2"></div>
        <div className="glowing-circle circle-3"></div>
        
        <main className="main-content" style={{backgroundColor:''}}>
          {[
            { id: "home", Component: Home },
            { id: "about", Component: About },
            { id: "skill", Component: Skills },
            { id: "projects", Component: Projects },
            { id: "contact", Component: Contact }
          ].map(({ id, Component }) => (
            <section key={id} id={id}>
              <Component />
            </section>
          ))}
        </main>
        
        {/* Single scroll button */}
        <button 
          className="scroll-button" 
          onClick={handleScrollButton}
        >
          {isAtBottom ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>
    </>
  );
};

export default App;