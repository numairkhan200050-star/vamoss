export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  size: '1x1' | '2x1';
  category: string;
  created_at: string;
}

export interface OrderForm {
  name: string;
  phone: string;
  address: string;
  city: string;
}
