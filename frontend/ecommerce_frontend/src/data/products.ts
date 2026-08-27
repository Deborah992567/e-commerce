import { Product } from '../types';

export const PRODUCT_CATALOG: Product[] = [
  {
    id: 1, name: 'Wireless Bluetooth Headphones Noise Cancelling Over-Ear', category: 'Electronics',
    price: 29.99, oldPrice: 59.99, badge: 'Hot Sale', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
    rating: 4.5, reviews: 2847, store: 'AudioTech Official Store', freeShipping: true, discount: 50, sold: 15420,
  },
  {
    id: 2, name: 'Smart Watch Fitness Tracker Heart Rate Monitor GPS', category: 'Electronics',
    price: 45.99, oldPrice: 89.99, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80',
    rating: 4.3, reviews: 1923, store: 'WearableTech Hub', freeShipping: true, discount: 49, sold: 8750,
  },
  {
    id: 3, name: 'Portable Charger 20000mAh Fast Charging Power Bank', category: 'Electronics',
    price: 19.99, oldPrice: 39.99, img: 'https://images.unsplash.com/photo-1609594040184-52b9b3f8f3ba?w=300&q=80',
    rating: 4.7, reviews: 4521, store: 'PowerSolutions Ltd', freeShipping: true, discount: 50, sold: 23100,
  },
  {
    id: 4, name: 'LED Strip Lights RGB Smart Home Lighting Kit', category: 'Home',
    price: 15.99, oldPrice: 29.99, img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80',
    rating: 4.4, reviews: 1234, store: 'SmartHome Essentials', freeShipping: false, discount: 47, sold: 6780,
  },
  {
    id: 5, name: 'Stainless Steel Insulated Water Bottle 500ml', category: 'Home',
    price: 12.99, oldPrice: 24.99, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80',
    rating: 4.6, reviews: 3456, store: 'KitchenWare Pro', freeShipping: true, discount: 48, sold: 18900,
  },
  {
    id: 6, name: 'Gaming Mouse RGB Backlit 16000 DPI Wireless', category: 'Electronics',
    price: 34.99, oldPrice: 69.99, img: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&q=80',
    rating: 4.8, reviews: 5678, store: 'GamingGear Plus', freeShipping: true, discount: 50, sold: 31200, badge: 'Choice',
  },
  {
    id: 7, name: 'Mini Projector HD 1080P Home Theater Portable', category: 'Electronics',
    price: 89.99, oldPrice: 149.99, img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&q=80',
    rating: 4.2, reviews: 892, store: 'Home Entertainment Co', freeShipping: true, discount: 40, sold: 5430,
  },
  {
    id: 8, name: 'Electric Toothbrush Sonic Clean Replacement Heads', category: 'Beauty',
    price: 24.99, oldPrice: 49.99, img: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=300&q=80',
    rating: 4.5, reviews: 2134, store: 'OralCare Plus', freeShipping: true, discount: 50, sold: 12890,
  },
  {
    id: 9, name: 'Phantom Runner', category: 'Fashion',
    price: 219, oldPrice: 279, badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    rating: 4.7, reviews: 2210, store: 'Obsidian Footwear', freeShipping: true, discount: 21, sold: 9800,
  },
  {
    id: 10, name: 'Void Jacket', category: 'Fashion',
    price: 389, oldPrice: null, badge: 'New', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
    rating: 4.6, reviews: 812, store: 'Void Apparel', freeShipping: true, discount: 0, sold: 3100,
  },
  {
    id: 11, name: 'Eclipse Watch', category: 'Fashion',
    price: 549, oldPrice: null, badge: 'Limited', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    rating: 4.9, reviews: 1500, store: 'Eclipse Timepieces', freeShipping: true, discount: 15, sold: 640,
  },
  {
    id: 12, name: 'Core Tee', category: 'Fashion',
    price: 79, oldPrice: null, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    rating: 4.3, reviews: 3440, store: 'Core Basics', freeShipping: true, discount: 0, sold: 20100,
  },
  {
    id: 13, name: 'Obsidian Series Smart Clothing', category: 'Fashion',
    price: 249, oldPrice: null, badge: 'Limited Drop', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    rating: 4.8, reviews: 960, store: 'Obsidian Series', freeShipping: true, discount: 0, sold: 1200,
  },
  {
    id: 14, name: 'Air Drift Sneakers', category: 'Fashion',
    price: 129, oldPrice: null, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    rating: 4.4, reviews: 5120, store: 'Air Drift', freeShipping: true, discount: 0, sold: 16800,
  },
  {
    id: 15, name: 'Urban Core Backpack', category: 'Fashion',
    price: 189, oldPrice: null, img: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80',
    rating: 4.5, reviews: 2340, store: 'Urban Core', freeShipping: true, discount: 0, sold: 8900,
  },
  {
    id: 16, name: 'Golden Serene Perfume 50ml', category: 'Beauty',
    price: 89.99, oldPrice: 129.99, badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&q=80',
    rating: 4.8, reviews: 4520, store: 'Maison Luxe', freeShipping: true, discount: 31, sold: 12500,
  },
  {
    id: 17, name: 'Golden Serene Perfume 100ml', category: 'Beauty',
    price: 149.99, oldPrice: 199.99, img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&q=80',
    rating: 4.9, reviews: 3120, store: 'Maison Luxe', freeShipping: true, discount: 25, sold: 7800,
  },
  {
    id: 18, name: 'Crystal Charm Bracelet Gold Plated', category: 'Beauty',
    price: 49.99, oldPrice: 79.99, badge: 'New', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&q=80',
    rating: 4.6, reviews: 1780, store: 'JewelryWorks', freeShipping: true, discount: 38, sold: 6400,
  },
  {
    id: 19, name: 'Rose Gold Hoop Earrings set', category: 'Beauty',
    price: 39.99, oldPrice: 59.99, img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&q=80',
    rating: 4.4, reviews: 2100, store: 'JewelryWorks', freeShipping: true, discount: 33, sold: 9900,
  },
  {
    id: 20, name: 'Luxury Leather Handbag Tote', category: 'Fashion',
    price: 129.99, oldPrice: 199.99, badge: 'Hot Sale', img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=80',
    rating: 4.7, reviews: 3890, store: 'Chic Carry', freeShipping: true, discount: 35, sold: 7200,
  },
  {
    id: 21, name: 'Polarized Sunglasses UV400', category: 'Fashion',
    price: 24.99, oldPrice: 45.99, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&q=80',
    rating: 4.5, reviews: 6540, store: 'VisionPlus', freeShipping: true, discount: 46, sold: 21000,
  },
  {
    id: 22, name: 'Non-stick Frying Pan 26cm Ceramic', category: 'Home',
    price: 32.99, oldPrice: 59.99, img: 'https://images.unsplash.com/photo-1584990347449-1c2ab3978603?w=300&q=80',
    rating: 4.4, reviews: 1980, store: 'KitchenWare Pro', freeShipping: true, discount: 45, sold: 5600,
  },
  {
    id: 23, name: 'Running Shoes Breathable Mesh', category: 'Sports',
    price: 54.99, oldPrice: 89.99, badge: 'Choice', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80',
    rating: 4.6, reviews: 7210, store: 'Air Drift', freeShipping: true, discount: 39, sold: 15600,
  },
  {
    id: 24, name: 'Yoga Mat Non-slip 6mm TPE', category: 'Sports',
    price: 21.99, oldPrice: 39.99, img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&q=80',
    rating: 4.5, reviews: 3340, store: 'FitLife', freeShipping: true, discount: 45, sold: 9800,
  },
  {
    id: 25, name: 'Wireless Earbuds Bluetooth 5.3', category: 'Electronics',
    price: 39.99, oldPrice: 79.99, badge: 'Hot Sale', img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=80',
    rating: 4.7, reviews: 8920, store: 'AudioTech Official Store', freeShipping: true, discount: 50, sold: 25100,
  },
];

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const haystack = (s: string) => s.toLowerCase().includes(q);
  return PRODUCT_CATALOG.filter((p) => {
    return haystack(p.name) ||
      (p.category && haystack(p.category)) ||
      (p.store && haystack(p.store));
  });
}
