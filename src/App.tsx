import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Atelier from './components/Atelier';
import Showroom from './components/Showroom';
import RSE from './components/RSE';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import WhatsAppButton from './components/WhatsAppButton';
import AdminPanel from './pages/AdminPanel';

const AppContent: React.FC = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <>
      <Navbar onAdminClick={() => setShowAdmin(true)} />
      <main>
        <Hero />
        <Showroom />
        <Atelier />


        <RSE />
        <Contact />
      </main>
      <Footer />
      <CartSidebar />
      <WhatsAppButton />
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <CartProvider>
      <AppContent />
    </CartProvider>
  </LanguageProvider>
);

export default App;
