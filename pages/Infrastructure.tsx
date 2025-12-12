import React, { useEffect } from 'react';
import { InfraHero } from '../components/infrastructure/InfraHero';
import { Facilities } from '../components/infrastructure/Facilities';
import { Engineering } from '../components/infrastructure/Engineering';
import { Nearby } from '../components/infrastructure/Nearby';
import { Contacts } from '../components/Contacts';
import { ProjectsCTA } from '../components/ProjectsCTA';

export const Infrastructure: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-accent selection:text-white">
      <InfraHero />
      
      {/* Intro Text */}
      <section className="py-24 max-w-[1200px] mx-auto px-5 text-center">
        <p className="text-xl md:text-3xl font-serif text-primary italic max-w-4xl mx-auto leading-relaxed">
          "Мы создали экосистему, где городской комфорт встречается с тишиной природы. 
          Каждая деталь инфраструктуры продумана для того, чтобы вы могли наслаждаться жизнью, не отвлекаясь на бытовые вопросы."
        </p>
      </section>

      <Facilities />
      <Engineering />
      <Nearby />
      <ProjectsCTA />
      <Contacts />
    </div>
  );
};