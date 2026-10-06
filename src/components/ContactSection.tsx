import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiMapPin, FiClock, FiPhone, FiExternalLink, FiCopy, FiCheck, FiArrowUpRight } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const { openOrderDrawer } = useCart();
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Av. Corrientes 4580, Villa Crespo, Buenos Aires');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenGoogleMaps = () => {
    window.open(
      'https://maps.google.com/?q=Av.+Corrientes+4580,+Villa+Crespo,+Buenos+Aires',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section id="contacto" className="py-24 bg-white text-black border-t border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 overflow-hidden">
        
        {/* Clean Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black font-display">
            ENCONTRANOS
          </h2>
          <p className="mt-2 text-sm text-neutral-500 font-medium">
            Vení a nuestro local en Villa Crespo o pedí tu combo directo a domicilio.
          </p>
        </motion.div>

        {/* 2-Column Minimal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct info list with hover animations */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Address Card */}
            <motion.div
              whileHover={{ scale: 1.01, x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="p-6 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 transition-all shadow-2xs hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest font-bold mb-1">
                <FiMapPin className="text-[#E52525]" />
                <span>DIRECCIÓN</span>
              </div>
              <p className="text-2xl sm:text-3xl font-black text-black font-display tracking-tight">
                Av. Corrientes 4580
              </p>
              <p className="text-xs text-neutral-600 mt-1">
                Villa Crespo, Buenos Aires · A 100m de Subte B (Ángel Gallardo)
              </p>
              
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-black hover:text-white hover:border-black text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  {copied ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FiCopy className="w-3.5 h-3.5" />}
                  <span>{copied ? '¡Copiado!' : 'Copiar dirección'}</span>
                </button>

                <button
                  onClick={handleOpenGoogleMaps}
                  className="inline-flex items-center gap-1.5 text-xs font-bold hover:underline cursor-pointer text-black hover:text-[#E52525] transition-colors"
                >
                  <span>Abrir en Maps</span>
                  <FiArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div
              whileHover={{ scale: 1.01, x: 4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="p-6 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 transition-all shadow-2xs hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest font-bold mb-3">
                <FiClock className="text-black" />
                <span>HORARIOS DE COCINA</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-700 font-medium">Martes a Jueves</span>
                  <span className="font-mono font-bold text-black">19:00 – 00:00 hs</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-700 font-medium">Viernes y Sábado</span>
                  <span className="font-mono font-bold text-black">19:00 – 01:30 hs</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-neutral-200/60">
                  <span className="text-neutral-700 font-medium">Domingo</span>
                  <span className="font-mono font-bold text-black">19:00 – 00:00 hs</span>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-500 pt-1 font-mono">
                  <span>Lunes</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </motion.div>

            {/* Direct Channels */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                CANALES DIRECTOS
              </span>
              
              <div className="flex flex-wrap gap-3">
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://wa.me/5491155550199"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>WhatsApp (+54 9 11 5555-0199)</span>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://instagram.com/brasa.burger"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-black border border-neutral-300 text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <FaInstagram className="w-4 h-4 text-pink-600" />
                  <span>Instagram @brasa.burger</span>
                  <FiArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                </motion.a>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openOrderDrawer}
                  className="w-full py-4 bg-black hover:bg-[#E52525] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <FiPhone className="w-4 h-4" />
                  <span>PEDIR EN LÍNEA AHORA</span>
                </motion.button>
              </div>
            </div>

          </div>

          {/* Right Column: Map */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-7 h-[420px] lg:h-[500px] rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-100 relative shadow-sm hover:shadow-xl transition-shadow"
          >
            <iframe
              title="Ubicación Brasa Burger Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.4534721473215!2d-58.43126742347271!3d-34.60407135691506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca6f17e04a55%3A0x6b4f74d08a548231!2sAv.%20Corrientes%204580%2C%20C1414%20CABA!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
};
