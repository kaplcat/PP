import React from 'react';
import { Section } from './ui/Section';
import { Navigation, Map } from 'lucide-react';

export const Location: React.FC = () => {
  return (
    <Section id="location" fullWidth className="!py-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[800px]">
        
        {/* Left Half: Map Area */}
        {/* Order-2 on mobile (bottom), Order-1 on desktop (left) */}
        <div className="relative h-[400px] lg:h-auto bg-gray-200 grayscale hover:grayscale-0 transition-all duration-700 order-2 lg:order-1">
           <iframe 
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A730b80b880f65751d53418e5f1b002b169b67cfd552512fa9c21451384e92031&amp;source=constructor" 
              width="100%" 
              height="100%" 
              frameBorder="0"
              title="Yandex Map"
              className="absolute inset-0 w-full h-full"
          />
          <div className="absolute bottom-0 right-0 bg-white/90 backdrop-blur-md p-6 hidden md:flex items-center gap-4 shadow-lg border-t border-l border-gray-100">
             <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                <Map size={20} />
             </div>
             <div>
                <span className="block text-xs uppercase font-bold tracking-widest text-primary">Инфраструктура</span>
                <span className="text-[10px] text-gray-500">Показать на карте</span>
             </div>
          </div>
        </div>

        {/* Right Half: Info Area */}
        {/* Matches padding and alignment of Countdown section (Invest in time) */}
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-primary text-white order-1 lg:order-2">
            <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-8 block">Локация</span>
            <h2 className="font-serif text-4xl lg:text-5xl mb-12">В центре тишины</h2>
            
            <div className="space-y-12">
              <div className="flex gap-8 items-start group">
                <div className="mt-2 text-accent/50 text-sm font-bold group-hover:text-accent transition-colors">01</div>
                <div>
                  <h4 className="text-xl font-serif mb-3 group-hover:text-accent transition-colors">Новая Рига</h4>
                  <p className="text-gray-400 font-light text-sm leading-relaxed max-w-sm">
                    Скоростное шоссе без светофоров. 55 минут комфортной езды от МКАД до ворот вашего дома.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="mt-2 text-accent/50 text-sm font-bold group-hover:text-accent transition-colors">02</div>
                <div>
                  <h4 className="text-xl font-serif mb-3 group-hover:text-accent transition-colors">Истра</h4>
                  <p className="text-gray-400 font-light text-sm leading-relaxed max-w-sm">
                    Всего 16 км до исторического центра города. Рестораны, школы, музеи и Новоиерусалимский монастырь.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 items-start group">
                <div className="mt-2 text-accent/50 text-sm font-bold group-hover:text-accent transition-colors">03</div>
                <div>
                  <h4 className="text-xl font-serif mb-3 group-hover:text-accent transition-colors">Вода и Лес</h4>
                  <p className="text-gray-400 font-light text-sm leading-relaxed max-w-sm">
                    500 метров до Истринского водохранилища. Поселок окружен 1200 га заповедного лесного массива.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-3 text-gray-400">
                <Navigation className="text-accent" size={18} />
                <span className="text-xs tracking-[0.1em] font-mono">56.0305° N, 36.6993° E</span>
              </div>
              <button className="text-xs font-bold uppercase tracking-widest border border-white/20 px-8 py-4 hover:bg-white hover:text-primary transition-all duration-300 w-full sm:w-auto text-center">
                Построить маршрут
              </button>
            </div>
        </div>

      </div>
    </Section>
  );
};