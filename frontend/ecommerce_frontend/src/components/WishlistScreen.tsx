import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';

interface WishlistScreenProps {
  onBack?: () => void;
  onAddToCart?: () => void;
}

type SortOption = 'date_added' | 'price_low' | 'price_high' | 'rating';
type FilterCategory = 'all' | string;

const WishlistScreen: React.FC<WishlistScreenProps> = ({ onBack, onAddToCart }) => {
  const insets = useSafeAreaInsets();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [sortBy, setSortBy] = useState<SortOption>('date_added');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // Get unique categories from wishlist
  const categories = useMemo(() => {
    const cats = new Set(wishlist.map((item) => item.category));
    return Array.from(cats);
  }, [wishlist]);

  // Filter and sort wishlist
  const filteredAndSorted = useMemo(() => {
    let filtered = wishlist.filter((item) => {
      const categoryMatch = filterCategory === 'all' || item.category === filterCategory;
      const priceMatch = item.price >= priceRange.min && item.price <= priceRange.max;
      return categoryMatch && priceMatch;
    });

    // Sort
    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'date_added':
      default:
        filtered.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    }

    return filtered;
  }, [wishlist, sortBy, filterCategory, priceRange]);

  const handleRemove = (id: string) => {
    Alert.alert('Remove from Wishlist', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Remove',
        onPress: async () => {
          await removeFromWishlist(id);
          Alert.alert('✅ Removed', 'Item removed from wishlist');
        },
      },
    ]);
  };

  const handleAddToCart = (item: any) => {
    const product: any = {
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      oldPrice: null,
      badge: null,
      img: item.image,
    };
    addToCart(product);
    Alert.alert('✅ Added to Cart', `${item.name} added to your cart`);
    if (onAddToCart) {
      onAddToCart();
    }
  };

  const renderWishlistItem = ({ item }: { item: any }) => (
    <View style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <TouchableOpacity
            onPress={() => handleRemove(item.id)}
            style={styles.removeBtn}
          >
            <Text style={styles.removeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.dateAdded}>Added {formatDate(item.addedAt)}</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addCartBtn}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.addCartBtnText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.emoji}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>❤️ Wishlist</Text>
        <View style={styles.badgeContainer}>
          <Text style={styles.badge}>{filteredAndSorted.length}</Text>
        </View>
      </View>

      {wishlist.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyEmoji}>💔</Text>
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptySubtitle}>Start adding your favorite items!</Text>
        </View>
      ) : (
        <>
          {/* Filters Section */}
          <ScrollView
            style={styles.filterSection}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Sort:</Text>
              {(['date_added', 'price_low', 'price_high', 'rating'] as SortOption[]).map(
                (option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => setSortBy(option)}
                    style={[
                      styles.filterOption,
                      sortBy === option && styles.filterOptionActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        sortBy === option && styles.filterOptionTextActive,
                      ]}
                    >
                      {option === 'date_added' && 'Recently Added'}
                      {option === 'price_low' && 'Price ↑'}
                      {option === 'price_high' && 'Price ↓'}
                      {option === 'rating' && 'Rating ⭐'}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          </ScrollView>

          {/* Category Filter */}
          <ScrollView
            style={styles.categoryFilter}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            <TouchableOpacity
              onPress={() => setFilterCategory('all')}
              style={[
                styles.categoryOption,
                filterCategory === 'all' && styles.categoryOptionActive,
              ]}
            >
              <Text
                style={[
                  styles.categoryOptionText,
                  filterCategory === 'all' && styles.categoryOptionTextActive,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setFilterCategory(cat)}
                style={[
                  styles.categoryOption,
                  filterCategory === cat && styles.categoryOptionActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryOptionText,
                    filterCategory === cat && styles.categoryOptionTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Wishlist Items */}
          <FlatList
            data={filteredAndSorted}
            renderItem={renderWishlistItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyFilter}>
                <Text style={styles.emptyFilterEmoji}>🔍</Text>
                <Text style={styles.emptyFilterTitle}>No items found</Text>
                <Text style={styles.emptyFilterSubtitle}>
                  Try adjusting your filters
                </Text>
              </View>
            }
          />
        </>
      )}
    </View>
  );
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  emoji: { fontSize: 20, color: '#E8C97A' },
  title: { color: '#FFF', fontSize: 20, fontWeight: '700', flex: 1, textAlign: 'center' },
  badgeContainer: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  badge: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
    backgroundColor: '#E8C97A',
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: 'center',
    lineHeight: 24,
  },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
  emptyEmoji: { fontSize: 60, marginBottom: 16 },
  emptyTitle: { color: '#FFF', fontSize: 20, fontWeight: '600', marginBottom: 8 },
  emptySubtitle: { color: '#A0A0A0', fontSize: 14, textAlign: 'center' },
  filterSection: { paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1F1F2A' },
  filterGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  filterLabel: { color: '#A0A0A0', fontSize: 12, fontWeight: '600', marginRight: 8 },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#1F1F2A',
    marginRight: 6,
  },
  filterOptionActive: { backgroundColor: '#E8C97A' },
  filterOptionText: { color: '#A0A0A0', fontSize: 12, fontWeight: '500' },
  filterOptionTextActive: { color: '#000', fontWeight: '600' },
  categoryFilter: { paddingHorizontal: 14, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#1F1F2A' },
  categoryOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1F1F2A',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  categoryOptionActive: { backgroundColor: '#E8C97A', borderColor: '#E8C97A' },
  categoryOptionText: { color: '#A0A0A0', fontSize: 12, fontWeight: '500' },
  categoryOptionTextActive: { color: '#000', fontWeight: '600' },
  listContent: { paddingHorizontal: 14, paddingVertical: 12, paddingBottom: 100 },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#18181F',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1F1F2A',
  },
  itemImage: { width: 100, height: 100 },
  itemContent: { flex: 1, padding: 12 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  itemName: { flex: 1, color: '#FFF', fontSize: 14, fontWeight: '600', marginRight: 8 },
  removeBtn: { width: 24, height: 24, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2A2A33', borderRadius: 12 },
  removeBtnText: { color: '#FF6B6B', fontSize: 12, fontWeight: '600' },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#E8C97A',
    marginBottom: 6,
  },
  categoryText: { color: '#000', fontSize: 11, fontWeight: '600' },
  ratingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  rating: { color: '#E8C97A', fontSize: 12, fontWeight: '600' },
  dateAdded: { color: '#A0A0A0', fontSize: 11 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: '#E8C97A', fontSize: 16, fontWeight: '700' },
  addCartBtn: { backgroundColor: '#E8C97A', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  addCartBtnText: { color: '#000', fontSize: 11, fontWeight: '600' },
  emptyFilter: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 },
  emptyFilterEmoji: { fontSize: 48, marginBottom: 12 },
  emptyFilterTitle: { color: '#FFF', fontSize: 16, fontWeight: '600', marginBottom: 4 },
  emptyFilterSubtitle: { color: '#A0A0A0', fontSize: 12 },
});

export default WishlistScreen;
