import React from 'react';
import { Section } from '../ui/Section';
import { ArrowRight } from 'lucide-react';

const updates = [
  {
    month: "08",
    year: "2024",
    title: "Кровельные работы и остекление",
    desc: "Полностью смонтирована стропильная система и уложена натуральная черепица на 12 коттеджах. Приступили к установке панорамных окон Schüco в секторе А.",
    image: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=2670&auto=format&fit=crop",
    tags: ["Кровля", "Остекление"]
  },
  {
    month: "07",
    year: "2024",
    title: "Монолитные работы",
    desc: "Завершены работы по заливке перекрытий второго этажа в корпусах 15-20. Ведется активная кладка внешних стен из керамического блока Porotherm.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop",
    tags: ["Монолит", "Стены"]
  },
  {
    month: "06",
    year: "2024",
    title: "Инженерные сети",
    desc: "Завершен основной этап прокладки подземных коммуникаций: газ, электричество и водоснабжение подведены к границам участков первой очереди.",
    image: "https://images.unsplash.com/photo-1590642916589-592d92d9d9ce?q=80&w=2574&auto=format&fit=crop",
    tags: ["Инженерия", "Коммуникации"]
  },
  {
    month: "05",
    year: "2024",
    title: "Благоустройство парка",
    desc: "Разметка прогулочных дорожек в лесной зоне. Санитарная чистка подлеска и подготовка основания для будущих аллей и зон отдыха.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop",
    tags: ["Благоустройство", "Парк"]
  }
];

export const Timeline: React.FC = () => {
  return (
    <Section id="timeline" className="bg-white">
      <div className="mb-20">
         <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">Дневник</span>
         <h2 className="font-serif text-4xl md:text-5xl text-primary">Хронология работ</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {updates.map((item, idx) => (
          <div key={idx} className="group cursor-pointer flex flex-col h-full">
             <div className="relative overflow-hidden aspect-[3/2] mb-8 bg-gray-100">
                <img 
                    src={item.image} 
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 bg-white px-6 py-4">
                    <div className="text-3xl font-serif text-primary leading-none text-center">{item.month}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-400 text-center mt-1">{item.year}</div>
                </div>
             </div>

             <div className="flex flex-col items-start pr-0 md:pr-8 flex-grow">
                <div className="flex gap-4 mb-4">
                    {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] uppercase tracking-widest text-accent font-bold">
                           #{tag}
                        </span>
                    ))}
                </div>
                <h3 className="font-serif text-2xl text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                    {item.title}
                </h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed mb-6 flex-grow">
                    {item.desc}
                </p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-primary border-b border-transparent group-hover:border-primary transition-all mt-auto">
                    Подробнее
                </div>
             </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-20">
        <button className="border-b border-primary/20 pb-1 text-primary hover:border-accent hover:text-accent transition-colors text-sm uppercase tracking-widest">
          Загрузить еще
        </button>
      </div>
    </Section>
  );
};