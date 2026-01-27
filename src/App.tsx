import { useEffect, useState } from 'react';
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* HEADER SECTION */}
        <header className="bg-white border-b border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
              
              {/* STYLISH BRANDING */}
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center tracking-tighter">
                  <span className="text-6xl font-black italic text-black uppercase">Kevin</span>
                  <span className="text-6xl font-black text-[#D4AF37] inline-block transform -rotate-12 ml-2 hover:rotate-0 transition-transform duration-500 cursor-default">11</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-0.5 w-10 bg-[#D4AF37]"></div>
                  {/* Updated Tagline for Pakistan */}
                  <p className="text-black font-bold uppercase tracking-[0.3em] text-xs">Premium Collection | Pakistan</p>
                </div>
              </div>

              {/* COD BADGE */}
              <div className="bg-black px-10 py-6 rounded-none border border-black flex items-center gap-5 shadow-xl group hover:bg-[#D4AF37] transition-colors duration-300">
                <div className="text-left">
                  <p className="text-[#D4AF37] group-hover:text-black font-black leading-tight uppercase text-sm tracking-widest transition-colors">Cash on Delivery</p>
                  <p className="text-gray-400 group-hover:text-black text-xs font-medium mt-1 uppercase transition-colors">Delivery All Over Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section Title */}
          <div className="mb-20 text-center md:text-left">
            <h2 className="text-4xl font-black text-black tracking-[0.1em]">
              FEATURED ITEMS
            </h2>
            <div className="h-1 w-24 bg-[#D4AF37] mt-4 mx-auto md:mx-0"></div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
