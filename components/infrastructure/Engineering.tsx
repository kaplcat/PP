import React from 'react';
import { Section } from '../ui/Section';
import { Zap, Droplets, Wifi, Flame, Trash2, Smartphone } from 'lucide-react';

const specs = [
  { icon: Zap, label: "Электричество", value: "15 кВт", sub: "На каждый участок" },
  { icon: Flame, label: "Газификация", value: "Магистральный", sub: "Подведен к границе" },
  { icon: Droplets, label: "Водоснабжение", value: "Артезианское", sub: "Центральная скважина" },
  { icon: Trash2, label: "Канализация", value: "Центральная", sub: "Ливневая система" },
  { icon: Wifi, label: "Интернет", value: "1 Гбит/с", sub: "Оптоволокно GPON" },
  { icon: Smartphone, label: "Сервис", value: "Приложение", sub: "Управление домом" },
];

export const Engineering: React.FC = () => {
  return (
    <Section id="engineering" dark className="bg-primary border-t border-white/5">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-1/3">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">Инженерия</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-white leading-tight mb-8">
            Технологии <br/> невидимого комфорта
          </h2>
          <p className="text-gray-400 font-light leading-relaxed text-lg">
            Все коммуникации проложены подземным способом, сохраняя визуальную чистоту пространства. 
            Собственная служба эксплуатации обеспечивает бесперебойную работу всех систем 24/7.
          </p>
        </div>

        <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-10">
          {specs.map((item, idx) => (
            <div key={idx} className="group">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <item.icon size={20} strokeWidth={1.5} />
              </div>
              <div className="text-xl font-serif text-white mb-1">{item.value}</div>
              <div className="text-sm font-medium text-gray-300 uppercase tracking-wider mb-1">{item.label}</div>
              <div className="text-xs text-gray-500 font-light">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};