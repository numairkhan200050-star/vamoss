import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PolicyModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [policyType, setPolicyType] = useState('');

  useEffect(() => {
    const handleOpen = (e: any) => {
      setPolicyType(e.detail);
      setIsOpen(true);
    };
    window.addEventListener('open-policy', handleOpen);
    return () => window.removeEventListener('open-policy', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl p-8 relative shadow-2xl">
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-black hover:text-[#D4AF37]"><X /></button>
        <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-[#D4AF37] inline-block">{policyType} Policy</h2>
        <div className="prose prose-sm font-medium text-gray-600">
          <p>KEVIN11 {policyType} details will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
