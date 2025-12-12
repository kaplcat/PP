import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Breadcrumbs } from '../ui/Breadcrumbs';

export const ConstructionHero: React.FC = () => {
  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-primary">
      <Breadcrumbs items={[{ label: 'Ход строительства' }]} />

      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transform origin-center animate-scale-slow"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1621816327348-1b250dd234e4?q=80&w=2670&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center max-w-[1200px] mx-auto px-5 pt-20">
        <div className="max-w-5xl">
          <div className="flex items-center gap-6 mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <span className="h-[1px] w-12 bg-accent/80" />
            <span className="text-gray-200 uppercase tracking-[0.4em] text-[10px] md:text-xs font-sans font-medium">Динамика проекта</span>
          </div>
          
          <h1 className="font-serif text-white leading-[1] animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <span className="block text-5xl md:text-7xl lg:text-[6vw] tracking-tight font-normal text-white/95">
              Ход строительства
            </span>
            <span className="block text-xl md:text-2xl font-light text-gray-300 mt-6 max-w-2xl leading-relaxed">
              Мы ведем открытую политику и регулярно публикуем отчеты со строительной площадки, чтобы вы могли наблюдать за созданием вашего будущего дома.
            </span>
          </h1>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 animate-bounce">
        <ChevronDown size={24} strokeWidth={1} />
      </div>
    </div>
  );
};