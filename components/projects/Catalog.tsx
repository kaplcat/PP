import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Section } from '../ui/Section';
import { Bed, Bath, Sun, DoorOpen, ArrowRight, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: "Антарес",
    category: "small",
    area: 178.2,
    beds: 3,
    baths: 2,
    wardrobes: 1,
    terraces: 2,
    price: "от 16.5 млн ₽",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop",
    desc: "Уютный одноэтажный дом с рациональной планировкой. Просторная кухня-гостиная плавно переходит в крытую террасу, создавая единое пространство для отдыха."
  },
  {
    id: 2,
    name: "Адара",
    category: "small",
    area: 166.6,
    beds: 4,
    baths: 3,
    wardrobes: 1,
    terraces: 2,
    price: "от 16.1 млн ₽",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2670&auto=format&fit=crop",
    desc: "Современная классика для семьи с детьми. Мастер-спальня с гардеробной и выходом на приватную террасу. Панорамное остекление в гостиной."
  },
  {
    id: 3,
    name: "Сириус",
    category: "medium",
    area: 190.8,
    beds: 4,
    baths: 2,
    wardrobes: 1,
    terraces: 2,
    price: "от 17.1 млн ₽",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
    desc: "Двухэтажная резиденция с эффектным вторым светом. Большая угловая терраса огибает дом, соединяя зону барбекю и выход из гостиной."
  },
  {
    id: 4,
    name: "Алиот",
    category: "medium",
    area: 213.5,
    beds: 6,
    baths: 3,
    wardrobes: 1,
    terraces: 2,
    price: "от 19.3 млн ₽",
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=2525&auto=format&fit=crop",
    desc: "Дом с характером. Строгая геометрия фасадов, кабинет на первом этаже и эксплуатируемая кровля-терраса для вечерних коктейлей."
  },
  {
    id: 5,
    name: "Вега",
    category: "large",
    area: 240.6,
    beds: 6,
    baths: 3,
    wardrobes: 1,
    terraces: 2,
    price: "от 23.3 млн ₽",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
    desc: "Премиальная вилла с зоной SPA и гаражом на 2 автомобиля. Грандиозная терраса станет центром притяжения для большой компании."
  },
  {
    id: 6,
    name: "Мицар",
    category: "large",
    area: 280.3,
    beds: 6,
    baths: 3,
    wardrobes: 1,
    terraces: 2,
    price: "от 27.2 млн ₽",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
    desc: "Флагманский проект поселка. Резиденция с бассейном, кинотеатром и трехуровневой системой террас, интегрированных в ландшафт."
  }
];

const tabs = [
  { id: 'all', label: 'Все проекты' },
  { id: 'small', label: 'до 180 м²' },
  { id: 'medium', label: 'до 220 м²' },
  { id: 'large', label: 'до 300 м²' },
];

export const Catalog: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  return (
    <Section id="catalog" className="bg-light">
      <div className="mb-20">
        <span className="text-accent text-xs font-bold uppercase tracking-[0.25em]">Каталог</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-6">
          <h2 className="font-serif text-4xl md:text-5xl text-primary">Коллекция проектов</h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-xs uppercase tracking-widest transition-all duration-300 rounded-full border ${
                  activeTab === tab.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-transparent text-gray-500 border-gray-200 hover:border-accent hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-32">
        {filteredProjects.map((project, idx) => (
          <div key={project.id} className="group flex flex-col lg:flex-row items-stretch min-h-[600px] shadow-sm hover:shadow-2xl transition-shadow duration-700 bg-white">
            
            {/* Image Side - Cinematic */}
            <div className={`lg:w-7/12 relative overflow-hidden h-[500px] lg:h-auto ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <img 
                src={project.image} 
                alt={project.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
              
              {/* Badge */}
              <div className="absolute top-8 left-8 bg-white/95 backdrop-blur px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                {project.category === 'small' ? 'Хит продаж' : project.category === 'large' ? 'Премиум' : 'Бизнес'}
              </div>
            </div>

            {/* Content Side - Minimalistic */}
            <div className={`lg:w-5/12 p-10 lg:p-16 flex flex-col justify-center relative bg-white ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              
              {/* Header */}
              <div className="mb-10">
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4 mb-6">
                  <h3 className="text-5xl lg:text-6xl font-serif text-primary leading-none">{project.name}</h3>
                  <span className="text-xl text-accent font-medium whitespace-nowrap">{project.price}</span>
                </div>
                
                {/* Area - Prominent & Separate */}
                <div className="py-6 border-t border-b border-gray-100 mb-8">
                    <div className="flex items-baseline gap-2">
                        <span className="text-6xl font-serif text-primary leading-none">{project.area}</span>
                        <span className="text-2xl font-light text-gray-300">м²</span>
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-2 block">Общая площадь</span>
                </div>

                <p className="text-gray-500 font-light leading-relaxed text-base lg:text-lg mb-8">
                  {project.desc}
                </p>

                {/* Specs Grid - Clean Typography */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-8">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-1 text-primary">
                        <Bed size={18} strokeWidth={1} className="text-gray-400" />
                        <span className="text-2xl font-serif">{project.beds}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest pl-[26px]">Спальни</span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-1 text-primary">
                        <Bath size={18} strokeWidth={1} className="text-gray-400" />
                        <span className="text-2xl font-serif">{project.baths}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest pl-[26px]">Санузлы</span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-1 text-primary">
                        <DoorOpen size={18} strokeWidth={1} className="text-gray-400" />
                        <span className="text-2xl font-serif">{project.wardrobes}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest pl-[26px]">Гардероб</span>
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-1 text-primary">
                        <Sun size={18} strokeWidth={1} className="text-gray-400" />
                        <span className="text-2xl font-serif">{project.terraces}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest pl-[26px]">Террасы</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between border-t border-gray-100/50">
                <button className="group/btn flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary hover:text-accent transition-colors">
                  <span>Смотреть планировку</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-2" />
                </button>

                <button 
                    onClick={() => setSelectedProject(project.name)}
                    className="px-8 py-4 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent transition-colors duration-300"
                >
                    Персональное предложение
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Modal Portal */}
      {selectedProject && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 animate-fade-in" 
                onClick={() => setSelectedProject(null)}
            />
            
            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-md p-10 md:p-12 shadow-2xl animate-fade-in-up">
                <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-primary transition-colors"
                >
                    <X size={24} strokeWidth={1} />
                </button>

                <div className="text-center mb-10">
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">Проект {selectedProject}</span>
                    <h3 className="font-serif text-3xl text-primary mb-4">Персональное предложение</h3>
                    <p className="text-gray-500 font-light text-sm leading-relaxed">
                        Оставьте заявку, чтобы получить детальный расчет стоимости и специальные условия покупки.
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
                        Получить расчет
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