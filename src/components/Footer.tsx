import React, { useState } from 'react';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail, X, PackageSearch } from 'lucide-react';

const Footer = () => {
  const [activePolicy, setActivePolicy] = useState<{ title: string; content: string } | null>(null);

  // Comic Sans Font Styles
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  const siteData = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    whatsappNumber: "923282519507",
    email: "kevin11.shop@proton.me",
    address: "Azizabad, Karachi 75950, Pakistan",
    phoneDisplay: "0328 2519507"
  };

  const openPolicy = (title: string) => {
    setActivePolicy({
      title: title,
      content: `<p>Content for <strong>${title}</strong> will be loaded here from the Admin Portal.</p><ul><li>Bullet point example</li></ul>`
    });
  };

  return (
    <footer className="bg-black text-white py-16 px-8 border-t-4 border-[#FFD700]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* 1. Branding */}
        <div className="space-y-6">
          <h2 style={comicSansBold} className="text-4xl italic tracking-tighter text-[#FFD700]">KEVIN11</h2>
          <div className="flex gap-4">
            <a href={siteData.facebook} className="p-2 border border-gray-700 hover:border-[#FFD700] transition-colors">
              <Facebook size={20} />
            </a>
            <a href={siteData.instagram} className="p-2 border border-gray-700 hover:border-[#FFD700] transition-colors">
              <Instagram size={20} />
            </a>
            <a href={`https://wa.me/${siteData.whatsappNumber}`} className="p-2 border border-gray-700 hover:border-[#FFD700] transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* 2. Customer Care */}
        <div className="space-y-4">
          <h3 style={comicSansBold} className="text-[#FFD700] uppercase text-sm tracking-widest">Customer Care</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <a href="/track-order" style={comicSansBold} className="flex items-center gap-2 text-[#FFD700] hover:underline transition-all">
                <PackageSearch size={18} /> Track Your Order
              </a>
            </li>
            <li><button onClick={() => openPolicy('Privacy Policy')} style={comicSansRegular} className="hover:text-white transition-all">Privacy Policy</button></li>
            <li><button onClick={() => openPolicy('Refund & Return Policy')} style={comicSansRegular} className="hover:text-white transition-all">Refund & Return Policy</button></li>
            <li><button onClick={() => openPolicy('Terms & Conditions')} style={comicSansRegular} className="hover:text-white transition-all">Terms & Conditions</button></li>
          </ul>
        </div>

        {/* 3. Mission */}
        <div className="space-y-4">
          <h3 style={comicSansBold} className="text-[#FFD700] uppercase text-sm tracking-widest">Mission</h3>
          <p style={comicSansRegular} className="text-gray-300 leading-relaxed">
            Based in Pakistan, we aim to bridge the gap between quality and affordability with our handpicked collections.
          </p>
        </div>

        {/* 4. Contact Us */}
        <div className="space-y-4">
          <h3 style={comicSansBold} className="text-[#FFD700] uppercase text-sm tracking-widest">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#FFD700] shrink-0" />
              <span style={comicSansRegular} className="text-gray-300">{siteData.address}</span>
            </li>
            <li>
              <a href={`https://wa.me/${siteData.whatsappNumber}`} style={comicSansRegular} className="flex items-center gap-3 hover:text-[#FFD700] transition-colors">
                <Phone size={18} className="text-[#FFD700]" />
                <span className="text-gray-300">{siteData.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${siteData.email}`} style={comicSansRegular} className="flex items-center gap-3 hover:text-[#FFD700] transition-colors">
                <Mail size={18} className="text-[#FFD700]" />
                <span className="text-gray-300 underline underline-offset-4">{siteData.email}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Policy Dialog Popup */}
      {activePolicy && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white text-black w-full max-w-2xl max-h-[80vh] overflow-y-auto relative p-8 border-4 border-[#FFD700]">
            <button 
              onClick={() => setActivePolicy(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 style={comicSansBold} className="text-2xl italic uppercase mb-6 border-b-2 border-black pb-2">
              {activePolicy.title}
            </h2>
            <div 
              style={comicSansRegular}
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: activePolicy.content }} 
            />
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
