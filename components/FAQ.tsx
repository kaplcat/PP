import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Безопасность территории',
    answer: 'Посёлок полностью закрыт для посторонних. Мы используем интеллектуальную систему видеонаблюдения, круглосуточное патрулирование и систему распознавания автомобильных номеров на КПП.'
  },
  {
    question: 'Сроки строительства',
    answer: 'Мы ценим ваше время. Возведение теплого контура занимает всего 4 месяца. Полный цикл строительства, включая внешнюю отделку, укладывается в 6-8 месяцев.'
  },
  {
    question: 'Инженерные коммуникации',
    answer: 'Все коммуникации уже подведены к участкам. Электричество 15 кВт, высокоскоростной интернет, индивидуальные скважины и современные системы очистки.'
  },
  {
    question: 'Регистрация и прописка',
    answer: 'Земли имеют статус ИЖС, что позволяет вам законно построить дом, оформить его в собственность и получить постоянную регистрацию.'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-4">
          <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-6 block">FAQ</span>
          <h2 className="font-serif text-4xl lg:text-5xl text-primary leading-tight">
            Ответы на <br /> ваши вопросы
          </h2>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="group py-8">
                <button 
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <span className={`text-xl lg:text-2xl font-serif transition-colors duration-300 ${openIndex === idx ? 'text-accent' : 'text-primary group-hover:text-primary/70'}`}>
                    {faq.question}
                  </span>
                  <span className={`p-2 transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`}>
                    {openIndex === idx ? <Minus className="text-accent" /> : <Plus className="text-gray-300 group-hover:text-primary" />}
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === idx ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <p className="text-gray-500 font-light leading-relaxed max-w-2xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};