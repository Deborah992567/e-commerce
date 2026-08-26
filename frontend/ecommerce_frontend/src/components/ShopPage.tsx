import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TemuAliExpressProductGrid from './TemuAliExpressProductGrid';
import AnimatedCard from './AnimatedCard';
import FloatingAction from './FloatingAction';
import { Product } from '../types';
import { SearchIcon, HeartIcon, BellIcon, TruckIcon, SortIcon, FilterIcon, FireIcon, StarIcon, TagIcon } from './Icons';

interface ShopPageProps {
  onAddToCart: (product: Product) => void;
  cartCount: number;
  onProductPress: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ onAddToCart, cartCount, onProductPress }) => {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const categories = ['All', 'Fashion', 'Electronics', 'Home', 'Beauty', 'Sports', 'Food', 'Toys'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <HeartIcon size={20} color="#FF2D55" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <BellIcon size={20} color="#4ECDC4" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchSection}>
        <TouchableOpacity style={styles.searchBar}>
          <SearchIcon size={16} color="#888" />
          <Text style={styles.searchPlaceholder}>Search products</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}>
          <TruckIcon size={28} color="#FFF" />
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Free Shipping</Text>
            <Text style={styles.bannerSubtitle}>on orders over ₦50,000</Text>
          </View>
        </View>

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

        <View style={styles.filters}>
          <TouchableOpacity style={styles.filterBtn}>
            <SortIcon size={14} color="#FFF" />
            <Text style={styles.filterBtnText}>Sort</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <TagIcon size={14} color="#FFF" />
            <Text style={styles.filterBtnText}>Price</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <StarIcon size={14} color="#FFD700" filled />
            <Text style={styles.filterBtnText}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <FireIcon size={14} color="#FF5722" />
            <Text style={styles.filterBtnText}>Hot</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productsHeader}>
          <Text style={styles.productsTitle}>Trending Now</Text>
          <Text style={styles.productsCount}>1,234+ items</Text>
        </View>

        <AnimatedCard delay={200}>
          <TemuAliExpressProductGrid
            onAddToCart={onAddToCart}
            onProductPress={onProductPress}
          />
        </AnimatedCard>
      </ScrollView>
      <FloatingAction onPress={scrollToTop} color="#FF5722" size={48} icon={<TagIcon size={20} color="#FFF" />} />
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
    gap: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 13,
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
    backgroundColor: '#FF5722',
    borderColor: '#FF5722',
  },
  categoryTabText: {
    fontSize: 13,
    color: '#A0A0A0',
    fontWeight: '500',
  },
  categoryTabTextActive: {
    color: '#FFF',
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
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#23232B',
    borderWidth: 1,
    borderColor: '#2D2D38',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
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
