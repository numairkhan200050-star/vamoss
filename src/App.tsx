import React, { useState } from 'react';
import { FlashSaleBar } from './components/FlashSaleBar';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider'; // Assuming you have this
import { SpotlightGrid } from './components/SpotlightGrid';
import { SpotlightSidebar } from './components/SpotlightSidebar';
import { ProductRow } from './components/ProductRow';
import { ReviewSlider } from './components/ReviewSlider';
import { Footer } from './components/Footer';

function App() {
  // Check if we are on the Home Page
  const isHomePage = window.location.pathname === '/';

  // These would ideally come from your Supabase 'settings' table
  const adminSettings = {
    homeSpotlightCollection: 'summer-sale',
    innerSpotlightCollection: 'trending-now',
    showReviews: true,
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* 1. TOP TOP BANNER (Flash Sale with Timer) */}
      <FlashSaleBar />

      {/* 2, 3, 4. HEADER (Includes Logo, Categories, FOMO, and Collapsible Search) */}
      <Header />

      <main className="max-w-[1440px] mx-auto">
        {isHomePage ? (
          /* --- HOME PAGE LAYOUT --- */
          <div className="space-y-16">
            <HeroSlider />

            {/* SPOTLIGHT 1: The 4-Box Grid (Controlled by Admin) */}
            <section className="px-4">
               <h2 className="text-sm font-black uppercase tracking-[0.2em] mb-6 border-l-4 border-[#D4AF37] pl-3">
                 Featured Collections
               </h2>
               <SpotlightGrid collectionSlug={adminSettings.homeSpotlightCollection} />
            </section>

            {/* MAIN PRODUCT ROWS */}
            <div className="px-4 space-y-20">
              <ProductRow title="New Arrivals" />
              <ProductRow title="Trending Now" />
            </div>
          </div>
        ) : (
          /* --- INNER PAGES LAYOUT (Category/Product Pages) --- */
          <div className="flex flex-col lg:flex-row gap-8 px-4 py-10">
            {/* Sidebar with SPOTLIGHT 2 (The Rotator) */}
            <aside className="w-full lg:w-1/4">
               <h2 className="text-xs font-black uppercase mb-4 tracking-widest">Hot Deals</h2>
               <SpotlightSidebar collectionSlug={adminSettings.innerSpotlightCollection} />
            </aside>

            {/* Main Category Content */}
            <div className="w-full lg:w-3/4">
               <ProductRow title="Category Results" />
            </div>
          </div>
        )}

        {/* REVIEWS SECTION: Shown right above shipping if enabled in Admin */}
        {adminSettings.showReviews && (
          <div className="mt-20">
            <ReviewSlider />
          </div>
        )}

        {/* SHIPPING/TRUST BAR (Right above footer) */}
        <div className="mt-10 py-10 border-t border-gray-100 bg-gray-50/50">
           {/* Your Shipping/TrustBar Component goes here */}
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default App;
