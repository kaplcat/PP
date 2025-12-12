import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Section } from './ui/Section';
import { Calculator } from './Calculator';
import { X, ArrowRight } from 'lucide-react';

export const Purchase: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeModal]);

  return (
    <Section id="purchase" className="bg-light">
      <div className="mb-20 text-center">
        <span className="text-accent text-xs font-bold uppercase tracking-[0.25em]">Финансы</span>
        <h2 className="font-serif text-4xl md:text-5xl text-primary mt-6">Ваш путь к дому</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
        {[
          { title: "100% Оплата", highlight: "-11%", highlightText: "скидка", desc: "Максимальная выгода. Оформление сделки за 7 дней." },
          { title: "Рассрочка", highlight: "0%", highlightText: "переплата", desc: "Гибкий график платежей до 24 месяцев. Первый взнос от 10%." },
          { title: "Ипотека", highlight: "5%", highlightText: "ставка от", desc: "Аккредитация в ведущих банках. IT и семейная ипотека." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-10 lg:p-12 hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-2xl flex flex-col items-start">
            <h3 className="font-serif text-2xl text-primary mb-8">{item.title}</h3>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-5xl font-light text-accent">{item.highlight}</span>
              <span className="text-sm text-gray-400 uppercase tracking-wider">{item.highlightText}</span>
            </div>
            <p className="text-gray-500 font-light leading-relaxed mb-10 h-20">{item.desc}</p>
            <button 
              onClick={() => setActiveModal(item.title)}
              className="mt-auto inline-block border-b border-primary/20 pb-1 text-primary hover:border-accent hover:text-accent transition-colors text-sm uppercase tracking-widest"
            >
              Подробнее
            </button>
          </div>
        ))}
      </div>

      <div className="w-full mt-24">
        <Calculator />
      </div>

      {/* Modal Portal */}
      {activeModal && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 animate-fade-in" 
                onClick={() => setActiveModal(null)}
            />
            
            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md p-10 md:p-12 shadow-2xl animate-fade-in-up">
                <button 
                    onClick={() => setActiveModal(null)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors"
                >
                    <X size={24} strokeWidth={1} />
                </button>

                <div className="text-center mb-10">
                    <h3 className="font-serif text-3xl text-primary mb-4">{activeModal}</h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">
                        Получите подробную консультацию по условиям {activeModal === 'Ипотека' ? 'ипотечного кредитования' : activeModal === 'Рассрочка' ? 'рассрочки' : 'покупки'}.
                    </p>
                </div>

                <form className="space-y-6">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Ваше имя" 
                            className="w-full border-b border-gray-300 py-3 text-primary placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors bg-transparent"
                        />
                    </div>
                    <div>
                        <input 
                            type="tel" 
                            placeholder="Телефон" 
                            className="w-full border-b border-gray-300 py-3 text-primary placeholder:text-gray-400 focus:outline-none focus:border-accent transition-colors bg-transparent"
                        />
                    </div>
                    <button type="button" className="w-full bg-primary text-white py-4 mt-4 uppercase tracking-widest text-xs font-bold hover:bg-accent transition-colors flex items-center justify-center gap-2 group">
                        Получить консультацию
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[10px] text-gray-400 text-center leading-tight mt-4">
                        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                    </p>
                </form>
            </div>
        </div>,
        document.body
      )}
    </Section>
  );
};