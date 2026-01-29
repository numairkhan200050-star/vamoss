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
      {/* 1. Top Ad Banner (White/Light) */}
      <TopBanner />

      {/* Main Header Wrapper - All elements in one row now */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-[90]">
        <div className="max-w-[1440px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Component #5 & #6 (Logo integrated like Naheed) */}
          <div className="flex items-center gap-4 flex-shrink-0">
             <HomeMenu /> {/* This is your Home button/menu */}
             <div className="scale-75 origin-left"> {/* Scaling logo slightly to fit row */}
               <Logo /> 
             </div>
          </div>

          {/* Middle: Component #3 & #4 (Search & FOMO) */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <FomoSection />
            <div className="w-full max-w-md">
               <FloatingSearch /> {/* Search is now part of the header, not floating alone */}
            </div>
          </div>

          {/* Right: Component #7 (Trust Badge / Cash on Delivery) */}
          <div className="flex-shrink-0">
            <TrustBadge />
          </div>
          
        </div>
      </header>
    </>
  );
};

export default Header;
