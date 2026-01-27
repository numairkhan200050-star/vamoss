import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const whatsappNumber = "923282519507";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Kevin11,%20I%20have%20a%20question.`;
  const instagramLink = "https://www.instagram.com/kevin11.shop/";
  const facebookLink = "https://www.facebook.com/profile.php?id=61580997801841";

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Socials */}
          <div className="space-y-6">
            <h3 className="text-3xl font-black italic text-[#D4AF37] tracking-tighter">KEVIN11</h3>
            <div className="flex space-x-5 pt-2">
              <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 rounded-none hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"><Facebook size={20} /></a>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 rounded-none hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"><Instagram size={20} /></a>
              {/* STABLE SVG WHATSAPP ICON */}
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 rounded-none hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"/></svg>
              </a>
            </div>
          </div>

          {/* Policy Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-8">Customer Care</h4>
            <ul className="space-y-4 text-sm font-bold text-gray-400">
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('open-policy', {detail: 'privacy'}))} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('open-policy', {detail: 'refund'}))} className="hover:text-white transition-colors">Refund & Return Policy</button></li>
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('open-policy', {detail: 'terms'}))} className="hover:text-white transition-colors">Terms & Conditions</button></li>
            </ul>
          </div>

          {/* FIXED MISSION SECTION */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-8">Mission</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              Based in Pakistan, we aim to bridge the gap between quality and affordability with our handpicked collections.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-8">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] shrink-0" />
                <span>Azizabad, Karachi 75950, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#D4AF37] shrink-0" />
                <a href={whatsappLink} target="_blank" className="hover:text-white">0328 2519507</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#D4AF37] shrink-0" />
                <a href="mailto:kevin11.shop@proton.me" className="hover:text-white underline decoration-[#D4AF37] decoration-2 underline-offset-4">kevin11.shop@proton.me</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-900 text-center">
          <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} KEVIN11. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
