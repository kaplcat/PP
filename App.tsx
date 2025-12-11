import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Countdown } from './components/Countdown';
import { Atmosphere } from './components/Atmosphere';
import { Location } from './components/Location';
import { Purchase } from './components/Purchase';
import { ProjectsCTA } from './components/ProjectsCTA';
import { FAQ } from './components/FAQ';
import { Contacts } from './components/Contacts';
import { Infrastructure } from './pages/Infrastructure';
import { Construction } from './pages/Construction';
import { Projects } from './pages/Projects';
import { SitePlan } from './pages/SitePlan';

const App: React.FC = () => {
  // Simple state-based router
  const [currentPage, setCurrentPage] = useState('home');

  // Handle browser history (optional, for back button support in a real app)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/infrastructure') {
        setCurrentPage('infrastructure');
      } else if (path === '/construction') {
        setCurrentPage('construction');
      } else if (path === '/projects') {
        setCurrentPage('projects');
      } else if (path === '/siteplan') {
        setCurrentPage('siteplan');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    // Check initial path
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-accent selection:text-white">
      <Header onNavigate={navigate} />
      
      {currentPage === 'home' && (
        <main>
          <Hero />
          <Stats />
          <Countdown />
          <Atmosphere />
          <Location />
          <Purchase />
          <ProjectsCTA />
          <FAQ />
          <Contacts />
        </main>
      )}

      {currentPage === 'infrastructure' && (
        <main>
          <Infrastructure />
        </main>
      )}

      {currentPage === 'construction' && (
        <main>
          <Construction />
        </main>
      )}

      {currentPage === 'projects' && (
        <main>
          <Projects />
        </main>
      )}

      {currentPage === 'siteplan' && (
        <main>
          <SitePlan />
        </main>
      )}
    </div>
  );
};

export default App;