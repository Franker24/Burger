import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BURGERS } from '../data/burgers';
import { X, Plus, Minus, Trash2, Send, ShoppingBag } from 'lucide-react';

export const OrderDrawer: React.FC = () => {
  const {
    items,
    isOrderDrawerOpen,
    closeOrderDrawer,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    addToCart,
  } = useCart();

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'takeaway'>('takeaway');
  const [address, setAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  if (!isOrderDrawerOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(price).replace('ARS', '$');
  };

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    let message = `*¡Hola BRASA BURGER! Quiero hacer un pedido:*\n\n`;
    if (customerName) {
      message += `*Cliente:* ${customerName}\n`;
    }
    message += `*Modalidad:* ${deliveryType === 'delivery' ? 'Envío a domicilio' : 'Retiro por local (Villa Crespo)'}\n`;
    if (deliveryType === 'delivery' && address) {
      message += `*Dirección:* ${address}\n`;
    }
    message += `\n*Detalle del pedido:*\n`;

    items.forEach((item) => {
      message += `• ${item.quantity}x ${item.burger.name} — ${formatPrice(item.burger.price * item.quantity)}\n`;
    });

    message += `\n*TOTAL: ${formatPrice(totalPrice)}*\n`;

    if (orderNotes) {
      message += `\n*Notas:* ${orderNotes}\n`;
    }

    message += `\n_Enviado desde el sitio web brasa.burger_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5491155550199?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeOrderDrawer}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-neutral-200 text-black flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="text-xl font-black uppercase tracking-tight font-display text-black">
                TU PEDIDO
              </h2>
            </div>
            <button
              onClick={closeOrderDrawer}
              className="p-2 rounded-lg text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Cerrar pedido"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Empty State */}
            {items.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-base text-black mb-2 font-bold font-display">
                  Tu bandeja está vacía
                </p>
                <p className="text-xs text-neutral-500 mb-6">
                  Elegí una de nuestras smash favoritas para comenzar tu pedido:
                </p>

                {/* Quick Add List */}
                <div className="space-y-3 text-left">
                  {BURGERS.slice(0, 3).map((burger) => (
                    <div
                      key={burger.id}
                      className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-3 hover:border-black/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={burger.image || '/images/burger_clasica.jpg'}
                          alt={burger.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 bg-neutral-200"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-black font-display uppercase">
                            {burger.name}
                          </h4>
                          <span className="text-xs text-neutral-700 font-mono tabular-nums font-semibold">
                            {formatPrice(burger.price)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(burger)}
                        className="px-3 py-1.5 bg-black hover:bg-neutral-800 text-white text-[11px] font-bold uppercase rounded-lg tracking-wider cursor-pointer shadow-xs"
                      >
                        + Agregar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Items List */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-500 pb-2 border-b border-neutral-200 font-mono">
                  <span>ITEMS SELECCIONADOS</span>
                  <button
                    onClick={clearCart}
                    className="text-neutral-500 hover:text-black hover:underline cursor-pointer flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="w-3 h-3" />
                    Vaciar
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.burger.id}
                    className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <img
                        src={item.burger.image || '/images/burger_clasica.jpg'}
                        alt={item.burger.name}
                        className="w-14 h-14 rounded-lg object-cover shrink-0 bg-neutral-200"
                      />
                      <div className="truncate">
                        <h4 className="text-sm font-bold text-black font-display uppercase truncate">
                          {item.burger.name}
                        </h4>
                        <span className="text-xs font-mono text-neutral-700 tabular-nums font-semibold block">
                          {formatPrice(item.burger.price)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-neutral-300 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.burger.id, item.quantity - 1)}
                        className="p-1 text-neutral-600 hover:text-black cursor-pointer"
                        aria-label="Disminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold font-mono px-1 tabular-nums text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.burger.id, item.quantity + 1)}
                        className="p-1 text-neutral-600 hover:text-black cursor-pointer"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Delivery Options */}
                <div className="pt-4 border-t border-neutral-200 space-y-3">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block font-semibold">
                    MODALIDAD DE ENTREGA
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('takeaway')}
                      className={`p-3 rounded-lg border text-xs font-bold uppercase transition-all cursor-pointer ${
                        deliveryType === 'takeaway'
                          ? 'bg-black border-black text-white shadow-sm'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      Take Away (Local)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryType('delivery')}
                      className={`p-3 rounded-lg border text-xs font-bold uppercase transition-all cursor-pointer ${
                        deliveryType === 'delivery'
                          ? 'bg-black border-black text-white shadow-sm'
                          : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      Delivery CABA
                    </button>
                  </div>

                  {/* Customer details inputs */}
                  <div className="space-y-2 pt-2">
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-black placeholder-neutral-400 focus:border-black outline-none"
                    />

                    {deliveryType === 'delivery' && (
                      <input
                        type="text"
                        placeholder="Dirección exacta de entrega (ej: Malabia 450, 4to B)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-black placeholder-neutral-400 focus:border-black outline-none"
                      />
                    )}

                    <input
                      type="text"
                      placeholder="Aclaraciones (ej: sin cebolla en una, salsa aparte...)"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-black placeholder-neutral-400 focus:border-black outline-none"
                    />
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Footer with Subtotal & Checkout */}
          <div className="p-6 border-t border-neutral-200 bg-white space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-500 uppercase font-mono text-xs font-semibold">
                TOTAL ESTIMADO
              </span>
              <span className="text-2xl font-black text-black tabular-nums font-display">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <button
              onClick={handleCheckoutWhatsApp}
              disabled={items.length === 0}
              className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                items.length > 0
                  ? 'bg-black hover:bg-neutral-800 text-white shadow-md active:scale-98'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>FINALIZAR POR WHATSAPP</span>
            </button>

            <p className="text-[11px] text-center text-neutral-500 font-mono">
              Confirmación directa con cocina · Pago en efectivo o transferencia
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
