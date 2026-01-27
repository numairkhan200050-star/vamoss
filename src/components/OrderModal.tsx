import React from 'react';
import { X } from 'lucide-react';

export const OrderModal = ({ product, isOpen, onClose }: any) => {
  if (!isOpen || !product) return null;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Kevin11, I want to order: ${product.title} (Rs. ${product.base_price})`;
    window.open(`https://wa.me/923282519507?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-8 border-t-4 border-[#D4AF37] relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-black"><X /></button>
        <h2 className="text-2xl font-black uppercase italic italic mb-4">Complete Order</h2>
        <p className="text-gray-600 mb-6">Product: <span className="font-bold text-black">{product.title}</span></p>
        <form onSubmit={handleOrder} className="space-y-4">
          <input required type="text" placeholder="Your Name" className="w-full border-b-2 border-gray-100 p-3 outline-none focus:border-[#D4AF37]" />
          <input required type="text" placeholder="Full Address" className="w-full border-b-2 border-gray-100 p-3 outline-none focus:border-[#D4AF37]" />
          <button type="submit" className="w-full bg-black text-[#D4AF37] font-black py-4 uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-colors">
            Confirm via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};
