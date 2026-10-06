import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="nosotros"
      className="relative py-20 sm:py-28 bg-white text-black overflow-hidden border-t border-neutral-200 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 overflow-hidden">
        
        {/* Layout de 2 Columnas idéntico a aboutus.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Columna Izquierda: Fotografía del Local / Fachada Urbana */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/90 aspect-[4/3] sm:aspect-[16/12] lg:aspect-[4/3] bg-neutral-100 group">
              <img
                src="/images/storefront_homies.jpg"
                alt="Local Homies Smash Burger Fachada"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                loading="lazy"
              />
              {/* Sutil viñeta para realzar profundidad */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Columna Derecha: Historia Editorial con Doodles Rosa Pastel */}
          <div className="lg:col-span-6 relative flex flex-col justify-center lg:pl-4">
            
            {/* Doodles decorativos rosas (+, o, x) sutiles de fondo (Fiel a aboutus.png) */}
            <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
              <span className="absolute top-2 right-12 text-pink-300/40 text-xl font-mono">+</span>
              <span className="absolute top-10 right-32 text-pink-300/35 text-lg font-mono">○</span>
              <span className="absolute top-24 left-1/3 text-pink-300/40 text-xl font-mono">+</span>
              <span className="absolute top-44 right-16 text-pink-300/30 text-base font-mono">○</span>
              <span className="absolute top-64 right-8 text-pink-300/40 text-lg font-mono">+</span>
              <span className="absolute bottom-24 right-20 text-pink-300/40 text-xl font-mono">×</span>
              <span className="absolute bottom-16 right-10 text-pink-300/35 text-2xl font-mono">○</span>
              <span className="absolute bottom-4 left-1/4 text-pink-300/30 text-lg font-mono">○</span>
              <span className="absolute bottom-1 right-1/3 text-pink-300/40 text-xl font-mono">×</span>
            </div>

            {/* Contenido en primer plano */}
            <div className="relative z-10">
              
              {/* Header de Marca Rojo */}
              <span className="text-[#E52525] font-display font-black text-2xl sm:text-3xl tracking-tight uppercase block mb-1">
                BRASA BURGER
              </span>

              {/* Título Principal */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black font-display tracking-tight mb-6">
                Sobre nosotros
              </h2>

              {/* Párrafos de la historia */}
              <div className="space-y-4 text-neutral-600 text-sm sm:text-[15px] leading-relaxed">
                <p>
                  Un 22 de febrero de 2019, decidimos darle vida a{' '}
                  <strong className="text-neutral-900 font-bold">Brasa Burger</strong>.
                </p>

                <p>
                  La idea surge ante la necesidad de comer una buena hamburguesa de estilo smash artesanal en Buenos Aires. Al principio se pensó en abrir algo solo para amigos cercanos, algo familiar, pero{' '}
                  <strong className="text-neutral-900 font-bold">Brasa Burger</strong> se volvió viral y la gente nos obligó a crecer y a abrir nuestro nuevo local en Villa Crespo.
                </p>

                <p>
                  Nuestro enfoque principal está en la calidad de nuestro producto. Somos muy fanáticos de las hamburguesas y hemos viajado probándolas y aprendiendo de los mejores maestros de la plancha.
                </p>

                <p>
                  Todos los días horneamos nuestro propio pan brioche de manteca. Usamos un blend con tres cortes de carne de novillo seleccionada, picada todos los días 3 horas antes de iniciar el servicio. No usamos conservantes ni carne congelada.
                </p>

                <p className="pt-2">
                  Como dice nuestro lema, en{' '}
                  <strong className="text-neutral-900 font-bold">Brasa Burger</strong> hacemos{' '}
                  <strong className="text-neutral-950 font-black tracking-wide">
                    HAMBURGUESAS DE VERDAD
                  </strong>
                  .
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
