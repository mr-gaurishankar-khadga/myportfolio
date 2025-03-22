import React, { useState, useEffect, useRef } from 'react';
import { Github, ExternalLink, Star, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

// Import project images (kept the same as your original)
import myfirst from './myfirst.png';
import youtube from './youtube.png';
import gshankarai from './chatai.png';
import business from './business.png';
import ecommerce from './ecommerce.png';
import adBlocker from './addblocker.png';
import mstar from './mstar.png';  
import quickx from './quickx.png';  
import gsharpi from './gsharpi.png';  

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isInView, setIsInView] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const sectionRef = useRef(null);

  // Project data (kept the same as your original)
  const projects = [
    {
      id: 1,
      title: "MrChat AI",
      description: "An AI-powered chat application with natural language processing capabilities.",
      category: "ai",
      featured: true,
      technologies: ["React", "OpenAI API", "Node.js", "Express", "MongoDB"],
      image: gshankarai,
      liveLink: "https://mrchatai.netlify.app",
      codeLink: "https://github.com/settings/profile"
    },
    {
      id: 2,
      title: "Gaurishankar's First Site",
      description: "Personal portfolio website showcasing projects and skills.",
      category: "web",
      featured: false,
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      image: myfirst,
      liveLink: "https://gshankarfirstsite.netlify.app",
      codeLink: "https://github.com/settings/profile"
    },
    {
      id: 3,
      title: "My Business",
      description: "Business management platform with inventory tracking and reporting features.",
      category: "web",
      featured: true,
      technologies: ["React", "Node.js", "MongoDB", "Express", "Chart.js"],
      image: business,
      liveLink: "https://mr-gaurishankar-khadga.github.io/mybusiness",
      codeLink: "https://github.com/settings/profile"
    },
    {
      id: 4,
      title: "Wenli.in",
      description: "E-commerce platform with product management and payment processing.",
      category: "web",
      featured: false,
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      image: ecommerce,
      liveLink: "https://wenli.in",
      codeLink: "https://github.com/settings/profile"
    },
    {
      id: 5,
      title: "YouTube Looks Like",
      description: "YouTube clone with video uploading, viewing, and commenting functionality.",
      category: "web",
      featured: false,
      technologies: ["React", "Firebase", "Redux", "Material UI"],
      image: youtube,
      liveLink: "https://youtubelookslike.netlify.app",
      codeLink: "https://github.com/settings/profile"
    },
    {
      id: 6,
      title: "Ad Blocker Chrome Extension",
      description: "Chrome extension that blocks advertisements on websites.",
      category: "tools",
      featured: false,
      technologies: ["JavaScript", "Chrome API", "CSS"],
      image: adBlocker,
      liveLink: "#",
      codeLink: "https://github.com/settings/profile"
    },
    {
      id: 7,
      title: "mstar - NPM Package",
      description: "Utility library for JavaScript projects with helpful functions and tools.",
      category: "package",
      featured: false,
      technologies: ["JavaScript", "Node.js", "NPM"],
      image: mstar,
      liveLink: "https://www.npmjs.com/package/mstar",
      codeLink: "https://github.com/settings/profile"
    },
    {
      id: 8,
      title: "gsharpi - NPM Package",
      description: "Framework for building CLI applications with Node.js.",
      category: "package",
      featured: false,
      technologies: ["JavaScript", "Node.js", "NPM", "CLI"],
      image: gsharpi,
      liveLink: "https://www.npmjs.com/package/gsharpi",
      codeLink: "https://github.com/settings/profile"
    },
    {
      id: 9,
      title: "quickx - NPM Package",
      description: "Fast, lightweight utility library for common operations in JavaScript.",
      category: "package",
      featured: false,
      technologies: ["JavaScript", "Node.js", "NPM"],
      image: quickx,
      liveLink: "https://www.npmjs.com/package/quickx",
      codeLink: "https://github.com/settings/profile"
    }
  ];

  const categories = [
    { name: "All Projects", value: "all" },
    { name: "Web Applications", value: "web" },
    { name: "AI Projects", value: "ai" },
    { name: "Tools", value: "tools" },
    { name: "NPM Packages", value: "package" }
  ];

  // Handle scroll events to detect direction and section visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Determine scroll direction
      if (scrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setLastScrollTop(scrollTop);
      
      // Check if section is in viewport
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isVisible = 
          rect.top < window.innerHeight &&
          rect.bottom > 0;
        
        // Add or remove classes based on visibility and scroll direction
        if (isVisible) {
          sectionRef.current.classList.add('section-visible');
          sectionRef.current.classList.remove('section-hidden');
          setIsInView(true);
        } else {
          sectionRef.current.classList.add('section-hidden');
          sectionRef.current.classList.remove('section-visible');
          setIsInView(false);
        }
      }
    };

    // Initialize section visibility on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  // Initialize with all projects
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(item => item.category === activeFilter));
    }
  
    setVisibleCount(6);
  }, [activeFilter]);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const fadeInUpVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="projects-container">
        <motion.div 
          className="projects-header"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
        >
          <h2 className="projects-heading">
            My <span className="accent-text">Projects</span>
          </h2>
          <motion.div 
            className="heading-underline"
            initial={{ width: 0 }}
            animate={isInView ? { width: "80px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          ></motion.div>
          <motion.p 
            className="projects-subheading"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore my portfolio of innovative solutions across different technologies
          </motion.p>
        </motion.div>

        <motion.div 
          className="all-projects"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUpVariants}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="filter-container"
            variants={containerVariants}
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`filter-btn ${activeFilter === category.value ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.value)}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeFilter}
              className="projects-grid"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {filteredProjects.slice(0, visibleCount).map((project, index) => (
                <motion.div 
                  className="project-card" 
                  key={project.id}
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ 
                    y: -8, 
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="project-img-container">
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="project-img"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="img-overlay">
                      <motion.div 
                        className="overlay-content"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="overlay-links">
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={20} />
                          </a>
                          <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                            <Github size={20} />
                          </a>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  <div className="project-content" style={{backgroundColor:'black',color:'white'}}>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech-stack">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <motion.span 
                          key={index} 
                          className="tech-tag"
                          whileHover={{ 
                            scale: 1.05, 
                            backgroundColor: "#5E17EB",
                            color: "black" 
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tech-more">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                    <div className="project-links">
                      <motion.a 
                        href={project.codeLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Github size={14} /> Code
                      </motion.a>
                      <motion.a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="project-link"
                        whileHover={{ scale: 1.05 }}
                      >
                        <ExternalLink size={14} /> Demo
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* Load More Button */}
          {filteredProjects.length > visibleCount && (
            <motion.div 
              className="load-more-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <motion.button 
                className="load-more-btn" 
                onClick={handleLoadMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Projects <ChevronDown size={16} className="ml-2" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;