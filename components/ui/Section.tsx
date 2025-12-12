import React, { ReactNode } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  dark?: boolean;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children, dark = false, fullWidth = false }) => {
  const { elementRef, isVisible } = useIntersectionObserver(0.1);

  return (
    <section 
      id={id} 
      className={`py-32 lg:py-48 relative ${dark ? 'bg-primary text-white' : 'bg-white text-primary'} ${className}`}
    >
      <div 
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className={`${fullWidth ? 'w-full' : 'max-w-[1400px] mx-auto px-6 md:px-10'} transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        {children}
      </div>
    </section>
  );
};