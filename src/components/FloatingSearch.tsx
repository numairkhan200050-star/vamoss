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

  // 1. TYPING ANIMATION LOGIC (KEEPS ORIGINAL FUNCTION)
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

  // 2. SUPABASE SEARCH LOGIC (KEEPS ORIGINAL FUNCTION)
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
    <div className={`fixed bottom-10 right-6 md:right-10 z-[99] transition-all duration-700 ease-in-out ${isCollapsed ? 'w-14' : 'w-[85vw] max-w-[400px]'}`}>
      
      {/* MODERN SEARCH RESULTS DROPDOWN */}
      {!isCollapsed && results.length > 0 && (
        <div className="absolute bottom-full right-0 mb-4 w-full bg-white/90 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-3 bg-black/5 text-black text-[10px] font-black uppercase tracking-[0.2em] px-5">Matches Found</div>
          {results.map((item) => (
            <a
              key={item.id}
              href={`/product/${item.slug}`}
              className="flex items-center gap-3 p-4 border-b border-gray-100/50 hover:bg-black/5 transition-colors group"
            >
              <img src={item.main_image_url} className="w-12 h-12 rounded-xl object-cover border border-gray-200" />
              <div className="flex-1">
                <p className="text-[11px] font-black uppercase line-clamp-1 tracking-tight">{item.title}</p>
                <p className="text-xs font-bold text-gray-500">Rs. {item.price_now}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      )}

      {/* THE MODERN MAIN BAR */}
      <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_15px_35px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden transition-all duration-300">
        {!isCollapsed ? (
          <div className="flex items-center p-2 h-16">
            <div className="ml-3 w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#FFD700]">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholderText}
              className="w-full bg-transparent px-4 outline-none font-bold text-sm placeholder:italic placeholder:text-gray-400"
            />
            {inputValue && (
              <button onClick={() => {setInputValue(""); setResults([]);}} className="p-2 bg-black/5 hover:bg-black/10 rounded-full mr-2 transition-colors">
                <X size={16} />
              </button>
            )}
            
            {/* Collapse Trigger - Clean Circle */}
            <button 
              onClick={() => setIsCollapsed(true)}
              className="p-2 hover:bg-black/5 rounded-full mr-1 transition-colors group"
            >
              <ChevronDown size={18} className="text-gray-400 group-hover:text-black transition-colors" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsCollapsed(false)}
            className="w-full h-14 flex items-center justify-center bg-black text-[#FFD700] hover:scale-105 transition-all active:scale-95"
          >
            <Search size={22} />
          </button>
        )}
      </div>

      {/* Modern Notification Badge when collapsed */}
      {isCollapsed && (
        <div className="absolute -top-1 -right-1 bg-red-500 w-3.5 h-3.5 rounded-full border-2 border-white animate-pulse" />
      )}
    </div>
  );
};

export default FloatingSearch;
