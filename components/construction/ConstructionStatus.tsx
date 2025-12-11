import React from 'react';
import { Section } from '../ui/Section';

const metrics = [
  { label: "Земляные работы и сети", percent: 100 },
  { label: "Монолитные работы (1 очередь)", percent: 85 },
  { label: "Фасадные работы", percent: 60 },
  { label: "Благоустройство территории", percent: 40 },
];

export const ConstructionStatus: React.FC = () => {
  return (
    <Section className="bg-primary text-white border-b border-white/5">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-4">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">Статус</span>
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-6">
            Готовность <br />
            1-й очереди
          </h2>
          <p className="text-gray-400 font-light text-sm leading-relaxed">
            Работы ведутся согласно графику. Сдача первой очереди запланирована на IV квартал 2024 года.
          </p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {metrics.map((item, idx) => (
            <div key={idx} className="group">
              <div className="flex justify-between items-end mb-4">
                <span className="text-sm uppercase tracking-wider text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
                <span className="font-serif text-3xl text-accent">{item.percent}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/10 relative overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-accent transition-all duration-1000 ease-out"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};