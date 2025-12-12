import React from 'react';
import { Section } from '../ui/Section';
import { ArrowRight, MapPin } from 'lucide-react';

export const TourCTA: React.FC = () => {
  return (
    <Section fullWidth className="!py-0 relative bg-[#2C3A47] overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2670&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-32 lg:py-40">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-16">
          
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8 text-accent">
                <MapPin size={20} />
                <span className="text-xs font-bold uppercase tracking-[0.25em]">Истринский район</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-8">
              Почувствуйте атмосферу <br/>
              <span className="italic text-accent">своими глазами</span>
            </h2>
            
            <p className="text-gray-300 font-light text-lg leading-relaxed mb-12 max-w-xl">
              Лучший способ выбрать дом — прогуляться по территории поселка, оценить качество воздуха и увидеть готовые проекты вживую.
            </p>

            <ul className="flex flex-col md:flex-row gap-8 mb-12">
                <li className="flex items-center gap-4 text-white">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    <span className="font-light">Персональная экскурсия</span>
                </li>
                <li className="flex items-center gap-4 text-white">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    <span className="font-light">Просмотр шоу-рума</span>
                </li>
                <li className="flex items-center gap-4 text-white">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    <span className="font-light">Вкусный кофе</span>
                </li>
            </ul>
          </div>

          <div className="w-full lg:w-auto bg-white p-10 lg:p-12 shadow-2xl max-w-md">
            <h3 className="font-serif text-2xl text-primary mb-2">Запись на экскурсию</h3>
            <p className="text-gray-500 text-sm mb-8">Мы свяжемся с вами для согласования времени</p>
            
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
                    Записаться
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[10px] text-gray-400 text-center leading-tight mt-4">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                </p>
            </form>
          </div>

        </div>
      </div>
    </Section>
  );
};