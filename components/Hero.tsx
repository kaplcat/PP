import React from 'react';
import { ChevronDown, MoveRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-primary">
      {/* Cinematic Background with Slow Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center transform origin-center animate-scale-slow" />
        {/* Gradient Overlay: Sophisticated gradients for readability and depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </div>

      {/* Content Container */}
      {/* pt-[120px] accounts for the fixed header height. 
          flex & justify-center ensures content is centered in the REMAINING vertical space */}
      <div className="relative z-10 h-full flex flex-col pt-[100px] md:pt-[120px] pb-12 max-w-[1200px] mx-auto px-5">
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-7xl">
            
            {/* Tagline - High End Editorial Style */}
            <div className="flex items-center gap-6 mb-8 md:mb-12 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
              <span className="h-[1px] w-12 bg-accent/80" />
              <span className="text-gray-200 uppercase tracking-[0.4em] text-[10px] md:text-xs font-sans font-medium">Истринский район</span>
            </div>
            
            {/* Title - Massive Editorial Typography using Viewport Units for perfect fit */}
            {/* Changed fixed text-[150px] to relative text-[9vw] to prevent overflow on smaller laptop screens */}
            <h1 className="font-serif text-white leading-[0.9] animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
              <span className="block text-5xl md:text-7xl lg:text-[7vw] xl:text-[8vw] tracking-tight font-normal text-white/95">
                Коттеджи
              </span>
              <span className="block text-4xl md:text-6xl lg:text-[6vw] xl:text-[7vw] font-light italic text-accent my-2 lg:my-4 ml-8 md:ml-[10vw] opacity-90">
                в гармонии
              </span>
              <span className="block text-5xl md:text-7xl lg:text-[7vw] xl:text-[8vw] tracking-tight font-normal text-white/95">
                с природой
              </span>
            </h1>

            {/* Description - Clean & Balanced */}
            <div className="mt-12 md:mt-16 max-w-lg animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s' }}>
              <p className="font-sans text-sm md:text-base text-gray-300 leading-relaxed font-light tracking-wide border-l border-white/20 pl-8">
                Закрытый клубный поселок премиум-класса. <br className="hidden md:block" />
                Тишина векового леса, авторская архитектура и безупречный комфорт в 45 минутах от Москвы.
              </p>
            </div>

            {/* Buttons - Luxury Minimalist */}
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-12 animate-fade-in-up opacity-0" style={{ animationDelay: '0.8s' }}>
              <button className="group relative h-12 md:h-14 px-10 bg-white text-primary overflow-hidden transition-all duration-500 hover:bg-accent hover:text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
                <span className="relative z-10 font-sans text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase">Выбрать коттедж</span>
              </button>
              
              <button className="group flex items-center gap-5 text-white hover:text-accent transition-colors duration-300">
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center transition-all duration-300">
                   <MoveRight size={32} strokeWidth={1} className="group-hover:translate-x-2 transition-transform duration-500 text-white group-hover:text-accent" />
                </div>
                <span className="font-sans text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase border-b border-transparent group-hover:border-accent pb-1 transition-all">Смотреть генплан</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 right-12 hidden lg:flex flex-col items-end gap-4 text-white/30 font-sans text-[10px] uppercase tracking-[0.3em] animate-fade-in opacity-0" style={{ animationDelay: '1s' }}>
        <span className="vertical-text" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
        <div className="h-24 w-[1px] bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
      </div>
      
      {/* Mobile Scroll */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 md:hidden text-white/30 animate-bounce">
        <ChevronDown size={24} strokeWidth={1} />
      </div>
    </div>
  );
};