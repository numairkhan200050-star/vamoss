import React, { useState } from 'react';
import { Truck, Phone, MapPin, User, Mail } from 'lucide-react';

export const CheckoutForm = () => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate Pakistani Phone Number (11 digits starting with 03)
    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid Pakistani phone number (e.g., 03001234567)");
      return;
    }
    alert("Order Placed Successfully via Cash on Delivery!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-3">
        <Truck size={32} /> Delivery Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* FULL NAME */}
        <div className="p-4 bg-gray-50 border-2 border-black">
          <label className="block text-xs font-black uppercase mb-2 flex items-center gap-2">
            <User size={14} /> Full Name *
          </label>
          <input required type="text" className="w-full p-3 border-2 border-black font-bold outline-none focus:bg-yellow-50" placeholder="Enter your full name" />
        </div>

        {/* PHONE NUMBER (CRITICAL FOR PAKISTAN) */}
        <div className="p-4 bg-gray-50 border-2 border-black">
          <label className="block text-xs font-black uppercase mb-2 flex items-center gap-2">
            <Phone size={14} /> Phone Number *
          </label>
          <input 
            required 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border-2 border-black font-bold outline-none focus:bg-yellow-50" 
            placeholder="03xxxxxxxxx" 
          />
          <p className="text-[10px] mt-2 font-bold text-gray-500 italic">Our delivery partner will call this number to confirm.</p>
        </div>

        {/* ADDRESS */}
        <div className="p-4 bg-gray-50 border-2 border-black">
          <label className="block text-xs font-black uppercase mb-2 flex items-center gap-2">
            <MapPin size={14} /> Full Shipping Address *
          </label>
          <textarea 
            required 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border-2 border-black font-bold outline-none focus:bg-yellow-50 h-24" 
            placeholder="House #, Street #, Area/Sector..." 
          />
        </div>

        {/* CITY SELECTION */}
        <div className="p-4 bg-gray-50 border-2 border-black">
          <label className="block text-xs font-black uppercase mb-2">City *</label>
          <select required value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-3 border-2 border-black font-bold bg-white outline-none">
            <option value="">Select your city</option>
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Rawalpindi">Rawalpindi</option>
            <option value="Faisalabad">Faisalabad</option>
            <option value="Multan">Multan</option>
            <option value="Peshawar">Peshawar</option>
            <option value="Quetta">Quetta</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Other">Other City</option>
          </select>
        </div>

        {/* OPTIONAL EMAIL */}
        <div className="p-4 bg-gray-50 border-2 border-black">
          <label className="block text-xs font-black uppercase mb-2 flex items-center gap-2 text-gray-400">
            <Mail size={14} /> Email Address (Optional)
          </label>
          <input type="email" className="w-full p-3 border-2 border-black font-bold outline-none opacity-60 focus:opacity-100" placeholder="your@email.com" />
        </div>

        {/* PAYMENT METHOD (LOCKED TO COD) */}
        <div className="p-4 bg-yellow-100 border-2 border-black">
          <p className="font-black uppercase text-sm italic">Payment Method:</p>
          <p className="text-xl font-black">💵 Cash on Delivery (COD)</p>
          <p className="text-[10px] font-bold mt-1">Pay when you receive the parcel at your doorstep.</p>
        </div>

        <button type="submit" className="w-full bg-black text-white py-6 font-black uppercase tracking-widest text-xl hover:bg-[#D4AF37] hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(212,175,55,1)]">
          Confirm Order
        </button>
      </form>
    </div>
  );
};
