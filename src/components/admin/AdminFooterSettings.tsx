// src/components/admin/AdminFooterSettings.tsx
import React, { useState } from 'react';
import { 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Type, 
  Save,
  PackageSearch,
  ExternalLink
} from 'lucide-react';

const AdminFooterSettings = () => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  // States
  const [email, setEmail] = useState('kevin11.shop@proton.me');
  const [whatsapp, setWhatsapp] = useState('923282519507');
  const [address, setAddress] = useState('Azizabad, Karachi 75950, Pakistan');
  const [facebook, setFacebook] = useState('https://facebook.com');
  const [instagram, setInstagram] = useState('https://instagram.com');
  
  // --- NEW TWIST: Tracking Page State ---
  const [trackingPath, setTrackingPath] = useState('/track-order');

  const [policies, setPolicies] = useState([
    { title: 'Privacy Policy', content: 'Default Privacy Policy content...' },
    { title: 'Refund & Return Policy', content: 'Default Refund & Return content...' },
    { title: 'Terms & Conditions', content: 'Default Terms & Conditions content...' }
  ]);

  const handleSave = () => {
    // Later: Add Supabase upsert here
    console.log("Saving tracking path:", trackingPath);
    alert("🚀 Footer & Tracking Settings Updated!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <div>
          <h2 style={comicSansBold} className="text-3xl uppercase italic text-black">Footer Supervisor</h2>
          <p style={comicSansRegular} className="text-gray-500">Sync contact details and order tracking routes.</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 bg-[#FFD700] border-2 border-black px-6 py-3 hover:bg-black hover:text-[#FFD700] transition-all font-bold">
          <Save size={20} /> SAVE CHANGES
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* TRACKING SYSTEM CONNECTOR */}
          <section className="bg-yellow-400 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 style={comicSansBold} className="text-lg mb-4 flex items-center gap-2 border-b-2 border-black/10 pb-2">
              <PackageSearch size={20} /> TRACKING SYSTEM
            </h3>
            <div className="space-y-4">
              <div>
                <label style={comicSansBold} className="text-[10px] uppercase block mb-1">Target Tracking Route</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={trackingPath} 
                    onChange={(e) => setTrackingPath(e.target.value)}
                    className="flex-1 border-2 border-black p-2 outline-none font-mono text-sm"
                    placeholder="/track-order"
                  />
                  <div className="p-2 bg-black text-white border-2 border-black">
                    <ExternalLink size={20} />
                  </div>
                </div>
                <p className="text-[9px] mt-2 font-bold italic uppercase opacity-70">
                  * This path links the footer "Track Your Order" text to your system.
                </p>
              </div>
            </div>
          </section>

          {/* CONTACT DETAILS */}
          <section className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 style={comicSansBold} className="text-lg mb-4 flex items-center gap-2 border-b-2 border-gray-100 pb-2">
              <Phone size={18} className="text-[#FFD700]" /> CONTACT DETAILS
            </h3>
            <div className="space-y-4">
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 border-gray-200 p-2 text-sm" placeholder="Support Email" />
              <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full border-2 border-gray-200 p-2 text-sm" placeholder="WhatsApp Number" />
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border-2 border-gray-200 p-2 text-sm" rows={2} placeholder="Physical Address" />
            </div>
          </section>

          {/* SOCIALS */}
          <section className="bg-black text-white border-4 border-[#FFD700] p-6">
            <h3 style={comicSansBold} className="text-lg mb-4 flex items-center gap-2 border-b border-gray-800 pb-2 text-[#FFD700]">
              <Facebook size={18} /> SOCIAL REACH
            </h3>
            <div className="space-y-4">
              <input value={facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full bg-transparent border-b border-gray-700 p-2 text-sm outline-none focus:border-[#FFD700]" placeholder="Facebook URL" />
              <input value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full bg-transparent border-b border-gray-700 p-2 text-sm outline-none focus:border-[#FFD700]" placeholder="Instagram URL" />
            </div>
          </section>
        </div>

        {/* POLICY EDITOR (Right Side) */}
        <section className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 style={comicSansBold} className="text-lg mb-4 flex items-center gap-2 border-b-2 border-gray-100 pb-2">
            <Type size={18} className="text-[#FFD700]" /> POLICY EDITOR
          </h3>
          <div className="space-y-6">
            {policies.map((policy, index) => (
              <div key={index} className="space-y-2">
                <span style={comicSansBold} className="text-[10px] bg-black text-white px-2 py-1 uppercase">{policy.title}</span>
                <textarea 
                  value={policy.content}
                  onChange={(e) => {
                    const p = [...policies];
                    p[index].content = e.target.value;
                    setPolicies(p);
                  }}
                  className="w-full border-2 border-gray-100 p-3 text-xs min-h-[100px] outline-none focus:border-black"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminFooterSettings;
