export interface Product {
  id: number;
  name: string;
  category?: string;
  description?: string;
  price: number;
  oldPrice: number | null;
  badge?: string | null;
  img: string;
  rating?: number;
  reviews?: number;
  store?: string;
  freeShipping?: boolean;
  plusEligible?: boolean;
  discount?: number;
  sold?: number;
  stock?: number;
}