import React from 'react';
import { LuFlame } from 'react-icons/lu';
import { FiStar } from 'react-icons/fi';

export const BrandRibbonDivider: React.FC = () => {
  const itemsTop = [
    '100% CARNE DE NOVILLO',
    'PLANCHA DE HIERRO A 300°C',
    'COSTRA CROCANTE DE MAILLARD',
    'DOBLE SMASH REAL',
    'PAN BRIOCHE DE MANTECA',
    'SIN CONGELADOS NI ADITIVOS',
    'BUENOS AIRES · ARGENTINA',
    'SMASHED TO PERFECTION',
  ];

  const itemsBottom = [
    'RECETA DE AUTOR',
    'CHEDDAR AMERICANO FUNDIDO',
    'PANCETA AHUMADA EXTRA CRISPY',
    'PAPAS CRINKLE DORADAS',
    'HECHO AL MOMENTO',
    'VILLA CRESPO FLAVOR',
    'SABOR DE VERDAD',
    'AUTÉNTICA SMASH BURGER',
  ];

  return (
    <div className="relative z-30 w-full max-w-full overflow-hidden bg-neutral-950 py-6 sm:py-8 border-y-2 border-black select-none shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
      
      {/* Background subtle noise and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-black opacity-90 pointer-events-none" />

      {/* Ribbon 1: Moving Left (Black & White with Red Fire & Stars) */}
      <div className="relative w-full max-w-full overflow-hidden flex py-1.5 -rotate-1 transform origin-center">
        <div className="animate-marquee-continuous flex items-center gap-8 whitespace-nowrap will-change-transform">
          {[...itemsTop, ...itemsTop, ...itemsTop].map((item, idx) => (
            <div key={`top-${idx}`} className="flex items-center gap-4 text-white">
              <span className="text-sm sm:text-base font-black uppercase tracking-[0.22em] font-display text-white/95">
                {item}
              </span>
              {idx % 2 === 0 ? (
                <LuFlame className="w-4 h-4 text-[#E52525] shrink-0 fill-[#E52525]" />
              ) : (
                <FiStar className="w-3.5 h-3.5 text-[#E52525] shrink-0 fill-[#E52525]" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ribbon 2: Moving Right (Vibrant Red Accent Tape) */}
      <div className="relative w-full max-w-full overflow-hidden flex py-2 mt-2 rotate-1 transform origin-center bg-[#E52525] shadow-lg">
        <div 
          className="flex items-center gap-8 whitespace-nowrap will-change-transform"
          style={{
            animation: 'continuousMarqueeReverse 30s linear infinite',
            width: 'max-content',
          }}
        >
          {[...itemsBottom, ...itemsBottom, ...itemsBottom].map((item, idx) => (
            <div key={`bottom-${idx}`} className="flex items-center gap-4 text-black font-black">
              <span className="text-xs sm:text-sm uppercase tracking-[0.24em] font-display text-white">
                {item}
              </span>
              <span className="text-black text-xs font-mono font-bold">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Edge gradient shadows to blend smoothly */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
};
