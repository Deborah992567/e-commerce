
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import CTAButton from './CTAButton';

const PRODUCTS = [
  {
    id: 1,
    name: 'Phantom Runner',
    category: 'Footwear',
    price: 219,
    oldPrice: 279,
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    color: '#FF6B35',
  },
  {
    id: 2,
    name: 'Void Jacket',
    category: 'Outerwear',
    price: 389,
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
    color: '#4ECDC4',
  },
  {
    id: 3,
    name: 'Eclipse Watch',
    category: 'Accessories',
    price: 549,
    badge: 'Limited',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    color: '#C9B8FF',
  },
  {
    id: 4,
    name: 'Core Tee',
    category: 'Apparel',
    price: 79,
    img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    color: '#FFE66D',
  },
];

const FILTERS = ['All', 'Recently Viewed', 'Footwear', 'Outerwear', 'Accessories', 'Apparel'];

interface FeaturedProductsProps {
  onAddToCart: (id: number) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onAddToCart }) => {
  const [active, setActive] = useState('All');
  const [added, setAdded] = useState<number[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);

  const filtered =
    active === 'All'
      ? PRODUCTS
      : active === 'Recently Viewed'
      ? PRODUCTS.filter((p) => recentlyViewed.includes(p.id))
      : PRODUCTS.filter((p) => p.category === active);

  const addRecentlyViewed = (id: number) => {
    setRecentlyViewed((prev) => {
      const normalized = [id, ...prev.filter((x) => x !== id)];
      return normalized.slice(0, 6);
    });
  };

  const handleViewProduct = (id: number, name: string) => {
    addRecentlyViewed(id);
    Alert.alert('Product View', `${name} was added to Recently Viewed. Product detail is coming soon!`);
    setActive('Recently Viewed');
  };

  const handleAdd = (id: number) => {
    setAdded((prev) => [...prev, id]);
    onAddToCart(id);
    setTimeout(() => setAdded((prev) => prev.filter((x) => x !== id)), 1200);
  };

  return (
    <View style={styles.fp}>
      <View style={styles.fpHeader}>
        <View style={styles.fpTitleWrap}>
          <Text style={styles.fpEyebrow}>— Featured</Text>
          <Text style={styles.fpTitle}>This Season's <Text style={styles.fpTitleEm}>Icons</Text></Text>
        </View>
        <ScrollView
          style={styles.fpFilters}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.fpFiltersContent}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.fpFilter, active === f && styles.fpFilterActive]}
              onPress={() => setActive(f)}
            >
              <Text style={[styles.fpFilterText, active === f && styles.fpFilterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

        <View style={styles.fpGrid}>
        {filtered.map((p, i) => (
          <TouchableOpacity
            style={[styles.fpCard, { borderColor: p.color }]}
            key={p.id}
            activeOpacity={0.85}
            onPress={() => handleViewProduct(p.id, p.name)}
          >
            <View style={styles.fpImgWrap}>
              <Image source={{ uri: p.img }} style={styles.fpImg} />
              {p.badge && <View style={styles.fpBadge}><Text style={styles.fpBadgeText}>{p.badge}</Text></View>}
              <View style={styles.fpHoverActions}>
                <TouchableOpacity
                  style={styles.fpQuick}
                  onPress={() => Alert.alert('Coming Soon', 'Wishlist feature is coming soon! Save your favorite items for later.')}
                >
                  <Text style={styles.fpQuickText}>♡ Wishlist</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.fpInfo}>
              <View>
                <Text style={styles.fpCat}>{p.category}</Text>
                <Text style={styles.fpName}>{p.name}</Text>
              </View>
              <View style={styles.fpBottom}>
                <View style={styles.fpPrices}>
                  <Text style={styles.fpPrice}>₦{p.price}</Text>
                  {p.oldPrice && <Text style={styles.fpOld}>₦{p.oldPrice}</Text>}
                </View>
                <TouchableOpacity
                  style={[styles.fpAdd, added.includes(p.id) && styles.fpAddDone]}
                  onPress={() => handleAdd(p.id)}
                >
                  <Text style={styles.fpAddText}>{added.includes(p.id) ? '✓' : '+'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

        {active === 'Recently Viewed' && filtered.length === 0 && (
          <View style={styles.fpEmpty}> 
            <Text style={styles.fpEmptyText}>No recently viewed items yet — tap a product to begin.</Text>
          </View>
        )}

      <View style={styles.fpCta}>
        <CTAButton label="View All Products" variant="ghost" icon="→" />
        <View style={{ height: 32 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fp: {
    padding: 20,
  },
  fpHeader: {
    marginBottom: 20,
  },
  fpTitleWrap: {
    marginBottom: 8,
  },
  fpEyebrow: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  fpTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  fpTitleEm: {
    color: '#E8C97A',
    fontStyle: 'italic',
  },
  fpFilters: {
    flexDirection: 'row',
    marginTop: 8,
  },
  fpFiltersContent: {
    alignItems: 'center',
    paddingRight: 8,
  },
  fpFilter: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#23232B',
    marginRight: 8,
  },
  fpFilterActive: {
    backgroundColor: '#E8C97A',
  },
  fpFilterText: {
    color: 'white',
    fontWeight: '600',
  },
  fpFilterTextActive: {
    color: '#23232B',
  },
  fpGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fpCard: {
    width: '48%',
    backgroundColor: '#18181F',
    borderRadius: 16,
    borderWidth: 2,
    marginBottom: 16,
    padding: 12,
  },
  fpImgWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  fpImg: {
    width: '100%',
    height: 120,
    borderRadius: 12,
  },
  fpBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E8C97A',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  fpBadgeText: {
    color: '#23232B',
    fontWeight: 'bold',
    fontSize: 12,
  },
  fpHoverActions: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  fpQuick: {
    backgroundColor: '#23232B',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  fpQuickText: {
    color: '#E8C97A',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fpInfo: {
    marginTop: 8,
  },
  fpCat: {
    color: '#A0A0A0',
    fontSize: 12,
    marginBottom: 2,
  },
  fpEmpty: {
    marginTop: 16,
    backgroundColor: '#17171f',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  fpEmptyText: {
    color: '#B3B3C2',
    fontSize: 14,
    textAlign: 'center',
  },
  fpName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  fpBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  fpPrices: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fpPrice: {
    color: '#E8C97A',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  fpOld: {
    color: '#A0A0A0',
    fontSize: 14,
    textDecorationLine: 'line-through',
  },
  fpAdd: {
    backgroundColor: '#E8C97A',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  fpAddDone: {
    backgroundColor: '#4ECDC4',
  },
  fpAddText: {
    color: '#23232B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  fpCta: {
    marginTop: 24,
    alignItems: 'center',
    marginBottom: 32,
  },
});

export default FeaturedProducts;