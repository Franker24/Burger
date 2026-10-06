import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandRibbonDivider } from './components/BrandRibbonDivider';
import { BurgerCarousel } from './components/BurgerCarousel';
import { MenuBanner } from './components/MenuBanner';
import { ToppingsSection } from './components/ToppingsSection';
import { MenuPage } from './components/MenuPage';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CheckoutPage } from './components/CheckoutPage';
import { Footer } from './components/Footer';
import { OrderDrawer } from './components/OrderDrawer';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'menu' | 'checkout'>('home');

  const navigateToMenu = () => {
    setCurrentView('menu');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const navigateToCheckout = () => {
    setCurrentView('checkout');
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const navigateToHome = (sectionId?: string) => {
    setCurrentView('home');
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const yOffset = -70;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-black selection:bg-black selection:text-white relative font-sans">
        {/* Sticky Navbar */}
        <Navbar
          currentView={currentView}
          onNavigateToMenu={navigateToMenu}
          onNavigateToHome={navigateToHome}
          onNavigateToCheckout={navigateToCheckout}
        />

        {currentView === 'home' && (
          <main>
            {/* 1. Hero Section */}
            <Hero onOpenMenu={navigateToMenu} />

            {/* Kinetic Streetwear Brand Ribbon Divider */}
            <BrandRibbonDivider />

            {/* 3. Product Carousel */}
            <BurgerCarousel />

            {/* 4. Menu Banner */}
            <MenuBanner onOpenMenu={navigateToMenu} />

            {/* 5. Toppings Section */}
            <ToppingsSection />

            {/* 6. About Section */}
            <AboutSection />

            {/* 7. Contact Section */}
            <ContactSection />
          </main>
        )}

        {currentView === 'menu' && (
          <main>
            {/* Dedicated Menu Page */}
            <MenuPage
              onBackToHome={() => navigateToHome('inicio')}
              onNavigateToCheckout={navigateToCheckout}
            />
          </main>
        )}

        {currentView === 'checkout' && (
          <main>
            {/* Dedicated Checkout/Order Page (Delivery vs Take Away) */}
            <CheckoutPage
              onBackToHome={() => navigateToHome('inicio')}
              onNavigateToMenu={navigateToMenu}
            />
          </main>
        )}

        {/* Footer */}
        <Footer
          onNavigateToMenu={navigateToMenu}
          onNavigateToHome={navigateToHome}
          onNavigateToCheckout={navigateToCheckout}
        />

        {/* Working Order Drawer / Cart Checkout */}
        <OrderDrawer />
      </div>
    </CartProvider>
  );
}
