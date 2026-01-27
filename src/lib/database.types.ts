export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  is_main_menu: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  main_image_url: string;
  category_id: string;
  price_now: number;
  price_was: number | null;
  cost_price: number;
  weight_grams: number;
  meta_title: string | null;
  meta_description: string | null;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  color_name: string;
  variant_image_url: string;
  additional_price: number;
}

export interface ShippingSetting {
  id: string;
  rate_name: string;
  weight_limit_grams: number;
  price: number;
}
