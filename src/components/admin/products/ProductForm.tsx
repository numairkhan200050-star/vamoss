// src/components/admin/products/ProductForm.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

import { BasicInfo } from "./BasicInfo";
import { CategoryCollectionSelection } from "./CategoryCollectionSelection";
import { PricingProfit } from "./PricingProfit";
import { ProductGalleryManager } from "./ProductGalleryManager";
import { ProductMedia } from "./ProductMedia";
import { VariantsMedia } from "./VariantsMedia";
import { SEOSettings } from "./SEOSettings";
import { ProductStatusActions } from "./ProductStatusActions";

export interface Variant {
  colorName: string;
  imageUrl: string;
  costPrice: number;
  sellingPrice: number;
  oldPrice?: number;
  weight: number; // in grams
}

export const ProductForm: React.FC = () => {
  /* ---------------- BASIC INFO ---------------- */
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  /* ---------------- CATEGORY & COLLECTION ---------------- */
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  /* ---------------- MEDIA ---------------- */
  const [mainImage, setMainImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<{ id: string; url: string }[]>([]);

  /* ---------------- VARIANTS ---------------- */
  const [variants, setVariants] = useState<Variant[]>([]);
  const [quantity, setQuantity] = useState<number>(1); // New: number of items user buys

  /* ---------------- SEO ---------------- */
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  /* ---------------- STATUS ---------------- */
  const [status, setStatus] = useState("draft");

  /* ---------------- SHIPPING & PROFIT ---------------- */
  const [shippingTiers, setShippingTiers] = useState<{ id?: number; max_weight_grams: number; rate: number }[]>([]);

  useEffect(() => {
    const fetchShippingTiers = async () => {
      const { data } = await supabase
        .from("shipping_tiers")
        .select("*")
        .order("max_weight_grams", { ascending: true });
      if (data) setShippingTiers(data);
    };
    fetchShippingTiers();
  }, []);

  /* ---------------- CALCULATIONS ---------------- */
  const totalWeight = variants.length > 0
    ? variants.reduce((sum, v) => sum + (v.weight || 0), 0) * quantity
    : 0;

  const totalCostPrice = variants.length > 0
    ? variants.reduce((sum, v) => sum + (v.costPrice || 0), 0)
    : 0;

  const totalSellingPrice = variants.length > 0
    ? variants.reduce((sum, v) => sum + (v.sellingPrice || 0), 0)
    : 0;

  const shippingCost =
    shippingTiers.find(tier => totalWeight <= tier.max_weight_grams)?.rate || 0;

  const netProfit = totalSellingPrice - totalCostPrice - shippingCost;

  const margin = totalSellingPrice > 0 ? Number(((netProfit / totalSellingPrice) * 100).toFixed(1)) : 0;

  /* ---------------- ACTIONS ---------------- */
  const handleSave = () => {
    const payload = {
      title,
      slug,
      description,
      category_id: selectedCategory,
      collections: selectedCollections,
      mainImage,
      galleryImages: galleryImages.map(img => img.url),
      variants,
      quantity, // Save quantity
      metaTitle,
      metaDescription,
      status,
      shippingCost,
      netProfit,
    };

    console.log("Saving product:", payload);
    alert("Product saved! (Check console)");
    // 👉 Add Supabase insert/update logic here
  };

  const handleDiscard = () => window.location.reload();
  const handleDelete = () => console.log("Delete product logic");

  return (
    <div className="grid grid-cols-12 gap-6">

      {/* LEFT COLUMN */}
      <div className="col-span-8 space-y-6">
        <BasicInfo
          title={title}
          setTitle={setTitle}
          slug={slug}
          setSlug={setSlug}
          description={description}
          setDescription={setDescription}
        />

        <ProductMedia
          mainImage={mainImage}
          setMainImage={setMainImage}
          galleryImages={galleryImages.map(img => img.url)}
          setGalleryImages={(urls) => setGalleryImages(urls.map(url => ({ id: crypto.randomUUID(), url })))}
        />

        <ProductGalleryManager
          images={galleryImages}
          setImages={setGalleryImages}
          setMainImage={setMainImage}
        />

        <VariantsMedia
          variants={variants}
          setVariants={setVariants}
        />

        <CategoryCollectionSelection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCollections={selectedCollections}
          setSelectedCollections={setSelectedCollections}
        />

        {/* New: Quantity input */}
        <div className="flex items-center gap-2">
          <label className="font-bold">Quantity:</label>
          <input type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="border p-2 w-20"/>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-4 space-y-6">
        <PricingProfit
          costPrice={totalCostPrice}
          sellingPrice={totalSellingPrice}
          weight={totalWeight}
          shippingCost={shippingCost}
          netProfit={netProfit}
          margin={margin}
        />

        <SEOSettings
          metaTitle={metaTitle}
          setMetaTitle={setMetaTitle}
          metaDescription={metaDescription}
          setMetaDescription={setMetaDescription}
          slug={slug}
        />

        <ProductStatusActions
          status={status}
          setStatus={setStatus}
          onSave={handleSave}
          onDiscard={handleDiscard}
          onDelete={handleDelete}
          isEditMode={false}
        />
      </div>

    </div>
  );
};
