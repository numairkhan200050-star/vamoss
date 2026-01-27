import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import PolicyModal from './components/PolicyModal';
import { ProductCard } from './components/ProductCard';
import { OrderModal } from './components/OrderModal';
import type { Product } from './lib/database.types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    fetchProducts();
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: true });
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent"></div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* FIXED BRANDING WITH CORRECT CURSOR AND HOVER */}
            <div className="flex flex-col items-center md:items-start select-none">
              <div className="flex items-center tracking-tighter cursor-default">
                <span className="text-6xl font-black italic text-black uppercase">Kevin</span>
                <span className="text-6xl font-black text-[#D4AF37] inline-block transform -rotate-12 ml-2 hover:rotate-0 transition-transform duration-500">
                  11
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-0.5 w-10 bg-[#D4AF37]"></div>
                <p className="text-black font-bold uppercase tracking-[0.3em] text-xs">Premium Collection | Pakistan</p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onQuickOrder={(p) => { setSelectedProduct(p); setIsModalOpen(true); }} />
            ))}
          </div>
        </main>

        <Footer /> 

        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-black text-[#D4AF37] p-3 border border-[#D4AF37] shadow-2xl hover:bg-[#D4AF37] hover:text-black transition-all duration-300 z-50 animate-bounce"
          >
            <ChevronUp size={24} />
          </button>
        )}

        <OrderModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
      <PolicyModal />
    </>
  );
}

export default App;
