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
import { TrackOrder } from './components/TrackOrder'; 

// Private Admin Area
import { AdminDashboard } from './components/AdminDashboard';

// Placeholder components (Update these imports when you create the actual files)
const ProductListingPage = () => <div className="p-20 text-center font-bold uppercase italic">Product Listing Coming Soon</div>;
const ProductDetailPage = ({ productId }: { productId: string }) => <div className="p-20 text-center font-bold uppercase italic">Product Detail Coming Soon</div>;

/**
 * PAGE WRAPPER
 * Effectively hides all storefront elements when the URL contains 'admin'.
 * Works with HashRouter by checking both pathname and window.location.hash.
 */
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  // Aggressive check for Admin path
  const isAdminPage = 
    location.pathname.toLowerCase().includes('admin') || 
    window.location.hash.toLowerCase().includes('admin');

  return (
    <>
      {/* Show Header ONLY if NOT in Admin */}
      {!isAdminPage && <Header />}
      
      <main className={isAdminPage ? "w-full" : "min-h-screen"}>
        {children}
      </main>

      {/* Show Storefront Bars ONLY if NOT in Admin */}
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
          {/* STOREFRONT ROUTES */}
          <Route path="/" element={
            <>
              <HeroSlider />
              <ContentArea />
            </>
          } />
          <Route path="/shop" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage productId="" />} />
          <Route path="/track" element={<TrackOrder />} />

          {/* ADMIN HQ ROUTE */}
          <Route path="/admin" element={<AdminDashboard />} />

          {/* 404 - PAGE NOT FOUND */}
          <Route path="*" element={
            <div className="h-screen flex flex-col items-center justify-center bg-white text-black">
              <h1 className="text-9xl font-black italic tracking-tighter">404</h1>
              <p className="font-bold uppercase tracking-widest mt-[-20px] bg-[#FFD700] px-4 py-1">
                Page Not Found
              </p>
            </div>
          } />
        </Routes>
      </PageWrapper>
    </Router>
  );
}

export default App;
