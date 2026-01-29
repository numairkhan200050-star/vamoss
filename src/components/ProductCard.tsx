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
  const buttonStyle = "bg-transparent border-black text-black hover:bg-black hover:text-white"; 

  return (
    /* We use a fixed width/height container to 'trap' the scaled card so it doesn't create gaps */
    <div className="w-[230px] h-[350px] flex-shrink-0 relative">
      <div className="bg-white group cursor-pointer border border-gray-100 rounded-xl p-3 hover:shadow-xl transition-all duration-300 flex flex-col h-[500px] w-[330px] absolute top-0 left-0 transform scale-[0.7] origin-top-left hover:scale-[0.72]">
        
        {/* 1. Image Container */}
        <div className="relative aspect-square max-w-[480px] max-h-[480px] mx-auto overflow-hidden rounded-lg bg-[#f9f9f9] mb-3 w-full">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          {isSale && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter">
              Sale
            </div>
          )}
          <button className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
            <Heart size={16} className="text-gray-400 hover:text-red-600" />
          </button>
        </div>

        {/* 2. Product Info Section */}
        <div className="flex flex-col flex-grow px-2">
          <h3 style={{ fontFamily: "'Oregano', cursive, sans-serif" }} className="text-[22px] font-normal text-gray-800 line-clamp-2 leading-tight h-14 mb-1">
            {name}
          </h3>
          <div className="mt-auto pt-2">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-2xl font-black ${isSale ? 'text-red-600' : 'text-black'}`}>Rs. {price}</span>
              {originalPrice && (
                <span className="text-sm text-black/40 line-through font-medium">Rs. {originalPrice}</span>
              )}
            </div>
            <button className={`w-full border-2 py-4 rounded-lg font-black text-[14px] flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest active:scale-95 ${buttonStyle}`}>
              <ShoppingCart size={20} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
