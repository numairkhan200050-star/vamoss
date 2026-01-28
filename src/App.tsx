import React, { useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { FlashSaleBar } from './components/FlashSaleBar';
import { HeroSlider } from './components/HeroSlider';
import { SpotlightSidebar } from './components/SpotlightSidebar';
import { ProductRow } from './components/ProductRow';
import { ReviewSlider } from './components/ReviewSlider';
import { TrustBar } from './components/TrustBar';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AdminPanel } from './components/AdminPanel';
import { CheckoutForm } from './components/CheckoutForm';

function App() {
  // Simple "Router" - If URL ends in /admin, show Admin Panel
  const isAdmin = window.location.pathname === '/admin';
  const [showCheckout, setShowCheckout] = useState(false);

  if (isAdmin) return <AdminPanel />;

  return (
    <div className="min-h-screen bg-[#fcfcfc] selection:bg-[#D4AF37] selection:text-black">
      {/* 1. TOP SECTION */}
      <AnnouncementBar />
      <Header />
      <FlashSaleBar />

      {/* 2. HERO & MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT SIDEBAR (Spotlight Box) */}
          <aside className="w-full lg:w-1/4 space-y-6">
            <h3 className="font-black uppercase italic text-xs tracking-widest border-l-4 border-black pl-2">
              Promoted Now
            </h3>
            <SpotlightSidebar />
            
            {/* Category Quick Links */}
            <div className="hidden lg:block border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h4 className="font-black text-xs uppercase mb-4">Categories</h4>
              <ul className="space-y-2 text-sm font-bold uppercase italic">
                <li className="hover:text-[#D4AF37] cursor-pointer">→ Luxury Watches</li>
                <li className="hover:text-[#D4AF37] cursor-pointer">→ Hair Care</li>
                <li className="hover:text-[#D4AF37] cursor-pointer">→ Tech Gadgets</li>
              </ul>
            </div>
          </aside>

          {/* RIGHT CONTENT (Slider & Rows) */}
          <div className="w-full lg:w-3/4">
            <HeroSlider />
            
            {/* Dynamic Rows */}
            <ProductRow title="New Arrivals" />
            <ProductRow title="Summer Collection" />
          </div>
        </div>

        {/* 3. CHECKOUT SECTION (Conditional) */}
        {showCheckout && (
          <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="relative w-full max-w-2xl">
              <button 
                onClick={() => setShowCheckout(false)}
                className="absolute -top-10 right-0 text-white font-bold uppercase"
              >
                Close [X]
              </button>
              <CheckoutForm />
            </div>
          </div>
        )}
      </main>

      {/* 4. FOOTER & SOCIAL PROOF */}
      <ReviewSlider />
      <TrustBar />
      
      <footer className="bg-black text-white py-12 px-4 text-center">
        <p className="text-2xl font-black italic tracking-tighter text-[#D4AF37] mb-4">KEVIN11</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-50">
          © 2024 Kevin11 Premium Collection | Pakistan
        </p>
      </footer>

      {/* 5. STICKY ELEMENTS */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
