import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

export const OrderModal = ({ product, isOpen, onClose }: any) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen || !product) return null;

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*NEW ORDER - KEVIN11*\n\n` +
                    `*Product:* ${product.title}\n` +
                    `*Price:* Rs. ${product.base_price}\n` +
                    `*Customer:* ${customerName}\n` +
                    `*Address:* ${address}\n\n` +
                    `Please confirm my order.`;

    const whatsappUrl = `https://wa.me/923282519507?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-white w-full max-w-md border-t-8 border-[#D4AF37] relative shadow-2xl animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-black hover:text-[#D4AF37] transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-black mb-2">Checkout</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-6">Confirm your details for WhatsApp</p>

          <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 mb-8">
            <img src={product.main_image_url} alt={product.title} className="w-16 h-16 object-cover border border-gray-200" />
            <div>
              <p className="font-black text-black uppercase text-sm italic">{product.title}</p>
              <p className="text-[#D4AF37] font-black">Rs. {product.base_price}</p>
            </div>
          </div>

          <form onSubmit={handleWhatsAppOrder} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
              <input 
                required 
                type="text" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border-b-2 border-gray-200 p-3 outline-none focus:border-[#D4AF37] transition-colors font-bold" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Delivery Address (Karachi/Pakistan)</label>
              <textarea 
                required 
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border-b-2 border-gray-200 p-3 outline-none focus:border-[#D4AF37] transition-colors font-bold resize-none" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-black text-[#D4AF37] font-black py-5 uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-xl"
            >
              <Send size={18} />
              Place Order via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
