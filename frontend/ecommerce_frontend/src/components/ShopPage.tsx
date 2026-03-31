import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TemuAliExpressProductGrid from './TemuAliExpressProductGrid';
import { Product } from '../types';

interface ShopPageProps {
  onAddToCart: (product: Product) => void;
  cartCount: number;
  onProductPress: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart, cartCount, onProductPress }) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Fashion', 'Electronics', 'Home', 'Beauty', 'Sports', 'Food', 'Toys'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ Shop</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconText}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.searchBar}>
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
              <Text style={[styles.categoryTabText, selectedCategory === cat && styles.categoryTabTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Filters */}
        <View style={styles.filters}>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>📊 Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>💰 Price</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>⭐ Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={styles.filterBtnText}>🔥 Hot</Text>
          </TouchableOpacity>
        </View>

        {/* Products Header */}
        <View style={styles.productsHeader}>
          <Text style={styles.productsTitle}>Trending Now</Text>
          <Text style={styles.productsCount}>1,234+ items</Text>
        </View>

        {/* Products Grid */}
        <TemuAliExpressProductGrid
          onAddToCart={onAddToCart}
          onProductPress={onProductPress}
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
    backgroundColor: 'linear-gradient(135deg, #FF5722 0%, #FF9800 100%)',
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
});

export default ShopPage;
