import { ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onQuickOrder: (product: Product) => void;
}

export default function ProductCard({ product, onQuickOrder }: ProductCardProps) {
  const isLarge = product.size === '2x1';

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-sm
        transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]
        ${isLarge ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'}
        flex flex-col`}
    >
      <div className={`relative overflow-hidden ${isLarge ? 'h-64' : 'h-48'}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full mb-3">
            {product.category}
          </span>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          <button
            onClick={() => onQuickOrder(product)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg
              font-medium transition-all duration-300 hover:bg-blue-700 hover:shadow-lg
              hover:scale-105 active:scale-95"
          >
            <ShoppingCart size={18} />
            Quick Order
          </button>
        </div>
      </div>
    </div>
  );
}
