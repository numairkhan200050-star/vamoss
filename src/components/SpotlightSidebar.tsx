import React, { useState, useEffect } from 'react';

const spotlightProducts = [
  {
    id: 1,
    name: "Hair Dryer Brush 5-in-1",
    price: "Rs. 3,499",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=500",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "S9 Ultra Smart Watch",
    price: "Rs. 4,999",
    image: "https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&q=80&w=500",
    tag: "Hot Deal"
  }
];

export const SpotlightSidebar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === spotlightProducts.length - 1 ? 0 : prev + 1));
    }, 3000); // 3 Second Rotation
    return () => clearInterval(timer);
  }, []);

  const product = spotlightProducts[index];

  return (
    <div className="w-full border-4 border-black p-4 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <span className="bg-red-600 text-white text-[10px] font-black px-2 py-1 uppercase italic animate-pulse">
          {product.tag}
        </span>
        <span className="text-[10px] font-bold text-gray-400">0{index + 1} / 0{spotlightProducts.length}</span>
      </div>
      
      <div className="relative overflow-hidden h-48 mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
      </div>

      <h3 className="font-black uppercase italic text-sm mb-1 truncate">{product.name}</h3>
      <p className="text-xl font-black text-black mb-4">{product.price}</p>
      
      <button className="w-full py-2 bg-black text-white font-bold text-xs uppercase hover:bg-[#D4AF37] hover:text-black transition-colors border-2 border-black">
        View Details
      </button>
    </div>
  );
};
