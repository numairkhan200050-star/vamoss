import React from 'react';

const Logo = () => {
  return (
    <div className="flex flex-col items-start select-none cursor-pointer group">
      {/* Main Logo Text */}
      <div className="flex items-baseline leading-none">
        <span className="text-5xl font-black italic tracking-tighter text-black uppercase">
          KEVIN
        </span>
        
        {/* The Animated 11 */}
        <span className="inline-block text-5xl font-black italic text-[#FFD700] ml-1 transition-transform duration-500 ease-in-out group-hover:rotate-0 group-hover:not-italic">
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
