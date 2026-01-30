import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const FomoSection = () => {
  // Define Comic Sans styles from ProductCard
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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = fomoData.targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTime({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [fomoData.targetDate]);

  if (!fomoData.isActive) return null;

  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center justify-center bg-black rounded-sm w-[50px] h-[55px] shadow-md">
      <span className="text-white text-xl font-black font-mono leading-none">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[9px] uppercase font-black text-blue-400 mt-1 tracking-tighter">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p 
            style={comicSansBold} 
            className="text-[10px] text-gray-400 uppercase tracking-widest leading-none whitespace-nowrap"
          >
            DON'T MISS OUT
          </p>
          <p 
            style={comicSansBold} 
            className="text-sm text-black uppercase tracking-tight mt-1 leading-none whitespace-nowrap"
          >
            {fomoData.text}
          </p>
        </div>
        <div className="h-10 w-[2px] bg-black opacity-100" />
      </div>

      <div className="flex items-center gap-2">
        <TimeUnit label="HRS" value={time.hours} />
        <span className="font-black text-black text-xl">:</span>
        <TimeUnit label="MIN" value={time.mins} />
        <span className="font-black text-black text-xl">:</span>
        <TimeUnit label="SEC" value={time.secs} />
      </div>

      {/* Button using ProductCard styling and Comic Sans Regular */}
      <a 
        href={fomoData.buttonLink}
        style={comicSansRegular}
        className="group flex items-center justify-center gap-2 bg-white text-black border-2 border-black px-6 py-2 rounded-lg text-[14px] transition-all hover:bg-black hover:text-white uppercase tracking-wider active:scale-95 shadow-sm"
      >
        <span>{fomoData.buttonText}</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};

export default FomoSection;
