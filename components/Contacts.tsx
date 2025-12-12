import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Instagram, Send, Youtube, ArrowUpRight, X, ArrowRight } from 'lucide-react';

export const Contacts: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <footer id="contacts" className="bg-[#151b22] text-white pt-32 pb-12 relative overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-5">
              {/* Top Section: CTA */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 pb-24 border-b border-white/10">
                  <h2 className="font-serif text-6xl md:text-8xl leading-none tracking-tight mb-12 lg:mb-0">
                      Давайте <br />
                      <span className="text-white/30 italic">обсудим</span>
                  </h2>
                  
                  <div className="flex flex-col gap-8 items-start lg:items-end">
                      <a href="tel:+74951254125" className="text-3xl md:text-4xl font-light hover:text-accent transition-colors duration-300">
                          +7 (495) 125-4-125
                      </a>
                      <a href="mailto:info@podsolnuhpark.ru" className="text-xl text-gray-400 hover:text-white transition-colors duration-300">
                          info@podsolnuhpark.ru
                      </a>
                      <button 
                          onClick={() => setIsModalOpen(true)}
                          className="mt-4 px-10 py-5 bg-white text-primary font-medium uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-all duration-300 rounded-full"
                      >
                          Заказать звонок
                      </button>
                  </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-24">
                  <div className="md:col-span-1">
                      <img src="https://static.tildacdn.com/tild3038-6331-4437-b561-303431646466/Logo_white.png" alt="Logo" className="h-8 mb-8 opacity-50" />
                      <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">
                          Премиальный коттеджный посёлок в Истринском районе.
                      </p>
                  </div>

                  <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Меню</h4>
                      <ul className="space-y-4 text-sm font-light text-gray-300">
                          <li><a href="#" className="hover:text-accent transition-colors">О проекте</a></li>
                          <li><a href="#" className="hover:text-accent transition-colors">Генплан</a></li>
                          <li><a href="#" className="hover:text-accent transition-colors">Инфраструктура</a></li>
                          <li><a href="#" className="hover:text-accent transition-colors">Ход строительства</a></li>
                      </ul>
                  </div>

                  <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Адрес</h4>
                      <p className="text-sm font-light text-gray-300 leading-relaxed mb-4">
                          д. Карцево, г.о. Истра,<br />
                          Московская обл., 143516
                      </p>
                      <a href="#" className="inline-flex items-center gap-1 text-accent text-sm hover:underline">
                          Показать на карте <ArrowUpRight size={14} />
                      </a>
                  </div>

                  <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Соцсети</h4>
                      <div className="flex gap-4">
                          {[
                              { Icon: Send, href: "https://t.me/podsolnuhpark" },
                              { Icon: Youtube, href: "https://youtube.com" },
                              { Icon: Instagram, href: "#" }
                          ].map(({ Icon, href }, idx) => (
                              <a key={idx} href={href} className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:border-accent hover:text-accent transition-all duration-300">
                                  <Icon size={18} />
                              </a>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Bottom */}
              <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/20 uppercase tracking-wider gap-4">
                  <p>&copy; {new Date().getFullYear()} Подсолнух Парк</p>
                  <div className="flex gap-8">
                      <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
                      <a href="#" className="hover:text-white transition-colors">Публичная оферта</a>
                  </div>
              </div>
          </div>
      </footer>

      {/* Modal Portal */}
      {isModalOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 animate-fade-in" 
                onClick={() => setIsModalOpen(false)}
            />
            
            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md p-10 md:p-12 shadow-2xl animate-fade-in-up text-primary">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors"
                >
                    <X size={24} strokeWidth={1} />
                </button>

                <div className="text-center mb-10">
                    <h3 className="font-serif text-3xl text-primary mb-4">Обратный звонок</h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">
                        Оставьте свой номер телефона, и мы перезвоним вам в ближайшее время.
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
                        Жду звонка
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