import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export const Footer = () => {
  const whatsappNumber = "923282519507";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20Kevin11,%20I%20have%20a%20question.`;
  const instagramLink = "https://www.instagram.com/kevin11.shop/";
  const facebookLink = "https://www.facebook.com/profile.php?id=61580997801841";

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t-4 border-[#D4AF37]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="text-3xl font-black italic text-[#D4AF37] tracking-tighter">KEVIN11</h3>
            <div className="flex space-x-5 pt-2">
              <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                <Facebook size={20} />
              </a>
              <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="p-2 border border-gray-800 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Mission Column */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-8">Our Mission</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">
              Bridging the gap between luxury quality and affordable prices across Pakistan.
            </p>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] mb-8">Contact Us</h4>
            <ul className="space-y-4 text-sm font-medium text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] shrink-0" />
                <span>Azizabad, Karachi 75950, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#D4AF37] shrink-0" />
                <a href={whatsappLink} target="_blank" className="hover:text-white font-bold">0328 2519507</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#D4AF37] shrink-0" />
                <a href="mailto:kevin11.shop@proton.me" className="hover:text-white underline decoration-[#D4AF37] underline-offset-4">kevin11.shop@proton.me</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-900 text-center">
          <p className="text-[10px] text-gray-600 tracking-[0.3em] uppercase">
            © 2026 KEVIN11. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
