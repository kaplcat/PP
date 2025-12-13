import React from 'react';
import { Section } from './ui/Section';

export const Atmosphere: React.FC = () => {
  return (
    <Section fullWidth className="!py-0 bg-white">
      <div className="flex flex-col lg:flex-row min-h-[700px]">
        
        {/* Left Half: Text Content 
            Logic: Takes 50% width, but uses flex-end to align internal content 
            against the imaginary 1200px grid line.
        */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center bg-white order-2 lg:order-1">
          <div className="w-full max-w-[600px] px-5 py-20 lg:py-0 lg:pr-10 xl:pr-[20px]"> {/* 20px corresponds to half gutter of 40px */}
            <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">Атмосфера</span>
            <h2 className="font-serif text-4xl lg:text-5xl text-primary leading-tight mb-8">
              Утро в лесу, <br/> вечер у камина
            </h2>
            <p className="text-gray-500 font-light leading-relaxed text-lg mb-12 max-w-md">
              Мы сохранили естественный ландшафт, чтобы каждый ваш день начинался с пения птиц и заканчивался видом на закат над верхушками сосен.
            </p>
            
            <div className="grid grid-cols-2 gap-12 border-t border-gray-100 pt-8">
               <div className="group">
                  <span className="block text-5xl font-serif text-primary mb-2 group-hover:text-accent transition-colors duration-300">12</span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Гектаров парка</span>
               </div>
               <div className="group">
                  <span className="block text-5xl font-serif text-primary mb-2 group-hover:text-accent transition-colors duration-300">3.5</span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Км лесных троп</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right Half: Images Grid (Full Bleed) 
            Logic: Takes 50% width and extends to the right edge of the screen.
        */}
        <div className="w-full lg:w-1/2 h-[400px] lg:h-auto grid grid-cols-2 order-1 lg:order-2">
            <div className="relative h-full overflow-hidden group">
                <img 
                    src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2574&auto=format&fit=crop" 
                    alt="Nature" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            <div className="relative h-full overflow-hidden group border-l border-white/20">
                <img 
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop" 
                    alt="Architecture" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute bottom-12 left-8 right-8 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <p className="font-serif text-2xl italic leading-tight">"Тишина — это новая роскошь"</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            </div>
        </div>
      </div>
    </Section>
  );
};