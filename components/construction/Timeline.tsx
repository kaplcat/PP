import React from 'react';
import { Section } from '../ui/Section';
import { Calendar, ArrowRight } from 'lucide-react';

const updates = [
  {
    date: "Август 2024",
    title: "Завершение кровельных работ в секторе А",
    desc: "Полностью смонтирована стропильная система и уложена натуральная черепица на 12 коттеджах. Приступили к установке панорамных окон Schüco.",
    image: "https://images.unsplash.com/photo-1628744876497-eb30460be9f6?q=80&w=2670&auto=format&fit=crop",
    tags: ["Кровля", "Остекление"]
  },
  {
    date: "Июль 2024",
    title: "Монолитные работы и кладка стен",
    desc: "Завершены работы по заливке перекрытий второго этажа в корпусах 15-20. Ведется активная кладка внешних стен из керамического блока.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop",
    tags: ["Монолит", "Стены"]
  },
  {
    date: "Июнь 2024",
    title: "Прокладка инженерных сетей",
    desc: "Завершен основной этап прокладки подземных коммуникаций: газ, электричество и водоснабжение подведены к границам участков первой очереди.",
    image: "https://images.unsplash.com/photo-1590642916589-592d92d9d9ce?q=80&w=2574&auto=format&fit=crop",
    tags: ["Инженерия", "Коммуникации"]
  },
  {
    date: "Май 2024",
    title: "Начало благоустройства парка",
    desc: "Разметка прогулочных дорожек в лесной зоне. Санитарная чистка подлеска и подготовка основания для будущих аллей.",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop",
    tags: ["Благоустройство", "Парк"]
  }
];

export const Timeline: React.FC = () => {
  return (
    <Section id="timeline" className="bg-light relative">
      {/* Central Line (Desktop) */}
      <div className="absolute left-6 md:left-12 lg:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 lg:-translate-x-1/2 z-0" />

      <div className="relative z-10 flex flex-col gap-24">
        {updates.map((item, idx) => (
          <div key={idx} className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-start ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Date & Info Side */}
            <div className={`w-full lg:w-1/2 flex flex-col ${idx % 2 === 1 ? 'lg:items-start pl-12 lg:pl-0' : 'lg:items-end pl-12 lg:pl-0 lg:text-right'} text-left relative`}>
              
              <div className="mb-6">
                <span className="text-accent font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-4 lg:inline-flex lg:mb-0">
                  <Calendar size={14} />
                  {item.date}
                </span>
                
                <h3 className="font-serif text-2xl md:text-3xl text-primary mb-4 leading-tight group-hover:text-accent transition-colors cursor-pointer">
                  {item.title}
                </h3>
                
                <div className={`flex flex-wrap gap-2 mb-4 ${idx % 2 === 1 ? 'lg:justify-start' : 'lg:justify-end'}`}>
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] uppercase tracking-wider border border-gray-200 px-3 py-1 text-gray-500 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-gray-500 font-light leading-relaxed text-sm max-w-md">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Image Side */}
            <div className={`w-full lg:w-1/2 pl-12 lg:pl-0`}>
              <div className="group relative overflow-hidden aspect-[4/3] w-full">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                
                <button className="absolute bottom-6 right-6 w-12 h-12 bg-white flex items-center justify-center text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
      
      <div className="text-center mt-24">
        <button className="border-b border-primary/20 pb-1 text-primary hover:border-accent hover:text-accent transition-colors text-sm uppercase tracking-widest">
          Загрузить ранние отчеты
        </button>
      </div>
    </Section>
  );
};