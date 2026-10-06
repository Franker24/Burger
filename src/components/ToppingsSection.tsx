import React from 'react';

interface ToppingItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export const ToppingsSection: React.FC = () => {
  const toppings: ToppingItem[] = [
    {
      id: 'tomate',
      name: 'Tomate',
      icon: (
        <svg viewBox="0 0 72 72" fill="none" className="w-14 h-14" strokeLinecap="round" strokeLinejoin="round">
          {/* Sliced ripe tomato in crisp Black & White */}
          <circle cx="36" cy="38" r="24" stroke="#000000" strokeWidth="2.5" fill="#FFFFFF" />
          {/* Calyx & stem */}
          <path d="M36 14 L36 8" stroke="#000000" strokeWidth="2.5" />
          <path d="M36 14 L24 9 M36 14 L48 9 M36 14 L29 19 M36 14 L43 19" stroke="#000000" strokeWidth="2.2" />
          {/* Tomato inner lobules and seeds in B&W */}
          <ellipse cx="28" cy="34" rx="5" ry="4" stroke="#000000" strokeWidth="1.5" strokeDasharray="2 2" />
          <ellipse cx="44" cy="34" rx="5" ry="4" stroke="#000000" strokeWidth="1.5" strokeDasharray="2 2" />
          <ellipse cx="36" cy="46" rx="6" ry="4" stroke="#000000" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="28" cy="34" r="1.5" fill="#000000" />
          <circle cx="44" cy="34" r="1.5" fill="#000000" />
          <circle cx="36" cy="46" r="1.5" fill="#000000" />
        </svg>
      ),
    },
    {
      id: 'lechuga',
      name: 'Lechuga',
      icon: (
        <svg viewBox="0 0 72 72" fill="none" className="w-14 h-14" strokeLinecap="round" strokeLinejoin="round">
          {/* Ruffled crisp lettuce leaf in B&W */}
          <path
            d="M32 60 C29 48, 18 36, 21 21 C23 15, 30 11, 38 12 C46 14, 52 21, 50 31 C48 42, 41 53, 34 60"
            stroke="#000000"
            strokeWidth="2.5"
            fill="#FFFFFF"
          />
          {/* Central vein */}
          <path d="M33 58 C33 46, 35 34, 38 20" stroke="#000000" strokeWidth="2.2" />
          {/* Branching leaf veins */}
          <path d="M34 44 C28 40, 24 41, 24 41" stroke="#000000" strokeWidth="1.8" />
          <path d="M36 37 C42 33, 47 35, 47 35" stroke="#000000" strokeWidth="1.8" />
          <path d="M37 28 C31 25, 27 27, 27 27" stroke="#000000" strokeWidth="1.8" />
          <path d="M38 23 C43 20, 47 22, 47 22" stroke="#000000" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      id: 'champinones',
      name: 'Champiñones',
      icon: (
        <svg viewBox="0 0 72 72" fill="none" className="w-14 h-14" strokeLinecap="round" strokeLinejoin="round">
          {/* Sliced button mushroom in B&W */}
          <path
            d="M16 36 C16 21, 25 14, 36 14 C47 14, 56 21, 56 36 C56 39, 53 40, 50 40 C42 40, 30 40, 22 40 C19 40, 16 39, 16 36 Z"
            stroke="#000000"
            strokeWidth="2.5"
            fill="#FFFFFF"
          />
          {/* Mushroom stem */}
          <path d="M29 40 L29 55 C29 58, 43 58, 43 55 L43 40" stroke="#000000" strokeWidth="2.5" fill="#FFFFFF" />
          {/* Gills stipples/hatching */}
          <path d="M22 40 C26 37, 46 37, 50 40" stroke="#000000" strokeWidth="1.8" strokeDasharray="3 2" />
          <line x1="36" y1="44" x2="36" y2="52" stroke="#000000" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      ),
    },
    {
      id: 'bacon',
      name: 'Bacon',
      icon: (
        <svg viewBox="0 0 72 72" fill="none" className="w-14 h-14" strokeLinecap="round" strokeLinejoin="round">
          {/* Crispy wavy bacon strip in B&W */}
          <path
            d="M12 28 C19 22, 24 33, 31 27 C38 21, 43 32, 50 26 C55 22, 59 25, 61 28 L59 44 C53 40, 49 44, 43 49 C36 54, 31 43, 24 49 C17 54, 14 47, 11 43 Z"
            stroke="#000000"
            strokeWidth="2.5"
            fill="#FFFFFF"
          />
          {/* Crispy marbling internal lines */}
          <path d="M16 36 C22 30, 27 41, 34 35 C41 29, 46 40, 53 35" stroke="#000000" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M19 41 C24 38, 29 46, 36 41" stroke="#000000" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: 'cebolla-morada',
      name: 'Cebolla morada',
      icon: (
        <svg viewBox="0 0 72 72" fill="none" className="w-14 h-14" strokeLinecap="round" strokeLinejoin="round">
          {/* Concentric red onion rings in B&W */}
          <circle cx="36" cy="38" r="22" stroke="#000000" strokeWidth="2.5" fill="#FFFFFF" />
          <circle cx="36" cy="38" r="16" stroke="#000000" strokeWidth="2" strokeDasharray="3 1.5" />
          <circle cx="36" cy="38" r="10" stroke="#000000" strokeWidth="1.8" />
          <circle cx="36" cy="38" r="4.5" stroke="#000000" strokeWidth="1.8" fill="#000000" />
          {/* Sprout tip */}
          <path d="M33 16 L29 9" stroke="#000000" strokeWidth="2.2" />
          <path d="M36 16 L36 8" stroke="#000000" strokeWidth="2.2" />
          <path d="M39 16 L43 9" stroke="#000000" strokeWidth="2.2" />
        </svg>
      ),
    },
    {
      id: 'chile-picante',
      name: 'Chile picante',
      icon: (
        <svg viewBox="0 0 72 72" fill="none" className="w-14 h-14" strokeLinecap="round" strokeLinejoin="round">
          {/* Fiery hot chili pepper in B&W */}
          <path
            d="M50 22 C46 30, 40 42, 33 51 C27 58, 19 60, 16 57 C13 53, 15 44, 22 39 C31 30, 43 25, 50 22 Z"
            stroke="#000000"
            strokeWidth="2.5"
            fill="#FFFFFF"
          />
          {/* Cap & curved stem */}
          <path d="M47 24 C49 22, 53 20, 54 18" stroke="#000000" strokeWidth="2.5" />
          <path d="M54 18 C58 13, 61 14, 61 14" stroke="#000000" strokeWidth="2.5" />
          {/* Shading contour line */}
          <path d="M26 43 C33 36, 42 30, 46 27" stroke="#000000" strokeWidth="1.6" strokeDasharray="3 2" />
        </svg>
      ),
    },
    {
      id: 'salsa-homies',
      name: 'Salsa Brasa',
      icon: (
        <svg viewBox="0 0 72 72" fill="none" className="w-14 h-14" strokeLinecap="round" strokeLinejoin="round">
          {/* Condiment squeeze bottle in B&W */}
          <rect x="25" y="27" width="22" height="30" rx="5" transform="rotate(-15 36 42)" stroke="#000000" strokeWidth="2.5" fill="#FFFFFF" />
          {/* Nozzle & cap */}
          <path d="M32 23 L39 21 L37 13 L34 13 Z" stroke="#000000" strokeWidth="2.2" fill="#FFFFFF" />
          <path d="M30 26 L42 23" stroke="#000000" strokeWidth="2.2" />
          {/* Level line */}
          <path d="M28 41 L47 36" stroke="#000000" strokeWidth="1.8" strokeDasharray="2 2" />
        </svg>
      ),
    },
    {
      id: 'c-caramelizada',
      name: 'C. Caramelizada',
      icon: (
        <svg viewBox="0 0 72 72" fill="none" className="w-14 h-14" strokeLinecap="round" strokeLinejoin="round">
          {/* Sautéed caramelized onion swirl in B&W */}
          <path d="M36 18 C46 18, 55 26, 55 36 C55 46, 46 54, 36 54 C26 54, 17 46, 17 36 C17 26, 26 18, 36 18" stroke="#000000" strokeWidth="2.5" fill="#FFFFFF" />
          <path d="M36 25 C43 25, 48 30, 48 36 C48 42, 43 47, 36 47 C29 47, 24 42, 24 36 C24 30, 29 25, 36 25" stroke="#000000" strokeWidth="2" strokeDasharray="3 1.5" />
          <circle cx="36" cy="36" r="4.5" fill="#000000" />
          {/* Grill sizzle steam vapor */}
          <path d="M33 13 C33 10, 35 9, 35 7" stroke="#000000" strokeWidth="2" />
          <path d="M39 13 C39 10, 41 9, 41 7" stroke="#000000" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAFAFA] text-black border-b border-neutral-200 select-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 overflow-hidden">
        
        {/* Header matching especias.png */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="text-sm sm:text-base font-bold tracking-tight text-[#E52525] font-display uppercase mb-1">
            Muchas combinaciones
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black font-display uppercase">
            Nuestros Toppings
          </h2>
        </div>

        {/* 8 Toppings Grid matching the 4x2 layout of especias.png */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {toppings.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-black/40 hover:-translate-y-1.5 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Black & White Line Drawing with subtle hover animation */}
              <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              {/* Topping Name */}
              <span className="text-xs sm:text-sm font-bold text-black font-display tracking-wide group-hover:text-black transition-colors">
                {item.name}
              </span>

              {/* Animated Accent Line on Box Hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
