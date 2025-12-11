import React from 'react';
import { Section } from './ui/Section';
import { ArrowUpRight } from 'lucide-react';

export const ProjectsCTA: React.FC = () => {
  return (
    <Section fullWidth className="!py-0 relative bg-primary overflow-hidden">
      {/* Background Image with Parallax effect */}
      <div className="absolute inset-0">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2584&auto=format&fit=crop')" }}
        />
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-90" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-32 lg:py-48">
        <div className="flex flex-col items-center text-center">
          
          <span className="text-white/80 text-xs font-bold uppercase tracking-[0.3em] mb-8 border border-white/20 px-4 py-2 rounded-full backdrop-blur-md">
            Коллекция домов
          </span>

          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-8">
            Найдите свой <br />
            <span className="italic text-accent">идеальный</span> дом
          </h2>

          <p className="text-gray-200 font-light text-lg md:text-xl max-w-2xl leading-relaxed mb-16 opacity-90">
            Посмотрите на готовые коттеджи и планировки. От функциональных домов для молодой семьи до масштабных проектов для нескольких поколений.
          </p>

          <a href="#" className="group relative inline-flex items-center gap-4 px-12 py-6 bg-white text-primary overflow-hidden transition-all duration-300 hover:bg-accent hover:text-white">
            <span className="relative z-10 font-sans text-xs font-bold tracking-[0.25em] uppercase">
              Перейти в каталог
            </span>
            <ArrowUpRight size={18} className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>

        </div>
      </div>
    </Section>
  );
};