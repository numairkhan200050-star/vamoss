/* Header.tsx */
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
      {/* 1. Top Ad Banner - Hidden on mobile/tablet (md:block) */}
      <div className="hidden md:block">
        <TopBanner />
      </div>

      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-[90]">
        <div className="max-w-[1440px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 flex-shrink-0">
             <HomeMenu /> 
             <div className="scale-75 md:scale-90 origin-left">
               <Logo /> 
             </div>
          </div>

          {/* Middle: FOMO only visible on Desktop here */}
          <div className="flex-1 flex flex-col items-center gap-1">
            <div className="hidden md:block">
              <FomoSection />
            </div>
            <div className="w-full max-w-md">
               <FloatingSearch />
            </div>
          </div>

          {/* Right: Trust Badge - Hidden on mobile/tablet (hidden md:block) */}
          <div className="hidden md:block flex-shrink-0">
            <TrustBadge />
          </div>
          
        </div>
      </header>

      {/* 2. Mobile FOMO Popup - Only renders/logic applies for mobile */}
      <div className="md:hidden">
        <FomoSection isMobilePopup={true} />
      </div>
    </>
  );
};

export default Header;
