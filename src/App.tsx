import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductCard } from './components/ProductCard';
import { OrderModal } from './components/OrderModal';

interface Product {
  id: string;
  title: string;
  base_price: number;
  main_image_url: string;
  size?: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error('Database Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOpenOrder = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-black border-t-[#D4AF37] rounded-full animate-spin"></div>
        <p className="font-black uppercase tracking-[0.4em] text-xs">Kevin11 Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-black text-black tracking-tighter uppercase italic">
              Featured <span className="text-[#D4AF37]">Items</span>
            </h2>
            <div className="h-1.5 w-20 bg-black mt-2"></div>
          </div>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">
            Premium Quality Hand-Picked For You
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-gray-100">
            <p className="text-gray-400 font-bold uppercase tracking-widest">No products found in database</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickOrder={handleOpenOrder} 
              />
            ))}
          </div>
        )}
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
