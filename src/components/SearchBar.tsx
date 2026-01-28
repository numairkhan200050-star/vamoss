import React, { useState, useEffect } from 'react';

const placeholders = [
  "Search for Luxury Watches...",
  "Search for Kitchen Gadgets...",
  "Search for New Arrivals...",
  "Search for Hair Dryer Brush..."
];

export const SearchBar = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % placeholders.length;
      const fullText = placeholders[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 80 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <div className="relative w-full">
      <input 
        type="text"
        placeholder={text}
        className="w-full p-3 pl-4 border-2 border-black font-bold outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:translate-x-1 focus:translate-y-1 focus:shadow-none transition-all"
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
        <span className="animate-pulse border-r-2 border-black h-5 inline-block"></span>
      </div>
    </div>
  );
};
