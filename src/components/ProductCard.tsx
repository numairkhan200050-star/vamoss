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
    /* We define the card width as 220px naturally. No scale used. */
    <div className="w-[220px] bg-white group cursor-pointer border border-gray-100 rounded-xl p-3 hover:shadow-lg transition-all duration-300 flex flex-col h-full relative">
      
      {/* 1. Image Container - Maintains 480x480 quality in a smaller view */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f9f9f9] mb-3">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {isSale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm uppercase">
            Sale
          </div>
        )}

        <button className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
          <Heart size={14} className="text-gray-400 hover:text-red-600" />
        </button>
      </div>

      {/* 2. Product Info Section */}
      <div className="flex flex-col flex-grow">
        <h3 
          style={{ fontFamily: "'Oregano', cursive, sans-serif" }}
          className="text-[16px] font-normal text-gray-800 line-clamp-2 leading-tight h-10 mb-2"
        >
          {name}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-3">
            {/* Price Logic: Red if Sale, Black if not */}
            <span className={`text-[15px] font-black ${isSale ? 'text-red-600' : 'text-black'}`}>
              Rs. {price}
            </span>
            
            {originalPrice && (
              <span className="text-[10px] text-black/40 line-through font-medium">
                Rs. {originalPrice}
              </span>
            )}
          </div>

          <button className={`w-full border-2 py-2 rounded-lg font-black text-[10px] flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest active:scale-95 ${buttonStyle}`}>
            <ShoppingCart size={13} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
