// src/components/OrderSuccess.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';

export const OrderSuccess = () => {
  const { id } = useParams(); // Tracking ID from URL
  const navigate = useNavigate();
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-white">
      <div className="max-w-md w-full border-8 border-black p-8 shadow-[12px_12px_0px_#FFD700] text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-black p-4 rounded-full">
            <CheckCircle className="text-[#FFD700]" size={50} />
          </div>
        </div>

        <h1 style={comicSansBold} className="text-4xl uppercase italic mb-2 tracking-tighter">
          Order Confirmed!
        </h1>
        <p className="font-bold text-gray-500 uppercase text-xs tracking-widest mb-8">
          Welcome to the K11 Crew
        </p>

        <div className="bg-gray-100 border-2 border-dashed border-black p-4 mb-8">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Your Tracking ID</p>
          <p className="text-2xl font-black font-mono">{id || 'K11-PROCESSING'}</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => navigate('/track')}
            className="w-full bg-black text-[#FFD700] py-4 font-black uppercase flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all"
          >
            <Package size={18} /> Track Shipment
          </button>
          
          <button 
            onClick={() => navigate('/shop')}
            className="w-full bg-white text-black border-4 border-black py-4 font-black uppercase flex items-center justify-center gap-2 hover:bg-gray-50"
          >
            <ShoppingBag size={18} /> Continue Shopping <ArrowRight size={18} />
          </button>
        </div>

        <p className="mt-8 text-[10px] font-medium text-gray-400 leading-tight">
          A confirmation message will be sent to your WhatsApp/Phone shortly. 
          Keep your Tracking ID safe!
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
