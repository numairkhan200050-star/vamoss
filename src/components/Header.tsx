import React from 'react';
import TopBanner from './TopBanner';
import HomeMenu from './HomeMenu';
import FomoSection from './FomoSection';
import Logo from './Logo';
import TrustBadge from './TrustBadge';
import FloatingSearch from './FloatingSearch';

const Header = () => {
  return (
    <>
      {/* 1. The Ad Banner (Stays at the very top) */}
      <TopBanner />

      {/* Main Header Wrapper */}
      <header className="w-full bg-white border-b-4 border-black sticky top-0 z-[90]">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between gap-8">
          
          {/* Left Section: Component #2 (Menu & Home) */}
          <div className="flex-shrink-0">
            <HomeMenu />
          </div>

          {/* Middle Section: Component #3 (FOMO) */}
          {/* flex-1 allows this to take up the middle space as requested */}
          <div className="flex-1 flex justify-center">
            <FomoSection />
          </div>

          {/* Right Section: Component #7 (Trust Badge) */}
          <div className="flex-shrink-0">
            <TrustBadge />
          </div>
        </div>
      </header>

      {/* Brand Identity Section: Component #6 (Logo with rotating 11) */}
      {/* This sits just below the main navigation bar as per your drawing */}
      <section className="w-full bg-gray-50 py-8 px-10 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <Logo />
        </div>
      </section>

      {/* Component #4: Floating Search Bar */}
      {/* This is placed outside the header flow so it can float over the content while scrolling */}
      <FloatingSearch />
    </>
  );
};

export default Header;
