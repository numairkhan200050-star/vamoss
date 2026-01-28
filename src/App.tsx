import React, { useState } from 'react';
import { FlashSaleBar } from './components/FlashSaleBar';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider'; 
import { SpotlightGrid } from './components/SpotlightGrid';
import { SpotlightSidebar } from './components/SpotlightSidebar';
import { ProductRow } from './components/ProductRow';
import { ReviewSlider } from './components/ReviewSlider';

// FIXED: Using a safe way to import Footer to avoid the build error
import Footer from './components/Footer'; 

function App() {
  const isHomePage = window.location.pathname === '/';

  // These settings will eventually be linked to your Supabase Admin Panel
  const [adminSettings] = useState({
    homeSpotlightCollection: 'july-summer-sale', // The collection you made in admin
    innerSpotlightCollection: 'trending-deals',
    showReviews: false, // Set to true in Admin once you have reviews
  });

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* 1. TOP TOP BANNER (Flash Sale) */}
      <FlashSaleBar />

      {/* 2, 3, 4. THE HEADER SYSTEM 
          Inside this Header:
          - (2) Menu Button/Logo
          - (3) FOMO center links
          - (4) Collapsible Search Bar with Chevron
      */}
      <Header />

      <main className="max-w-[1440px] mx-auto px-4">
        {isHomePage ? (
          /* --- HOME PAGE LAYOUT --- */
          <div className="space-y-16 py-8">
            <HeroSlider />

            {/* SPOTLIGHT 1: The Dynamic 4-Box Grid */}
            <section>
               <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 border-l-4 border-[#D4AF37] pl-3">
                 Featured Collections
               </h2>
               <SpotlightGrid collectionSlug={adminSettings.homeSpotlightCollection} />
            </section>

            {/* PRODUCT ROWS */}
            <div className="space-y-20 pb-20">
              <ProductRow title="New Arrivals" />
              <ProductRow title="Summer Essentials" />
            </div>
          </div>
        ) : (
          /* --- ALL OTHER PAGES (INNER) --- */
          <div className="flex flex-col lg:flex-row gap-8 py-10">
            {/* Sidebar with SPOTLIGHT 2 (The Rotator) */}
            <aside className="w-full lg:w-1/4">
               <h2 className="text-xs font-black uppercase mb-4 tracking-widest bg-black text-white p-2 text-center">
                 Hot Deals
               </h2>
               <SpotlightSidebar collectionSlug={adminSettings.innerSpotlightCollection} />
            </aside>

            {/* Main Page Content */}
            <div className="w-full lg:w-3/4">
               <ProductRow title="Explore Products" />
            </div>
          </div>
        )}

        {/* REVIEWS: Only appears when you enable it in Admin */}
        {adminSettings.showReviews && (
          <div className="mt-10 border-t-2 border-black pt-10">
            <ReviewSlider />
          </div>
        )}

        {/* TRUST/SHIPPING BAR (Just above footer) */}
        <div className="mt-20 border-t border-gray-100 py-10">
           {/* Add your ShippingBar component here if separate */}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
