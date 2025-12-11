import React, { useEffect } from 'react';
import { ProjectsHero } from '../components/projects/ProjectsHero';
import { Materials } from '../components/projects/Materials';
import { Catalog } from '../components/projects/Catalog';
import { Finishing } from '../components/projects/Finishing';
import { Partners } from '../components/projects/Partners';
import { Purchase } from '../components/Purchase';
import { Contacts } from '../components/Contacts';
import { TourCTA } from '../components/projects/TourCTA';

export const Projects: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-accent selection:text-white">
      <ProjectsHero />
      <Materials />
      <Partners />
      <Catalog />
      <Finishing />
      <Purchase />
      <TourCTA />
      <Contacts />
    </div>
  );
};