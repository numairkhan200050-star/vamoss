export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#D4AF37]/20 mt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold uppercase italic text-white">
              KEVIN<span className="text-[#D4AF37]">11</span>
            </h2>
            <p className="text-gray-500 text-sm">Exclusivity in every detail.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.3em]">Information</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              <li>• Cash on Delivery (COD)</li>
              <li>• WhatsApp Order Processing</li>
            </ul>
          </div>
          <div className="space-y-4 md:text-right">
            <p className="text-gray-600 text-[10px] uppercase tracking-widest">
              © 2026 KEVIN11 Luxury Store.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
