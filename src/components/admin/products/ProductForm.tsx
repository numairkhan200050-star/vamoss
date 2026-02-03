// src/components/admin/products/ProductForm.tsx
import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

import { BasicInfo } from "./BasicInfo";
import { CategoryCollectionSelection } from "./CategoryCollectionSelection";
import { InventoryStock } from "./InventoryStock";
import { PricingProfit } from "./PricingProfit";
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
  weight: number; // Weight per variant
}

export interface ShippingTier {
  id?: number;
  maxWeight: number; // grams
  rate: number; // price for this tier
}

export const ProductForm = () => {
  /* ---------------- BASIC INFO ---------------- */
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  /* ---------------- CATEGORY & COLLECTION ---------------- */
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollections, setSelectedCollections] = useState<number[]>([]);

  /* ---------------- INVENTORY ---------------- */
  const [sku, setSku] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [trackInventory, setTrackInventory] = useState(true);
  const [allowBackorder, setAllowBackorder] = useState(false);

  /* ---------------- PRODUCT WEIGHT ---------------- */
  const [weight, setWeight] = useState(0); // Default weight if no variant

  /* ---------------- PRICING ---------------- */
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState<number | undefined>(undefined);

  /* ---------------- MEDIA & VARIANTS ---------------- */
  const [mainImage, setMainImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);

  /* ---------------- SEO ---------------- */
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  /* ---------------- STATUS ---------------- */
  const [status, setStatus] = useState("draft");

  /* ---------------- SHIPPING SETTINGS ---------------- */
  const [shippingTiers, setShippingTiers] = useState<ShippingTier[]>([]);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState<number>(0);
  const [loadingShipping, setLoadingShipping] = useState(true);

  /* ---------------- FETCH SHIPPING SETTINGS ---------------- */
  useEffect(() => {
    const fetchShippingSettings = async () => {
      setLoadingShipping(true);
      try {
        const { data: tierData } = await supabase.from("shipping_tiers").select("*");
        if (tierData) setShippingTiers(tierData as ShippingTier[]);

        const { data: generalSettings } = await supabase
          .from("general_settings")
          .select("free_shipping_threshold")
          .single();

        if (generalSettings?.free_shipping_threshold) {
          setFreeShippingThreshold(generalSettings.free_shipping_threshold);
        }
      } catch (err) {
        console.error("Error fetching shipping settings:", err);
      } finally {
        setLoadingShipping(false);
      }
    };

    fetchShippingSettings();
  }, []);

  /* ---------------- SHIPPING CALCULATIONS ---------------- */
  const getTotalWeight = () => {
    if (variants.length > 0) {
      return variants.reduce((sum, v) => sum + (v.weight || 0) * quantity, 0);
    }
    return weight * quantity;
  };

  const calculateShipping = (totalWeight: number) => {
    if (shippingTiers.length === 0) return 0;

    // Find the first tier where totalWeight <= maxWeight
    const tier = shippingTiers
      .sort((a, b) => a.maxWeight - b.maxWeight)
      .find((t) => totalWeight <= t.maxWeight);

    return tier ? tier.rate : shippingTiers[shippingTiers.length - 1].rate;
  };

  const getTotalSellingPrice = () => {
    if (variants.length > 0) {
      return variants.reduce((sum, v) => sum + (v.sellingPrice || 0) * quantity, 0);
    }
    return (quantity || 1) * sellingPrice;
  };

  const getShippingPrice = () => {
    const totalWeight = getTotalWeight();
    const totalPrice = getTotalSellingPrice();
    if (totalPrice >= freeShippingThreshold) return 0;
    return calculateShipping(totalWeight);
  };

  const getProfit = () => {
    let cost = 0;
    if (variants.length > 0) {
      cost = variants.reduce((sum, v) => sum + (v.costPrice || 0) * quantity, 0);
    } else {
      cost = (costPrice || 0) * quantity;
    }
    return getTotalSellingPrice() - cost - getShippingPrice();
  };

  /* ---------------- ACTION HANDLERS ---------------- */
  const handleSave = () => {
    const productPayload = {
      title,
      slug,
      description,
      category_id: selectedCategory,
      collections: selectedCollections,
      sku,
      quantity,
      trackInventory,
      allowBackorder,
      weight,
      mainImage,
      galleryImages,
      variants,
      metaTitle,
      metaDescription,
      status,
      shippingRate: getShippingPrice(),
      profit: getProfit(),
      costPrice,
      sellingPrice,
      oldPrice,
    };

    console.log("Saving Product:", productPayload);
    alert("Product saved! (Check console for payload)");
    // 👉 Supabase insert logic goes here
  };

  const handleDiscard = () => window.location.reload();
  const handleDelete = () => console.log("Delete product logic later");

  if (loadingShipping) return <p>Loading shipping settings...</p>;

  /* ---------------- LAYOUT ---------------- */
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
          galleryImages={galleryImages}
          setGalleryImages={setGalleryImages}
          variants={variants}
          setVariants={setVariants}
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
      </div>

      {/* RIGHT COLUMN */}
      <div className="col-span-4 space-y-6">
        <PricingProfit
          costPrice={costPrice}
          setCostPrice={setCostPrice}
          sellingPrice={sellingPrice}
          setSellingPrice={setSellingPrice}
          oldPrice={oldPrice}
          setOldPrice={setOldPrice}
          weight={weight}
          setWeight={setWeight}
          shippingPrice={getShippingPrice()}
          profit={getProfit()}
        />

        <InventoryStock
          sku={sku}
          setSku={setSku}
          quantity={quantity}
          setQuantity={setQuantity}
          trackInventory={trackInventory}
          setTrackInventory={setTrackInventory}
          allowBackorder={allowBackorder}
          setAllowBackorder={setAllowBackorder}
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
