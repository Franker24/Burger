import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/burger';
import { FiArrowLeft, FiCheck, FiShoppingBag, FiTruck, FiPhone, FiUser, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface CheckoutPageProps {
  onBackToHome: () => void;
  onNavigateToMenu: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBackToHome, onNavigateToMenu }) => {
  const { items, totalPrice, totalItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [addressNotes, setAddressNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'efectivo' | 'posnet'>('mercadopago');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const deliveryFee = orderType === 'delivery' ? 1200 : 0;
  const finalTotal = totalPrice + deliveryFee;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    let orderText = `*NUEVO PEDIDO BRASA BURGER*\n`;
    orderText += `*Tipo:* ${orderType === 'delivery' ? '🛵 DELIVERY A DOMICILIO' : '🛍️ RETIRO EN LOCAL (TAKE AWAY)'}\n`;
    orderText += `*Cliente:* ${customerName || 'No especificado'}\n`;
    orderText += `*Teléfono:* ${customerPhone || 'No especificado'}\n\n`;

    if (orderType === 'delivery') {
      orderText += `*Dirección:* ${addressStreet} ${addressNumber} ${addressNotes ? `(${addressNotes})` : ''}\n\n`;
    } else {
      orderText += `*Retiro en:* Av. Corrientes 4580, Villa Crespo\n\n`;
    }

    orderText += `*DETALLE DE PRODUCTOS:*\n`;
    items.forEach((item: CartItem) => {
      orderText += `- ${item.quantity}x ${item.burger.name} ($${item.burger.price * item.quantity})\n`;
    });

    orderText += `\n*Subtotal:* $${totalPrice}\n`;
    if (orderType === 'delivery') {
      orderText += `*Envío:* $${deliveryFee}\n`;
    }
    orderText += `*TOTAL FINAL:* $${finalTotal}\n`;
    orderText += `*Método de Pago:* ${paymentMethod.toUpperCase()}\n`;

    const encoded = encodeURIComponent(orderText);
    window.open(`https://wa.me/5491155550199?text=${encoded}`, '_blank');
    setIsSubmitted(true);
    clearCart();
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-black pt-24 pb-24 font-sans select-none">
      
      {/* Top Header Bar */}
      <div className="bg-white border-b border-neutral-200 fixed top-0 left-0 right-0 z-40 py-3.5 px-6 sm:px-12 flex items-center justify-between shadow-2xs">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black hover:text-neutral-600 transition-colors cursor-pointer"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Volver al Inicio</span>
        </button>

        <span className="text-sm font-black uppercase font-display tracking-tight text-black">
          CENTRAL DE PEDIDOS · DELIVERY & TAKE AWAY
        </span>

        <button
          onClick={onNavigateToMenu}
          className="text-xs font-bold uppercase tracking-wider text-[#E52525] hover:underline cursor-pointer"
        >
          + Agregar más ítems
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-6">
        
        {/* Title & Step Indicator */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E52525] block mb-1">
            PASO FINAL DE TU PEDIDO
          </span>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black font-display">
            ¿CÓMO QUERÉS TU PEDIDO?
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-neutral-600 font-medium">
            Seleccioná si preferís envío a domicilio o retirar por nuestra sucursal de Villa Crespo.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-10 border border-neutral-200 text-center max-w-xl mx-auto shadow-md"
          >
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 stroke-[3]" />
            </div>
            <h2 className="text-3xl font-black uppercase font-display text-black mb-2">
              ¡PEDIDO ENVIADO CON ÉXITO!
            </h2>
            <p className="text-sm text-neutral-600 mb-6">
              Abrimos WhatsApp con los detalles completos de tu compra. Nuestro equipo te confirmará el tiempo de demora estimado al instante.
            </p>
            <button
              onClick={onBackToHome}
              className="px-8 py-3.5 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-all shadow-md cursor-pointer"
            >
              Volver a la Página Principal
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Order Selector & Form */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Delivery vs Takeaway Selector */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 block">
                  1. SELECCIONÁ MODALIDAD
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                      orderType === 'delivery'
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-black'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <FiTruck className="w-6 h-6" />
                      {orderType === 'delivery' && (
                        <span className="w-3 h-3 rounded-full bg-emerald-400" />
                      )}
                    </div>
                    <div>
                      <span className="text-base font-black uppercase font-display block">
                        Delivery a Domicilio
                      </span>
                      <span className="text-xs opacity-75 block mt-0.5 font-medium">
                        Envío rápido a CABA ($1.200)
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('takeaway')}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between ${
                      orderType === 'takeaway'
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-black'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <FiShoppingBag className="w-6 h-6" />
                      {orderType === 'takeaway' && (
                        <span className="w-3 h-3 rounded-full bg-emerald-400" />
                      )}
                    </div>
                    <div>
                      <span className="text-base font-black uppercase font-display block">
                        Retiro Take Away
                      </span>
                      <span className="text-xs opacity-75 block mt-0.5 font-medium">
                        Sin costo · Av. Corrientes 4580
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Form Details */}
              <form onSubmit={handleConfirmOrder} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 block">
                  2. DATOS DEL PEDIDO
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3.5 top-3 text-neutral-400 w-4 h-4" />
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ej: Juan Pérez"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-black focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                      Teléfono WhatsApp *
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3.5 top-3 text-neutral-400 w-4 h-4" />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Ej: 11 5555-0199"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-black focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                {orderType === 'delivery' ? (
                  <div className="space-y-4 pt-2 border-t border-neutral-100">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Calle / Avenida *
                        </label>
                        <input
                          type="text"
                          required={orderType === 'delivery'}
                          value={addressStreet}
                          onChange={(e) => setAddressStreet(e.target.value)}
                          placeholder="Ej: Av. Corrientes"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-4 text-xs font-medium text-black focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                          Altura / Nro *
                        </label>
                        <input
                          type="text"
                          required={orderType === 'delivery'}
                          value={addressNumber}
                          onChange={(e) => setAddressNumber(e.target.value)}
                          placeholder="Ej: 4580"
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-4 text-xs font-medium text-black focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-1">
                        Piso / Depto / Referencia opcional
                      </label>
                      <input
                        type="text"
                        value={addressNotes}
                        onChange={(e) => setAddressNotes(e.target.value)}
                        placeholder="Ej: 4to B · Timbre no anda"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-2.5 px-4 text-xs font-medium text-black focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs space-y-1">
                    <span className="font-bold block text-black">📍 Dirección de Retiro:</span>
                    <p className="text-neutral-700 font-medium">
                      Av. Corrientes 4580, Villa Crespo, Buenos Aires.
                    </p>
                    <p className="text-neutral-500 font-mono text-[11px] pt-1">
                      ⏱️ Tiempo estimado de preparación: 15 a 20 minutos.
                    </p>
                  </div>
                )}

                {/* Payment Selection */}
                <div className="pt-2 border-t border-neutral-100">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                    3. MÉTODO DE PAGO
                  </label>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'mercadopago', label: 'Mercado Pago' },
                      { id: 'efectivo', label: 'Efectivo (10% OFF)' },
                      { id: 'posnet', label: 'Tarjeta / Débito' },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          paymentMethod === pm.id
                            ? 'bg-black text-white border-black shadow-xs'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={items.length === 0}
                  className="w-full py-4 bg-[#E52525] hover:bg-[#CC1E1E] disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <FiSend className="w-4 h-4" />
                  <span>CONFIRMAR PEDIDO VIA WHATSAPP (${finalTotal})</span>
                </button>
              </form>

            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  RESUMEN DE MI PEDIDO
                </span>
                <span className="text-xs font-bold text-black font-mono">
                  {totalItems} ítems
                </span>
              </div>

              {items.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <FiShoppingBag className="w-10 h-10 text-neutral-300 mx-auto" />
                  <p className="text-xs text-neutral-500 font-medium">Tu carrito está vacío.</p>
                  <button
                    onClick={onNavigateToMenu}
                    className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase rounded-full cursor-pointer hover:bg-neutral-800 transition-colors"
                  >
                    Ver el Menú
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  {items.map((item: CartItem) => (
                    <div key={item.burger.id} className="flex items-center justify-between gap-3 py-2 border-b border-neutral-100">
                      <div className="flex items-center gap-3">
                        <img src={item.burger.image} alt={item.burger.name} className="w-12 h-12 object-contain bg-neutral-50 rounded-lg p-1" />
                        <div>
                          <span className="text-xs font-bold text-black block">{item.burger.name}</span>
                          <span className="text-[11px] text-neutral-500 font-mono">${item.burger.price} c/u</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.burger.id, item.quantity - 1)}
                            className="px-2 py-1 text-xs text-black font-bold hover:bg-neutral-100 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.burger.id, item.quantity + 1)}
                            className="px-2 py-1 text-xs text-black font-bold hover:bg-neutral-100 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-bold font-mono text-black w-14 text-right">
                          ${item.burger.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {items.length > 0 && (
                <div className="pt-4 border-t border-neutral-200 space-y-2 text-xs font-medium">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal Productos</span>
                    <span className="font-mono text-black font-bold">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Envío ({orderType === 'delivery' ? 'CABA' : 'Retiro'})</span>
                    <span className="font-mono text-black font-bold">
                      {orderType === 'delivery' ? `$${deliveryFee}` : 'Gratis'}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-black text-black font-display pt-3 border-t border-neutral-200">
                    <span>TOTAL FINAL</span>
                    <span className="tabular-nums font-mono text-[#E52525]">${finalTotal}</span>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
