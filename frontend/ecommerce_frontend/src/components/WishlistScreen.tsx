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
  const { addItem } = useCart();
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
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      category: item.category,
    });
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
  container: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  backBtn: {
    padding: 8,
  },
  backText: {
    fontSize: 24,
    color: '#E8C97A',
  },
  title: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#18181F',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  statValue: {
    color: '#E8C97A',
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    color: '#A0A0A0',
    fontSize: 12,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  itemCard: {
    backgroundColor: '#18181F',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  itemTouchable: {
    flex: 1,
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 120,
    backgroundColor: '#23232B',
  },
  outOfStockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  itemContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  categoryRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  category: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A35',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 2,
  },
  ratingIcon: {
    fontSize: 12,
  },
  ratingText: {
    color: '#E8C97A',
    fontSize: 12,
    fontWeight: '600',
  },
  reviewCount: {
    color: '#A0A0A0',
    fontSize: 11,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  price: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '700',
  },
  oldPrice: {
    color: '#7A7A8A',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  addedDate: {
    color: '#707080',
    fontSize: 11,
  },
  outOfStockText: {
    color: '#FF6B6B',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 4,
  },
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E8C97A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBtnDisabled: {
    backgroundColor: '#A0A0A0',
    opacity: 0.5,
  },
  cartBtnText: {
    fontSize: 18,
  },
  removeBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingTop: 12,
    gap: 10,
  },
  shareBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#18181F',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8C97A',
    alignItems: 'center',
  },
  shareBtnText: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '600',
  },
  clearBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default WishlistScreen;
