import React from 'react';
import { Heart, ShoppingBag, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  isSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, originalPrice, image, isSale }) => {
  
  /** * COLOR CONFIGURATION 
   * Swap the 'buttonStyle' variable below to test your 3 options:
   * 1. orange:  "bg-[#ff5e00] hover:bg-[#e65500] text-white border-transparent"
   * 2. ghost:   "bg-transparent border-black text-black hover:bg-black hover:text-white"
   * 3. emerald: "bg-[#059669] hover:bg-[#047857] text-white border-transparent"
   **/
  const buttonStyle = "bg-[#ff5e00] hover:bg-[#e65500] text-white border-transparent"; 

  return (
    <div className="bg-white group cursor-pointer border border-gray-100 rounded-xl p-3 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      
      {/* 1. Image Container: Fixed Square Ratio to stop elongation */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f9f9f9] mb-3">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Modern Sale Badge */}
        {isSale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter">
            Sale
          </div>
        )}

        {/* Quick View Overlay (Wishlist) */}
        <button className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100">
          <Heart size={16} className="text-gray-400 hover:text-red-600" />
        </button>
      </div>

      {/* 2. Product Info Section */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-[13px] font-bold text-gray-800 line-clamp-2 leading-snug h-9 uppercase tracking-tight">
          {name}
        </h3>
        
        <div className="mt-auto pt-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-black text-black">Rs. {price}</span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through font-medium">Rs. {originalPrice}</span>
            )}
          </div>

          {/* 3. The Modern Button Section */}
          <button className={`w-full border-2 py-2.5 rounded-lg font-black text-[11px] flex items-center justify-center gap-2 transition-all duration-300 uppercase tracking-widest active:scale-95 ${buttonStyle}`}>
            <ShoppingCart size={15} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
