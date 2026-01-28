import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = () => {
  const [placeholder, setPlaceholder] = useState('');
  const fullText = "Search for Premium Gadgets, Beauty and more...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setPlaceholder(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-grow relative group">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-12 bg-gray-50 border-2 border-black px-12 font-bold text-sm outline-none focus:bg-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-0.5 focus:translate-y-0.5"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    </div>
  );
};
