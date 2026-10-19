import React from 'react';

// Abschnittstitel im Plankopf-Stil: Kopfleiste mit Stichwort, darunter der Titel (ohne Punkt),
// auf breiten Bildschirmen mit einem Text rechts daneben.
const Plankopf: React.FC<{
  label?: React.ReactNode;
  rechts?: React.ReactNode;
  text?: React.ReactNode;
  as?: 'h1' | 'h2';
  klein?: boolean;
  dunkel?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ label, rechts, text, as: Tag = 'h2', klein, dunkel, className = '', children }) => {
  const linie = dunkel ? 'border-[rgba(242,240,235,0.4)]' : 'border-brand-dark';
  return (
    <div className={`w-full text-left ${className}`}>
      <div className={`flex justify-between min-h-[40px] border ${linie} rounded-lg mb-6 md:mb-8 font-mono text-xs uppercase tracking-[0.14em]`}>
        {label && <span className={`px-4 py-2.5 rounded-l-[7px] ${dunkel ? 'bg-brand-bg text-brand-dark' : 'bg-brand-dark text-brand-bg'}`}>{label}</span>}
        {rechts && <span className={`hidden sm:block px-4 py-2.5 ml-auto border-l ${linie} ${dunkel ? 'text-brand-bg/80' : 'text-brand-dark/75'}`}>{rechts}</span>}
      </div>
      <div className={text ? 'grid lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] gap-6 lg:gap-16 lg:items-end' : ''}>
        <Tag
          className={`font-extrabold font-heading uppercase leading-none break-words ${dunkel ? '' : 'text-brand-dark'} ${klein ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'}`}
          style={{ wordSpacing: '0.12em' }}
        >
          {children}
        </Tag>
        {text && <div className="text-lg leading-relaxed text-brand-muted lg:pb-1">{text}</div>}
      </div>
    </div>
  );
};

export default Plankopf;
