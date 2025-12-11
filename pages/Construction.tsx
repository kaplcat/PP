import React, { useEffect } from 'react';
import { ConstructionHero } from '../components/construction/ConstructionHero';
import { ConstructionStatus } from '../components/construction/ConstructionStatus';
import { Timeline } from '../components/construction/Timeline';
import { Contacts } from '../components/Contacts';
import { ProjectsCTA } from '../components/ProjectsCTA';

export const Construction: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-accent selection:text-white">
      <ConstructionHero />
      <ConstructionStatus />
      <Timeline />
      <ProjectsCTA />
      <Contacts />
    </div>
  );
};