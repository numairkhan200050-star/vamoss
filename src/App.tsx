import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Product } from './types/product';
import ProductCard from './components/ProductCard';
import OrderModal from './components/OrderModal';
import Footer from './components/Footer'; // Importing the separate footer

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
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#D4AF37] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="bg-black border-b border-[#D4AF37]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold uppercase italic tracking-tighter">
            KEVIN<span className="text-[#D4AF37]">11</span>
          </h1>
          <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[.2em]">Premium Collection</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickOrder={(p) => { setSelectedProduct(p); setIsModalOpen(true); }} 
            />
          ))}
        </div>
      </main>

      <OrderModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
}

export default App;
