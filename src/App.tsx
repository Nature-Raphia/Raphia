import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ShowroomPage from './pages/Showroom';
import AtelierPage from './pages/Atelier';
import B2B from './pages/B2B';
import ContactPage from './pages/ContactPage';
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showroom" element={<ShowroomPage />} />
          <Route path="/atelier" element={<AtelierPage />} />
          <Route path="/b2b" element={<B2B />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <CartSidebar />
      <WhatsAppButton />
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </>
  );
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => (
  <LanguageProvider>
    <CartProvider>
      <BrowserRouter>
        <AppContent />
        <ScrollToTop />
      </BrowserRouter>
    </CartProvider>
  </LanguageProvider>
);

export default App;
