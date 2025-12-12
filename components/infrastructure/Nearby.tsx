import React from 'react';
import { Section } from '../ui/Section';
import { Car, ShoppingBag, GraduationCap, Utensils, Waves, Landmark, ArrowRight } from 'lucide-react';

const places = [
  { 
    time: "5 мин", 
    category: "Природа", 
    title: "Истринское водохранилище", 
    icon: Waves, 
    desc: "Пляжи, яхт-клубы, вейк-парки и рестораны у воды." 
  },
  { 
    time: "20 мин", 
    category: "Культура", 
    title: "Ново-Иерусалимский музей", 
    icon: Landmark, 
    desc: "Один из крупнейших музейных комплексов в России." 
  },
  { 
    time: "35 мин", 
    category: "Образование", 
    title: "Павловская Гимназия", 
    icon: GraduationCap, 
    desc: "Премиальное образование и всестороннее развитие детей." 
  },
  { 
    time: "20 мин", 
    category: "Гастрономия", 
    title: "Сыроварня & Рестораны", 
    icon: Utensils, 
    desc: "Фермерские продукты, авторская кухня и уютные кофейни." 
  },
  { 
    time: "30 мин", 
    category: "Шопинг", 
    title: "Novaya Riga Outlet", 
    icon: ShoppingBag, 
    desc: "Брендовые бутики, супермаркеты и развлечения." 
  },
  { 
    time: "55 мин", 
    category: "Транспорт", 
    title: "Москва (МКАД)", 
    icon: Car, 
    desc: "Скоростная трасса без светофоров прямо до дома." 
  },
];

export const Nearby: React.FC = () => {
  return (
    <Section id="nearby" className="bg-surface relative overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">Окружение</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
            В центре <br />
            насыщенной жизни
          </h2>
        </div>
        <p className="text-gray-500 font-light max-w-md text-sm md:text-base leading-relaxed pb-2">
          Вам не придется выбирать между тишиной природы и городским комфортом. Все необходимое для жизни высокого класса находится в 15-30 минутах езды.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {places.map((place, idx) => (
          <div 
            key={idx} 
            className="group bg-white p-10 border border-gray-100 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                <place.icon size={20} strokeWidth={1.5} />
              </div>
              <span className="font-serif text-3xl text-accent group-hover:scale-110 transition-transform duration-300 origin-right">
                {place.time}
              </span>
            </div>

            <div className="relative z-10">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block group-hover:text-accent transition-colors">
                {place.category}
              </span>
              <h3 className="font-serif text-xl text-primary mb-4 leading-snug">
                {place.title}
              </h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                {place.desc}
              </p>
            </div>

            {/* Hover Arrow */}
            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 text-accent">
              <ArrowRight size={20} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};