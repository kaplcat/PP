import React from 'react';
import { Section } from '../ui/Section';
import { Layers, Box, Maximize, Sun } from 'lucide-react';

const materials = [
  {
    icon: Box,
    title: "Керамический блок",
    desc: "Стены из блока Porotherm 440 мм. Экологичность, отличная звукоизоляция и поддержание идеального микроклимата внутри дома круглый год."
  },
  {
    icon: Layers,
    title: "Натуральная черепица",
    desc: "Кровля Braas. Долговечность более 100 лет, благородный внешний вид и надежная защита от осадков. Премиальная шумоизоляция во время дождя."
  },
  {
    icon: Maximize,
    title: "Панорамное остекление",
    desc: "Алюминиевый профиль Schüco с мультифункциональными энергосберегающими стеклопакетами. Максимум света без теплопотерь."
  },
  {
    icon: Sun,
    title: "Клинкерный кирпич",
    desc: "Фасады облицованы клинкерным кирпичом ручной формовки. Уникальная фактура, морозостойкость и отсутствие высолов."
  }
];

export const Materials: React.FC = () => {
  return (
    <Section className="bg-white">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/3">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">Качество</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-primary leading-tight mb-8">
            Фундаментальный <br/> подход
          </h2>
          <p className="text-gray-500 font-light leading-relaxed text-lg">
            Мы не идем на компромиссы в вопросах качества. Каждый дом строится по монолитно-кирпичной технологии с использованием лучших материалов европейских производителей.
          </p>
        </div>

        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
          {materials.map((item, idx) => (
            <div key={idx} className="group border-l border-gray-100 pl-8 hover:border-accent transition-colors duration-500">
              <item.icon className="w-8 h-8 text-primary mb-6 group-hover:text-accent transition-colors duration-300" strokeWidth={1.5} />
              <h3 className="text-xl font-serif text-primary mb-4">{item.title}</h3>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};