import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Core Layout & UI
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ServiceBar from './components/ServiceBar'; 
import ReviewTicker from './components/ReviewTicker';

// Public Pages
import HeroSlider from './components/HeroSlider'; // Removed braces (Default Export)
import ContentArea from './components/ContentArea'; // Removed braces (Default Export)
import { ProductListingPage } from './components/ProductListingPage'; // Keep braces (Named Export)
import { ProductDetailPage } from './components/ProductDetailPage'; 
import { TrackOrder } from './components/TrackOrder'; 

// Private Admin Area
import { AdminDashboard } from './components/AdminDashboard'; 

// Helper component to hide Header/Footer on Admin pages
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Header />}
      <main>{children}</main>
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
          <Route path="/" element={
            <>
              <HeroSlider />
              <ContentArea />
            </>
          } />
          <Route path="/shop" element={<ProductListingPage />} />
          <Route path="/product/:id" element={<ProductDetailPage productId="" />} />
          <Route path="/track" element={<TrackOrder />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<div className="h-screen flex items-center justify-center font-black italic">404 | PAGE NOT FOUND</div>} />
        </Routes>
      </PageWrapper>
    </Router>
  );
}

export default App;
