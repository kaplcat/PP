import React from 'react';
import { Section } from './ui/Section';
import { Navigation, Map } from 'lucide-react';

export const Location: React.FC = () => {
  return (
    <Section id="location" fullWidth className="!py-0">
      <div className="flex flex-col lg:flex-row h-auto lg:h-[800px]">
        {/* Map Area */}
        <div className="w-full lg:w-3/5 h-[500px] lg:h-full relative bg-gray-200 grayscale hover:grayscale-0 transition-all duration-700">
           <iframe 
              src="https://yandex.ru/map-widget/v1/?um=constructor%3A730b80b880f65751d53418e5f1b002b169b67cfd552512fa9c21451384e92031&amp;source=constructor" 
              width="100%" 
              height="100%" 
              frameBorder="0"
              title="Yandex Map"
              className="absolute inset-0 w-full h-full"
          />
          <div className="absolute bottom-8 right-8 bg-white p-4 hidden md:block shadow-xl">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Map size={16} />
              <span>Карта инфраструктуры</span>
            </div>
          </div>
        </div>

        {/* Info Area */}
        <div className="w-full lg:w-2/5 bg-primary text-white p-12 lg:p-24 flex flex-col justify-center">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-8 block">Локация</span>
          <h2 className="font-serif text-4xl lg:text-5xl mb-12">В центре тишины</h2>
          
          <div className="space-y-10">
            <div className="flex gap-6 items-start group">
              <div className="mt-1 text-accent opacity-50 group-hover:opacity-100 transition-opacity">01</div>
              <div>
                <h4 className="text-xl font-serif mb-2 group-hover:text-accent transition-colors">Новая Рига</h4>
                <p className="text-gray-400 font-light text-sm leading-relaxed">
                  Скоростное шоссе без светофоров. 50 минут комфортной езды от МКАД до ворот вашего дома.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="mt-1 text-accent opacity-50 group-hover:opacity-100 transition-opacity">02</div>
              <div>
                <h4 className="text-xl font-serif mb-2 group-hover:text-accent transition-colors">Истра</h4>
                <p className="text-gray-400 font-light text-sm leading-relaxed">
                  Всего 16 км до исторического центра города. Рестораны, школы, музеи и Новоиерусалимский монастырь.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="mt-1 text-accent opacity-50 group-hover:opacity-100 transition-opacity">03</div>
              <div>
                <h4 className="text-xl font-serif mb-2 group-hover:text-accent transition-colors">Вода и Лес</h4>
                <p className="text-gray-400 font-light text-sm leading-relaxed">
                  8 км до Истринского водохранилища. Поселок окружен 1200 га заповедного лесного массива.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Navigation className="text-accent" />
              <span className="text-sm tracking-wide">55.9876° N, 36.8765° E</span>
            </div>
            <button className="text-xs uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-primary transition-all">
              Маршрут
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};