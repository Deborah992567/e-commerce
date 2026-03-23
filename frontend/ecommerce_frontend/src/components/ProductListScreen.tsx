import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Animated, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../contexts/AuthContext';
import CTAButton from './CTAButton';
import Icon from 'react-native-vector-icons/Ionicons';

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

const RECENTLY_VIEWED = PRODUCTS.slice(0, 3);
const RECOMMENDED = PRODUCTS.slice(3, 6);

const FILTERS = ['All', 'Footwear', 'Outerwear', 'Accessories', 'Apparel'];

interface ProductListScreenProps {
  onBack?: () => void;
  onAddToCart?: (id: number) => void;
  onGoToProductDetail?: (product: any) => void;
}

const ProductListScreen: React.FC<ProductListScreenProps> = ({ onBack, onAddToCart, onGoToProductDetail }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrollY] = useState(new Animated.Value(0));
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderSkeletonCard = () => (
    <View style={styles.skeletonCard}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonInfo}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonCategory} />
        <View style={styles.skeletonPrice} />
        <View style={styles.skeletonButton} />
      </View>
    </View>
  );

  const renderProductCard = ({ item }: { item: any }) => {
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }] }]}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => onGoToProductDetail?.(item)}
          style={styles.cardTouchable}
        >
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
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => toggleWishlist(item.id)}
        >
          <Icon
            name={wishlist.includes(item.id) ? "heart" : "heart-outline"}
            size={20}
            color={wishlist.includes(item.id) ? "#FF6B6B" : "#888"}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderSection = (title: string, data: any[], showViewAll = false) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {showViewAll && <TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>}
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductCard}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );

  const filteredByCategory = activeFilter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeFilter);
  const filtered = filteredByCategory.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 30 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{user ? `Hello, ${user.email.split('@')[0]}` : 'Shop All Products'}</Text>
      </View>

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

      {loading ? (
        <View style={styles.loadingContainer}>
          {Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={styles.skeletonCard}>
              <View style={styles.skeletonImage} />
              <View style={styles.skeletonInfo}>
                <View style={styles.skeletonTitle} />
                <View style={styles.skeletonCategory} />
                <View style={styles.skeletonPrice} />
                <View style={styles.skeletonButton} />
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Animated.ScrollView
          style={styles.scrollContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {renderSection('Recently Viewed', RECENTLY_VIEWED)}
          {renderSection('Recommended for You', RECOMMENDED, true)}

          <View style={styles.allProductsSection}>
            <Text style={styles.allProductsTitle}>All Products</Text>
            {filtered.length === 0 && (
              <Text style={styles.noResults}>No products found. Try another keyword.</Text>
            )}
            {filtered.map((item) => (
              <View key={item.id}>
                {renderProductCard({ item })}
              </View>
            ))}
          </View>
        </Animated.ScrollView>
      )}

      <Animated.View
        style={[
          styles.stickyFooter,
          {
            shadowOpacity: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 0.3],
              extrapolate: 'clamp',
            }),
            elevation: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [0, 5],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <TouchableOpacity onPress={onBack} style={styles.backBtnSoft}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12', padding: 14 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginTop: 20 },
  spacerAbove: { height: 10 },
  backBtn: { marginRight: 10 },
  backBtnSoft: {
    backgroundColor: '#1F1F2A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8C97A',
    marginRight: 10,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  backText: { color: '#E8C97A', fontSize: 16, fontWeight: '600' },
  title: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10, gap: 8 },
  filterPill: { borderColor: '#565662', borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6, marginRight: 8 },
  filterPillActive: { backgroundColor: '#E8C97A', borderColor: '#E8C97A' },
  filterText: { color: '#ABB2CE', fontWeight: '600' },
  filterTextActive: { color: '#23232B' },
  list: { paddingBottom: 30 },
  card: { backgroundColor: '#18181F', borderRadius: 14, marginBottom: 12, overflow: 'hidden', flexDirection: 'row' },
  cardTouchable: { flex: 1, flexDirection: 'row' },
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
  // New styles
  loadingContainer: { flex: 1, paddingTop: 20 },
  skeletonCard: { backgroundColor: '#18181F', borderRadius: 14, marginBottom: 12, overflow: 'hidden', flexDirection: 'row', opacity: 0.7 },
  skeletonImage: { width: 100, height: 100, backgroundColor: '#23232B' },
  skeletonInfo: { flex: 1, padding: 10 },
  skeletonTitle: { height: 16, backgroundColor: '#23232B', borderRadius: 4, marginBottom: 6 },
  skeletonCategory: { height: 12, backgroundColor: '#23232B', borderRadius: 4, marginBottom: 8, width: '60%' },
  skeletonPrice: { height: 14, backgroundColor: '#23232B', borderRadius: 4, marginBottom: 8, width: '40%' },
  skeletonButton: { height: 32, backgroundColor: '#23232B', borderRadius: 6, width: '80%' },
  scrollContainer: { flex: 1 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  viewAllText: { color: '#E8C97A', fontSize: 14, fontWeight: '600' },
  horizontalList: { paddingRight: 14 },
  allProductsSection: { marginBottom: 100 },
  allProductsTitle: { color: '#FFF', fontSize: 20, fontWeight: '700', marginBottom: 16 },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    padding: 6,
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0D0D12',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#23232B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
  },
});

export default ProductListScreen;
