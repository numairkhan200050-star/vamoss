import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export const FlashSaleBar = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 45,
    seconds: 0,
  });

  // Countdown Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return { hours: 2, minutes: 0, seconds: 0 }; // Reset for demo
        }
        
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }

        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="w-full bg-[#D4AF37] border-b-2 border-black py-2 px-4 flex flex-wrap items-center justify-center gap-4 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-2">
        <Timer size={18} className="animate-bounce" />
        <span className="font-black uppercase italic text-xs md:text-sm tracking-tighter">
          Flash Sale Ending In:
        </span>
      </div>
      
      <div className="flex gap-2 font-mono font-black text-lg md:text-xl">
        <div className="bg-black text-white px-2 py-0.5 rounded border border-black">{format(timeLeft.hours)}</div>
        <span className="text-black">:</span>
        <div className="bg-black text-white px-2 py-0.5 rounded border border-black">{format(timeLeft.minutes)}</div>
        <span className="text-black">:</span>
        <div className="bg-black text-white px-2 py-0.5 rounded border border-black">{format(timeLeft.seconds)}</div>
      </div>

      <button className="bg-black text-white px-4 py-1 text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all border border-black">
        Shop Deals
      </button>
    </div>
  );
};
