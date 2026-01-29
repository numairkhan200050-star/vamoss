import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Search, ChevronDown, X, ArrowRight, Loader2 } from 'lucide-react';

const FloatingSearch = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Typing Animation States
  const [placeholderText, setPlaceholderText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Search for 5-in-1 Hair Dryer...",
    "Looking for Men's Trimmers?",
    "Find New Arrivals...",
    "Search 'Premium Collection'..."
  ];

  // 1. TYPING ANIMATION LOGIC
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setPlaceholderText(prev => prev + currentPhrase[charIndex]);
        setCharIndex(prev => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setPlaceholderText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  // 2. SUPABASE SEARCH LOGIC
  useEffect(() => {
    const searchProducts = async () => {
      if (inputValue.length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      const { data } = await supabase
        .from('products')
        .select('id, title, main_image_url, price_now, slug')
        .ilike('title', `%${inputValue}%`)
        .limit(4);

      if (data) setResults(data);
      setLoading(false);
    };

    const timer = setTimeout(() => {
      searchProducts();
    }, 400);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <div className={`fixed bottom-10 right-10 z-[99] transition-all duration-500 ease-in-out ${isCollapsed ? 'w-14' : 'w-80 md:w-96'}`}>
      
      {/* SEARCH RESULTS DROPDOWN (Above the bar) */}
      {!isCollapsed && results.length > 0 && (
        <div className="absolute bottom-full right-0 mb-4 w-full bg-white border-4 border-black shadow-[8px_-8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          <div className="p-2 bg-black text-[#FFD700] text-[9px] font-black uppercase tracking-widest">Matches Found</div>
          {results.map((item) => (
            <a
              key={item.id}
              href={`/product/${item.slug}`}
              className="flex items-center gap-3 p-3 border-b-2 border-gray-100 hover:bg-gray-50 transition-colors group"
            >
              <img src={item.main_image_url} className="w-10 h-10 border-2 border-black rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase line-clamp-1">{item.title}</p>
                <p className="text-xs font-bold text-gray-500">Rs. {item.price_now}</p>
              </div>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          ))}
        </div>
      )}

      {/* THE MAIN BAR */}
      <div className="relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {!isCollapsed ? (
          <div className="flex items-center p-2">
            {loading ? <Loader2 size={20} className="ml-2 animate-spin text-gray-400" /> : <Search size={20} className="ml-2 text-gray-400" />}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholderText}
              className="w-full p-3 outline-none font-bold text-sm placeholder:italic placeholder:text-gray-300"
            />
            {inputValue && (
              <button onClick={() => {setInputValue(""); setResults([]);}} className="p-1 hover:bg-gray-100 mr-2">
                <X size={16} />
              </button>
            )}
          </div>
        ) : (
          <button 
            onClick={() => setIsCollapsed(false)}
            className="w-full h-14 flex items-center justify-center bg-black text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors"
          >
            <Search size={24} />
          </button>
        )}

        {/* Small Collapse Arrow */}
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            className="absolute bottom-0 right-0 bg-black text-white p-1 hover:bg-[#FFD700] hover:text-black transition-colors"
          >
            <ChevronDown size={12} />
          </button>
        )}
      </div>

      {/* Bounce indicator when collapsed */}
      {isCollapsed && (
        <div className="absolute -top-2 -right-2 bg-[#FFD700] w-4 h-4 rounded-full border border-black animate-bounce" />
      )}
    </div>
  );
};

export default FloatingSearch;
