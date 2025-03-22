// App.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import myimage from './components/myimage.png';
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Loading sequence
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

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

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(observeTimer);
      observer.disconnect();
    };
  }, []);

  return isLoading ? (
    <div className="loading-screen">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="app-container loaded">
      <Navbar />
      <main className="main-content">
        {[
          { id: "home", Component: Home },
          { id: "about", Component: About },
          { id: "skills", Component: Skills },
          { id: "projects", Component: Projects },
          { id: "contact", Component: Contact }
        ].map(({ id, Component }) => (
          <section key={id} id={id}>
            <Component />
          </section>
        ))}
      </main>
    </div>
  );
};

export default App;