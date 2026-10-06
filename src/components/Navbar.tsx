import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FiMenu, FiX, FiTruck, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface NavbarProps {
  currentView?: 'home' | 'menu' | 'checkout';
  onNavigateToMenu?: () => void;
  onNavigateToHome?: (sectionId?: string) => void;
  onNavigateToCheckout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'home',
  onNavigateToMenu,
  onNavigateToHome,
  onNavigateToCheckout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openOrderDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (onNavigateToHome) {
      onNavigateToHome(sectionId);
    }
  };

  const handleMenuClick = () => {
    setMobileMenuOpen(false);
    if (onNavigateToMenu) {
      onNavigateToMenu();
    }
  };

  const handleCheckoutClick = () => {
    setMobileMenuOpen(false);
    if (onNavigateToCheckout) {
      onNavigateToCheckout();
    } else {
      openOrderDrawer();
    }
  };

  const isTransparent = currentView === 'home' && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 select-none ${
          isTransparent
            ? 'bg-transparent py-4 border-b border-transparent'
            : 'bg-white/95 text-black backdrop-blur-md py-4 border-b border-neutral-200/80 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-8 flex items-center justify-between gap-2">
          
          {/* Brand Wordmark */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center shrink-0"
          >
            <button
              onClick={() => handleNavClick('inicio')}
              className={`text-base xs:text-lg sm:text-2xl font-black tracking-tight uppercase font-display select-none transition-colors cursor-pointer text-left ${
                isTransparent ? 'text-white drop-shadow-md hover:text-white/80' : 'text-black hover:text-neutral-700'
              }`}
            >
              BRASA<span className="text-[#E52525]">.</span>BURGER
            </button>
          </motion.div>

          {/* Clean animated navigation links with modern, refined font & noticeable hover animation */}
          <nav className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-extrabold uppercase tracking-widest">
            <motion.button
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('inicio')}
              className={`transition-all py-1 px-2.5 rounded-lg cursor-pointer ${
                isTransparent
                  ? 'text-white hover:text-[#FF5B00] hover:bg-white/10 drop-shadow-sm font-black'
                  : currentView === 'home'
                  ? 'text-[#E52525] font-black'
                  : 'text-neutral-800 hover:text-[#E52525] hover:bg-neutral-100/80 font-extrabold'
              }`}
            >
              Inicio
            </motion.button>
            <motion.button
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMenuClick}
              className={`transition-all py-1 px-2.5 rounded-lg cursor-pointer ${
                currentView === 'menu'
                  ? 'text-[#E52525] font-black'
                  : isTransparent
                  ? 'text-white/90 hover:text-[#FF5B00] hover:bg-white/10 drop-shadow-sm font-black'
                  : 'text-neutral-800 hover:text-[#E52525] hover:bg-neutral-100/80 font-extrabold'
              }`}
            >
              Menú
            </motion.button>
            <motion.button
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('nosotros')}
              className={`transition-all py-1 px-2.5 rounded-lg cursor-pointer ${
                isTransparent
                  ? 'text-white/90 hover:text-[#FF5B00] hover:bg-white/10 drop-shadow-sm font-black'
                  : 'text-neutral-800 hover:text-[#E52525] hover:bg-neutral-100/80 font-extrabold'
              }`}
            >
              Nosotros
            </motion.button>
            <motion.button
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('contacto')}
              className={`transition-all py-1 px-2.5 rounded-lg cursor-pointer ${
                isTransparent
                  ? 'text-white/90 hover:text-[#FF5B00] hover:bg-white/10 drop-shadow-sm font-black'
                  : 'text-neutral-800 hover:text-[#E52525] hover:bg-neutral-100/80 font-extrabold'
              }`}
            >
              Contacto
            </motion.button>
          </nav>

          {/* Action Zone: New Uiverse Cart Button + Dedicated Checkout Button + Custom Animated Burger Icon */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* New Uiverse.io Cart Interactive Button */}
            <button
              className="uiverse-cart-btn-v2 cursor-pointer shrink-0"
              onClick={openOrderDrawer}
              aria-label="Ver mi pedido"
            >
              <span className="IconContainer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  fill="rgb(17, 17, 17)"
                  className="cart-icon"
                >
                  <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                </svg>
              </span>
              <p className="btn-text-v2 font-black">
                {totalItems > 0 ? `${totalItems}` : 'PEDIDO'}
              </p>
            </button>

            {/* Dedicated Order Page Button (Delivery or Take Away) */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleCheckoutClick}
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider rounded-full transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer whitespace-nowrap shrink-0 ${
                isTransparent
                  ? 'bg-[#E52525] hover:bg-[#CC1E1E] text-white shadow-[0_4px_20px_rgba(229,37,37,0.5)]'
                  : 'bg-black hover:bg-neutral-800 text-white'
              }`}
            >
              <FiTruck className="w-4 h-4" />
              <span>PEDIR (DELIVERY)</span>
              <FiChevronRight className="w-3.5 h-3.5 opacity-80" />
            </motion.button>

            {/* Custom Animated Burger Icon Toggle for Mobile - ALWAYS VISIBLE */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-center border shadow-xs shrink-0 ${
                mobileMenuOpen
                  ? 'bg-black text-white border-black ring-2 ring-[#E52525]/50'
                  : isTransparent
                  ? 'bg-black/60 text-white border-white/20 backdrop-blur-md hover:bg-black/80'
                  : 'bg-neutral-100 text-black border-neutral-200/80 hover:bg-neutral-200'
              }`}
              aria-label="Abrir menú de navegación"
            >
              {/* Custom Burger SVG / Lines representing Top Bun, Patty & Bottom Bun */}
              <div className="w-5 h-4 flex flex-col justify-between items-center relative pointer-events-none">
                {/* Top Bun */}
                <span
                  className={`w-5 h-[2.5px] rounded-full transition-all duration-300 ease-out origin-center ${
                    mobileMenuOpen
                      ? 'rotate-45 translate-y-[7px] bg-[#E52525]'
                      : isTransparent
                      ? 'bg-white'
                      : 'bg-black'
                  }`}
                />
                {/* Middle Patty */}
                <span
                  className={`w-4 h-[2.5px] rounded-full transition-all duration-200 ease-out bg-[#E52525] ${
                    mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                  }`}
                />
                {/* Bottom Bun */}
                <span
                  className={`w-5 h-[2.5px] rounded-full transition-all duration-300 ease-out origin-center ${
                    mobileMenuOpen
                      ? '-rotate-45 -translate-y-[7px] bg-[#E52525]'
                      : isTransparent
                      ? 'bg-white'
                      : 'bg-black'
                  }`}
                />
              </div>
            </motion.button>
          </div>

        </div>
      </header>

      {/* Mobile Animated Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-white/98 text-black backdrop-blur-3xl flex flex-col justify-between pt-24 pb-8 px-6 shadow-2xl border-b border-neutral-200 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-6">
            
            {/* Header Badge in Mobile Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-xs font-black uppercase tracking-widest text-[#E52525] font-display flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E52525] animate-ping" />
                MENÚ DE NAVEGACIÓN
              </span>
              <span className="text-[10px] font-extrabold uppercase bg-neutral-100 px-2.5 py-1 rounded-full text-neutral-600">
                BRASA BURGER
              </span>
            </div>

            <nav className="flex flex-col gap-3 font-black font-display uppercase tracking-wider text-black">
              <motion.button
                whileTap={{ x: 6 }}
                onClick={() => handleNavClick('inicio')}
                className={`text-left text-xl py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                  currentView === 'home' ? 'bg-neutral-100 text-[#E52525]' : 'hover:bg-neutral-50'
                }`}
              >
                <span>Inicio</span>
                <FiChevronRight className="w-5 h-5 text-neutral-400" />
              </motion.button>

              <motion.button
                whileTap={{ x: 6 }}
                onClick={handleMenuClick}
                className={`text-left text-xl py-3 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-between ${
                  currentView === 'menu' ? 'bg-neutral-100 text-[#E52525]' : 'hover:bg-neutral-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>Menú Completo</span>
                  <span className="text-[10px] bg-[#E52525] text-white px-2 py-0.5 rounded-md tracking-normal font-sans">
                    PROMO
                  </span>
                </span>
                <FiChevronRight className="w-5 h-5 text-[#E52525]" />
              </motion.button>

              <motion.button
                whileTap={{ x: 6 }}
                onClick={() => handleNavClick('nosotros')}
                className="text-left text-xl py-3 px-4 rounded-xl hover:bg-neutral-50 transition-all cursor-pointer flex items-center justify-between"
              >
                <span>Nosotros</span>
                <FiChevronRight className="w-5 h-5 text-neutral-400" />
              </motion.button>

              <motion.button
                whileTap={{ x: 6 }}
                onClick={() => handleNavClick('contacto')}
                className="text-left text-xl py-3 px-4 rounded-xl hover:bg-neutral-50 transition-all cursor-pointer flex items-center justify-between"
              >
                <span>Contacto</span>
                <FiChevronRight className="w-5 h-5 text-neutral-400" />
              </motion.button>
            </nav>

            {/* Mobile Action Buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckoutClick}
                className="w-full py-4 bg-black hover:bg-neutral-900 text-white text-xs sm:text-sm font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-black/10 cursor-pointer"
              >
                <FiTruck className="w-5 h-5 text-[#E52525]" />
                <span>PEDIR (DELIVERY / TAKE AWAY)</span>
              </motion.button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 pt-6 border-t border-neutral-200">
            <span className="text-xs font-bold tracking-tight text-neutral-900">
              BRASA BURGER · BUENOS AIRES
            </span>
            <span className="text-[10px] text-neutral-400 font-medium">
              PASIÓN & FUEGO EN LA PLANCHA
            </span>
          </div>
        </div>
      )}
    </>
  );
};
