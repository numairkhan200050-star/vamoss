import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      // Using window.scrollY as pageYOffset is technically deprecated
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-28 right-6 z-[98]">
      {isVisible && (
        <button
          onClick={scrollToTop}
          /* SIZE REDUCED: p-4 to p-2.5 */
          className="bg-black text-[#FFD700] p-2.5 rounded-full border-2 border-[#FFD700] shadow-2xl hover:bg-[#FFD700] hover:text-black hover:scale-110 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          {/* ICON REDUCED: size 24 to 20 */}
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
