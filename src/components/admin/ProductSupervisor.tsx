// src/components/admin/ProductSupervisor.tsx
import React, { useState } from 'react';
import { ProductIdentity } from './products/ProductIdentity';
import { ProductVisuals } from './products/ProductVisuals';
import { ProductLogistics } from './products/ProductLogistics';
import { ProductProfitSidebar } from './products/ProductProfitSidebar';
import { AdminGallery } from './AdminGallery'; 
import { supabase } from '../../lib/supabase';

export const ProductSupervisor: React.FC = () => {
  // --- 1. MASTER STATE ---
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [status, setStatus] = useState('draft');
  const [categoryId, setCategoryId] = useState<string | null>(null); // For Category Selection
  
  // Media State
  const [mainImage, setMainImage] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [isVaultOpen, setIsVaultOpen] = useState(false); 
  
  // Variants State
  const [variants, setVariants] = useState<any[]>([]);

  // --- 2. CALCULATED TOTALS FOR SIDEBAR ---
  const basePrice = variants.length > 0 ? variants[0].sellingPrice : 0;
  const baseCost = variants.length > 0 ? variants[0].costPrice : 0;
  const baseWeight = variants.length > 0 ? variants[0].weight : 0;

  // --- 3. THE SAVE LOGIC ---
  const handleSaveProduct = async () => {
    try {
      // Step A: Insert/Update Product
      const { data: product, error: pError } = await supabase
        .from('products')
        .upsert({
          title, 
          slug, 
          description, 
          status,
          category_id: categoryId, // Linking Category
          main_image: mainImage,
          gallery_images: gallery,
          meta_title: metaTitle,
          meta_description: metaDescription
        })
        .select()
        .single();

      if (pError) throw pError;

      // Step B: Insert Variants
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

        const { error: vError } = await supabase
          .from('product_variants')
          .upsert(variantsToSave);
          
        if (vError) throw vError;
      }

      alert("🚀 Product, Variants & Category Link Saved!");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleDiscard = () => {
    if(confirm("Discard all changes?")) window.location.reload();
  };

  // --- 4. MEDIA VAULT LOGIC ---
  const openMediaVault = () => setIsVaultOpen(true);

  const handleGallerySelect = (urls: string[]) => {
    const uniqueUrls = Array.from(new Set([...gallery, ...urls]));
    setGallery(uniqueUrls);
    if (!mainImage && uniqueUrls.length > 0) {
      setMainImage(uniqueUrls[0]);
    }
    setIsVaultOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 relative">
      <div className="grid grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: THE LABORS (70%) */}
        <div className="col-span-12 lg:col-span-8 space-y-10">
          
          <ProductIdentity 
            title={title} setTitle={setTitle}
            description={description} setDescription={setDescription}
            slug={slug} setSlug={setSlug}
            metaTitle={metaTitle} setMetaTitle={setMetaTitle}
            metaDescription={metaDescription} setMetaDescription={setMetaDescription}
            categoryId={categoryId} setCategoryId={setCategoryId} // Added Category Prop
          />

          <ProductVisuals 
            mainImage={mainImage} setMainImage={setMainImage}
            gallery={gallery} setGallery={setGallery}
            openMediaVault={openMediaVault}
          />

          <ProductLogistics 
            variants={variants} 
            setVariants={setVariants}
            availableImages={gallery} 
          />
          
        </div>

        {/* RIGHT COLUMN: THE COMMANDER (30%) */}
        <div className="col-span-12 lg:col-span-4">
          <ProductProfitSidebar 
            sellingPrice={basePrice}
            costPrice={baseCost}
            weightGrams={baseWeight}
            status={status}
            setStatus={setStatus}
            onSave={handleSaveProduct}
            onDiscard={handleDiscard}
          />
        </div>

      </div>

      {/* MEDIA VAULT POPUP */}
      {isVaultOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
             <AdminGallery 
                isModal={true} 
                onClose={() => setIsVaultOpen(false)} 
                onSelect={handleGallerySelect} 
             />
          </div>
        </div>
      )}
    </div>
  );
};
