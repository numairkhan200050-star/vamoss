import React from 'react';
import { ShoppingCart } from 'lucide-react';

export const ProductCard = ({ product, onQuickOrder }: any) => {
  return (
    <div className="bg-white border border-gray-100 group">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={product.main_image_url} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-black text-black uppercase italic">{product.title}</h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[#D4AF37] font-black text-xl">Rs. {product.base_price}</span>
          <button 
            onClick={() => onQuickOrder(product)}
            className="bg-black text-white p-3 hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
