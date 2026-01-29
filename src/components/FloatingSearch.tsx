import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, X } from 'lucide-react';

const FloatingSearch = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [placeholderText, setPlaceholderText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Phrases for the typing animation - Admin can update these later
  const phrases = [
    "Search for 5-in-1 Hair Dryer...",
    "Looking for Men's Trimmers?",
    "Find New Arrivals...",
    "Search 'Premium Collection'..."
  ];

  // Typing Animation Logic
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
        setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  return (
    <div className={`fixed bottom-10 right-10 z-[99] transition-all duration-500 ease-in-out ${isCollapsed ? 'w-14' : 'w-80 md:w-96'}`}>
      <div className="relative bg-white border-4 border-black luxury-shadow-bold overflow-hidden">
        
        {/* Search Content */}
        {!isCollapsed ? (
          <div className="flex items-center p-2">
            <Search size={20} className="ml-2 text-gray-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholderText}
              className="w-full p-3 outline-none font-bold text-sm placeholder:italic placeholder:text-gray-300"
            />
            {inputValue && (
              <button onClick={() => setInputValue("")} className="p-1 hover:bg-gray-100 mr-2">
                <X size={16} />
              </button>
            )}
          </div>
        ) : (
          /* Icon only when collapsed */
          <button 
            onClick={() => setIsCollapsed(false)}
            className="w-full h-14 flex items-center justify-center bg-black text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-colors"
          >
            <Search size={24} />
          </button>
        )}

        {/* The Small Collapse Arrow (Right Bottom Corner) */}
        {!isCollapsed && (
          <button 
            onClick={() => setIsCollapsed(true)}
            className="absolute bottom-0 right-0 bg-black text-white p-1 hover:bg-[#FFD700] hover:text-black transition-colors"
            title="Collapse Search"
          >
            <ChevronDown size={12} />
          </button>
        )}
      </div>

      {/* When collapsed, a tiny 'Up' arrow to show it can be expanded */}
      {isCollapsed && (
        <div className="absolute -top-2 -right-2 bg-[#FFD700] w-4 h-4 rounded-full border border-black animate-bounce" />
      )}
    </div>
  );
};

export default FloatingSearch;
