import React from 'react';
import { Section } from '../ui/Section';
import { ShieldCheck, TreePine, Play, Dumbbell } from 'lucide-react';

const facilities = [
  {
    title: "Безопасность 24/7",
    desc: "Закрытая территория, КПП с системой распознавания номеров, круглосуточное патрулирование и видеонаблюдение по периметру.",
    icon: ShieldCheck,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop",
    colSpan: "lg:col-span-8",
  },
  {
    title: "Парковая зона",
    desc: "12 гектаров собственного благоустроенного парка с прогулочными аллеями, зонами барбекю и выходом к реке.",
    icon: TreePine,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop",
    colSpan: "lg:col-span-4",
  },
  {
    title: "Детям",
    desc: "Современные игровые комплексы из экологичных материалов, спортивные площадки и частный детский клуб на территории.",
    icon: Play,
    image: "https://images.unsplash.com/photo-1596464716127-f9a8759fa229?q=80&w=2670&auto=format&fit=crop",
    colSpan: "lg:col-span-4",
  },
  {
    title: "Спорт и Здоровье",
    desc: "Воркаут-зоны, теннисный корт, площадка для йоги и 3.5 км беговых дорожек в окружении вековых сосен.",
    icon: Dumbbell,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2670&auto=format&fit=crop",
    colSpan: "lg:col-span-8",
  }
];

export const Facilities: React.FC = () => {
  return (
    <Section id="facilities" className="bg-light">
      <div className="mb-20">
        <span className="text-accent text-xs font-bold uppercase tracking-[0.25em]">Комфорт</span>
        <h2 className="font-serif text-4xl md:text-5xl text-primary mt-6">Пространство для жизни</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {facilities.map((item, idx) => (
          <div key={idx} className={`${item.colSpan} group relative h-[400px] lg:h-[500px] overflow-hidden bg-gray-900`}>
            <img 
              src={item.image} 
              alt={item.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <item.icon className="text-accent mb-6 w-8 h-8" />
              <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">{item.title}</h3>
              <p className="text-gray-300 font-light text-sm md:text-base leading-relaxed max-w-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};