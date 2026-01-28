import React, { useEffect, useState } from 'react';
import { ChevronRight, Zap, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase'; // Ensure your path is correct

interface Category {
  id: string;
  name: string;
  slug: string;
  sub_categories: string[]; // This is the list you edit in Admin
}

export const CategoryDropdown = ({ isOpen }: { isOpen: boolean }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (!error && data) {
        setCategories(data);
      }
      setLoading(false);
    };

    if (isOpen) fetchCategories();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white border-b-4 border-black z-[100] shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-in slide-in-from-top-2 duration-300">
      <div className="max-w-7xl mx-auto p-10">
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {categories.map((cat) => (
              <div key={cat.id} className="space-y-4">
                {/* Main Category Header */}
                <div className="flex items-center gap-2 text-[#D4AF37] border-b-2 border-black pb-2">
                  <Zap size={14} className="fill-current" />
                  <h3 className="font-black uppercase italic text-sm text-black tracking-tight">
                    {cat.name}
                  </h3>
                </div>
                
                {/* Sub-Categories (Dynamically updated from Admin) */}
                <ul className="space-y-2">
                  {cat.sub_categories?.map((sub, index) => (
                    <li key={index}>
                      <a 
                        href={`/category/${cat.slug}?filter=${sub.toLowerCase()}`} 
                        className="flex items-center justify-between group text-[11px] font-bold uppercase text-gray-500 hover:text-black transition-colors"
                      >
                        {sub}
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#D4AF37]" />
                      </a>
                    </li>
                  ))}
                  {(!cat.sub_categories || cat.sub_categories.length === 0) && (
                    <li className="text-[10px] text-gray-400 italic font-medium">View All {cat.name}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Help Bar */}
      <div className="bg-black py-3 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white">
          Shop by Category  —  <span className="text-[#D4AF37]">Fast Delivery Across Pakistan</span>
        </p>
      </div>
    </div>
  );
};
