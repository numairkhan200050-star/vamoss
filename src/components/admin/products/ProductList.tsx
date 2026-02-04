// src/components/admin/products/ProductList
import React, { useEffect, useState } from 'react';
import { Edit3, Trash2, Plus, Package, ExternalLink } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

interface ProductListProps {
  onEdit: (product: any) => void;
  onAddNew: () => void;
}

export const ProductList: React.FC<ProductListProps> = ({ onEdit, onAddNew }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name)
      `)
      .order('created_at', { ascending: false });

    if (!error && data) setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will remove the product and all its variants!")) return;
    
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      setProducts(products.filter(p => p.id !== id));
    } else {
      alert("Error deleting product");
    }
  };

  if (loading) return <div className="p-20 text-center font-black animate-pulse">LOADING INVENTORY...</div>;

  return (
    <div className="space-y-6">
      {/* LIST HEADER */}
      <div className="flex justify-between items-center border-b-8 border-black pb-6">
        <div>
          <h2 style={comicSansBold} className="text-4xl uppercase italic flex items-center gap-3">
            <Package size={36} className="text-[#FFD700]" /> Inventory
          </h2>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Manage your store's stock and visibility</p>
        </div>
        <button 
          onClick={onAddNew}
          className="bg-[#FFD700] border-4 border-black px-6 py-3 font-black uppercase flex items-center gap-2 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <Plus size={20} /> Add New Product
        </button>
      </div>

      {/* PRODUCTS TABLE */}
      <div className="border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-black text-white uppercase text-[10px] tracking-widest">
            <tr>
              <th className="p-4 border-r border-zinc-800">Product</th>
              <th className="p-4 border-r border-zinc-800">Category</th>
              <th className="p-4 border-r border-zinc-800">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-black">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-yellow-50 transition-colors">
                <td className="p-4 flex items-center gap-4">
                  <div className="w-16 h-16 border-2 border-black bg-gray-100 overflow-hidden flex-shrink-0">
                    {product.main_image ? (
                      <img src={product.main_image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-full h-full p-4 text-gray-300" />
                    )}
                  </div>
                  <div>
                    <div className="font-black uppercase text-sm">{product.title}</div>
                    <div className="text-[10px] text-gray-400 font-mono italic">/{product.slug}</div>
                  </div>
                </td>
                <td className="p-4 border-x-2 border-black">
                  <span className="bg-zinc-100 border-2 border-black px-2 py-1 text-[10px] font-black uppercase">
                    {product.categories?.name || 'Uncategorized'}
                  </span>
                </td>
                <td className="p-4 border-r-2 border-black">
                  <span className={`text-[10px] font-black uppercase px-2 py-1 border-2 border-black ${
                    product.status === 'active' ? 'bg-green-400' : 'bg-gray-300'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => onEdit(product)}
                      className="p-2 border-2 border-black hover:bg-[#FFD700] transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 border-2 border-black hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
          <div className="p-20 text-center uppercase font-black text-gray-300 italic">
            Your warehouse is empty. Start adding products!
          </div>
        )}
      </div>
    </div>
  );
};
