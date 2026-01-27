import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const whatsappLink = `https://wa.me/923282519507?text=Hello%20Kevin11`;

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-black italic text-[#D4AF37] tracking-tighter">KEVIN11</h3>
            <div className="flex space-x-5 pt-2">
              <a href="#" className="p-2 border border-gray-800 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/kevin11.shop/" className="p-2 border border-gray-800 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"><Instagram size={20} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-8">Our Mission</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">Bridging the gap between luxury quality and affordable prices across Pakistan.</p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-8">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li className="flex items-start gap-3"><MapPin size={18} className="text-[#D4AF37]" /><span>Azizabad, Karachi, Pakistan</span></li>
              <li className="flex items-center gap-3"><Phone size={18} className="text-[#D4AF37]" /><a href={whatsappLink} className="hover:text-white">0328 2519507</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-gray-900 text-center">
          <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase">© 2026 KEVIN11. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
