/* FomoSection.tsx */
import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface FomoProps {
  isMobilePopup?: boolean;
}

const FomoSection: React.FC<FomoProps> = ({ isMobilePopup = false }) => {
  const [isVisible, setIsVisible] = useState(!isMobilePopup); // If not popup, show immediately
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  const [fomoData] = useState({
    isActive: true,
    text: "LIMITED TIME DEALS",
    targetDate: new Date(Date.now() + 45 * 60000).getTime(),
    buttonText: "SHOP NOW",
    buttonLink: "/collections/deals"
  });

  const [time, setTime] = useState({ hours: 0, mins: 0, secs: 0 });

  // 1. SCROLL LOGIC FOR MOBILE POPUP
  useEffect(() => {
    if (!isMobilePopup) return;

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 40 && !hasBeenClosed) {
        setIsVisible(true);
      } else if (scrollPercent < 10 && isMobilePopup) {
        setIsVisible(false); // Hide again if they scroll back to top
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobilePopup, hasBeenClosed]);

  // 2. TIMER LOGIC (Unchanged)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = fomoData.targetDate - now;
      if (distance < 0) { clearInterval(interval); return; }
      setTime({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [fomoData.targetDate]);

  if (!fomoData.isActive || !isVisible) return null;

  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center justify-center bg-black rounded-sm w-[40px] h-[45px] md:w-[50px] md:h-[55px] shadow-md">
      <span className="text-white text-base md:text-xl font-black font-mono leading-none">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[7px] md:text-[9px] uppercase font-black text-blue-400 mt-1 tracking-tighter">
        {label}
      </span>
    </div>
  );

  const Content = (
    <div className={`flex items-center gap-3 md:gap-6 ${isMobilePopup ? 'flex-col p-4' : ''}`}>
      {isMobilePopup && (
        <button 
          onClick={() => { setIsVisible(false); setHasBeenClosed(true); }}
          className="absolute top-2 right-2 p-1 bg-gray-100 rounded-full"
        >
          <X size={16} />
        </button>
      )}
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p style={comicSansBold} className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">DON'T MISS OUT</p>
          <p style={comicSansBold} className="text-xs md:text-sm text-black uppercase tracking-tight mt-1 leading-none">{fomoData.text}</p>
        </div>
        <div className="h-10 w-[2px] bg-black" />
      </div>

      <div className="flex items-center gap-2">
        <TimeUnit label="HRS" value={time.hours} />
        <span className="font-black text-black text-xl">:</span>
        <TimeUnit label="MIN" value={time.mins} />
        <span className="font-black text-black text-xl">:</span>
        <TimeUnit label="SEC" value={time.secs} />
      </div>

      <a 
        href={fomoData.buttonLink}
        style={comicSansRegular}
        className="group flex items-center justify-center gap-2 bg-white text-black border-2 border-black px-6 py-2 rounded-lg text-[12px] md:text-[14px] transition-all hover:bg-black hover:text-white uppercase tracking-wider active:scale-95 shadow-sm"
      >
        <span>{fomoData.buttonText}</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );

  if (isMobilePopup) {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[350px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl animate-in fade-in slide-in-from-bottom-10 duration-500">
        {Content}
      </div>
    );
  }

  return Content;
};

export default FomoSection;
