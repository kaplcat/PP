import React from 'react';
import { Section } from '../ui/Section';
import { TreePine, Waves, Sun, Coffee } from 'lucide-react';

const features = [
  {
    title: "Центральный парк",
    desc: "Сердце поселка площадью 5 гектаров. Ландшафтный дизайн в английском стиле, многоуровневое освещение и зоны для пикников.",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2664&auto=format&fit=crop",
    icon: TreePine
  },
  {
    title: "Набережная",
    desc: "Благоустроенная береговая линия протяженностью 800 метров. Деревянные настилы для йоги, лодочная станция и вечерняя подсветка.",
    image: "https://images.unsplash.com/photo-1544959062-7e79394cb22c?q=80&w=2670&auto=format&fit=crop",
    icon: Waves
  },
  {
    title: "Спортивный кластер",
    desc: "Воркаут площадки, теннисный корт с профессиональным покрытием и универсальное поле для командных игр, скрытое за живой изгородью.",
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=2670&auto=format&fit=crop",
    icon: Sun
  }
];

export const LandscapingDetails: React.FC = () => {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
        <div>
          <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">Благоустройство</span>
          <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight mb-8">
            Природа как <br/> часть архитектуры
          </h2>
          <p className="text-gray-500 font-light leading-relaxed text-lg">
            Мы не просто строим дома, мы создаем среду обитания. Ландшафтный дизайн поселка разработан с учетом смены сезонов, чтобы территория выглядела эффектно круглый год.
          </p>
        </div>
        <div className="relative h-[400px] lg:h-auto overflow-hidden group">
            <img 
                src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=2574&auto=format&fit=crop" 
                alt="Park" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((item, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="relative h-80 overflow-hidden mb-8">
              <img 
                src={item.image} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute top-6 left-6 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-lg">
                <item.icon size={20} strokeWidth={1.5} />
              </div>
            </div>
            
            <h3 className="font-serif text-2xl text-primary mb-4 group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed border-l border-gray-100 pl-4 group-hover:border-accent transition-colors">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};