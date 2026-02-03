import React, { useState } from "react";

import { BasicInfo } from "./BasicInfo";
import { CategoryCollectionSelection } from "./CategoryCollectionSelection";
import { InventoryStock } from "./InventoryStock";
import { PricingProfit } from "./PricingProfit";
import { ProductMedia } from "./ProductMedia";
import { VariantsMedia } from "./VariantsMedia";
import { SEOSettings } from "./SEOSettings";
import { ProductStatusActions } from "./ProductStatusActions";

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

  /* ---------------- PRICING ---------------- */
  const [costPrice, setCostPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [weight, setWeight] = useState(0);

  /* ---------------- MEDIA ---------------- */
  const [mainImage, setMainImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [variants, setVariants] = useState<any[]>([]);

  /* ---------------- SEO ---------------- */
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  /* ---------------- STATUS ---------------- */
  const [status, setStatus] = useState("draft");

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
      costPrice,
      sellingPrice,
      oldPrice,
      weight,
      mainImage,
      galleryImages,
      variants,
      metaTitle,
      metaDescription,
      status,
    };

    console.log("Saving Product:", productPayload);

    // 👉 Supabase insert will come later (Objective 3)
  };

  const handleDiscard = () => {
    window.location.reload();
  };

  const handleDelete = () => {
    console.log("Delete product logic later");
  };

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
