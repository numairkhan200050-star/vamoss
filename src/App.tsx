// src/App.tsx
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Core Layout & UI
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ServiceBar from './components/ServiceBar'; 
import ReviewTicker from './components/ReviewTicker';

// Public Pages
import HeroSlider from './components/HeroSlider';
import ContentArea from './components/ContentArea';

// Operational Components
import { ProductListingPage } from './components/ProductListingPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { Checkout } from './components/Checkout'; // Import enabled
import { AdminDashboard } from './components/AdminDashboard';
//import { OrderSuccess } from './components/OrderSuccess'; // Optional: Thank you page

// Track Order Component
const TrackOrder = () => (
  <div className="p-20 text-center">
    <h2 className="text-4xl font-black italic uppercase tracking-tighter">Tracking Hub</h2>
    <p className="font-bold text-gray-400 uppercase text-xs tracking-widest mt-2 underline decoration-[#FFD700] decoration-4">
      Under Construction - Link with Supabase Orders Soon
    </p>
  </div>
);

/**
 * PAGE WRAPPER
 * Hides storefront chrome (Header/Footer) when on Admin routes.
 */
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Checks both normal path and HashRouter hash
  const isAdminPage = 
    location.pathname.toLowerCase().includes('/admin') || 
    window.location.hash.toLowerCase().includes('/admin');

  return (
    <>
      {/* Show Storefront UI only if NOT on Admin page */}
      {!isAdminPage && <Header />}
      
      <main className={isAdminPage ? "w-full" : "min-h-screen pt-16 md:pt-20"}>
        {children}
      </main>

      {!isAdminPage && (
        <>
          <ReviewTicker />
          <ServiceBar />
          <Footer />
        </>
      )}
      
      <ScrollToTop />
    </>
  );
};

function App() {
  return (
    <Router>
      <PageWrapper>
        <Routes>
          {/* --- STOREFRONT ROUTES --- */}
          <Route path="/" element={
            <>
              <HeroSlider />
              <ContentArea />
            </>
          } />
          
          <Route path="/shop" element={<ProductListingPage />} />
          
          {/* Product Detail - Uses Slug for SEO & Data Fetching */}
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          
          {/* Checkout - The Final Step */}
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Order Status Tracking */}
          <Route path="/track" element={<TrackOrder />} />
          
          {/* Optional: Order Confirmation Page */}
          <Route path="/order-success/:id" element={<OrderSuccess />} />

          {/* --- ADMIN HQ ROUTE --- */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* --- 404 - ERROR PAGE --- */}
          <Route path="*" element={
            <div className="h-screen flex flex-col items-center justify-center bg-white text-black p-10">
              <div className="relative">
                <h1 className="text-[12rem] font-black italic tracking-tighter leading-none opacity-10">404</h1>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p style={{ fontFamily: '"Comic Sans MS", cursive' }} className="font-black uppercase text-2xl tracking-tighter bg-[#FFD700] px-6 py-2 border-4 border-black shadow-[8px_8px_0px_black] rotate-[-2deg]">
                    Lost in Transit?
                  </p>
                  <button 
                    onClick={() => window.location.href = '#/'}
                    className="mt-6 text-xs font-black uppercase underline decoration-2 hover:text-[#FFD700] transition-colors"
                  >
                    Back to Base
                  </button>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </PageWrapper>
    </Router>
  );
}

export default App;
