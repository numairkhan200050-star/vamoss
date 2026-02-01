import React, { useState } from 'react';

interface Policy {
  title: string;
  content: string;
}

export const AdminFooterSettings = () => {
  // Social links state
  const [facebook, setFacebook] = useState('https://facebook.com');
  const [instagram, setInstagram] = useState('https://instagram.com');
  const [whatsapp, setWhatsapp] = useState('923282519507');

  // Policies state
  const [policies, setPolicies] = useState<Policy[]>([
    { title: 'Privacy Policy', content: 'Default Privacy Policy content...' },
    { title: 'Refund & Return Policy', content: 'Default Refund & Return content...' },
    { title: 'Terms & Conditions', content: 'Default Terms & Conditions content...' }
  ]);

  // Save function (replace with Supabase update later)
  const saveFooterSettings = () => {
    alert('Footer settings saved! (connect to DB later)');
    console.log({ facebook, instagram, whatsapp, policies });
  };

  // Update policy content
  const updatePolicyContent = (index: number, content: string) => {
    const newPolicies = [...policies];
    newPolicies[index].content = content;
    setPolicies(newPolicies);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black mb-4">Footer Settings</h2>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="font-bold">Social Links</h3>

        <div>
          <label>Facebook URL</label>
          <input 
            className="w-full border p-2" 
            value={facebook} 
            onChange={e => setFacebook(e.target.value)} 
          />
        </div>

        <div>
          <label>Instagram URL</label>
          <input 
            className="w-full border p-2" 
            value={instagram} 
            onChange={e => setInstagram(e.target.value)} 
          />
        </div>

        <div>
          <label>WhatsApp Number</label>
          <input 
            className="w-full border p-2" 
            value={whatsapp} 
            onChange={e => setWhatsapp(e.target.value)} 
          />
        </div>
      </div>

      {/* Policies */}
      <div className="space-y-4">
        <h3 className="font-bold">Policy Modals</h3>
        {policies.map((policy, index) => (
          <div key={index} className="mb-4">
            <label className="font-bold">{policy.title}</label>
            <textarea
              className="w-full border p-2"
              rows={4}
              value={policy.content}
              onChange={e => updatePolicyContent(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button
        onClick={saveFooterSettings}
        className="bg-black text-white px-6 py-2 font-black uppercase"
      >
        Save Footer Settings
      </button>
    </div>
  );
};
