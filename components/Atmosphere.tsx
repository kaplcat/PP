import React from 'react';
import { Section } from './ui/Section';

export const Atmosphere: React.FC = () => {
  return (
    <Section fullWidth className="!py-0 bg-white">
      <div className="flex flex-col lg:flex-row h-auto lg:h-[700px]">
        {/* Left: Text Content */}
        <div className="w-full lg:w-1/3 px-5 py-12 xl:px-[40px] xl:py-20 flex flex-col justify-center border-r border-gray-100">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">Атмосфера</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-primary leading-tight mb-8">
            Утро в лесу, <br/> вечер у камина
          </h2>
          <p className="text-gray-500 font-light leading-relaxed text-lg mb-8">
            Мы сохранили естественный ландшафт, чтобы каждый ваш день начинался с пения птиц и заканчивался видом на закат над верхушками сосен.
          </p>
          <div className="grid grid-cols-2 gap-8 mt-4">
             <div>
                <span className="block text-4xl font-serif text-primary mb-2">12</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Гектаров парка</span>
             </div>
             <div>
                <span className="block text-4xl font-serif text-primary mb-2">3.5</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Км троп</span>
             </div>
          </div>
        </div>

        {/* Right: Images Grid */}
        <div className="w-full lg:w-2/3 grid grid-cols-2">
            <div className="relative h-[400px] lg:h-full overflow-hidden group">
                <img 
                    src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2574&auto=format&fit=crop" 
                    alt="Nature" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="relative h-[400px] lg:h-full overflow-hidden group border-l border-white/20">
                <img 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop" 
                    alt="Architecture" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute bottom-8 left-8 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <p className="font-serif text-2xl italic">"Тишина — это новая роскошь"</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            </div>
        </div>
      </div>
    </Section>
  );
};