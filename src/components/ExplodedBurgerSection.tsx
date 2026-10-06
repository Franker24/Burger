import React, { useState, useEffect, useRef } from 'react';
import { Burger3DCanvas } from './Burger3DCanvas';
import { useCart } from '../context/CartContext';
import { FiChevronDown } from 'react-icons/fi';

interface LayerPosition {
  id: string;
  x: number;
  y: number;
  visible: boolean;
}

const INGREDIENT_LABELS = [
  {
    id: 'top-bun',
    name: 'PAN BRIOCHE',
    description: 'Tostado con manteca y sésamo.',
    side: 'right',
  },
  {
    id: 'sauce',
    name: 'SALSA BRASA',
    description: 'Emulsión de chiles suaves y especias.',
    side: 'left',
  },
  {
    id: 'onions',
    name: 'CEBOLLA CRISPY',
    description: 'Frita al punto exacto.',
    side: 'right',
  },
  {
    id: 'cheese',
    name: 'CHEDDAR FUNDIDO',
    description: 'Doble cheddar derretido a la chapa.',
    side: 'left',
  },
  {
    id: 'patty',
    name: 'SMASH BEEF',
    description: '100% novillo prensado a 300°C con costra crocante.',
    side: 'right',
  },
  {
    id: 'bottom-bun',
    name: 'PAN BRIOCHE',
    description: 'Base sellada a la plancha.',
    side: 'left',
  },
];

export const ExplodedBurgerSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [layerPositions, setLayerPositions] = useState<LayerPosition[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const { openOrderDrawer } = useCart();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollableHeight = rect.height - window.innerHeight;
      
      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollableHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let stageNumber = 1;
  if (scrollProgress >= 0.88) {
    stageNumber = 5;
  } else if (scrollProgress >= 0.70) {
    stageNumber = 4;
  } else if (scrollProgress >= 0.44) {
    stageNumber = 3;
  } else if (scrollProgress >= 0.22) {
    stageNumber = 2;
  } else {
    stageNumber = 1;
  }

  return (
    <section
      id="experiencia-3d"
      ref={containerRef}
      className="relative w-full bg-white text-black border-t border-neutral-100"
      style={{ height: isMobile ? '240vh' : '380vh' }}
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        
        {/* Real Three.js 3D Canvas Layer */}
        <Burger3DCanvas
          scrollProgress={scrollProgress}
          onLayerPositionsUpdate={setLayerPositions}
          isMobile={isMobile}
        />

        {/* Minimal Clean Stage Watermark in top corner */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-24 pb-2 flex items-center justify-between text-xs tracking-widest text-neutral-400">
          <span className="font-mono uppercase font-semibold text-[11px] text-neutral-500">
            EXPLODED VIEW
          </span>
          <span className="font-mono text-[11px] text-neutral-400">
            0{stageNumber} / 05
          </span>
        </div>

        {/* CENTER / MAIN EDITORIAL TEXT ACCORDING TO STAGE */}
        <div className="relative z-20 pointer-events-none flex-1 flex flex-col items-center justify-between px-6 py-6 text-center">
          
          {/* Stage 1 */}
          <div
            className={`transition-all duration-700 max-w-2xl mx-auto ${
              stageNumber === 1
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-6 pointer-events-none'
            }`}
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold block mb-1">
              Despiece Scroll-Driven
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-black uppercase font-display">
              TODO EMPIEZA CON LA CARNE
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-md mx-auto">
              Smash burger hecha al momento. Scrolleá hacia abajo para separar cada capa.
            </p>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-400 animate-bounce">
              <FiChevronDown className="w-4 h-4 text-black" />
            </div>
          </div>

          {/* Stage 2 */}
          <div
            className={`transition-all duration-700 max-w-xl mx-auto absolute top-28 sm:top-32 ${
              stageNumber === 2
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-black uppercase font-display">
              CAPA POR CAPA
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Cada ingrediente tiene su temperatura y su técnica.
            </p>
          </div>

          {/* Stage 3: Exploded View Labels Layer */}
          <div
            className={`w-full max-w-6xl mx-auto absolute inset-0 pointer-events-none transition-opacity duration-500 ${
              stageNumber === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* DOM Callout Labels pinned around the layers */}
            {INGREDIENT_LABELS.map((item, idx) => {
              const layerPos = layerPositions.find((p) => p.id === item.id);
              const fallbackY = 160 + idx * 75;
              const y = layerPos?.y ? Math.max(120, Math.min(window.innerHeight - 150, layerPos.y)) : fallbackY;
              const isRight = item.side === 'right';

              return (
                <div
                  key={item.id}
                  className={`absolute transition-all duration-300 pointer-events-auto flex items-center gap-3 ${
                    isRight
                      ? 'right-4 sm:right-10 md:right-16 text-left flex-row'
                      : 'left-4 sm:left-10 md:left-16 text-right flex-row-reverse'
                  }`}
                  style={{
                    top: `${y}px`,
                    transform: 'translateY(-50%)',
                    maxWidth: isMobile ? '160px' : '260px',
                  }}
                >
                  {/* Clean connection line */}
                  <div className="flex items-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-black ring-4 ring-black/5" />
                    <span
                      className={`h-[1px] bg-black/30 ${
                        isRight ? 'w-6 sm:w-12' : 'w-6 sm:w-12'
                      }`}
                    />
                  </div>

                  {/* Clean minimalist label card */}
                  <div className="bg-white/95 backdrop-blur-sm border border-neutral-200/90 px-3.5 py-2.5 rounded-xl shadow-md">
                    <h4 className="text-xs sm:text-sm font-black tracking-wider text-black uppercase font-display leading-tight">
                      {item.name}
                    </h4>
                    <p className="mt-0.5 text-[10px] sm:text-[11px] text-neutral-500 leading-snug">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stage 4 */}
          <div
            className={`transition-all duration-700 max-w-xl mx-auto absolute top-28 sm:top-32 ${
              stageNumber === 4
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-black uppercase font-display">
              TODO ENCAJA
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              El calor funde el queso y une cada sabor.
            </p>
          </div>

          {/* Stage 5: Final Assembled Burger & Primary CTA */}
          <div
            className={`transition-all duration-700 max-w-xl mx-auto absolute bottom-16 sm:bottom-20 pointer-events-auto ${
              stageNumber === 5
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-bold block mb-1.5">
              ENSAMBLADA Y LISTA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black uppercase font-display leading-tight">
              AHORA SOLO FALTA PROBARLA.
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={openOrderDrawer}
                className="px-8 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-wider uppercase rounded-full transition-all shadow-md cursor-pointer active:scale-95"
              >
                PEDIR AHORA
              </button>
            </div>
          </div>

        </div>

        {/* Minimal clean bottom scroll progress bar without sliders */}
        <div className="relative z-20 w-full max-w-xs mx-auto pb-6 px-6">
          <div className="h-1 w-full bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

      </div>
    </section>
  );
};
