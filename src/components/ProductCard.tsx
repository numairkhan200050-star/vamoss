import { ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onQuickOrder: (product: Product) => void;
}

export default function ProductCard({ product, onQuickOrder }: ProductCardProps) {
  return (
    <div className="bg-[#0A0A0A] border border-[#D4AF37]/10 rounded-2xl overflow-hidden group hover:border-[#D4AF37]/40 transition-all duration-500 shadow-2xl">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.main_image_url}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Product Details */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
            {product.title}
          </h3>
          <span className="text-[#D4AF37] font-black text-lg">
            Rs. {product.base_price.toLocaleString()}
          </span>
        </div>
        
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-6">
          {product.size || 'Exclusive Edition'}
        </p>

        <button
          onClick={() => onQuickOrder(product)}
          className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform active:scale-95 uppercase tracking-tighter"
        >
          <ShoppingCart size={20} />
          Order via WhatsApp
        </button>
      </div>
    </div>
  );
}
