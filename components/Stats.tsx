import React from 'react';
import { Section } from './ui/Section';

const stats = [
  { id: 1, value: '390', label: 'Участков', sub: 'от 7 до 25 соток' },
  { id: 2, value: '1200', label: 'Гектаров', sub: 'заповедного леса' },
  { id: 3, value: '24/7', label: 'Сервис', sub: 'охрана и консьерж' },
  { id: 4, value: '100%', label: 'Инженерия', sub: 'подземные сети' },
];

export const Stats: React.FC = () => {
  return (
    <Section id="about">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        {/* Left: Content */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-16">
          <div>
            <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">О проекте</span>
            <h2 className="font-serif text-5xl md:text-6xl text-primary leading-[1.1] mb-8">
              Архитектура <br />
              <span className="italic font-light text-gray-400">в диалоге</span> <br />
              с природой
            </h2>
            <div className="space-y-6 text-lg font-light text-gray-600 leading-relaxed">
              <p>
                Подсолнух Парк — это не просто квадратные метры, это философия жизни. 
                Здесь современная эстетика минимализма встречается с первозданной красотой Истринского леса.
              </p>
              <p>
                Мы создали пространство, где каждый элемент — от ландшафтного дизайна до отделочных материалов — 
                подчинен идее гармонии и комфорта.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-16 pt-4">
            {stats.map((stat) => (
              <div key={stat.id} className="group flex flex-col">
                <div className="font-serif text-5xl md:text-6xl text-primary font-light leading-none mb-5 group-hover:text-accent transition-colors duration-500">
                  {stat.value}
                </div>
                
                {/* Decorative Line */}
                <div className="w-full h-px bg-gray-200 mb-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-0 bg-accent group-hover:w-full transition-all duration-1000 ease-out" />
                </div>

                <div className="flex flex-col gap-1.5">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-[0.25em]">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-gray-400 font-light tracking-wide font-sans">
                      {stat.sub}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Photography */}
        <div className="lg:col-span-7 relative h-[600px] lg:h-[800px] overflow-hidden rounded-sm group">
          <div className="absolute inset-0 bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop" 
              alt="Luxury House" 
              className="w-full h-full object-cover transform transition-transform duration-[1.5s] group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm max-w-sm">
            <p className="text-white text-sm font-light">
              <span className="block font-medium uppercase tracking-wider mb-2 text-accent">Проект "Лесной"</span>
              Панорамное остекление, натуральный камень и дерево в отделке фасадов.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};