import React from 'react';

interface MenuBannerProps {
  onOpenMenu: () => void;
}

export const MenuBanner: React.FC<MenuBannerProps> = ({ onOpenMenu }) => {
  return (
    <section className="relative w-full py-20 sm:py-28 overflow-hidden select-none bg-neutral-100 border-t border-b border-neutral-200">
      
      {/* Background Image: Flat lay prep board with patties, tomatoes, onions and lettuce */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/burger_ingredients.jpg"
          alt="Ingredientes frescos Brasa"
          className="w-full h-full object-cover object-center filter contrast-[1.02]"
          loading="lazy"
        />
        {/* Soft light editorial wash */}
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
      </div>

      {/* Center Content: NUESTRO MENÚ badge + Unfolding Expandable Button */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        
        {/* NUESTRO MENÚ Black Tape Badge with Red Bold Typography */}
        <div className="bg-[#141414] px-10 py-3.5 sm:px-14 sm:py-4.5 rounded-lg shadow-2xl mb-7 transform -rotate-0.5 hover:rotate-0 transition-transform">
          <h3 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#E52525] font-display">
            NUESTRO MENÚ
          </h3>
        </div>

        {/* Botón con despliegue animado al acercar el mouse (revela la palabra "Menú") */}
        <div className="relative flex items-center justify-center">
          <button
            onClick={onOpenMenu}
            className="group relative flex items-center justify-center h-14 sm:h-16 px-4 rounded-full bg-[#E52525] hover:bg-[#CC1E1E] text-white shadow-xl hover:shadow-[0_12px_30px_rgba(229,37,37,0.45)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
            aria-label="Ver Menú"
          >
            {/* White Burger Line Icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-white transition-transform duration-300 group-hover:scale-110"
            >
              {/* Top Bun */}
              <path d="M4 11 C4 7, 7 5, 12 5 C17 5, 20 7, 20 11 Z" />
              {/* Wavy Patty / Filling */}
              <path d="M4 14 C5.5 13, 6.5 15, 8 14 C9.5 13, 10.5 15, 12 14 C13.5 13, 14.5 15, 16 14 C17.5 13, 18.5 15, 20 14" />
              {/* Bottom Bun */}
              <path d="M5 17 C5 19, 7 19.5, 12 19.5 C17 19.5, 19 19, 19 17 Z" />
            </svg>

            {/* Despliegue de la palabra "Menú" al acercar el cursor */}
            <span className="max-w-0 opacity-0 -translate-x-2 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-3 overflow-hidden whitespace-nowrap text-sm sm:text-base font-black tracking-widest uppercase font-display transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
              Menú
            </span>
          </button>
        </div>

      </div>

    </section>
  );
};
