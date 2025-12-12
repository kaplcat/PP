import React, { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  dark?: boolean;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children, dark = false, fullWidth = false }) => {
  return (
    <section 
      id={id} 
      className={`py-32 lg:py-48 relative ${dark ? 'bg-primary text-white' : 'bg-white text-primary'} ${className}`}
    >
      <div 
        className={`${fullWidth ? 'w-full' : 'max-w-[1200px] mx-auto px-5'}`}
      >
        {children}
      </div>
    </section>
  );
};