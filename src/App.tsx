import { useEffect, useState } from 'react';
import { Store } from 'lucide-react';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { OrderModal } from './components/OrderModal';
import type { Product } from './lib/database.types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleQuickOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 200);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-900 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-lg bg-white/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-900 rounded-xl">
                  <Store size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Vamoss Shop</h1>
                  <p className="text-sm text-gray-600">Premium quality products</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Cash on Delivery</p>
                <p className="text-xs text-gray-500">Available nationwide</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section / Banner */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-gray-600">
              Discover our curated collection of premium items
            </p>
          </div>

          {/* Grid of Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickOrder={handleQuickOrder}
              />
            ))}
          </div>
        </main>

        <OrderModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </>
  );
}

export default App;
