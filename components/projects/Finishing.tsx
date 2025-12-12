import React from 'react';
import { Section } from '../ui/Section';
import { Check, Hammer, PaintRoller, Armchair } from 'lucide-react';

export const Finishing: React.FC = () => {
  return (
    <Section id="finishing" dark className="bg-primary border-t border-white/5">
      <div className="mb-20 text-center">
        <span className="text-accent text-xs font-bold uppercase tracking-[0.25em]">Решения</span>
        <h2 className="font-serif text-4xl md:text-5xl text-white mt-6">Варианты отделки</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Rough (Chernovaya) */}
        <div className="relative group bg-white/5 border border-white/10 p-8 hover:border-accent/50 transition-colors duration-500">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
            <Hammer size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-serif text-white mb-6">Черновая</h3>
          <p className="text-gray-400 font-light mb-8 leading-relaxed min-h-[80px] text-sm">
            Базовое решение для тех, кто хочет полностью контролировать процесс ремонта с нуля и создать уникальную планировку.
          </p>
          <ul className="space-y-4">
            {["Свободная планировка без перегородок", "Бетонная плита без стяжки", "Ввод коммуникаций (газ, вода, свет)", "Установлены окна и входная дверь"].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <Check size={16} className="mt-1 text-accent shrink-0" />
                <span className="text-sm text-gray-300 font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* White Box */}
        <div className="relative group bg-white/5 border border-white/10 p-8 hover:border-accent/50 transition-colors duration-500">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
            <PaintRoller size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-serif text-white mb-6">White Box</h3>
          <p className="text-gray-400 font-light mb-8 leading-relaxed min-h-[80px] text-sm">
            Предчистовая отделка. Все грязные работы выполнены, поверхности готовы к финишному покрытию.
          </p>
          <ul className="space-y-4">
            {["Возведены и оштукатурены перегородки", "Финишная стяжка пола", "Разводка электрики и отопления", "Установлены подоконники и откосы"].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <Check size={16} className="mt-1 text-accent shrink-0" />
                <span className="text-sm text-gray-300 font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Turnkey */}
        <div className="relative group bg-white/5 border border-white/10 p-8 hover:border-accent/50 transition-colors duration-500">
          <div className="absolute top-0 right-0 bg-accent text-white text-[10px] uppercase font-bold px-3 py-1 tracking-widest">Популярное</div>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
            <Armchair size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-2xl font-serif text-white mb-6">Под ключ</h3>
          <p className="text-gray-400 font-light mb-8 leading-relaxed min-h-[80px] text-sm">
            Готовый дом с дизайнерским ремонтом. Заезжайте и живите сразу после получения ключей.
          </p>
          <ul className="space-y-4">
            {["Полная чистовая отделка", "Установлена сантехника и освещение", "Межкомнатные двери и плинтуса", "Встроенная кухня с техникой"].map((item, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <Check size={16} className="mt-1 text-accent shrink-0" />
                <span className="text-sm text-gray-300 font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
};