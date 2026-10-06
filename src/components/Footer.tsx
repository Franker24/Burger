import React from 'react';
import { FiMapPin, FiExternalLink } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface FooterProps {
  onNavigateToMenu?: () => void;
  onNavigateToHome?: (sectionId?: string) => void;
  onNavigateToCheckout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToMenu,
  onNavigateToHome,
  onNavigateToCheckout,
}) => {
  return (
    <footer className="w-full bg-white border-t border-neutral-200 py-16 text-neutral-600 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 overflow-hidden">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-200">
          
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <motion.button
              whileHover={{ scale: 1.02, x: 2 }}
              onClick={() => onNavigateToHome && onNavigateToHome('inicio')}
              className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black font-display hover:text-[#E52525] transition-colors text-left cursor-pointer"
            >
              BRASA BURGER
            </motion.button>
            <p className="text-xs text-neutral-600 font-medium leading-relaxed">
              Smash burgers hechas al momento con doble carne 100% novillo y pan brioche artesanal en Buenos Aires.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 pt-1">
              <FiMapPin className="text-[#E52525]" />
              <span>Av. Corrientes 4580, Villa Crespo, CABA</span>
            </div>
          </div>

          {/* Quick Nav Links Column */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-2">
              NAVEGACIÓN RÁPIDA
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-neutral-700">
              <button
                onClick={() => onNavigateToHome && onNavigateToHome('inicio')}
                className="text-left hover:text-black hover:translate-x-1 transition-all cursor-pointer py-1"
              >
                Inicio
              </button>
              <button
                onClick={() => onNavigateToMenu && onNavigateToMenu()}
                className="text-left hover:text-black hover:translate-x-1 transition-all cursor-pointer py-1"
              >
                Menú Completo
              </button>
              <button
                onClick={() => onNavigateToHome && onNavigateToHome('nosotros')}
                className="text-left hover:text-black hover:translate-x-1 transition-all cursor-pointer py-1"
              >
                Nosotros
              </button>
              <button
                onClick={() => onNavigateToHome && onNavigateToHome('contacto')}
                className="text-left hover:text-black hover:translate-x-1 transition-all cursor-pointer py-1"
              >
                Contacto
              </button>
              <button
                onClick={() => onNavigateToCheckout && onNavigateToCheckout()}
                className="text-left text-[#E52525] font-bold hover:underline hover:translate-x-1 transition-all cursor-pointer py-1 col-span-2"
              >
                Pedir Delivery / Take Away ↗
              </button>
            </div>
          </div>

          {/* Direct Social & Contact Channels Column */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 block mb-2">
              CANALES OFICIALES
            </span>

            <div className="flex flex-col gap-2.5">
              <motion.a
                whileHover={{ scale: 1.02, x: 3 }}
                href="https://instagram.com/brasa.burger"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-black hover:text-white border border-neutral-200 text-xs font-bold text-black transition-all group cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <FaInstagram className="w-4 h-4 text-pink-600 group-hover:text-pink-400" />
                  <span>Instagram @brasa.burger</span>
                </div>
                <FiExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.02, x: 3 }}
                href="https://wa.me/5491155550199"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-black hover:text-white border border-neutral-200 text-xs font-bold text-black transition-all group cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <FaWhatsapp className="w-4 h-4 text-emerald-600 group-hover:text-emerald-400" />
                  <span>WhatsApp (+54 9 11 5555-0199)</span>
                </div>
                <FiExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white" />
              </motion.a>
            </div>
          </div>

        </div>

        {/* Bottom Row: Copyright & Location (Limpio sin "Hecho con <3") */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500 font-mono">
          <p>© 2026 BRASA BURGER. Todos los derechos reservados.</p>
          <p>Buenos Aires, Argentina</p>
        </div>

      </div>
    </footer>
  );
};
