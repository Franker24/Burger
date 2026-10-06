import React, { createContext, useContext, useState, useEffect } from 'react';
import { BurgerItem, CartItem } from '../types/burger';

interface CartContextType {
  items: CartItem[];
  addToCart: (burger: BurgerItem) => void;
  removeFromCart: (burgerId: string) => void;
  updateQuantity: (burgerId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOrderDrawerOpen: boolean;
  openOrderDrawer: () => void;
  closeOrderDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('brasa_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('brasa_cart', JSON.stringify(items));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }, [items]);

  const addToCart = (burger: BurgerItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.burger.id === burger.id);
      if (existing) {
        return prev.map((item) =>
          item.burger.id === burger.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { burger, quantity: 1 }];
    });
    setIsOrderDrawerOpen(true);
  };

  const removeFromCart = (burgerId: string) => {
    setItems((prev) => prev.filter((item) => item.burger.id !== burgerId));
  };

  const updateQuantity = (burgerId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(burgerId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.burger.id === burgerId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.burger.price * item.quantity, 0);

  const openOrderDrawer = () => setIsOrderDrawerOpen(true);
  const closeOrderDrawer = () => setIsOrderDrawerOpen(false);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOrderDrawerOpen,
        openOrderDrawer,
        closeOrderDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
