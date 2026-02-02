// src/components/admin/products/AdminProductForm.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Calculator } from 'lucide-react';

import { BasicInfo } from './BasicInfo';
import { PricingProfit } from './PricingProfit';
import { ProductMedia } from './ProductMedia';
import { VariantsMedia } from './VariantsMedia';
import { CategoryCollectionSelection } from './CategoryCollectionSelection';

export const AdminProductForm: React.FC = () => {
  // --- Basic Info ---
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // --- Media ---
  const [mainImage, setMainImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  // --- Variants ---
  const [variants, setVariants] = useState([{ color_name: '', image_url: '' }]);

  // --- Pricing & Logistics ---
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const [shippingRates, setShippingRates] = useState<any[]>([]);

  // --- Categories & Collections ---
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);

  // --- Status ---
  const [status, setStatus] = useState('published');

  // --- Fetch initial data ---
  useEffect(() => {
    const fetchData = async () => {
      const { data: cat } = await supabase.from('categories').select('*');
      const { data: coll } = await supabase.from('collections').select('*');
      const { data: ship } = await supabase.from('shipping_settings').select('*');

      if (cat) setCategories(cat);
      if (coll) setCollections(coll);
      if (ship) setShippingRates(ship);
    };
    fetchData();
  }, []);

  // --- Shipping, Profit, Margin Logic ---
  const shippingCost = shippingRates.find(r => weight <= r.weight_limit_grams)?.price || 0;
  const netProfit = sellingPrice - costPrice - shippingCost;
  const margin = sellingPrice > 0 ? ((netProfit / sellingPrice) * 100).toFixed(1) : 0;

  // --- Save Product ---
  const handleSave = async () => {
    if (!title || !selectedCategory || !mainImage) {
      return alert("Missing Data: Title, Category, and Main Image are required");
    }

    // Insert product
    const { data: product, error } = await supabase.from('products').insert([{
      title,
      slug,
      description,
      main_image_url: mainImage,
      price_now: sellingPrice,
      price_was: oldPrice,
      cost_price: costPrice,
      weight_grams: weight,
      status,
      category_id: selectedCategory,
      meta_title: metaTitle || title,
      meta_description: metaDescription || description.substring(0, 160),
    }]).select().single();

    if (product) {
      // Save variants
      const variantsToSave = variants.filter(v => v.color_name && v.image_url).map(v => ({
        ...v,
        product_id: product.id
      }));
      if (variantsToSave.length) await supabase.from('product_variants').insert(variantsToSave);

      // Save product-collections relation
      if (selectedCollections.length) {
        const collToSave = selectedCollections.map(collId => ({
          product_id: product.id,
          collection_id: collId
        }));
        await supabase.from('product_collections').insert(collToSave);
      }

      alert("Success! Product published.");
    } else {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-black bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-black uppercase italic tracking-tighter">Product Engine</h1>
        <button onClick={handleSave} className="bg-[#FFD700] border-4 border-black px-10 py-3 font-black uppercase italic hover:bg-black hover:text-[#FFD700] transition-all">
          <Save className="inline mr-2" /> Publish Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <BasicInfo
            title={title} setTitle={setTitle}
            slug={slug} setSlug={setSlug}
            description={description} setDescription={setDescription}
          />

          <ProductMedia
            mainImage={mainImage} setMainImage={setMainImage}
            galleryImages={galleryImages} setGalleryImages={setGalleryImages}
          />

          <VariantsMedia
            variants={variants} setVariants={setVariants}
          />

          <CategoryCollectionSelection
            categories={categories}
            collections={collections}
            selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
            selectedCollections={selectedCollections} setSelectedCollections={setSelectedCollections}
          />
        </div>

        {/* RIGHT COLUMN */}
        <PricingProfit
          costPrice={costPrice} setCostPrice={setCostPrice}
          sellingPrice={sellingPrice} setSellingPrice={setSellingPrice}
          oldPrice={oldPrice} setOldPrice={setOldPrice}
          weight={weight} setWeight={setWeight}
          shippingRates={shippingRates}
        />
      </div>
    </div>
  );
};
