import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Papa from 'papaparse';
import { Section } from '../ui/Section';
import { ArrowRight, X, BedDouble, Bath, DoorOpen, Sun, Layout, Tag, ChevronDown, Download, Maximize2 } from 'lucide-react';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTzteeV0ZFjulZUYhirS562BZIN64gNS3VXlkuKtLOAB3nyz0KosLU_t70fwr1u3YnCz2rlWeoQg8aV/pub?gid=435298511&single=true&output=csv';

interface Project {
  id: number;
  name: string;
  category: string;
  area: number;
  beds: number;
  baths: number;
  wardrobes: number;
  terraces: number;
  priceVal: number;
  price: string;
  image: string;
  layoutImage: string;
  desc: string;
}

const tabs = [
  { id: 'all', label: 'Все проекты' },
  { id: 'small', label: 'до 180 м²' },
  { id: 'medium', label: 'до 230 м²' },
  { id: 'large', label: 'от 230 м²' },
];

export const Catalog: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>('default');
  
  // Modals state
  const [modalType, setModalType] = useState<'layout' | 'offer' | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => {
            const parsedProjects = results.data.map((row: any, index: number) => {
              // Parse numeric values safely
              const area = parseFloat(row['housearea']?.replace(',', '.') || '0');
              const priceRaw = parseFloat(row['min-price']?.replace(/\D/g, '') || '0');
              const beds = parseInt(row['char-value-1'] || '0');
              const baths = parseInt(row['char-value-2'] || '0');
              const wardrobes = parseInt(row['char-value-3'] || '0');
              const terraces = parseInt(row['char-value-4'] || '0');

              // Determine category based on area
              let category = 'medium';
              if (area <= 180) category = 'small';
              else if (area > 230) category = 'large';

              // Format price string (e.g. от 16.5 млн ₽)
              const priceFormatted = 'от ' + (priceRaw / 1000000).toFixed(1) + ' млн ₽';

              return {
                id: index + 1,
                name: row['title'] || 'Без названия',
                category,
                area,
                beds,
                baths,
                wardrobes,
                terraces,
                priceVal: priceRaw,
                price: priceFormatted,
                image: row['photo-1'] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop',
                // Keep the static layout image as requested previously
                layoutImage: "https://optim.tildacdn.com/tild6561-3739-4437-b334-353663643630/-/format/webp/plan_2_.webp",
                desc: `Современный дом площадью ${area} м² с ${beds} спальнями и продуманной эргономикой.`
              };
            });
            setProjects(parsedProjects);
          }
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  // Filter & Sort Logic
  const filteredProjects = projects
    .filter(p => activeTab === 'all' || p.category === activeTab)
    .sort((a, b) => {
        if (sortOrder === 'asc') return a.priceVal - b.priceVal;
        if (sortOrder === 'desc') return b.priceVal - a.priceVal;
        return 0;
    });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [modalType]);

  const openModal = (type: 'layout' | 'offer', project: Project) => {
      setSelectedProject(project);
      setModalType(type);
  };

  return (
    <Section id="catalog" className="bg-white">
      {/* Header & Controls */}
      <div className="mb-16 flex flex-col xl:flex-row xl:items-end justify-between gap-10 border-b border-primary/10 pb-8">
        <div>
           <span className="text-accent text-xs font-bold uppercase tracking-[0.25em] mb-4 block">Каталог</span>
           <h2 className="font-serif text-4xl md:text-5xl text-primary">Коллекция проектов</h2>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Tabs */}
            <div className="flex flex-wrap gap-6">
                {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-2 text-xs uppercase tracking-widest transition-all duration-300 border-b-2 ${
                    activeTab === tab.id
                        ? 'border-accent text-primary font-bold'
                        : 'border-transparent text-gray-400 hover:text-primary hover:border-gray-200'
                    }`}
                >
                    {tab.label}
                </button>
                ))}
            </div>
            
            <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

            {/* Price Sort */}
            <div className="relative group">
                <button className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-medium hover:text-accent transition-colors">
                    <span>Сортировка: {sortOrder === 'default' ? 'По умолчанию' : sortOrder === 'asc' ? 'Сначала дешевле' : 'Сначала дороже'}</span>
                    <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10 flex flex-col">
                    <button onClick={() => setSortOrder('default')} className="text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 text-gray-500 hover:text-primary">По умолчанию</button>
                    <button onClick={() => setSortOrder('asc')} className="text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 text-gray-500 hover:text-primary">Сначала дешевле</button>
                    <button onClick={() => setSortOrder('desc')} className="text-left px-4 py-3 text-xs uppercase tracking-wider hover:bg-gray-50 text-gray-500 hover:text-primary">Сначала дороже</button>
                </div>
            </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
        {filteredProjects.map((project) => (
          <div key={project.id} className="group flex flex-col">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden mb-8 bg-gray-100 cursor-pointer" onClick={() => openModal('layout', project)}>
              <img 
                src={project.image} 
                alt={project.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute top-6 right-6 bg-white px-4 py-2 shadow-lg">
                <span className="text-sm font-serif text-primary font-medium">{project.area} м²</span>
              </div>
            </div>

            {/* Header Info */}
            <div className="flex justify-between items-start mb-6 gap-4">
               <div>
                  <h3 className="text-3xl font-serif text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-xs uppercase tracking-widest leading-relaxed">{project.desc}</p>
               </div>
               <div className="text-right shrink-0">
                  <span className="block text-2xl font-serif text-accent whitespace-nowrap">{project.price}</span>
               </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-4 gap-4 py-6 border-y border-gray-100 mb-8">
                <div className="flex flex-col items-center gap-2 text-center">
                    <BedDouble size={20} strokeWidth={1} className="text-gray-400" />
                    <div>
                        <span className="block font-serif text-lg text-primary leading-none">{project.beds}</span>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Спальни</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 text-center border-l border-gray-100">
                    <Bath size={20} strokeWidth={1} className="text-gray-400" />
                    <div>
                        <span className="block font-serif text-lg text-primary leading-none">{project.baths}</span>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Санузлы</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 text-center border-l border-gray-100">
                    <DoorOpen size={20} strokeWidth={1} className="text-gray-400" />
                    <div>
                        <span className="block font-serif text-lg text-primary leading-none">{project.wardrobes}</span>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Гардероб</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2 text-center border-l border-gray-100">
                    <Sun size={20} strokeWidth={1} className="text-gray-400" />
                    <div>
                        <span className="block font-serif text-lg text-primary leading-none">{project.terraces}</span>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Террасы</span>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
               <button 
                 onClick={() => openModal('layout', project)}
                 className="flex items-center justify-center gap-2 py-4 border border-gray-200 text-primary hover:border-primary hover:bg-primary hover:text-white transition-all duration-300 text-[10px] uppercase tracking-widest font-bold"
               >
                 <Layout size={14} />
                 Смотреть планировку
               </button>
               <button 
                 onClick={() => openModal('offer', project)}
                 className="flex items-center justify-center gap-2 py-4 bg-primary text-white hover:bg-accent hover:border-accent transition-all duration-300 text-[10px] uppercase tracking-widest font-bold shadow-lg hover:shadow-xl"
               >
                 <Tag size={14} />
                 Спецпредложение
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {selectedProject && modalType && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 animate-fade-in" 
                onClick={() => setModalType(null)}
            />
            
            {/* Modal Content */}
            <div className={`relative bg-white w-full shadow-2xl animate-fade-in-up flex overflow-hidden
                ${modalType === 'layout' ? 'max-w-[1400px] h-[85vh] rounded-sm' : 'max-w-md p-10 md:p-12'}`}
            >
                <button 
                    onClick={() => setModalType(null)}
                    className={`absolute top-6 right-6 z-20 transition-colors ${modalType === 'layout' ? 'text-primary hover:bg-gray-100 p-2 rounded-full' : 'text-gray-400 hover:text-primary'}`}
                >
                    <X size={24} strokeWidth={1} />
                </button>

                {modalType === 'layout' ? (
                    <div className="flex flex-col lg:flex-row w-full h-full">
                        {/* Left: Image Canvas */}
                        <div className="w-full lg:w-3/4 bg-surface relative flex items-center justify-center p-8 lg:p-16 overflow-hidden">
                            <div className="absolute top-8 left-8 flex gap-2">
                                <span className="bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                                    {selectedProject.category === 'small' ? 'Compact' : selectedProject.category === 'large' ? 'Premium' : 'Business'}
                                </span>
                            </div>
                            
                            <img 
                                src={selectedProject.layoutImage} 
                                alt="Layout" 
                                className="max-w-full max-h-full object-contain drop-shadow-2xl transform transition-transform duration-500 hover:scale-105"
                            />

                            <button className="absolute bottom-8 right-8 p-3 bg-white text-primary shadow-lg hover:bg-primary hover:text-white transition-colors rounded-full">
                                <Maximize2 size={20} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Right: Info Sidebar */}
                        <div className="w-full lg:w-1/4 bg-white p-8 lg:p-12 flex flex-col border-l border-gray-100 overflow-y-auto">
                            <div className="mb-auto">
                                <span className="text-accent text-[10px] font-bold uppercase tracking-[0.25em] mb-4 block">Планировка</span>
                                <h3 className="font-serif text-4xl text-primary mb-2 leading-tight">{selectedProject.name}</h3>
                                <p className="text-gray-400 font-light text-xs mb-10">{selectedProject.desc}</p>

                                {/* Clean Grid Stats */}
                                <div className="grid grid-cols-2 gap-y-10 gap-x-4 mb-12">
                                    <div>
                                        <span className="block text-gray-400 text-[10px] uppercase tracking-widest mb-1">Площадь</span>
                                        <span className="font-serif text-3xl text-primary leading-none">{selectedProject.area} <span className="text-base text-gray-400 font-light">м²</span></span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-400 text-[10px] uppercase tracking-widest mb-1">Спальни</span>
                                        <span className="font-serif text-3xl text-primary leading-none">{selectedProject.beds}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-400 text-[10px] uppercase tracking-widest mb-1">Санузлы</span>
                                        <span className="font-serif text-3xl text-primary leading-none">{selectedProject.baths}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-400 text-[10px] uppercase tracking-widest mb-1">Террасы</span>
                                        <span className="font-serif text-3xl text-primary leading-none">{selectedProject.terraces}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mt-8">
                                <button className="w-full py-4 border border-gray-200 text-primary text-[10px] font-bold uppercase tracking-widest hover:border-primary hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                    <Download size={16} strokeWidth={1.5} />
                                    Скачать PDF
                                </button>
                                <button 
                                    onClick={() => setModalType('offer')}
                                    className="w-full py-4 bg-primary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-colors shadow-lg"
                                >
                                    Рассчитать стоимость
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full">
                        <div className="text-center mb-10">
                            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">Проект {selectedProject.name}</span>
                            <h3 className="font-serif text-3xl text-primary mb-4">Специальное предложение</h3>
                            <p className="text-gray-500 font-light text-sm leading-relaxed">
                                Оставьте заявку, чтобы зафиксировать стоимость {selectedProject.price} и получить презентацию с планировками.
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
                                Получить предложение
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-[10px] text-gray-400 text-center leading-tight mt-4">
                                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                            </p>
                        </form>
                    </div>
                )}
            </div>
        </div>,
        document.body
      )}
    </Section>
  );
};