import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { MapPin, Info, ArrowRight } from 'lucide-react';

const lots = [
  { id: 101, x: 25, y: 35, area: 12.5, price: "14.5", status: "available" },
  { id: 105, x: 45, y: 45, area: 15.0, price: "18.2", status: "sold" },
  { id: 112, x: 65, y: 30, area: 10.0, price: "11.5", status: "available" },
  { id: 124, x: 35, y: 65, area: 20.0, price: "25.0", status: "reserved" },
  { id: 130, x: 75, y: 55, area: 14.5, price: "16.8", status: "available" },
  { id: 145, x: 55, y: 75, area: 18.0, price: "21.5", status: "available" },
];

const legend = [
  { label: "В продаже", color: "bg-accent" },
  { label: "Забронировано", color: "bg-yellow-500" },
  { label: "Продано", color: "bg-gray-400" },
];

export const MasterPlan: React.FC = () => {
  const [activeLot, setActiveLot] = useState<number | null>(null);

  return (
    <Section id="masterplan" className="bg-light relative">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <span className="text-accent text-xs font-bold uppercase tracking-[0.25em]">Выбор участка</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary mt-4">Интерактивная карта</h2>
        </div>
        
        {/* Legend */}
        <div className="flex gap-6">
          {legend.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm text-gray-500 font-light uppercase tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full aspect-[16/9] bg-[#E5E7EB] rounded-sm overflow-hidden shadow-2xl group cursor-grab active:cursor-grabbing">
        {/* Placeholder Map Image */}
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop" 
          alt="Master Plan" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        
        {/* Map Overlay Gradient */}
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />

        {/* Interactive Points */}
        {lots.map((lot) => (
          <div 
            key={lot.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${lot.x}%`, top: `${lot.y}%` }}
            onMouseEnter={() => setActiveLot(lot.id)}
            onMouseLeave={() => setActiveLot(null)}
          >
            {/* Pulsing Dot */}
            <div className="relative cursor-pointer group/pin">
              <div className={`w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-white shadow-lg transition-all duration-300 
                ${lot.status === 'available' ? 'bg-accent animate-pulse' : lot.status === 'reserved' ? 'bg-yellow-500' : 'bg-gray-400'}
                ${activeLot === lot.id ? 'scale-150' : 'scale-100'}
              `} />
              
              {/* Tooltip */}
              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-white p-6 shadow-2xl transition-all duration-300 z-20 pointer-events-none
                ${activeLot === lot.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-serif text-2xl text-primary">Участок {lot.id}</span>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 
                    ${lot.status === 'available' ? 'bg-accent text-white' : lot.status === 'reserved' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-500'}
                  `}>
                    {lot.status === 'available' ? 'Свободен' : lot.status === 'reserved' ? 'Бронь' : 'Продан'}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4 border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Площадь</span>
                    <span className="text-primary font-medium">{lot.area} сот.</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Стоимость</span>
                    <span className="text-primary font-medium">{lot.price} млн ₽</span>
                  </div>
                </div>

                {lot.status === 'available' && (
                  <button className="w-full bg-primary text-white py-3 text-xs uppercase tracking-widest hover:bg-accent transition-colors">
                    Забронировать
                  </button>
                )}
              </div>
              
              {/* Connector Arrow for Tooltip */}
              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white transition-all duration-300
                 ${activeLot === lot.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 font-light text-sm mb-6">
          * Генплан носит информационный характер. Актуальное наличие уточняйте у менеджеров.
        </p>
        <button className="inline-flex items-center gap-3 border-b border-primary/20 pb-1 text-primary hover:border-accent hover:text-accent transition-colors text-sm uppercase tracking-widest">
          Скачать генплан в PDF
          <ArrowRight size={16} />
        </button>
      </div>
    </Section>
  );
};