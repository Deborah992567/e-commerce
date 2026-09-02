import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api } from '../services/api';
import { Product } from '../types';
import { PRODUCT_CATALOG } from '../data/products';

interface ApiPagedProducts {
  total: number;
  page: number;
  page_size: number;
  items: {
    id: number;
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    avg_rating: number;
    category_id: number;
    images: { id: number; url: string }[];
  }[];
}

function mapApiToProduct(a: ApiPagedProducts['items'][number]): Product {
  return {
    id: a.id,
    name: a.name,
    description: a.description ?? undefined,
    price: a.price,
    oldPrice: null,
    rating: a.avg_rating,
    img: a.images?.[0]?.url ?? '',
    category: undefined,
    reviews: undefined,
  };
}

interface ProductContextType {
  products: Product[];
  categories: string[];
  loading: boolean;
  online: boolean;
  refresh: () => Promise<void>;
  search: (query: string) => Product[];
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProducts must be used within ProductProvider');
  return ctx;
};

const FALLBACK_CATEGORIES = ['All', 'Fashion', 'Electronics', 'Home', 'Beauty', 'Sports', 'Food', 'Toys'];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(PRODUCT_CATALOG);
  const [categories, setCategories] = useState<string[]>(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.get<ApiPagedProducts>('/products/?page_size=100');
      if (data && Array.isArray(data.items) && data.items.length > 0) {
        setProducts(data.items.map(mapApiToProduct));
        setOnline(true);
      }
      try {
        const cats = await api.get<{ id: number; name: string }[]>('/products/categories');
        if (Array.isArray(cats) && cats.length > 0) {
          setCategories(['All', ...cats.map((c) => c.name)]);
        }
      } catch (e) {
        // keep fallback categories
      }
    } catch (e) {
      // backend offline — keep the mock catalog as fallback
      setOnline(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const search = useCallback(
    (query: string) => {
      const q = query.trim().toLowerCase();
      if (!q) return [];
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? '').toLowerCase().includes(q) ||
          (p.category ?? '').toLowerCase().includes(q)
      );
    },
    [products]
  );

  return (
    <ProductContext.Provider value={{ products, categories, loading, online, refresh, search }}>
      {children}
    </ProductContext.Provider>
  );
};
