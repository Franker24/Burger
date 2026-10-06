import React, { useState, useEffect } from 'react';
import { FULL_MENU, PROMO_ITEMS, MenuItem } from '../data/fullMenu';
import { useCart } from '../context/CartContext';
import { FiPlus, FiCheck, FiDownload, FiFileText, FiZap } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface MenuPageProps {
  onBackToHome: () => void;
  onNavigateToCheckout?: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onBackToHome, onNavigateToCheckout }) => {
  const { addToCart, totalItems, openOrderDrawer } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('smash');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    // Simulate menu PDF download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#';
      link.download = 'Carta_Brasa_Burger_2026.pdf';
      setDownloadingPdf(false);
      alert('📄 Descarga iniciada: Carta Oficial Brasa Burger 2026 (PDF)');
    }, 800);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price).replace('ARS', '$');
  };

  const scrollToSection = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(`linea-${id}`);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Group items by lines
  const smashItems = FULL_MENU.filter((item) => item.subCategory === 'carne');
  const chickenItems = FULL_MENU.filter((item) => item.subCategory === 'pollo');
  const veggieItems = FULL_MENU.filter((item) => item.subCategory === 'veggie');
  const sidesItems = FULL_MENU.filter((item) => item.subCategory === 'sides');
  const drinksItems = FULL_MENU.filter((item) => item.subCategory === 'drinks');
  const dessertsItems = FULL_MENU.filter((item) => item.subCategory === 'desserts');

  const menuLines = [
    {
      id: 'smash',
      pillLabel: 'CLÁSICA',
      title: 'LÍNEA CLÁSICA & SMASH',
      subtitle: 'HECHAS 100% CON CARNE DE NOVILLO PRENSADA EN EL MOMENTO.',
      items: smashItems,
    },
    {
      id: 'chicken',
      pillLabel: 'CHICKEN',
      title: 'LÍNEA CHICKEN',
      subtitle: 'HECHAS 100% CON POLLO REBOZADO EN EL MOMENTO.',
      items: chickenItems,
    },
    {
      id: 'veggie',
      pillLabel: 'VEGETARIANA',
      title: 'LÍNEA VEGETARIANA',
      subtitle: 'UNA HAMBURGUESA VEGETARIANA QUE NO BUSCA IMITAR LA CARNE.',
      items: veggieItems,
    },
    {
      id: 'sides',
      pillLabel: 'ACOMPAÑAMIENTOS',
      title: 'LÍNEA ACOMPAÑAMIENTOS',
      subtitle: 'PAPAS CRINKLE CROCANTES Y GUARNICIONES FRESCAS.',
      items: sidesItems,
    },
    {
      id: 'drinks',
      pillLabel: 'BEBIDAS',
      title: 'LÍNEA BEBIDAS',
      subtitle: 'CERVEZAS ARTESANALES, LIMONADA NATURAL Y GASEOSAS.',
      items: drinksItems,
    },
    {
      id: 'desserts',
      pillLabel: 'POSTRES',
      title: 'LÍNEA POSTRES',
      subtitle: 'RECETAS DULCES CASERAS DE LA CASA.',
      items: dessertsItems,
    },
  ];

  // Marquee items
  const promoRibbonItems = [
    '🔥 2X1 EN HAMBURGUESAS MARTES Y JUEVES DE 12 A 15HS',
    '💵 10% OFF PAGANDO EN EFECTIVO AL RETIRAR',
    '🛵 DELIVERY EN EL ACTO EN CABA',
    '🛍️ TAKE AWAY PREPARACIÓN EN 15 A 20 MIN',
  ];

  const paymentRibbonItems = [
    '💳 MERCADO PAGO',
    '💵 EFECTIVO (10% OFF)',
    '💳 VISA / MASTERCARD',
    '📲 MODO',
    '🏦 TRANSFERENCIA BANCARIA',
  ];

  const promo2x1 = PROMO_ITEMS[0];

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#F3F3F3] text-black pt-24 pb-36 font-sans select-none"
    >
      
      {/* ======================================================== */}
      {/* HERO BANNER DE ANCHO COMPLETO MÁS GRANDE                 */}
      {/* ======================================================== */}
      <div className="max-w-[1440px] mx-auto px-3 sm:px-8 lg:px-10 pt-2 sm:pt-4 mb-6 sm:mb-8">
        <div className="relative w-full h-[360px] sm:h-[540px] lg:h-[620px] rounded-2xl sm:rounded-[32px] overflow-hidden bg-black shadow-2xl flex items-center">
          
          {/* Video en 100% de alto y ancho del div */}
          <video
            src="/videos/burger2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.95] contrast-[1.05]"
          />

          {/* Degradado lateral sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />

          {/* Overlay Text en el lateral izquierdo */}
          <div className="relative z-10 px-5 sm:px-14 max-w-2xl text-white space-y-2.5 sm:space-y-3">
            <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-white/90 block">
              CONOCE NUESTRO
            </span>

            <h1 className="text-5xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white font-display leading-[0.9] drop-shadow-lg">
              MENÚ
            </h1>

            <p className="text-[11px] sm:text-sm font-bold uppercase tracking-wider text-neutral-200 font-mono pt-0.5">
              HAMBURGUESAS SMASH. PAPAS CRINKLE. POLLO FRITO.
            </p>

            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                onClick={() => onNavigateToCheckout ? onNavigateToCheckout() : openOrderDrawer()}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-black font-extrabold text-xs rounded-full hover:bg-neutral-200 transition-all shadow-lg cursor-pointer active:scale-95"
              >
                Deli & Take Away
              </button>

              {/* Botón para Descargar Carta PDF */}
              <button
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                className="px-4 sm:px-5 py-2.5 sm:py-3 bg-black/60 hover:bg-black text-white border border-white/30 backdrop-blur-md font-bold text-xs rounded-full transition-all shadow-md cursor-pointer flex items-center gap-2 active:scale-95"
              >
                <FiDownload className="w-4 h-4 text-amber-400" />
                <span>{downloadingPdf ? 'Descargando...' : 'Descargar Carta (PDF)'}</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* CINTA 1: PROMOCIONES Y DESCUENTOS EN COLOR NEGRO */}
      <div className="w-full bg-black text-white py-3 overflow-hidden shadow-md select-none border-y border-neutral-800">
        <div className="animate-marquee-continuous">
          {[...promoRibbonItems, ...promoRibbonItems, ...promoRibbonItems, ...promoRibbonItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 mx-6 text-xs sm:text-sm font-black font-display uppercase tracking-wider">
              <span>{item}</span>
              <span className="text-[#E52525] ml-4 font-mono font-bold">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* CINTA 2: FORMAS DE PAGO EN COLOR AMARILLO */}
      <div className="w-full bg-amber-400 text-black py-2.5 overflow-hidden shadow-xs select-none border-b border-amber-500">
        <div className="animate-marquee-continuous">
          {[...paymentRibbonItems, ...paymentRibbonItems, ...paymentRibbonItems, ...paymentRibbonItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 mx-6 text-xs sm:text-sm font-black font-display uppercase tracking-wider">
              <span>{item}</span>
              <span className="text-black/40 ml-4 font-mono font-bold">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Sections Grid */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-12 space-y-20">
        
        {/* Promoción Destacada 2x1 */}
        {promo2x1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-6">
              <img
                src={promo2x1.image}
                alt={promo2x1.name}
                className="w-28 h-28 object-contain shrink-0"
              />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E52525] bg-red-50 px-2.5 py-1 rounded-md mb-1.5 inline-block">
                  🔥 PROMO DESTACADA
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase font-display text-black">
                  {promo2x1.name}
                </h3>
                <p className="text-xs text-neutral-600 mt-1 max-w-lg">
                  {promo2x1.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleAdd(promo2x1)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 shadow-sm active:scale-95 ${
                addedId === promo2x1.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#E52525] hover:bg-[#CC1E1E] text-white'
              }`}
            >
              {addedId === promo2x1.id ? '¡AGREGADO!' : `PEDIR PROMO 2X1 (${formatPrice(promo2x1.price)})`}
            </button>
          </motion.div>
        )}

        {/* SECCIONES DEL MENÚ CON INVERSIÓN EN HOVER */}
        {menuLines.map((line, lineIdx) => {
          if (line.items.length === 0) return null;

          return (
            <React.Fragment key={line.id}>
              <section id={`linea-${line.id}`} className="scroll-mt-24">
                
                {/* Header de Línea */}
                <div className="mb-8">
                  <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black font-display leading-none mb-2">
                    {line.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-neutral-600 font-mono">
                    {line.subtitle}
                  </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {line.items.map((item, idx) => {
                    const isAdded = addedId === item.id;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.45, delay: idx * 0.08 }}
                        className="bg-white hover:bg-black text-black hover:text-white rounded-[24px] p-6 border border-neutral-200/90 hover:border-black shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                      >
                        <div>
                          {/* Foto del Producto */}
                          <div className="w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-white mb-6 flex items-center justify-center relative p-2 shadow-inner">
                            <img
                              src={item.image || '/images/burger_clasica.jpg'}
                              alt={item.name}
                              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>

                          {/* Título */}
                          <h3 className="text-xl font-black uppercase tracking-tight font-display leading-snug mb-1.5 transition-colors group-hover:text-white">
                            {item.name}
                          </h3>

                          {/* Descripción */}
                          <p className="text-xs text-neutral-500 group-hover:text-neutral-300 leading-relaxed font-normal mb-4 transition-colors">
                            {item.description}
                          </p>
                        </div>

                        {/* Bottom Row */}
                        <div className="pt-4 border-t border-neutral-100 group-hover:border-neutral-800 flex items-center justify-between mt-2 transition-colors">
                          <div>
                            <span className="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-400 uppercase tracking-wider block font-semibold">
                              PRECIO
                            </span>
                            <span className="text-lg font-black font-display tabular-nums group-hover:text-white">
                              {formatPrice(item.price)}
                            </span>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAdd(item);
                            }}
                            className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                              isAdded
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-black text-white group-hover:bg-[#E52525] group-hover:text-white shadow-sm'
                            }`}
                          >
                            {isAdded ? (
                              <>
                                <FiCheck className="w-3.5 h-3.5" />
                                <span>LISTO</span>
                              </>
                            ) : (
                              <>
                                <FiPlus className="w-3.5 h-3.5" />
                                <span>AGREGAR</span>
                              </>
                            )}
                          </button>
                        </div>

                      </motion.div>
                    );
                  })}
                </div>

              </section>

              {/* SEGUNDO VIDEO BANNER PUBLICITARIO (/videos/burga.mp4) ENTRE SECCIONES DE MENÚ */}
              {lineIdx === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="my-14 rounded-3xl overflow-hidden bg-black text-white relative shadow-2xl h-[340px] sm:h-[440px] flex items-center"
                >
                  <video
                    src="/videos/burga.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />

                  <div className="relative z-10 p-8 sm:p-14 max-w-xl space-y-3">
                    <span className="px-3 py-1 bg-[#FF5B00] text-black font-mono font-bold text-[10px] uppercase tracking-widest rounded-full flex items-center gap-1.5 w-fit">
                      <FaFire className="text-black" />
                      <span>PASIÓN & FUEGO EN LA PLANCHA</span>
                    </span>
                    <h3 className="text-3xl sm:text-5xl font-black uppercase font-display tracking-tight text-white leading-tight">
                      COCCIÓN SMASH A 300°C
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-medium">
                      Carne de novillo fresco prensada al instante para lograr la costra crujiente perfecta.
                    </p>
                    <button
                      onClick={() => scrollToSection('carne')}
                      className="mt-2 px-6 py-3 bg-white text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-all shadow-lg cursor-pointer"
                    >
                      VER SMASH BURGERS
                    </button>
                  </div>
                </motion.div>
              )}
            </React.Fragment>
          );
        })}

      </div>

    </motion.div>
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#181818]/95 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-2xl flex items-center gap-1 max-w-[94vw] overflow-x-auto no-scrollbar select-none">
      {menuLines.map((line) => {
        const isActive = activeCategory === line.id;

        return (
          <button
            key={line.id}
            onClick={() => scrollToSection(line.id)}
            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              isActive
                ? 'bg-white text-black font-extrabold shadow-md scale-102'
                : 'text-neutral-300 hover:text-white hover:bg-white/10 font-bold'
            }`}
          >
            {line.pillLabel}
          </button>
        );
      })}
    </div>
    </>
  );
};
