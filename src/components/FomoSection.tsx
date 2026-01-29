import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight } from 'lucide-react';

const FomoSection = () => {
  // These states will eventually be powered by your Admin Portal/Supabase
  const [fomoData, setFomoData] = useState({
    isActive: true, // Master toggle from Admin
    text: "LIMITED TIME DEALS",
    targetDate: new Date(Date.now() + 45 * 60000).getTime(), // 45 mins from now
    buttonText: "SHOP NOW",
    buttonLink: "/collections/short-deals"
  });

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!fomoData.isActive) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = fomoData.targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("00:00:00");
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [fomoData]);

  if (!fomoData.isActive) return <div className="flex-1" />; // Keeps layout space clean

  return (
    <div className="flex-1 flex items-center justify-center gap-4 animate-pulse">
      {/* 1. The FOMO Text */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
          {fomoData.text}
        </span>
      </div>

      {/* 2. The Live Timer */}
      <div className="flex items-center gap-1.5 bg-black text-[#FFD700] px-3 py-1 rounded-sm border border-[#FFD700]">
        <Timer size={14} />
        <span className="font-mono font-bold text-sm tracking-tighter">
          {timeLeft}
        </span>
      </div>

      {/* 3. The Shop Now Button */}
      <a 
        href={fomoData.buttonLink}
        className="group flex items-center gap-1 bg-white border-2 border-black px-4 py-1.5 hover:bg-black hover:text-white transition-all duration-300"
      >
        <span className="text-[11px] font-black uppercase tracking-tight">
          {fomoData.buttonText}
        </span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
};

export default FomoSection;
