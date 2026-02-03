// src/components/admin/AdminGallery.tsx
import React, { useState, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Trash2, 
  Copy, 
  Plus, 
  CheckCircle2, 
  RefreshCcw,
  Search
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ImageUploader } from '../ImageUploader';

interface GalleryImage {
  name: string;
  url: string;
  created_at: string;
}

export const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Styles
  const comicSansBold = { fontFamily: '"Comic Sans MS", "Comic Sans", "Chalkboard SE", cursive', fontWeight: 'bold' as const };

  const fetchImages = async () => {
    setLoading(true);
    try {
      // NOTE: Replace 'store-assets' with your actual Supabase bucket name
      const { data, error } = await supabase.storage.from('store-assets').list('', {
        limit: 100,
        order: { column: 'created_at', ascending: false }
      });

      if (error) throw error;

      if (data) {
        const imageUrls = await Promise.all(
          data.map(async (file) => {
            const { data: urlData } = supabase.storage
              .from('store-assets')
              .getPublicUrl(file.name);
            return {
              name: file.name,
              url: urlData.publicUrl,
              created_at: file.created_at
            };
          })
        );
        setImages(imageUrls);
      }
    } catch (err) {
      console.error("Gallery Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const deleteImage = async (name: string) => {
    if (!window.confirm("Are you sure? This will break any section using this image!")) return;
    
    const { error } = await supabase.storage.from('store-assets').remove([name]);
    if (!error) {
      setImages(images.filter(img => img.name !== name));
    }
  };

  const filteredImages = images.filter(img => 
    img.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-black pb-6 gap-4">
        <div>
          <h2 style={comicSansBold} className="text-4xl uppercase italic text-black flex items-center gap-3">
            <ImageIcon className="text-[#FFD700]" size={36} /> MEDIA VAULT
          </h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">
            Centralized assets for banners, products, and categories.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search images..."
              className="pl-10 pr-4 py-2 border-2 border-black outline-none focus:bg-yellow-50 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={fetchImages}
            className="p-2 border-2 border-black hover:bg-gray-100 transition-colors"
          >
            <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* UPLOAD SECTION */}
      <section className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h3 style={comicSansBold} className="text-lg uppercase mb-4 flex items-center gap-2">
          <Plus size={20} /> Add to Vault
        </h3>
        <ImageUploader onUploadSuccess={fetchImages} />
      </section>

      {/* GRID VIEW */}
      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-black border-t-[#FFD700] rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredImages.map((img, index) => (
            <div 
              key={img.name} 
              className="group bg-white border-2 border-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col"
            >
              <div className="aspect-square overflow-hidden border-b-2 border-black bg-gray-100 relative">
                <img 
                  src={img.url} 
                  alt={img.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    onClick={() => copyToClipboard(img.url, index)}
                    className="p-2 bg-[#FFD700] text-black border border-black hover:bg-white transition-colors"
                    title="Copy URL"
                  >
                    {copiedIndex === index ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  </button>
                  <button 
                    onClick={() => deleteImage(img.name)}
                    className="p-2 bg-red-600 text-white border border-black hover:bg-black transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-[10px] font-mono truncate text-gray-600">{img.name}</p>
                {copiedIndex === index && (
                  <p className="text-[9px] text-green-600 font-bold uppercase mt-1">Copied!</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredImages.length === 0 && !loading && (
        <div className="text-center py-20 border-4 border-dashed border-gray-200">
          <ImageIcon size={48} className="mx-auto text-gray-200 mb-2" />
          <p style={comicSansBold} className="text-gray-400 uppercase tracking-widest">Vault is Empty</p>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
