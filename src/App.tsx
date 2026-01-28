import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { HeroSlider } from './components/HeroSlider';
import { TrustBar } from './components/TrustBar';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 mt-8">
        {/* HERO SECTION */}
        <HeroSlider />

        {/* DECORATIVE LINES (Right below Hero as requested) */}
        <div className="my-12 flex flex-col gap-1">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          <div className="h-0.5 w-1/3 mx-auto bg-[#FFD700]"></div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        </div>

        {/* BRIGHT LOGO BRANDING */}
        <div className="flex flex-col items-center mb-16">
           <h1 className="text-7xl font-black italic">KEVIN<span className="text-[#FFD700]">11</span></h1>
           <p className="tracking-[0.5em] text-[10px] font-bold uppercase mt-2">Premium Collection | Pakistan</p>
        </div>

        {/* PRODUCT GRID... */}
        <div className="py-20">
          <h2 className="text-2xl font-black mb-10 border-l-4 border-[#FFD700] pl-4 uppercase">Featured Items</h2>
          {/* Products here */}
        </div>

        {/* SHIPPING LINE (Right above footer as requested) */}
        <div className="border-t border-gray-100 pt-10">
          <TrustBar />
        </div>
      </main>

      <Footer />
    </div>
  );
}
