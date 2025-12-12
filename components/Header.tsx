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

  const navItems = [
    { label: 'О проекте', href: '#about', id: 'about' },
    { label: 'Генплан', href: '/siteplan', id: 'siteplan' },
    { label: 'Проекты', href: '/projects', id: 'projects' },
    { label: 'Ход строительства', href: '/construction', id: 'construction' },
    { label: 'Инфраструктура', href: '/infrastructure', id: 'infrastructure' },
    { label: 'Локация', href: '#location', id: 'location' },
    { label: 'Контакты', href: '#contacts', id: 'contacts' },
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-700 border-b ${
        isScrolled 
          ? 'bg-primary/90 backdrop-blur-xl py-4 border-white/5 shadow-lg' 
          : 'bg-transparent py-8 border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center">
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
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.id)} 
              className="relative group text-white/80 hover:text-accent font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-300"
            >
              {item.label}
              <span className="absolute left-0 -bottom-2 w-full h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
            </a>
          ))}
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
          {navItems.map((item) => (
            <a 
              key={item.id}
              href={item.href} 
              onClick={(e) => handleNavClick(e, item.id)} 
              className="text-3xl md:text-4xl font-serif text-white hover:text-accent transition-all duration-500"
            >
              {item.label}
            </a>
          ))}
          
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