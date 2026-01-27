/*
  # Create Products Table for E-commerce Store

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (numeric) - Product price
      - `image` (text) - Product image URL
      - `size` (text) - Grid size ('1x1' or '2x1' for Bento layout)
      - `category` (text) - Product category
      - `created_at` (timestamptz) - Timestamp of creation

  2. Security
    - Enable RLS on `products` table
    - Add policy for anyone to read products (public store)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  image text NOT NULL,
  size text NOT NULL DEFAULT '1x1' CHECK (size IN ('1x1', '2x1')),
  category text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  USING (true);