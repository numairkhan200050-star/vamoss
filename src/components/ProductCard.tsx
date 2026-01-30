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
  // Define font styles
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' };

  return (
    /* Main Container: Removed Oregano to apply Comic Sans specifically to children */
    <div className="w-[190px] md:w-[220px] flex-shrink-0 bg-white group cursor-pointer border border-gray-100 rounded-2xl p-2.5 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      
      {/* 1. Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#f9f9f9] mb-3 flex-shrink-0">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {isSale && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm uppercase">
            Sale
          </div>
        )}

        <button className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all">
          <Heart size={14} className="text-gray-400 hover:text-red-600" />
        </button>
      </div>

      {/* 2. Product Info Section */}
      <div className="flex flex-col flex-grow px-1">
        {/* Name: Comic Sans Bold */}
        <h3 
          style={comicSansBold}
          className="text-[14px] md:text-[15px] text-black line-clamp-2 leading-tight h-10 mb-1 uppercase tracking-tight"
        >
          {name}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-3">
            {/* Current Price: Comic Sans Regular (replacing Oregano) */}
            <span 
              style={comicSansRegular}
              className={`text-[18px] ${isSale ? 'text-red-600' : 'text-black'}`}
            >
              Rs. {price}
            </span>
            
            {originalPrice && (
              /* Original Price: Darker Grey (text-gray-800) + Comic Sans Regular */
              <span 
                style={comicSansRegular}
                className="text-[13px] text-gray-800 line-through decoration-red-500/50"
              >
                Rs. {originalPrice}
              </span>
            )}
          </div>

          {/* Button: Comic Sans Regular */}
          <button 
            style={comicSansRegular}
            className="w-full bg-white text-black border-2 border-black py-2 rounded-lg text-[14px] flex items-center justify-center gap-2 transition-all hover:bg-black hover:text-white uppercase tracking-wider active:scale-95 shadow-sm"
          >
            <ShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
