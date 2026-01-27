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
      <div className="bg-white w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative">
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-black"><X /></button>
        <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-[#D4AF37] inline-block">{policyType} Policy</h2>
        <div className="prose prose-sm font-medium text-gray-600">
          <p>This is the {policyType} policy for KEVIN11. We ensure premium service for all our customers in Pakistan.</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyModal;
