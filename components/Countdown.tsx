import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Section } from './ui/Section';
import { X, ArrowRight } from 'lucide-react';

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getEndOfMonth = () => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).getTime();
    };
    const targetDate = getEndOfMonth();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  return (
    <>
      <Section fullWidth className="!py-0 bg-primary text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Visual Side */}
          <div className="relative h-[400px] lg:h-auto overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop" 
              alt="Interior" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent lg:bg-gradient-to-t" />
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center p-12 lg:p-24 relative">
            <h2 className="font-serif text-4xl lg:text-6xl mb-6 leading-tight">
              Инвестируйте <br />
              <span className="text-accent italic">вовремя</span>
            </h2>
            <p className="text-gray-400 font-light text-lg mb-12 max-w-md">
              Плановое повышение стоимости на 2% в конце месяца. Зафиксируйте цену сегодня, чтобы сохранить выгодные условия.
            </p>

            <div className="flex flex-wrap gap-8 lg:gap-12 mb-12">
              {[
                { label: 'Дней', value: timeLeft.days },
                { label: 'Часов', value: timeLeft.hours },
                { label: 'Минут', value: timeLeft.minutes },
                { label: 'Секунд', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-serif text-5xl lg:text-7xl font-light tabular-nums">{item.value.toString().padStart(2, '0')}</span>
                  <span className="uppercase tracking-widest text-xs text-accent mt-2">{item.label}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="self-start border-b border-white pb-1 hover:border-accent hover:text-accent transition-colors tracking-widest uppercase text-sm"
            >
              Зафиксировать цену
            </button>
          </div>
        </div>
      </Section>

      {/* Modal Portal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 animate-fade-in" 
                onClick={() => setIsModalOpen(false)}
            />
            
            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md p-10 md:p-12 shadow-2xl animate-fade-in-up">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors"
                >
                    <X size={24} strokeWidth={1} />
                </button>

                <div className="text-center mb-10">
                    <h3 className="font-serif text-3xl text-primary mb-4">Фиксация цены</h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">
                        Оставьте контакты, чтобы закрепить текущую стоимость на 30 дней.
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
                        Отправить заявку
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
    </>
  );
};