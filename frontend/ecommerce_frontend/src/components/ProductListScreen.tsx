import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  storeName: string;
  soldCount: number;
  discount?: number;
  badge?: string;
  category: string;
}

interface ProductListScreenProps {
  onBack?: () => void;
  onGoToProductDetail?: (product: any) => void;
  onGoToProfile?: () => void;
  onGoToCart?: () => void;
  onLogout?: () => void;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 12.99,
    oldPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    rating: 4.8,
    reviews: 2340,
    storeName: 'Tech Store Plus',
    soldCount: 15200,
    discount: 57,
    badge: 'Hot Sale',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Soft Cotton T-Shirt',
    price: 5.49,
    oldPrice: 12.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    rating: 4.6,
    reviews: 3240,
    storeName: 'Fashion World',
    soldCount: 28900,
    discount: 58,
    badge: 'Choice',
    category: 'Fashion',
  },
  {
    id: 3,
    name: 'USB-C Fast Charger',
    price: 8.99,
    oldPrice: 19.99,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&q=80',
    rating: 4.7,
    reviews: 5678,
    storeName: 'Electronics Hub',
    soldCount: 31200,
    discount: 55,
    badge: 'Hot Sale',
    category: 'Electronics',
  },
  {
    id: 4,
    name: 'Portable Phone Stand',
    price: 3.99,
    oldPrice: 9.99,
    image: 'https://images.unsplash.com/photo-1586253408ca-4513f5b8df14?w=500&q=80',
    rating: 4.5,
    reviews: 1892,
    storeName: 'Gadget Store',
    soldCount: 9430,
    discount: 60,
    category: 'Electronics',
  },
  {
    id: 5,
    name: 'LED Desk Lamp',
    price: 14.99,
    oldPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&q=80',
    rating: 4.9,
    reviews: 4123,
    storeName: 'Home Decor Pro',
    soldCount: 18750,
    discount: 57,
    badge: 'Choice',
    category: 'Home',
  },
  {
    id: 6,
    name: 'Waterproof Phone Case',
    price: 6.99,
    oldPrice: 15.99,
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82290?w=500&q=80',
    rating: 4.4,
    reviews: 2156,
    storeName: 'Protective Gear',
    soldCount: 12340,
    discount: 56,
    category: 'Electronics',
  },
  {
    id: 7,
    name: 'Portable Bluetooth Speaker',
    price: 16.99,
    oldPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1589003077984-894fdbb6d1b6?w=500&q=80',
    rating: 4.7,
    reviews: 3456,
    storeName: 'Audio Expert',
    soldCount: 21890,
    discount: 57,
    badge: 'Hot Sale',
    category: 'Electronics',
  },
  {
    id: 8,
    name: 'Screen Protector 3-Pack',
    price: 2.99,
    oldPrice: 8.99,
    image: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&q=80',
    rating: 4.3,
    reviews: 892,
    storeName: 'Tech Essentials',
    soldCount: 5430,
    discount: 67,
    category: 'Electronics',
  },
];

const ProductListScreen: React.FC<ProductListScreenProps> = () => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'relevant' | 'price-low' | 'price-high' | 'rating' | 'newest'>('relevant');
  const [filterBy, setFilterBy] = useState<'all' | 'price' | 'rating' | 'hot'>('all');

  const categories = ['All', 'Fashion', 'Electronics', 'Home', 'Beauty', 'Sports', 'Food', 'Toys'];

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = SAMPLE_PRODUCTS;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Additional filters
    switch (filterBy) {
      case 'price':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'hot':
        filtered = filtered.sort((a, b) => b.soldCount - a.soldCount);
        break;
      default:
        // Sort by relevance (default)
        filtered = filtered.sort((a, b) => b.soldCount - a.soldCount);
        break;
    }

    // Sort by selected option
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // For demo, sort by ID (higher ID = newer)
        filtered = [...filtered].sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    return '⭐'.repeat(fullStars) + (rating % 1 >= 0.5 ? '☆' : '');
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard} activeOpacity={0.7}>
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />

        {/* Discount Badge */}
        {item.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.discount}%</Text>
            <Text style={styles.discountLabel}>OFF</Text>
          </View>
        )}

        {/* Hot Sale / Choice Badge */}
        {item.badge && (
          <View style={[styles.badgeTag, item.badge === 'Hot Sale' ? styles.hotSaleBadge : styles.choiceBadge]}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}

        {/* Free Shipping */}
        <View style={styles.freeShippingBadge}>
          <Text style={styles.freeShippingText}>Free Ship</Text>
        </View>
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        {/* Stars */}
        <View style={styles.ratingContainer}>
          <Text style={styles.starRating}>{renderStars(item.rating)}</Text>
          <Text style={styles.reviewCount}>({item.reviews})</Text>
        </View>

        {/* Product Name */}
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>

        {/* Pricing */}
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>${item.price}</Text>
          {item.oldPrice && <Text style={styles.oldPrice}>${item.oldPrice}</Text>}
        </View>

        {/* Store Info */}
        <View style={styles.storeInfo}>
          <Text style={styles.storeName}>{item.storeName}</Text>
          <Text style={styles.plusBadge}>PLUS</Text>
        </View>

        {/* Sold Count */}
        <Text style={styles.soldCount}>🔥 {item.soldCount.toLocaleString()} sold</Text>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.8}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ Shop</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Text style={styles.iconText}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.searchBar} activeOpacity={0.7}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search products</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>🚚 Free Shipping</Text>
            <Text style={styles.bannerSubtitle}>on orders over $50</Text>
          </View>
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryTab, selectedCategory === cat && styles.categoryTabActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  selectedCategory === cat && styles.categoryTabTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filters */}
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filterBtn, sortBy !== 'relevant' && styles.filterBtnActive]}
            activeOpacity={0.7}
            onPress={() => setSortBy(sortBy === 'relevant' ? 'price-low' : 'relevant')}
          >
            <Text style={[styles.filterBtnText, sortBy !== 'relevant' && styles.filterBtnTextActive]}>
              📊 {sortBy === 'price-low' ? 'Price ↑' : sortBy === 'price-high' ? 'Price ↓' : 'Sort'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, filterBy === 'price' && styles.filterBtnActive]}
            activeOpacity={0.7}
            onPress={() => setFilterBy(filterBy === 'price' ? 'all' : 'price')}
          >
            <Text style={[styles.filterBtnText, filterBy === 'price' && styles.filterBtnTextActive]}>💰 Price</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, filterBy === 'rating' && styles.filterBtnActive]}
            activeOpacity={0.7}
            onPress={() => setFilterBy(filterBy === 'rating' ? 'all' : 'rating')}
          >
            <Text style={[styles.filterBtnText, filterBy === 'rating' && styles.filterBtnTextActive]}>⭐ Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterBtn, filterBy === 'hot' && styles.filterBtnActive]}
            activeOpacity={0.7}
            onPress={() => setFilterBy(filterBy === 'hot' ? 'all' : 'hot')}
          >
            <Text style={[styles.filterBtnText, filterBy === 'hot' && styles.filterBtnTextActive]}>🔥 Hot</Text>
          </TouchableOpacity>
        </View>

        {/* Products Header */}
        <View style={styles.productsHeader}>
          <Text style={styles.productsTitle}>Trending Now</Text>
          <Text style={styles.productsCount}>1,234+ items</Text>
        </View>

        {/* Products Grid */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          scrollEnabled={false}
          contentContainerStyle={styles.productGridContainer}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D38',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#23232B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  iconText: {
    fontSize: 18,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D38',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23232B',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  content: {
    flex: 1,
  },
  banner: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    backgroundColor: '#FF5722',
    borderRadius: 12,
    padding: 16,
    overflow: 'hidden',
  },
  bannerContent: {
    paddingVertical: 8,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  categoriesContent: {
    gap: 8,
  },
  categoryTab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#23232B',
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  categoryTabActive: {
    backgroundColor: '#E8C97A',
    borderColor: '#E8C97A',
  },
  categoryTabText: {
    fontSize: 13,
    color: '#A0A0A0',
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: '#0D0D12',
    fontWeight: 'bold',
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  filterBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#23232B',
    borderWidth: 1,
    borderColor: '#2D2D38',
    alignItems: 'center',
  },
  filterBtnText: {
    fontSize: 11,
    color: '#FFF',
    fontWeight: '600',
  },
  filterBtnActive: {
    backgroundColor: '#E8C97A',
    borderColor: '#E8C97A',
  },
  filterBtnTextActive: {
    color: '#0D0D12',
    fontWeight: '700',
  },
  productsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  productsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  productsCount: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  productGridContainer: {
    paddingHorizontal: 16,
  },
  columnWrapper: {
    gap: 8,
    marginBottom: 8,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#18181F',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#23232B',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  discountLabel: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '600',
  },
  badgeTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  hotSaleBadge: {
    backgroundColor: '#FF1744',
  },
  choiceBadge: {
    backgroundColor: '#00BCD4',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  freeShippingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  freeShippingText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '600',
  },
  infoContainer: {
    padding: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  starRating: {
    fontSize: 12,
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 11,
    color: '#A0A0A0',
  },
  productName: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '500',
    marginBottom: 6,
    lineHeight: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E8C97A',
  },
  oldPrice: {
    fontSize: 11,
    color: '#A0A0A0',
    textDecorationLine: 'line-through',
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  storeName: {
    fontSize: 10,
    color: '#A0A0A0',
  },
  plusBadge: {
    fontSize: 8,
    color: '#FF5722',
    fontWeight: '700',
  },
  soldCount: {
    fontSize: 10,
    color: '#FFA500',
    marginBottom: 8,
  },
  addToCartBtn: {
    backgroundColor: '#E8C97A',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#0D0D12',
    fontWeight: '700',
    fontSize: 11,
  },
});

export default ProductListScreen;
