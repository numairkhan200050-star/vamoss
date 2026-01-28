import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const openWhatsApp = () => {
    // Replace with your actual number
    window.open("https://wa.me/923001112233?text=I'm interested in your products!", "_blank");
  };

  return (
    <button 
      onClick={openWhatsApp}
      className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:scale-110 active:scale-95 transition-all group animate-[wiggle_3s_ease-in-out_infinite]"
    >
      <div className="flex items-center gap-2">
        <MessageCircle size={28} fill="currentColor" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 font-bold uppercase text-xs whitespace-nowrap">
          Order on WhatsApp
        </span>
      </div>
    </button>
  );
};
