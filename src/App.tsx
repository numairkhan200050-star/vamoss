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

// Import Your Real Components
import { ProductListingPage } from './components/ProductListingPage'; // Make sure path is correct
import { ProductDetailPage } from './components/ProductDetailPage'; // Make sure path is correct
import { Checkout } from './components/Checkout'; // Our new Checkout component
import { AdminDashboard } from './components/AdminDashboard';

// Placeholder for Track Order (if you haven't built it yet)
const TrackOrder = () => <div className="p-20 text-center font-bold uppercase italic">Tracking Coming Soon</div>;

/**
 * PAGE WRAPPER
 * Effectively hides all storefront elements when the URL contains 'admin'.
 */
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const isAdminPage = 
    location.pathname.toLowerCase().includes('admin') || 
    window.location.hash.toLowerCase().includes('admin');

  return (
    <>
      {!isAdminPage && <Header />}
      
      <main className={isAdminPage ? "w-full" : "min-h-screen"}>
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
          {/* STOREFRONT ROUTES */}
          <Route path="/" element={
            <>
              <HeroSlider />
              <ContentArea />
            </>
          } />
          
          {/* Shop & Product Routes */}
          <Route path="/shop" element={<ProductListingPage />} />
          
          {/* Note: We use :slug because your ProductDetail uses useParams().slug */}
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          
          {/* NEW: Checkout Route */}
          <Route path="/checkout" element={<Checkout />} />
          
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
