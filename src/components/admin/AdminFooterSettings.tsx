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
  Bold, 
  Italic, 
  List, 
  Save 
} from 'lucide-react';

interface Policy {
  title: string;
  content: string;
}

const AdminFooterSettings = () => {
  // Styles
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const comicSansRegular = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'normal' as const };

  // 1. Laborer: Social & Contact State
  const [facebook, setFacebook] = useState('https://facebook.com');
  const [instagram, setInstagram] = useState('https://instagram.com');
  const [whatsapp, setWhatsapp] = useState('923282519507');
  const [email, setEmail] = useState('kevin11.shop@proton.me');
  const [address, setAddress] = useState('Azizabad, Karachi 75950, Pakistan');

  // 2. Laborer: Policies State
  const [policies, setPolicies] = useState<Policy[]>([
    { title: 'Privacy Policy', content: 'Default Privacy Policy content...' },
    { title: 'Refund & Return Policy', content: 'Default Refund & Return content...' },
    { title: 'Terms & Conditions', content: 'Default Terms & Conditions content...' }
  ]);

  const updatePolicyContent = (index: number, content: string) => {
    const newPolicies = [...policies];
    newPolicies[index].content = content;
    setPolicies(newPolicies);
  };

  const handleSave = () => {
    alert("Settings synchronized with Admin Command Center!");
    // This is where Supabase connection will sit later
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <div>
          <h2 style={comicSansBold} className="text-3xl uppercase italic text-black">Footer Supervisor</h2>
          <p style={comicSansRegular} className="text-gray-500">Manage your contact info, social links, and legal policies.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-[#FFD700] border-2 border-black px-6 py-3 hover:bg-black hover:text-[#FFD700] transition-all"
          style={comicSansBold}
        >
          <Save size={20} /> SAVE CHANGES
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT COLUMN: Contact & Socials */}
        <div className="space-y-6">
          <section className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h3 style={comicSansBold} className="text-lg mb-4 flex items-center gap-2 border-b-2 border-gray-100 pb-2">
              <Phone size={18} className="text-[#FFD700]" /> CONTACT DETAILS
            </h3>
            <div className="space-y-4">
              <div>
                <label style={comicSansBold} className="text-xs uppercase block mb-1">Support Email</label>
                <input 
                  type="text" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-gray-200 p-2 focus:border-[#FFD700] outline-none" 
                  style={comicSansRegular}
                />
              </div>
              <div>
                <label style={comicSansBold} className="text-xs uppercase block mb-1">WhatsApp Business</label>
                <input 
                  type="text" 
                  value={whatsapp} 
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full border-2 border-gray-200 p-2 focus:border-[#FFD700] outline-none" 
                />
              </div>
              <div>
                <label style={comicSansBold} className="text-xs uppercase block mb-1">Physical Address</label>
                <textarea 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border-2 border-gray-200 p-2 focus:border-[#FFD700] outline-none" 
                  rows={2}
                />
              </div>
            </div>
          </section>

          <section className="bg-black text-white border-4 border-[#FFD700] p-6 shadow-[8px_8px_0px_0px_rgba(255,215,0,0.3)]">
            <h3 style={comicSansBold} className="text-lg mb-4 flex items-center gap-2 border-b border-gray-800 pb-2 text-[#FFD700]">
              <Facebook size={18} /> SOCIAL REACH
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Facebook size={20} className="text-gray-400" />
                <input 
                  placeholder="Facebook URL"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="flex-1 bg-transparent border-b border-gray-700 p-1 focus:border-[#FFD700] outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                <Instagram size={20} className="text-gray-400" />
                <input 
                  placeholder="Instagram URL"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="flex-1 bg-transparent border-b border-gray-700 p-1 focus:border-[#FFD700] outline-none text-sm"
                />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Policy Editor */}
        <div className="space-y-6">
          <section className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[500px]">
            <h3 style={comicSansBold} className="text-lg mb-4 flex items-center gap-2 border-b-2 border-gray-100 pb-2">
              <Type size={18} className="text-[#FFD700]" /> POLICY EDITOR
            </h3>
            
            <div className="space-y-8">
              {policies.map((policy, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span style={comicSansBold} className="text-sm bg-black text-white px-2 py-1">{policy.title}</span>
                    <div className="flex gap-2 text-gray-400">
                      <Bold size={14} className="hover:text-black cursor-pointer" />
                      <Italic size={14} className="hover:text-black cursor-pointer" />
                      <List size={14} className="hover:text-black cursor-pointer" />
                    </div>
                  </div>
                  <textarea 
                    value={policy.content}
                    onChange={(e) => updatePolicyContent(index, e.target.value)}
                    className="w-full border-2 border-gray-100 p-3 text-sm focus:border-black outline-none min-h-[120px] bg-gray-50"
                    style={comicSansRegular}
                    placeholder={`Enter ${policy.title} content...`}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminFooterSettings;
