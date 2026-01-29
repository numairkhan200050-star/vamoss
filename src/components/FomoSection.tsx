import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const FomoSection = () => {
  const [fomoData] = useState({
    isActive: true,
    text: "Limited Time Deals",
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
        mins: Math.floor((distance % (1000 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [fomoData.targetDate]);

  if (!fomoData.isActive) return null;

  // Segmented Unit: Pure Black background with Bold White text
  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center justify-center bg-black rounded-sm px-2 py-1 min-w-[42px]">
      <span className="text-white text-base font-black font-mono leading-none">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[7px] uppercase font-bold text-gray-400 mt-0.5 tracking-tighter">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex items-center gap-4">
      {/* 1. Left Side: Bold Label */}
      <div className="text-right border-r-2 border-black pr-4">
        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-tight">
          Don't Miss Out
        </p>
        <p className="text-xs font-black text-black uppercase tracking-tight leading-tight">
          {fomoData.text}
        </p>
      </div>

      {/* 2. Middle: The Black Box Timer */}
      <div className="flex items-center gap-1">
        <TimeUnit label="Hrs" value={time.hours} />
        <span className="font-black text-black">:</span>
        <TimeUnit label="Min" value={time.mins} />
        <span className="font-black text-black">:</span>
        <TimeUnit label="Sec" value={time.secs} />
      </div>

      {/* 3. Right Side: Minimalist Shop Button */}
      <a 
        href={fomoData.buttonLink}
        className="group ml-2 flex items-center gap-2 bg-white border-2 border-black px-4 py-1.5 hover:bg-black hover:text-white transition-all duration-300"
      >
        <span className="text-[10px] font-black uppercase tracking-widest">
          {fomoData.buttonText}
        </span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};

export default FomoSection;
