import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  isSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, originalPrice, image, isSale }) => {
  return (
    <div className="bg-white group cursor-pointer border border-gray-100 rounded-lg p-3 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      
      {/* Image Container: Changed to aspect-square to stop elongation */}
      <div className="relative aspect-square overflow-hidden rounded-md bg-[#f9f9f9]">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Naheed Style Sale Badge */}
        {isSale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
            -30% OFF
          </div>
        )}

        {/* Quick Actions */}
        <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 transition-colors">
          <Heart size={16} className="text-gray-400 hover:text-red-600" />
        </button>
      </div>

      {/* Details Section */}
      <div className="mt-3 flex flex-col flex-grow">
        <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-tight h-8 uppercase">
          {name}
        </h3>
        
        <div className="mt-auto pt-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-red-600">Rs. {price}</span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">Rs. {originalPrice}</span>
            )}
          </div>

          {/* Naheed Style "Add to Cart" Button */}
          <button className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold text-[11px] flex items-center justify-center gap-2 transition-colors uppercase">
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
