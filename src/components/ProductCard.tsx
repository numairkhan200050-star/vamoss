import React from 'react';
import { ShoppingCart } from 'lucide-react';

export const ProductCard = ({ product, onQuickOrder }: any) => {
  return (
    <div className="bg-white border border-gray-100 group shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.main_image_url} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-black text-black uppercase italic tracking-tighter">{product.title}</h3>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-1">{product.size || 'Premium Quality'}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#D4AF37] font-black text-xl">Rs. {product.base_price}</span>
          <button 
            onClick={() => onQuickOrder(product)}
            className="bg-black text-white p-3 hover:bg-[#D4AF37] hover:text-black transition-colors duration-300"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
