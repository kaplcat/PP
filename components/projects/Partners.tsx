import React from 'react';
import { Section } from '../ui/Section';

const partners = [
  { 
    name: "Wienerberger", 
    category: "Керамические блоки Porotherm", 
    desc: "Австрийский концерн, мировой лидер в производстве керамического кирпича и блоков." 
  },
  { 
    name: "Braas", 
    category: "Натуральная черепица", 
    desc: "Международный стандарт качества и долговечности кровельных систем." 
  },
  { 
    name: "Schüco", 
    category: "Панорамное остекление", 
    desc: "Немецкие технологии оконных, дверных и фасадных систем премиум-класса." 
  },
  { 
    name: "Feldhaus", 
    category: "Клинкерный кирпич", 
    desc: "Традиции производства немецкого клинкера с 1857 года. Уникальная фактура и надежность." 
  },
  { 
    name: "Rehau", 
    category: "Инженерные системы", 
    desc: "Инновационные решения для водоснабжения, отопления и коммуникаций." 
  },
  { 
    name: "Ceresit", 
    category: "Строительные смеси", 
    desc: "Системные решения для утепления фасадов и внутренней отделки." 
  }
];

export const Partners: React.FC = () => {
  return (
    <Section className="bg-white border-t border-gray-100">
      <div className="mb-20">
         <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">Поставщики</span>
         <h2 className="font-serif text-4xl md:text-5xl text-primary">Знак качества</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
        {partners.map((partner, idx) => (
          <div key={idx} className="group bg-white p-12 flex flex-col items-start justify-between min-h-[280px] hover:bg-primary transition-colors duration-500">
            <div className="w-full">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-accent transition-colors duration-300 mb-4 block">
                    {partner.category}
                </span>
                <h3 className="font-serif text-3xl text-primary group-hover:text-white transition-colors duration-300 mb-6">
                    {partner.name}
                </h3>
            </div>
            
            <p className="text-sm font-light text-gray-500 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                {partner.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};