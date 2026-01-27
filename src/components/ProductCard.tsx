import React from 'react';
import { ShoppingCart } from 'lucide-react';

export const ProductCard = ({ product, onQuickOrder }: any) => {
  return (
    <div className="bg-white border border-gray-100 group shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.main_image_url} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      {/* Product Details */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-black text-black uppercase italic tracking-tighter line-clamp-1">
            {product.title}
          </h3>
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-1">
            {product.size || 'Premium Edition'}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold">Price</span>
            <span className="text-[#D4AF37] font-black text-xl tracking-tighter">
              Rs. {product.base_price}
            </span>
          </div>
          
          <button 
            onClick={() => onQuickOrder(product)}
            className="bg-black text-white p-3 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-lg active:scale-95"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
