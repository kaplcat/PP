import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    if (onNavigate) {
      if (['infrastructure', 'construction', 'projects', 'siteplan'].includes(target)) {
        onNavigate(target);
      } else {
        onNavigate('home');
        // Small timeout to allow page switch before scrolling if we are navigating to home sections
        if (target !== 'home') {
            setTimeout(() => {
            const element = document.getElementById(target);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-700 border-b ${
        isScrolled 
          ? 'bg-primary/90 backdrop-blur-xl py-4 border-white/5 shadow-lg' 
          : 'bg-transparent py-8 border-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 flex justify-between items-center">
        {/* Logo */}
        <a href="/" onClick={(e) => handleNavClick(e, 'home')} className="relative z-50 group">
          <img 
            src="https://static.tildacdn.com/tild3038-6331-4437-b561-303431646466/Logo_white.png" 
            alt="Подсолнух Парк" 
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-8">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-white/80 hover:text-accent font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.25em]">О проекте</a>
          <a href="/siteplan" onClick={(e) => handleNavClick(e, 'siteplan')} className="text-white/80 hover:text-accent font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.25em]">Генплан</a>
          <a href="/projects" onClick={(e) => handleNavClick(e, 'projects')} className="text-white/80 hover:text-accent font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.25em]">Проекты</a>
          <a href="/construction" onClick={(e) => handleNavClick(e, 'construction')} className="text-white/80 hover:text-accent font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.25em]">Ход строительства</a>
          <a href="/infrastructure" onClick={(e) => handleNavClick(e, 'infrastructure')} className="text-white/80 hover:text-accent font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.25em]">Инфраструктура</a>
          <a href="#location" onClick={(e) => handleNavClick(e, 'location')} className="text-white/80 hover:text-accent font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.25em]">Локация</a>
          <a href="#contacts" onClick={(e) => handleNavClick(e, 'contacts')} className="text-white/80 hover:text-accent font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:tracking-[0.25em]">Контакты</a>
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-8">
          <a href="tel:+74951254125" className="hidden md:flex items-center gap-3 text-white group">
            <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent group-hover:text-accent transition-all duration-300">
              <Phone size={14} />
            </span>
            <span className="font-sans text-sm tracking-wide font-light group-hover:text-accent transition-colors">+7 (495) 125-4-125</span>
          </a>
          
          <button 
            className="xl:hidden text-white z-50 hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-primary z-40 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="h-full flex flex-col justify-center items-center gap-10">
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="text-3xl md:text-4xl font-serif text-white hover:text-accent transition-all duration-500">О проекте</a>
          <a href="/siteplan" onClick={(e) => handleNavClick(e, 'siteplan')} className="text-3xl md:text-4xl font-serif text-white hover:text-accent transition-all duration-500">Генплан</a>
          <a href="/projects" onClick={(e) => handleNavClick(e, 'projects')} className="text-3xl md:text-4xl font-serif text-white hover:text-accent transition-all duration-500">Проекты домов</a>
          <a href="/construction" onClick={(e) => handleNavClick(e, 'construction')} className="text-3xl md:text-4xl font-serif text-white hover:text-accent transition-all duration-500">Ход строительства</a>
          <a href="/infrastructure" onClick={(e) => handleNavClick(e, 'infrastructure')} className="text-3xl md:text-4xl font-serif text-white hover:text-accent transition-all duration-500">Инфраструктура</a>
          <a href="#location" onClick={(e) => handleNavClick(e, 'location')} className="text-3xl md:text-4xl font-serif text-white hover:text-accent transition-all duration-500">Локация</a>
          <a href="#contacts" onClick={(e) => handleNavClick(e, 'contacts')} className="text-3xl md:text-4xl font-serif text-white hover:text-accent transition-all duration-500">Контакты</a>
          
          <a 
            href="tel:+74951254125" 
            className={`mt-10 text-xl text-accent font-light tracking-wider transform transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            style={{ transitionDelay: '600ms' }}
          >
            +7 (495) 125-4-125
          </a>
        </div>
      </div>
    </header>
  );
};