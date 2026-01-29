import React, { useState } from 'react';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail, X } from 'lucide-react';

const Footer = () => {
  const [activePolicy, setActivePolicy] = useState<{ title: string; content: string } | null>(null);

  // Note: These values will eventually be pulled from your Admin Portal (Rule No. 1)
  const siteData = {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    whatsappNumber: "923282519507", // Format: CountryCode + Number
    email: "kevin11.shop@proton.me",
    address: "Azizabad, Karachi 75950, Pakistan",
    phoneDisplay: "0328 2519507"
  };

  const openPolicy = (title: string) => {
    // Placeholder content: This will be editable via your rich-text Admin editor later
    setActivePolicy({
      title: title,
      content: `<p>Content for <strong>${title}</strong> will be loaded here from the Admin Portal.</p><ul><li>Bullet point example</li></ul>`
    });
  };

  return (
    <footer className="bg-black text-white py-16 px-8 border-t-4 border-[#FFD700] font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* 1. Branding */}
        <div className="space-y-6">
          <h2 className="text-4xl font-black italic tracking-tighter text-[#FFD700]">KEVIN11</h2>
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
          <h3 className="text-[#FFD700] font-black uppercase text-sm tracking-widest">Customer Care</h3>
          <ul className="space-y-3 text-gray-300 font-medium">
            <li><button onClick={() => openPolicy('Privacy Policy')} className="hover:text-white transition-all">Privacy Policy</button></li>
            <li><button onClick={() => openPolicy('Refund & Return Policy')} className="hover:text-white transition-all">Refund & Return Policy</button></li>
            <li><button onClick={() => openPolicy('Terms & Conditions')} className="hover:text-white transition-all">Terms & Conditions</button></li>
          </ul>
        </div>

        {/* 3. Mission */}
        <div className="space-y-4">
          <h3 className="text-[#FFD700] font-black uppercase text-sm tracking-widest">Mission</h3>
          <p className="text-gray-300 leading-relaxed font-medium">
            Based in Pakistan, we aim to bridge the gap between quality and affordability with our handpicked collections.
          </p>
        </div>

        {/* 4. Contact Us */}
        <div className="space-y-4">
          <h3 className="text-[#FFD700] font-black uppercase text-sm tracking-widest">Contact Us</h3>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-[#FFD700] shrink-0" />
              <span className="text-gray-300">{siteData.address}</span>
            </li>
            <li>
              <a href={`https://wa.me/${siteData.whatsappNumber}`} className="flex items-center gap-3 hover:text-[#FFD700] transition-colors">
                <Phone size={18} className="text-[#FFD700]" />
                <span className="text-gray-300">{siteData.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${siteData.email}`} className="flex items-center gap-3 hover:text-[#FFD700] transition-colors">
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
            <h2 className="text-2xl font-black italic uppercase mb-6 border-b-2 border-black pb-2">
              {activePolicy.title}
            </h2>
            <div 
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
