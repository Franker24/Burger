import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

interface AdSlideItem {
  id: string;
  image: string;
  lines: string[];
  bannerPrefix: string;
  bannerSpecialChar: string;
  bannerSuffix: string;
  subtitle: string;
}

const SLIDES: AdSlideItem[] = [
  {
    id: 'extremas-slide',
    image: '/images/burger3.jpg',
    lines: ['NO SON SOLO', 'HAMBURGUESAS.', 'SON'],
    bannerPrefix: 'E',
    bannerSpecialChar: 'X',
    bannerSuffix: 'TREMAS',
    subtitle: 'Novillo seleccionado prensado a 300°C en pan brioche de manteca.',
  },
  {
    id: 'crocante-slide',
    image: '/images/hero_slide_2.jpg',
    lines: ['EL VERDADERO', 'SABOR SMASH.', 'COSTRA'],
    bannerPrefix: 'CR',
    bannerSpecialChar: 'O',
    bannerSuffix: 'CANTE',
    subtitle: 'Reacción de Maillard crujiente y queso cheddar americano fundido.',
  },
  {
    id: 'fresca-slide',
    image: '/images/hero_slide_3.jpg',
    lines: ['MOLIDA EN EL DÍA.', 'CARNE FRESCA.', 'PURO'],
    bannerPrefix: 'SA',
    bannerSpecialChar: 'B',
    bannerSuffix: 'OR',
    subtitle: 'Elaborado diariamente con 3 cortes de novillo seleccionados.',
  },
  {
    id: 'toppings-slide',
    image: '/images/hero_slide_table.jpg',
    lines: ['ARMALA A TU GUSTO.', 'SIN LÍMITES.', 'MUCHOS'],
    bannerPrefix: 'TO',
    bannerSpecialChar: 'P',
    bannerSuffix: 'PINGS',
    subtitle: 'Armá tu hamburguesa con los mejores ingredientes frescos del día.',
  },
];

interface HeroProps {
  onOpenMenu?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenMenu }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Animación SplitText escalonada para que la publicidad impacte
  useEffect(() => {
    setTextVisible(false);
    const textTimer = setTimeout(() => {
      setTextVisible(true);
    }, 180);

    return () => clearTimeout(textTimer);
  }, [currentIdx]);

  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
  }, []);

  // Transición suave entre fotos cada 7.5 segundos
  useEffect(() => {
    timerRef.current = setInterval(() => {
      handleNext();
    }, 7500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [handleNext]);

  const slide = SLIDES[currentIdx];

  return (
    <section
      id="inicio"
      className="relative w-full h-[100dvh] min-h-[660px] overflow-hidden select-none bg-neutral-950 flex items-center"
    >
      {/* CAPA DE IMÁGENES CINEMATOGRÁFICAS A PANTALLA COMPLETA */}
      <div className="absolute inset-0 overflow-hidden">
        {SLIDES.map((item, idx) => {
          const isActive = idx === currentIdx;
          return (
            <div
              key={item.id}
              className={`absolute inset-0 transition-all duration-[1400ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isActive
                  ? 'opacity-100 scale-100 translate-y-0 z-10'
                  : 'opacity-0 scale-104 -translate-y-2 z-0 pointer-events-none'
              }`}
            >
              {/* Fotografía de hamburguesa en pantalla completa con iluminación vívida */}
              <img
                src={item.image}
                alt={item.lines.join(' ')}
                className="w-full h-full object-cover object-[center_right] sm:object-center filter brightness-[0.72] contrast-[1.05]"
                loading={idx === 0 ? 'eager' : 'lazy'}
              />

              {/* Degradado lateral sutil y liviano */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* COMPOSICIÓN PUBLICITARIA */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 pt-16 sm:pt-20">
        <div className="max-w-2xl text-left">
          
          {/* Líneas de texto principales */}
          <div className="flex flex-col gap-0.5 sm:gap-1">
            {slide.lines.map((line, lIdx) => (
              <div key={`line-${currentIdx}-${lIdx}`} className="overflow-hidden py-0.5">
                <h1
                  style={{
                    transitionDelay: `${150 + lIdx * 110}ms`,
                  }}
                  className={`text-3xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white font-display leading-[0.98] drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    textVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-[115%] opacity-0'
                  }`}
                >
                  {line}
                </h1>
              </div>
            ))}
          </div>

          {/* Banner Inclinado tipo cinta publicitaria con la X en graffiti rojo */}
          <div className="mt-2.5 sm:mt-4 overflow-visible">
            <div
              style={{
                transitionDelay: `${150 + slide.lines.length * 110 + 50}ms`,
              }}
              className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                textVisible
                  ? 'translate-y-0 opacity-100 rotate-[-2deg] scale-100'
                  : 'translate-y-8 opacity-0 rotate-0 scale-95'
              }`}
            >
              <div className="relative inline-flex items-center bg-[#1c1c1c] text-white px-4 sm:px-7 py-1.5 sm:py-2.5 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.85)] border-l-4 border-[#E52525]">
                <span className="font-display font-black text-2xl sm:text-5xl md:text-6xl tracking-wider uppercase text-white flex items-center select-none">
                  <span>{slide.bannerPrefix}</span>
                  <span className="relative inline-block mx-0.5 text-white">
                    {slide.bannerSpecialChar}
                    <svg
                      viewBox="0 0 100 100"
                      className="absolute -inset-2 sm:-inset-4 w-[145%] h-[145%] text-[#E52525] pointer-events-none drop-shadow-[0_4px_12px_rgba(229,37,37,0.7)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="18"
                      strokeLinecap="round"
                    >
                      <path d="M20 20 L80 80" />
                      <path d="M80 20 L20 80" />
                    </svg>
                  </span>
                  <span>{slide.bannerSuffix}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Subtítulo delicado */}
          <div className="overflow-hidden mt-4 sm:mt-5 py-0.5">
            <p
              style={{
                transitionDelay: `${150 + slide.lines.length * 110 + 150}ms`,
              }}
              className={`text-xs sm:text-sm md:text-base text-neutral-200 font-medium max-w-md leading-relaxed drop-shadow-md transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                textVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-[120%] opacity-0'
              }`}
            >
              {slide.subtitle}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
