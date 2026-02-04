// src/components/admin/ProductSupervisor.tsx
import React, { useState } from 'react';
import { ProductIdentity } from './products/ProductIdentity';
import { ProductVisuals } from './products/ProductVisuals';
import { ProductLogistics } from './products/ProductLogistics';
import { ProductProfitSidebar } from './products/ProductProfitSidebar';
import { ProductList } from './products/ProductList'; // New Labor
import { AdminGallery } from './AdminGallery'; 
import { supabase } from '../../lib/supabase';
import { ArrowLeft } from 'lucide-react';

export const ProductSupervisor: React.FC = () => {
  // --- VIEW CONTROL ---
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);

  // --- MASTER STATE ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [status, setStatus] = useState('draft');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [variants, setVariants] = useState<any[]>([]);

  // --- RESET FORM ---
  const resetForm = () => {
    setTitle(''); setDescription(''); setSlug('');
    setMetaTitle(''); setMetaDescription(''); setStatus('draft');
    setCategoryId(null); setMainImage(''); setGallery([]);
    setVariants([]); setEditingId(null);
    setView('list');
  };

  // --- EDIT LOGIC ---
  const handleEditProduct = (product: any) => {
    setEditingId(product.id);
    setTitle(product.title || '');
    setDescription(product.description || '');
    setSlug(product.slug || '');
    setMetaTitle(product.meta_title || '');
    setMetaDescription(product.meta_description || '');
    setStatus(product.status || 'draft');
    setCategoryId(product.category_id || null);
    setMainImage(product.main_image || '');
    setGallery(product.gallery_images || []);
    // Note: Variants fetch karne ka logic yahan add ho sakta hai
    setView('editor');
  };

  // --- SAVE LOGIC ---
  const handleSaveProduct = async () => {
    try {
      const { data: product, error: pError } = await supabase
        .from('products')
        .upsert({
          id: editingId || undefined, // Use existing ID if editing
          title, slug, description, status,
          category_id: categoryId,
          main_image: mainImage,
          gallery_images: gallery,
          meta_title: metaTitle,
          meta_description: metaDescription
        })
        .select().single();

      if (pError) throw pError;

      if (variants.length > 0) {
        const variantsToSave = variants.map(v => ({
          product_id: product.id,
          color_name: v.colorName,
          color_code: v.colorCode,
          image_url: v.imageUrl,
          cost_price: v.costPrice,
          selling_price: v.sellingPrice,
          weight_grams: v.weight
        }));
        const { error: vError } = await supabase.from('product_variants').upsert(variantsToSave);
        if (vError) throw vError;
      }

      alert("🚀 Product Saved Successfully!");
      resetForm();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  // --- MEDIA VAULT ---
  const handleGallerySelect = (urls: string[]) => {
    const uniqueUrls = Array.from(new Set([...gallery, ...urls]));
    setGallery(uniqueUrls);
    if (!mainImage && uniqueUrls.length > 0) setMainImage(uniqueUrls[0]);
    setIsVaultOpen(false);
  };

  // --- RENDER LOGIC ---
  if (view === 'list') {
    return (
      <div className="p-8">
        <ProductList 
          onEdit={handleEditProduct} 
          onAddNew={() => { resetForm(); setView('editor'); }} 
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 relative">
      {/* HEADER WITH BACK BUTTON */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setView('list')} className="p-2 border-4 border-black hover:bg-black hover:text-white transition-all">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-black uppercase italic">
          {editingId ? 'Edit Product' : 'Create New Product'}
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-10">
          <ProductIdentity 
            title={title} setTitle={setTitle}
            description={description} setDescription={setDescription}
            slug={slug} setSlug={setSlug}
            metaTitle={metaTitle} setMetaTitle={setMetaTitle}
            metaDescription={metaDescription} setMetaDescription={setMetaDescription}
            categoryId={categoryId} setCategoryId={setCategoryId}
          />
          <ProductVisuals 
            mainImage={mainImage} setMainImage={setMainImage}
            gallery={gallery} setGallery={setGallery}
            openMediaVault={() => setIsVaultOpen(true)}
          />
          <ProductLogistics variants={variants} setVariants={setVariants} availableImages={gallery} />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <ProductProfitSidebar 
            sellingPrice={variants.length > 0 ? variants[0].sellingPrice : 0}
            costPrice={variants.length > 0 ? variants[0].costPrice : 0}
            weightGrams={variants.length > 0 ? variants[0].weight : 0}
            status={status} setStatus={setStatus}
            onSave={handleSaveProduct}
            onDiscard={resetForm}
          />
        </div>
      </div>

      {isVaultOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
             <AdminGallery isModal={true} onClose={() => setIsVaultOpen(false)} onSelect={handleGallerySelect} />
          </div>
        </div>
      )}
    </div>
  );
};
