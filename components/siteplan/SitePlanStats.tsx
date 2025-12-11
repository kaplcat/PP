import React from 'react';
import { Section } from '../ui/Section';

const stats = [
  { id: 1, value: "390", label: "Участков", desc: "Приватность и простор" },
  { id: 2, value: "54", unit: "га", label: "Территория", desc: "Единый архитектурный код" },
  { id: 3, value: "1200", unit: "га", label: "Лесной массив", desc: "Вековой лес вокруг" },
  { id: 4, value: "6.1", unit: "км", label: "Прогулочные зоны", desc: "Аллеи и бульвары" },
];

export const SitePlanStats: React.FC = () => {
  return (
    <Section className="bg-white mb-12">
      <div className="mb-20">
        <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">Масштаб</span>
        <h2 className="font-serif text-4xl md:text-5xl text-primary">Посёлок в цифрах</h2>
      </div>

      <div className="border-t border-b border-primary/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-primary/10">
          {stats.map((stat) => (
            <div key={stat.id} className="py-12 lg:py-16 px-8 group relative overflow-hidden transition-colors duration-500 hover:bg-light/50">
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                <div>
                   <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-serif text-6xl xl:text-7xl text-primary font-normal leading-none group-hover:text-accent transition-colors duration-500">
                      {stat.value}
                    </span>
                    {stat.unit && (
                      <span className="font-serif text-2xl text-primary/40 font-light italic">
                        {stat.unit}
                      </span>
                    )}
                  </div>
                  <div className="h-[1px] w-12 bg-accent/30 mb-6 mt-4 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                </div>
                
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-sm font-light text-gray-400 font-sans">
                    {stat.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};