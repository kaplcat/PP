import React, { useEffect } from 'react';
import { SitePlanHero } from '../components/siteplan/SitePlanHero';
import { SitePlanStats } from '../components/siteplan/SitePlanStats';
import { InteractiveMasterPlan } from '../components/siteplan/InteractiveMasterPlan';
import { LandscapingDetails } from '../components/siteplan/LandscapingDetails';
import { Contacts } from '../components/Contacts';
import { Purchase } from '../components/Purchase';

export const SitePlan: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-accent selection:text-white">
      <SitePlanHero />
      <SitePlanStats />
      <InteractiveMasterPlan />
      <LandscapingDetails />
      <Purchase />
      <Contacts />
    </div>
  );
};