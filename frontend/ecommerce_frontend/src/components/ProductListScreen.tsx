import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import CTAButton from './CTAButton';

const PRODUCTS = [
  { id: 1, name: 'Phantom Runner', category: 'Footwear', price: 219, oldPrice: 279, badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { id: 2, name: 'Void Jacket', category: 'Outerwear', price: 389, oldPrice: null, badge: 'New', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' },
  { id: 3, name: 'Eclipse Watch', category: 'Accessories', price: 549, oldPrice: null, badge: 'Limited', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  { id: 4, name: 'Core Tee', category: 'Apparel', price: 79, oldPrice: null, badge: null, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' },
  { id: 5, name: 'Luna Backpack', category: 'Accessories', price: 129, oldPrice: 149, badge: 'Trending', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80' },
  { id: 6, name: 'Monarch Sunglasses', category: 'Accessories', price: 199, oldPrice: null, badge: 'New', img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=500&q=80' },
  { id: 7, name: 'Swift Sneakers', category: 'Footwear', price: 159, oldPrice: 189, badge: 'Best Seller', img: 'https://images.unsplash.com/photo-1528701800489-20e46c66ea59?w=500&q=80' },
  { id: 8, name: 'Nimbus Hoodie', category: 'Apparel', price: 99, oldPrice: 129, badge: 'Limited', img: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&q=80' },
  { id: 9, name: 'Atlas Denim', category: 'Apparel', price: 119, oldPrice: 149, badge: null, img: 'https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?w=500&q=80' },
  { id: 10, name: 'Aero Jacket', category: 'Outerwear', price: 439, oldPrice: 499, badge: 'Premium', img: 'https://images.unsplash.com/photo-1600180758895-8f4076ea7f24?w=500&q=80' },
];

const FILTERS = ['All', 'Footwear', 'Outerwear', 'Accessories', 'Apparel'];

interface ProductListScreenProps {
  onBack?: () => void;
  onAddToCart?: (id: number) => void;
  onGoToProductDetail?: (product: any) => void;
}

const ProductListScreen: React.FC<ProductListScreenProps> = ({ onBack, onAddToCart, onGoToProductDetail }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  const filteredByCategory = activeFilter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeFilter);
  const filtered = filteredByCategory.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 30 }]}>
      <View style={styles.spacerAbove} />
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{user ? `Hello, ${user.email}` : 'Shop All Products'}</Text>
      </View>

      {/* Role line removed by request */}

      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
        placeholder="Search products by name or category..."
        placeholderTextColor="#888"
      />

      <View style={styles.filterRow}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterPill, activeFilter === filter && styles.filterPillActive]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 && (
        <Text style={styles.noResults}>No products found. Try another keyword.</Text>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.cardImg} />
            <View style={styles.cardInfo}>
              <View style={styles.cardTitleRow}>
                <Text style={styles.cardName}>{item.name}</Text>
                {item.badge && <Text style={styles.badge}>{item.badge}</Text>}
              </View>
              <Text style={styles.cardCategory}>{item.category}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{formatCurrency(item.price)}</Text>
                {item.oldPrice && <Text style={styles.oldPrice}>{formatCurrency(item.oldPrice)}</Text>}
              </View>
              <CTAButton
                title="Add to Cart"
                onPress={() => onAddToCart?.(item.id)}
                size="sm"
                color="#E8C97A"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12', padding: 14 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 20 },
  spacerAbove: { height: 10 },
  backBtn: { marginRight: 10 },
  backText: { color: '#E8C97A', fontSize: 16, fontWeight: '600' },
  title: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10, gap: 8 },
  filterPill: { borderColor: '#565662', borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, marginRight: 8 },
  filterPillActive: { backgroundColor: '#E8C97A', borderColor: '#E8C97A' },
  filterText: { color: '#ABB2CE', fontWeight: '600' },
  filterTextActive: { color: '#23232B' },
  list: { paddingBottom: 30 },
  card: { backgroundColor: '#18181F', borderRadius: 14, marginBottom: 12, overflow: 'hidden', flexDirection: 'row' },
  cardImg: { width: 100, height: 100 },
  cardInfo: { flex: 1, padding: 10 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  cardName: { color: '#FFFFFF', fontWeight: '700', fontSize: 15, flex: 1 },
  badge: { color: '#23232B', backgroundColor: '#E8C97A', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, fontSize: 10, marginLeft: 6 },
  cardCategory: { color: '#A0A0A0', marginBottom: 8, fontSize: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  price: { color: '#E8C97A', fontWeight: '700', marginRight: 10 },
  oldPrice: { color: '#7A7A8A', textDecorationLine: 'line-through' },
  searchInput: {
    backgroundColor: '#23232B',
    color: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444',
  },
  welcome: { color: '#B3B3C2', marginBottom: 10, fontSize: 14 },
  noResults: { color: '#FF6B6B', fontSize: 14, marginVertical: 10, textAlign: 'center' },
});

export default ProductListScreen;
