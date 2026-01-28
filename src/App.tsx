import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import { ProductCard } from './components/ProductCard';
import { OrderModal } from './components/OrderModal';
import { HeroSlider } from './components/HeroSlider'; // Smooth Naheed-style slider
import { TrustBar } from './components/TrustBar'; // The 1-3 day shipping bar

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: true });
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* LANDING HEADER (Restored Branding) */}
        <header className="bg-white py-12 border-b border-gray-50">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col items-center md:items-start select-none">
              <div className="flex items-center tracking-tighter cursor-default">
                <span className="text-6xl font-black italic text-black uppercase">Kevin</span>
                <span className="text-6xl font-black text-[#FFD700] inline-block transform -rotate-12 ml-2 hover:rotate-0 transition-transform duration-500">11</span>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-0.5 w-10 bg-[#FFD700]"></div>
                <p className="text-black font-bold uppercase tracking-[0.2em] text-[10px]">Premium Collection | Pakistan</p>
              </div>
            </div>
            {/* Smooth Trust Badge */}
            <div className="hidden md:block bg-black text-white px-8 py-4 smooth-shadow">
               <p className="text-[#FFD700] font-black uppercase text-xs">Cash On Delivery</p>
               <p className="text-[10px] opacity-70 uppercase tracking-widest">Delivery All Over Pakistan</p>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12">
          {/* Main Hero Slider (Naheed.pk Look) */}
          <HeroSlider />

          <TrustBar />

          <div className="mt-20">
            <h2 className="text-3xl font-black text-black tracking-widest mb-10 border-l-8 border-[#FFD700] pl-4">FEATURED ITEMS</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onQuickOrder={(p) => { setSelectedProduct(p); setIsModalOpen(true); }} />
              ))}
            </div>
          </div>
        </main>

        <Footer /> 
        <OrderModal product={selectedProduct} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </>
  );
}
export default App;
