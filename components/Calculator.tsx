import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight } from 'lucide-react';

export const Calculator: React.FC = () => {
  const [price, setPrice] = useState(15000000);
  const [initialPaymentPercent, setInitialPaymentPercent] = useState(20);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialPayment = Math.round(price * (initialPaymentPercent / 100));
  const loanAmount = price - initialPayment;
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  const monthlyPayment = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );

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
      <div className="bg-white border border-gray-200/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden">
        {/* Accent Line */}
        <div className="absolute top-0 left-0 w-1.5 h-full bg-accent z-10 hidden lg:block"></div>
        
        <div className="flex flex-col lg:flex-row">
          {/* Input Section */}
          <div className="p-8 md:p-12 lg:p-16 lg:w-7/12 xl:w-2/3 space-y-12">
            <h3 className="font-serif text-3xl md:text-4xl text-primary">Ипотечный калькулятор</h3>
            
            <div className="space-y-10">
              {/* Price Input */}
              <div className="group">
                <div className="flex justify-between mb-4 items-end">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Стоимость недвижимости</label>
                  <span className="text-xl md:text-2xl font-serif text-primary">{price.toLocaleString()} ₽</span>
                </div>
                <input 
                  type="range" min="5000000" max="50000000" step="500000"
                  value={price} onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-accent hover:accent-accentHover transition-all"
                />
              </div>

              {/* Initial Payment Input */}
              <div className="group">
                <div className="flex justify-between mb-4 items-end">
                  <label className="text-xs uppercase tracking-widest text-gray-400">Первоначальный взнос</label>
                  <div className="text-right">
                    <span className="text-xl md:text-2xl font-serif text-primary block">{initialPayment.toLocaleString()} ₽</span>
                    <span className="text-xs text-accent font-medium">{initialPaymentPercent}%</span>
                  </div>
                </div>
                <input 
                  type="range" min="10" max="90" 
                  value={initialPaymentPercent} onChange={(e) => setInitialPaymentPercent(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-accent hover:accent-accentHover transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Years Input */}
                  <div className="group">
                      <div className="flex justify-between mb-4 items-end">
                          <label className="text-xs uppercase tracking-widest text-gray-400">Срок кредита</label>
                          <span className="text-xl md:text-2xl font-serif text-primary">{years} лет</span>
                      </div>
                      <input 
                          type="range" min="1" max="30" 
                          value={years} onChange={(e) => setYears(Number(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-accent hover:accent-accentHover transition-all"
                      />
                  </div>

                  {/* Rate Input */}
                  <div className="group">
                      <div className="flex justify-between mb-4 items-end">
                          <label className="text-xs uppercase tracking-widest text-gray-400">Ставка</label>
                          <span className="text-xl md:text-2xl font-serif text-primary">{rate}%</span>
                      </div>
                      <input 
                          type="range" min="3" max="25" step="0.1"
                          value={rate} onChange={(e) => setRate(Number(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-none appearance-none cursor-pointer accent-accent hover:accent-accentHover transition-all"
                      />
                  </div>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="bg-surface p-8 md:p-12 lg:p-16 lg:w-5/12 xl:w-1/3 flex flex-col justify-center border-l border-gray-100">
            <div className="mb-12">
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-4">Ежемесячный платеж</div>
              <div className="text-5xl md:text-6xl font-serif text-primary mb-8 tracking-tight">{monthlyPayment.toLocaleString()} ₽</div>
              
              <div className="flex justify-between items-center py-6 border-t border-gray-200/50">
                <span className="text-sm text-gray-500 font-light">Процентная ставка</span>
                <span className="text-2xl font-serif text-accent">{rate}%</span>
              </div>
              <div className="flex justify-between items-center py-6 border-t border-gray-200/50">
                <span className="text-sm text-gray-500 font-light">Сумма кредита</span>
                <span className="text-xl font-serif text-primary">{loanAmount.toLocaleString()} ₽</span>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full py-5 bg-primary text-white text-xs uppercase tracking-[0.2em] hover:bg-accent transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Подать заявку
            </button>
          </div>
        </div>
      </div>

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
                    <h3 className="font-serif text-3xl text-primary mb-4">Заявка на ипотеку</h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">
                        Наш ипотечный брокер свяжется с вами и подберет лучшие условия.
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
                        Отправить
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