import React from 'react';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="absolute top-28 md:top-32 left-0 w-full z-20 px-6 md:px-10 max-w-[1600px] mx-auto right-0">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-sans font-medium text-white/60">
        <a href="/" className="hover:text-accent transition-colors duration-300">Главная</a>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight size={10} />
            {item.href ? (
              <a href={item.href} className="hover:text-accent transition-colors duration-300">
                {item.label}
              </a>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};