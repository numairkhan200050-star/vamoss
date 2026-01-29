import React from 'react';

const Logo = () => {
  return (
    <div className="flex flex-col items-start select-none cursor-pointer group">
      {/* Main Logo Text */}
      <div className="flex items-baseline leading-none">
        {/* KEVIN: Tilted Right (Italic) */}
        <span className="text-5xl font-black italic tracking-tighter text-black uppercase">
          KEVIN
        </span>
        
        {/* The Animated 11: Tilted LEFT (Skewed opposite to KEVIN) */}
        <span className="inline-block text-5xl font-black text-[#FFD700] ml-1 
                       transition-all duration-500 ease-in-out 
                       [transform:skewX(15deg)] group-hover:[transform:skewX(0deg)]">
          11
        </span>
      </div>

      {/* Sub-header text */}
      <div className="mt-1 flex items-center gap-2">
        <div className="h-[2px] w-8 bg-[#FFD700]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 whitespace-nowrap">
          Premium Collection | Pakistan
        </span>
      </div>
    </div>
  );
};

export default Logo;
