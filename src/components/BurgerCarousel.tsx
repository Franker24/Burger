import React from 'react';
import { BURGERS } from '../data/burgers';
import { useCart } from '../context/CartContext';

export const BurgerCarousel: React.FC = () => {
  const { openOrderDrawer } = useCart();

  // Duplicate items to ensure a seamless, non-stop infinite marquee loop
  const marqueeItems = [...BURGERS, ...BURGERS, ...BURGERS];

  return (
    <section
      id="favoritas"
      className="relative py-20 sm:py-28 bg-white text-black overflow-hidden border-t border-neutral-100 select-none"
    >
      <div className="w-full">
        
        {/* Section Header: Matching user screenshot exactly */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 px-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-black font-display">
            HAMBURGUESAS SMASH.
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm font-semibold tracking-[0.2em] text-neutral-600 uppercase">
            PAPAS CRINKLE. POLLO FRITO. CAFÉ. MOUSSE.
          </p>
        </div>

        {/* Carousel Container with Continuous Smooth Non-Stop Marquee */}
        <div className="relative w-full overflow-hidden py-4">
          
          {/* Left Edge Subtle Fade Overlay as in screenshot */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Right Edge Subtle Fade Overlay as in screenshot */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Continuous Non-Stop Moving Track */}
          <div className="animate-marquee-continuous flex gap-6 px-4">
            {marqueeItems.map((burger, idx) => (
              <div
                key={`${burger.id}-${idx}`}
                onClick={openOrderDrawer}
                className="group relative flex-none w-[300px] sm:w-[340px] md:w-[360px] rounded-2xl p-6 bg-white border border-neutral-200/70 transition-all duration-300 cursor-pointer shadow-[0_6px_25px_rgb(0,0,0,0.03)] hover:shadow-2xl hover:bg-black hover:border-black hover:-translate-y-1.5"
              >
                {/* Burger Photography in Primera Plana with Soft Studio Contact Shadow */}
                <div className="relative w-full h-[220px] sm:h-[250px] flex items-center justify-center mb-5 overflow-visible">
                  {/* Subtle ground contact shadow */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-3 bg-black/15 rounded-[100%] blur-[6px] pointer-events-none group-hover:bg-white/10 group-hover:blur-[8px] transition-colors" />

                  {/* Burger hero image in foreground */}
                  <img
                    src={burger.image}
                    alt={burger.name}
                    className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_12px_22px_rgba(0,0,0,0.16)] transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                </div>

                {/* Burger Title: Left aligned, turns white on card hover */}
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black group-hover:text-white transition-colors duration-300 font-display leading-tight truncate">
                  {burger.name}
                </h3>

                {/* Ingredients / Description: Left aligned, turns light neutral on card hover */}
                <p className="mt-1 text-xs text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 leading-relaxed line-clamp-2">
                  {burger.description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
