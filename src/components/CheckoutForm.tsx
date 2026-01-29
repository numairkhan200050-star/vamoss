import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Truck, Phone, MapPin, User, Send, ShieldCheck } from 'lucide-react';

export const CheckoutForm = ({ cartItems, totalAmount }: any) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to generate a Professional Tracking ID
  const generateTrackingId = () => `K11-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validate Pakistani Phone
    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(phone)) return alert("Enter valid 11-digit number (03xxxxxxxxx)");

    setIsSubmitting(true);
    const trackingId = generateTrackingId();

    try {
      // 2. Save to Supabase 'orders' table
      const { error } = await supabase.from('orders').insert([{
        tracking_id: trackingId,
        customer_name: fullName,
        phone: phone,
        address: address,
        city: city,
        total_price: totalAmount,
        status: 'pending', // Default status
        items: cartItems // Stores the list of products bought
      }]);

      if (error) throw error;

      // 3. Trigger WhatsApp Confirmation
      const message = `*ORDER CONFIRMED - KEVIN11*\n\n` +
                      `*Tracking ID:* ${trackingId}\n` +
                      `*Customer:* ${fullName}\n` +
                      `*Amount:* Rs. ${totalAmount}\n` +
                      `*Status:* Pending (Wait for confirmation call)\n\n` +
                      `Thank you for shopping at KEVIN11! We will ship your order to ${city} soon.`;

      const whatsappUrl = `https://wa.me/923282519507?text=${encodeURIComponent(message)}`;
      
      alert(`Order Placed! Your Tracking ID is ${trackingId}. Opening WhatsApp to confirm...`);
      window.open(whatsappUrl, '_blank');
      
    } catch (err) {
      alert("Error placing order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black uppercase italic flex items-center gap-3">
          <Truck size={32} /> Checkout
        </h2>
        <div className="bg-black text-[#FFD700] px-3 py-1 text-[10px] font-black uppercase rounded">
          COD Only
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 border-2 border-black">
            <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Full Name</label>
            <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full font-bold outline-none" placeholder="Ahmed Khan" />
          </div>
          <div className="p-3 border-2 border-black">
            <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Phone (03xxxxxxxxx)</label>
            <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full font-bold outline-none" placeholder="03282519507" />
          </div>
        </div>

        <div className="p-3 border-2 border-black">
          <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">Shipping Address</label>
          <textarea required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full font-bold outline-none h-20 resize-none" placeholder="House/Street/Area" />
        </div>

        <div className="p-3 border-2 border-black">
          <label className="text-[10px] font-black uppercase text-gray-400 block mb-1">City</label>
          <select required value={city} onChange={(e) => setCity(e.target.value)} className="w-full font-bold outline-none bg-white">
            <option value="">Select City</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            {/* ... other cities */}
          </select>
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-gray-50 p-4 border-2 border-black border-dashed">
          <div className="flex justify-between font-black uppercase text-sm">
            <span>Total to Pay:</span>
            <span>Rs. {totalAmount}</span>
          </div>
        </div>

        <button 
          disabled={isSubmitting}
          type="submit" 
          className="w-full bg-black text-[#FFD700] py-6 font-black uppercase tracking-widest text-xl hover:bg-[#FFD700] hover:text-black transition-all flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
        >
          {isSubmitting ? "Processing..." : <><Send size={20} /> Confirm Order & WhatsApp</>}
        </button>
        
        <p className="text-[9px] text-center font-bold text-gray-400 uppercase">
          <ShieldCheck size={10} className="inline mr-1" /> Verified Secure Cash on Delivery
        </p>
      </form>
    </div>
  );
};
