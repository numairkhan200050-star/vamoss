import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  isSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, originalPrice, image, isSale }) => {
  return (
    <div className="flex-shrink-0 w-[190px] md:w-[260px] group cursor-pointer">
      {/* Image Container with Luxury Border */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-[30px] border-4 border-black luxury-shadow-sm bg-gray-50">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Modern "Sale" Badge */}
        {isSale && (
          <div className="absolute top-4 left-4 bg-[#FFD700] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase italic border-2 border-black z-10 shadow-lg">
            On Sale
          </div>
        )}

        {/* Quick View / Wishlist Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button className="p-3 bg-white rounded-full border-2 border-black hover:bg-[#FFD700] transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
            <Heart size={20} className="text-black" />
          </button>
          <button className="p-3 bg-white rounded-full border-2 border-black hover:bg-[#FFD700] transition-colors transform translate-y-4 group-hover:translate-y-0 duration-500">
            <ShoppingBag size={20} className="text-black" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-4 px-2">
        <h3 className="text-sm font-black uppercase tracking-tighter text-black line-clamp-1 group-hover:text-gray-600 transition-colors">
          {name}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-lg font-black text-black">Rs. {price}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through font-bold">
              Rs. {originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
