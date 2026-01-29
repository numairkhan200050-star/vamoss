import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const FomoSection = () => {
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
        mins: Math.floor((distance % (1000 * 60)) / (1000 * 60)),
        secs: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [fomoData.targetDate]);

  if (!fomoData.isActive) return null;

  // Segmented Unit: Made the labels slightly larger and brighter (blue-gray) for readability
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
      {/* Left Text with the vertical Divider Bar */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
            DON'T MISS OUT
          </p>
          <p className="text-sm font-black text-black uppercase tracking-tight mt-1 leading-none">
            {fomoData.text}
          </p>
        </div>
        <div className="h-10 w-[2px] bg-black opacity-100" /> {/* The divider from your pic */}
      </div>

      {/* Middle: The High-Readability Black Box Timer */}
      <div className="flex items-center gap-2">
        <TimeUnit label="HRS" value={time.hours} />
        <span className="font-black text-black text-xl">:</span>
        <TimeUnit label="MIN" value={time.mins} />
        <span className="font-black text-black text-xl">:</span>
        <TimeUnit label="SEC" value={time.secs} />
      </div>

      {/* Right: The Bordered Shop Now Button */}
      <a 
        href={fomoData.buttonLink}
        className="group flex items-center gap-3 bg-white border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        <span className="text-[12px] font-black uppercase tracking-widest">
          {fomoData.buttonText}
        </span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};

export default FomoSection;
