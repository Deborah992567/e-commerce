import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import CTAButton from './CTAButton';
import { StarIcon, TagIcon, FireIcon, ClockIcon, HeartIcon } from './Icons';

const PRODUCTS = [
  { id: 1, name: 'Phantom Runner', category: 'Footwear', price: 219, oldPrice: 279, badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', color: '#FF6B35', stock: 5, discount: 21 },
  { id: 2, name: 'Void Jacket', category: 'Outerwear', price: 389, badge: 'New', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80', color: '#4ECDC4', stock: 12, discount: 0 },
  { id: 3, name: 'Eclipse Watch', category: 'Accessories', price: 549, badge: 'Limited', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', color: '#C9B8FF', stock: 2, discount: 15 },
  { id: 4, name: 'Core Tee', category: 'Apparel', price: 79, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', color: '#FFE66D', stock: 50, discount: 0 },
];

const FILTERS = ['All', 'Recently Viewed', 'Footwear', 'Outerwear', 'Accessories', 'Apparel'];

interface FeaturedProductsProps {
  onAddToCart: (id: number) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onAddToCart }) => {
  const [active, setActive] = useState('All');
  const [added, setAdded] = useState<number[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<number[]>([]);

  const filtered = active === 'All' ? PRODUCTS : active === 'Recently Viewed' ? PRODUCTS.filter((p) => recentlyViewed.includes(p.id)) : PRODUCTS.filter((p) => p.category === active);

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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.fpFilters} contentContainerStyle={styles.fpFiltersContent}>
          {FILTERS.map((f) => (
            <TouchableOpacity key={f} style={[styles.fpFilter, active === f && styles.fpFilterActive]} onPress={() => setActive(f)}>
              <Text style={[styles.fpFilterText, active === f && styles.fpFilterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.fpGrid}>
        {filtered.map((p) => (
          <TouchableOpacity style={[styles.fpCard, { borderColor: p.color + '40' }]} key={p.id} activeOpacity={0.85}>
            <View style={styles.fpImgWrap}>
              <Image source={{ uri: p.img }} style={styles.fpImg} />
              {p.badge && (
                <View style={styles.fpBadge}>
                  {p.badge === 'Best Seller' ? <FireIcon size={10} color="#FFF" /> : <StarIcon size={10} color="#FFF" filled />}
                  <Text style={styles.fpBadgeText}>{p.badge}</Text>
                </View>
              )}
              {p.discount > 0 && (
                <View style={styles.fpDiscountBadge}>
                  <TagIcon size={8} color="#FFF" />
                  <Text style={styles.fpDiscountText}>-{p.discount}%</Text>
                </View>
              )}
              {p.stock <= 5 && (
                <View style={styles.fpLimitedBadge}>
                  <FireIcon size={8} color="#FFF" />
                  <Text style={styles.fpLimitedText}>Only {p.stock} left</Text>
                </View>
              )}
              <View style={styles.fpHoverActions}>
                <TouchableOpacity style={styles.fpQuick}>
                  <HeartIcon size={14} color="#FF2D55" />
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
                <TouchableOpacity style={[styles.fpAdd, added.includes(p.id) && styles.fpAddDone]} onPress={() => handleAdd(p.id)}>
                  <Text style={styles.fpAddText}>{added.includes(p.id) ? '✓' : '+'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.fpCta}>
        <CTAButton title="View All Products" variant="ghost" icon="→" />
        <View style={{ height: 32 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fp: { padding: 20 },
  fpHeader: { marginBottom: 20 },
  fpTitleWrap: { marginBottom: 8 },
  fpEyebrow: { color: '#FF5722', fontSize: 14, fontWeight: '600', marginBottom: 4 },
  fpTitle: { fontSize: 24, fontWeight: 'bold', color: 'white' },
  fpTitleEm: { color: '#FF5722', fontStyle: 'italic' },
  fpFilters: { flexDirection: 'row', marginTop: 8 },
  fpFiltersContent: { alignItems: 'center', paddingRight: 8 },
  fpFilter: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 18, backgroundColor: '#23232B', marginRight: 8, borderWidth: 1, borderColor: '#2D2D38' },
  fpFilterActive: { backgroundColor: '#FF5722', borderColor: '#FF5722' },
  fpFilterText: { color: 'white', fontWeight: '600', fontSize: 13 },
  fpFilterTextActive: { color: '#FFF' },
  fpGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  fpCard: { width: '48%', backgroundColor: '#18181F', borderRadius: 16, borderWidth: 1, marginBottom: 16, padding: 12 },
  fpImgWrap: { borderRadius: 12, overflow: 'hidden', marginBottom: 8, position: 'relative' },
  fpImg: { width: '100%', height: 120, borderRadius: 12 },
  fpBadge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#FF5722', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, flexDirection: 'row', alignItems: 'center', gap: 3 },
  fpBadgeText: { color: '#FFF', fontWeight: 'bold', fontSize: 11 },
  fpDiscountBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#FF2D55', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, flexDirection: 'row', alignItems: 'center', gap: 3 },
  fpDiscountText: { color: '#FFF', fontWeight: 'bold', fontSize: 11 },
  fpLimitedBadge: { position: 'absolute', bottom: 8, left: 8, backgroundColor: '#FF5722', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 3, flexDirection: 'row', alignItems: 'center', gap: 3 },
  fpLimitedText: { color: '#FFF', fontWeight: 'bold', fontSize: 10 },
  fpHoverActions: { position: 'absolute', bottom: 8, right: 8 },
  fpQuick: { backgroundColor: '#23232B', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1, borderColor: '#2D2D38' },
  fpInfo: { marginTop: 8 },
  fpCat: { color: '#A0A0A0', fontSize: 12, marginBottom: 2 },
  fpName: { color: 'white', fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  fpBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  fpPrices: { flexDirection: 'row', alignItems: 'center' },
  fpPrice: { color: '#FF5722', fontWeight: 'bold', fontSize: 16, marginRight: 8 },
  fpOld: { color: '#A0A0A0', fontSize: 14, textDecorationLine: 'line-through' },
  fpAdd: { backgroundColor: '#FF5722', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 4 },
  fpAddDone: { backgroundColor: '#4ECDC4' },
  fpAddText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  fpCta: { marginTop: 24, alignItems: 'center', marginBottom: 32 },
});

export default FeaturedProducts;
