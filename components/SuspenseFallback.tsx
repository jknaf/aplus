import React from 'react';

const SuspenseFallback: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020202]">
            <div className="flex flex-col items-center gap-4">
                 <div className="relative w-16 h-16">
                     <div className="absolute inset-0 border-t-2 border-brand-orange rounded-full animate-spin"></div>
                     <div className="absolute inset-2 border-r-2 border-white/20 rounded-full animate-spin [animation-direction:reverse]"></div>
                 </div>
                 <span className="text-xs font-mono text-brand-orange uppercase tracking-widest animate-pulse">Lade Inhalte...</span>
            </div>
        </div>
    );
};

export default SuspenseFallback;