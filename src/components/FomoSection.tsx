import React, { useState, useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface FomoProps {
  isMobilePopup?: boolean;
}

const FomoSection: React.FC<FomoProps> = ({ isMobilePopup = false }) => {
  const [isVisible, setIsVisible] = useState(!isMobilePopup); 
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  const [fomoData] = useState({
    isActive: true, // Controlled by Admin Portal
    text: "LIMITED TIME DEALS",
    targetDate: new Date(Date.now() + 45 * 60000).getTime(),
    buttonText: "SHOP NOW",
    buttonLink: "/collections/deals"
  });

  const [time, setTime] = useState({ hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    if (!isMobilePopup) return;
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 40 && !hasBeenClosed) {
        setIsVisible(true);
      } else if (scrollPercent < 10 && isMobilePopup) {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobilePopup, hasBeenClosed]);

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
    <div className={`flex items-center gap-3 md:gap-6 ${isMobilePopup ? 'flex-col pt-8 pb-5 px-5' : ''}`}>
      {isMobilePopup && (
        <button 
          onClick={() => { setIsVisible(false); setHasBeenClosed(true); }}
          className="absolute top-3 right-3 p-1.5 bg-black/5 hover:bg-black/10 rounded-full transition-colors"
        >
          <X size={18} className="text-black" />
        </button>
      )}
      
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p style={comicSansBold} className="text-[10px] text-gray-500 uppercase tracking-[0.2em] leading-none">DON'T MISS OUT</p>
          <p style={comicSansBold} className="text-sm md:text-sm text-black uppercase tracking-tight mt-1 leading-none">{fomoData.text}</p>
        </div>
        <div className="h-8 w-[1.5px] bg-black/20" />
      </div>

      <div className="flex items-center gap-2">
        <TimeUnit label="HRS" value={time.hours} />
        <span className="font-black text-black text-xl">:</span>
        <TimeUnit label="MIN" value={time.mins} />
        <span className="font-black text-black text-xl">:</span>
        <TimeUnit label="SEC" value={time.secs} />
      </div>

      {/* FIXED BUTTON: Reverted to White bg, Black border style */}
      <a 
        href={fomoData.buttonLink}
        style={comicSansRegular}
        className="group w-full md:w-auto flex items-center justify-center gap-2 bg-white text-black border-2 border-black py-3 md:py-2 px-8 rounded-xl text-[13px] md:text-[14px] transition-all hover:bg-black hover:text-white uppercase tracking-[0.15em] active:scale-95 shadow-sm"
      >
        <span>{fomoData.buttonText}</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );

  if (isMobilePopup) {
    return (
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-[360px] 
                      bg-white/80 backdrop-blur-xl border border-white/40
                      shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2.5rem] 
                      animate-in fade-in slide-in-from-bottom-12 duration-700 ease-out">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-black/10 rounded-full mt-2" />
        {Content}
      </div>
    );
  }

  return Content;
};

export default FomoSection;
