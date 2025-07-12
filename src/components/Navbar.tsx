'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a 
          href="#home" 
          className="logo"
          onClick={(e) => handleSmoothScroll(e, 'home')}
        >
          SwiftWare
        </a>
        <ul className="nav-links">
          <li>
            <a 
              href="#hero" 
              onClick={(e) => handleSmoothScroll(e, 'hero')}
            >
              Solutions
            </a>
          </li>
          <li>
            <a 
              href="#features" 
              onClick={(e) => handleSmoothScroll(e, 'features')}
            >
              Services
            </a>
          </li>
          <li>
            <a 
              href="#clients" 
              onClick={(e) => handleSmoothScroll(e, 'clients')}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, 'contact')}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
} 