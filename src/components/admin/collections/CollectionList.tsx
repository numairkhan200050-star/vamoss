// src/admin/components/admin/collections/CollectionList.tsx

import React, { useState } from 'react';
import { 
  FolderTree, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Eye,
  PackageCheck
} from 'lucide-react';

// STYLES
const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

interface Collection {
  id: string;
  name: string;
  productCount: number;
  image: string;
}

export const CollectionList = () => {
  const [isAdding, setIsAdding] = useState(false);
  // Mock data - This will eventually come from Note 9 (Supabase)
  const [collections, setCollections] = useState<Collection[]>([
    { id: '1', name: 'Summer Essentials', productCount: 12, image: 'https://via.placeholder.com/50' },
  ]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-end border-b-4 border-black pb-4">
        <div>
          <h2 style={comicSansBold} className="text-3xl uppercase italic flex items-center gap-3">
            <FolderTree className="text-[#FFD700]" size={32} /> Collection Supervisor
          </h2>
          <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest">Group products into sets for Categories or Pages.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-black text-[#FFD700] px-6 py-3 flex items-center gap-2 border-2 border-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          style={comicSansBold}
        >
          <Plus size={20} /> NEW COLLECTION
        </button>
      </div>

      {/* COLLECTION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => (
          <div key={col.id} className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform">
            <div className="flex gap-4 items-center mb-4">
              <img src={col.image} className="w-16 h-16 border-2 border-black object-cover" alt={col.name} />
              <div>
                <h3 style={comicSansBold} className="uppercase text-lg leading-none">{col.name}</h3>
                <p className="text-[10px] font-bold text-gray-400 mt-1 flex items-center gap-1">
                  <PackageCheck size={12} /> {col.productCount} PRODUCTS
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 border-t-2 border-black pt-4">
              <button className="flex items-center justify-center gap-1 py-2 text-[10px] font-bold uppercase hover:bg-gray-100 border border-transparent hover:border-black transition-all">
                <Eye size={14} /> View
              </button>
              <button className="flex items-center justify-center gap-1 py-2 text-[10px] font-bold uppercase hover:bg-gray-100 border border-transparent hover:border-black transition-all">
                <Edit3 size={14} /> Edit
              </button>
              <button className="flex items-center justify-center gap-1 py-2 text-[10px] font-bold uppercase text-red-600 hover:bg-red-50 border border-transparent hover:border-black transition-all">
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL OVERLAY FOR ADDING/EDITING */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-8 border-black w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-[15px_15px_0px_0px_rgba(255,215,0,1)]">
             <CollectionEditor onClose={() => setIsAdding(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

// --- INTERNAL LABORER: THE EDITOR ---
const CollectionEditor = ({ onClose }: { onClose: () => void }) => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };
  const [pickedProducts, setPickedProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // Simulated product database for the "Visual Search"
  const mockDb = [
    { id: 1, name: "Premium Cotton T-Shirt", price: "$25", img: "https://via.placeholder.com/40" },
    { id: 2, name: "Premium Cotton Hoodie", price: "$55", img: "https://via.placeholder.com/40" },
    { id: 3, name: "Summer Shorts", price: "$20", img: "https://via.placeholder.com/40" },
  ];

  const results = search ? mockDb.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : [];

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center border-b-2 border-black pb-4">
        <h2 style={comicSansBold} className="text-2xl uppercase italic">Setup Collection</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-black uppercase text-xs font-black">Close [X]</button>
      </div>

      <div className="space-y-4">
        <label style={comicSansBold} className="block uppercase text-sm">Collection Name</label>
        <input className="w-full p-4 border-4 border-black outline-none focus:bg-yellow-50 font-bold" placeholder="e.g. Best Sellers" />
      </div>

      {/* VISUAL SEARCH ENGINE */}
      <div className="space-y-4 relative">
        <label style={comicSansBold} className="block uppercase text-sm flex items-center gap-2">
          <Search size={18} /> Search & Add Products
        </label>
        <div className="flex gap-2">
          <input 
            className="flex-1 p-4 border-4 border-black outline-none" 
            placeholder="Type product name (e.g. Cotton...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* SEARCH RESULTS DROPDOWN */}
        {results.length > 0 && (
          <div className="absolute w-full bg-white border-4 border-black z-10 shadow-xl mt-[-4px]">
            {results.map(p => (
              <div 
                key={p.id} 
                onClick={() => {
                  if(!pickedProducts.find(item => item.id === p.id)) setPickedProducts([...pickedProducts, p]);
                  setSearch("");
                }}
                className="flex items-center gap-4 p-3 hover:bg-yellow-50 cursor-pointer border-b-2 border-gray-100 last:border-0"
              >
                <img src={p.img} className="w-10 h-10 border-2 border-black" />
                <div className="flex-1">
                  <p className="font-bold uppercase text-xs">{p.name}</p>
                  <p className="text-[10px] text-gray-500">{p.price}</p>
                </div>
                <Plus size={16} className="text-[#FFD700]" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PICKED PRODUCTS PREVIEW */}
      <div className="space-y-4">
        <label style={comicSansBold} className="block uppercase text-sm">Products in this Collection ({pickedProducts.length})</label>
        <div className="grid grid-cols-1 gap-2">
          {pickedProducts.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 border-2 border-black">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-gray-300">#{(idx+1).toString().padStart(2, '0')}</span>
                <img src={p.img} className="w-8 h-8 border border-black" />
                <p className="font-bold text-xs uppercase">{p.name}</p>
              </div>
              <button 
                onClick={() => setPickedProducts(pickedProducts.filter(item => item.id !== p.id))}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {pickedProducts.length === 0 && (
             <div className="py-10 text-center border-4 border-dashed border-gray-100 text-gray-300 font-bold uppercase italic">No products added yet</div>
          )}
        </div>
      </div>

      <button className="w-full py-5 bg-black text-[#FFD700] border-4 border-black font-black uppercase tracking-widest hover:bg-[#FFD700] hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        SAVE COLLECTION
      </button>
    </div>
  );
};

export default CollectionList;
