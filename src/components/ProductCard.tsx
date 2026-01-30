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
    /* RESTORED: Neubrutalist Shadow and Black Border */
    <div className="w-[190px] md:w-[220px] flex-shrink-0 bg-white group cursor-pointer border-2 border-black rounded-[30px] p-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300 flex flex-col h-full relative">
      
      {/* 1. IMAGE CONTAINER - Fixed 1:1 Aspect Ratio */}
      <div className="relative aspect-square overflow-hidden rounded-[20px] bg-white mb-3 flex-shrink-0 border border-gray-100">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {isSale && (
          /* RESTORED: Old Sale Badge Style */
          <div className="absolute top-2 left-2 bg-black text-[#FFD700] text-[8px] font-black px-3 py-1 rounded-full uppercase z-10">
            Sale
          </div>
        )}

        <button className="absolute top-2 right-2 p-1.5 bg-white border border-black rounded-full opacity-0 group-hover:opacity-100 transition-all z-10">
          <Heart size={14} className="text-black hover:fill-red-500 hover:text-red-500" />
        </button>
      </div>

      {/* 2. PRODUCT INFO SECTION */}
      <div className="flex flex-col flex-grow">
        {/* RESTORED: Uppercase, Black, Italic Font */}
        <h3 className="text-[11px] font-black text-black line-clamp-2 leading-tight h-8 mb-2 uppercase italic tracking-tighter">
          {name}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            {/* RESTORED: Bold Black Pricing */}
            <span className="text-[16px] font-black text-black">
              Rs. {price}
            </span>
            {originalPrice && (
              <span className="text-[10px] text-gray-400 line-through font-bold">
                Rs. {originalPrice}
              </span>
            )}
          </div>

          {/* RESTORED: Signature Yellow Button with Black Border */}
          <button className="w-full bg-[#FFD700] text-black border-2 border-black py-2 rounded-xl font-black text-[10px] uppercase italic flex items-center justify-center gap-2 transition-all hover:bg-black hover:text-[#FFD700]">
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
