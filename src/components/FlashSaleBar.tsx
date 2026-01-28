import React, { useState, useEffect } from 'react';
import { Timer, Zap, ChevronRight } from 'lucide-react';

export const FlashSaleBar = () => {
  // Timer state - in a real app, this could be synced with Admin settings
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 45,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return { hours: 0, minutes: 45, seconds: 0 }; // Reset for demo
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
    <div className="w-full bg-[#D4AF37] border-b-2 border-black py-2 px-4 flex flex-wrap items-center justify-center gap-4 md:gap-8 z-[60] relative overflow-hidden">
      {/* Moving Background Text Effect (Subtle Modern Touch) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center overflow-hidden whitespace-nowrap text-3xl font-black italic uppercase">
        Flash Sale • Limited Time • Big Savings • Flash Sale • Limited Time • Big Savings 
      </div>

      {/* Sale Headline */}
      <div className="flex items-center gap-2 relative z-10">
        <Zap size={18} className="fill-black animate-pulse" />
        <span className="font-black uppercase italic text-xs md:text-sm tracking-tighter">
          Exclusive Flash Sale: <span className="text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">Up to 50% OFF</span>
        </span>
      </div>

      {/* The Countdown Clock */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex items-center gap-1.5">
          <Timer size={16} className="text-black/70" />
          <div className="flex gap-1 font-mono font-black text-lg">
            <div className="bg-black text-white px-2 py-0.5 rounded shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">{format(timeLeft.hours)}</div>
            <span className="text-black">:</span>
            <div className="bg-black text-white px-2 py-0.5 rounded shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">{format(timeLeft.minutes)}</div>
            <span className="text-black">:</span>
            <div className="bg-black text-white px-2 py-0.5 rounded shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">{format(timeLeft.seconds)}</div>
          </div>
        </div>
        
        {/* Call to Action Link */}
        <button className="hidden sm:flex items-center gap-1 bg-black text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full hover:bg-white hover:text-black transition-all">
          Shop Now <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
};
