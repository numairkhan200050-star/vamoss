// src/components/admin/collections/CollectionCreator.tsx
import React, { useState } from 'react';
import { Search, Plus, Trash2, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  image_url: string;
}

interface CollectionCreatorProps {
  onSave: (collectionData: any) => void;
  onCancel: () => void;
}

export const CollectionCreator = ({ onSave, onCancel }: CollectionCreatorProps) => {
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  const [collectionName, setCollectionName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // --- NOTE 9: MOCK DATA (Will be replaced by Supabase Product fetch) ---
  const productVault: Product[] = [
    { id: '1', name: 'Cotton Summer T-Shirt', price: '1200', image_url: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Premium Denim Jeans', price: '3500', image_url: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Black Hoodie Pro', price: '2800', image_url: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Summer Cotton Shorts', price: '1500', image_url: 'https://via.placeholder.com/50' },
  ];

  // --- FUZZY SEARCH LOGIC ---
  // This is not strict. It checks if the search word exists anywhere in the product name.
  const filteredSearch = productVault.filter(product => {
    if (!searchQuery) return false;
    const name = product.name.toLowerCase();
    const query = searchQuery.toLowerCase();
    return name.includes(query) || query.includes(name.split(' ')[0]);
  });

  const handleAddProduct = (product: Product) => {
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
    setSearchQuery(""); // Clear search after adding
  };

  const handleRemoveProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== id));
  };

  const handleFinalSave = () => {
    if (!collectionName) return alert("Please name your collection!");
    onSave({
      name: collectionName,
      products: selectedProducts
    });
  };

  return (
    <div className="bg-white border-8 border-black p-8 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center border-b-4 border-black pb-4 mb-8">
        <h2 style={comicSansBold} className="text-3xl uppercase italic tracking-tighter">
          Collection Creator
        </h2>
        <button onClick={onCancel} className="bg-red-500 text-white p-2 border-2 border-black hover:bg-black transition-all">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT SIDE: SEARCH & NAME */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label style={comicSansBold} className="block uppercase text-xs tracking-widest">1. Name Your Group</label>
            <input 
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="e.g. SUMMER ESSENTIALS"
              className="w-full p-4 border-4 border-black outline-none focus:bg-yellow-50 font-bold uppercase"
            />
          </div>

          <div className="space-y-2 relative">
            <label style={comicSansBold} className="block uppercase text-xs tracking-widest">2. Search & Add Products</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type name (e.g. 'Cotton' or 'Shirt')"
                className="w-full p-4 pl-12 border-4 border-black outline-none focus:border-[#FFD700]"
              />
            </div>

            {/* FUZZY SEARCH DROPDOWN */}
            {searchQuery && (
              <div className="absolute w-full z-50 bg-white border-4 border-black mt-1 max-h-60 overflow-y-auto shadow-2xl">
                {filteredSearch.map(product => (
                  <div 
                    key={product.id}
                    onClick={() => handleAddProduct(product)}
                    className="flex items-center gap-4 p-3 hover:bg-[#FFD700] cursor-pointer border-b-2 border-gray-100 last:border-0 transition-colors group"
                  >
                    <img src={product.image_url} alt="" className="w-12 h-12 border-2 border-black object-cover" />
                    <div className="flex-1">
                      <p className="font-black uppercase text-[10px] leading-tight group-hover:text-black">{product.name}</p>
                      <p className="text-[10px] font-mono text-gray-500 group-hover:text-black/70">Rs. {product.price}</p>
                    </div>
                    <Plus size={20} className="text-gray-300 group-hover:text-black" />
                  </div>
                ))}
                {filteredSearch.length === 0 && (
                  <div className="p-4 text-center text-gray-400 italic text-xs flex items-center justify-center gap-2">
                    <AlertCircle size={14} /> No products found...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: PREVIEW LIST */}
        <div className="space-y-4">
          <label style={comicSansBold} className="block uppercase text-xs tracking-widest">
            Collection Preview ({selectedProducts.length} Items)
          </label>
          <div className="border-4 border-black bg-gray-50 p-4 min-h-[300px] max-h-[400px] overflow-y-auto space-y-3">
            {selectedProducts.map((p, index) => (
              <div key={p.id} className="bg-white border-2 border-black p-2 flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <span className="text-[10px] font-black text-gray-300">#{index + 1}</span>
                <img src={p.image_url} className="w-10 h-10 border border-black object-cover" alt="" />
                <p className="flex-1 font-bold uppercase text-[10px] truncate">{p.name}</p>
                <button 
                  onClick={() => handleRemoveProduct(p.id)}
                  className="p-1 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {selectedProducts.length === 0 && (
              <div className="h-64 flex flex-col items-center justify-center text-gray-300">
                <ImageIcon size={48} className="opacity-20 mb-2" />
                <p className="uppercase font-black text-[10px] italic">Queue is empty</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER ACTION */}
