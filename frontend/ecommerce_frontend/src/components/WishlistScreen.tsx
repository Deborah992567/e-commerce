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

  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: 'Premium Running Shoes',
      price: 149.99,
      oldPrice: 199.99,
      category: 'Shoes',
      rating: 4.8,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
      inStock: true,
      addedDate: 'Mar 15, 2026',
    },
    {
      id: 2,
      name: 'Luxury Designer Jacket',
      price: 299.99,
      category: 'Clothing',
      rating: 4.6,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
      inStock: true,
      addedDate: 'Mar 12, 2026',
    },
    {
      id: 3,
      name: 'Wireless Headphones',
      price: 199.99,
      oldPrice: 249.99,
      category: 'Electronics',
      rating: 4.5,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      inStock: false,
      addedDate: 'Mar 8, 2026',
    },
    {
      id: 4,
      name: 'Smartwatch Pro',
      price: 299.99,
      category: 'Electronics',
      rating: 4.7,
      reviews: 428,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
      inStock: true,
      addedDate: 'Mar 5, 2026',
    },
    {
      id: 5,
      name: 'Athletic Shorts',
      price: 79.99,
      category: 'Clothing',
      rating: 4.4,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1506629082632-59d7ee8ccd2f?w=500&q=80',
      inStock: true,
      addedDate: 'Feb 28, 2026',
    },
  ]);

  const handleRemoveFromWishlist = (id: number) => {
    Alert.alert(
      'Remove from Wishlist',
      'Are you sure you want to remove this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setWishlistItems(wishlistItems.filter((item) => item.id !== id));
            Alert.alert('Removed', 'Item removed from wishlist');
          },
        },
      ]
    );
  };

  const handleAddToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      Alert.alert('Out of Stock', 'This item is currently unavailable');
      return;
    }
    onAddToCart?.(item);
    Alert.alert('Added to Cart', `${item.name} has been added to your cart`);
  };

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;

  const renderWishlistItem = ({ item }: { item: WishlistItem }) => (
    <View style={styles.itemCard}>
      <TouchableOpacity
        onPress={() => onViewProduct?.(item.id)}
        style={styles.itemTouchable}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.itemImage}
        />
        {!item.inStock && <View style={styles.outOfStockOverlay} />}

        <View style={styles.itemContent}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>

          <View style={styles.categoryRatingRow}>
            <Text style={styles.category}>{item.category}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingIcon}>⭐</Text>
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          </View>

          <Text style={styles.reviewCount}>({item.reviews} reviews)</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatCurrency(item.price)}</Text>
            {item.oldPrice && (
              <Text style={styles.oldPrice}>
                {formatCurrency(item.oldPrice)}
              </Text>
            )}
          </View>

          <Text style={styles.addedDate}>Added {item.addedDate}</Text>

          {!item.inStock && (
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.itemActions}>
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={[
            styles.cartBtn,
            !item.inStock && styles.cartBtnDisabled,
          ]}
        >
          <Text style={styles.cartBtnText}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleRemoveFromWishlist(item.id)}
          style={styles.removeBtn}
        >
          <Text style={styles.removeBtnText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const inStockCount = wishlistItems.filter((item) => item.inStock).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Wishlist</Text>
        <View style={styles.headerSpacer} />
      </View>

      {wishlistItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>❤️</Text>
          <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
          <Text style={styles.emptySubtitle}>
            Save items you love and find them here anytime
          </Text>
        </View>
      ) : (
        <>
          {/* Summary Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{wishlistItems.length}</Text>
              <Text style={styles.statLabel}>Items</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{inStockCount}</Text>
              <Text style={styles.statLabel}>In Stock</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>${totalValue.toFixed(0)}</Text>
              <Text style={styles.statLabel}>Total Value</Text>
            </View>
          </View>

          {/* Wishlist Items */}
          <FlatList
            data={wishlistItems}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            renderItem={renderWishlistItem}
            scrollEnabled={false}
          />

          {/* Action Buttons */}
          <View style={[styles.bottomActions, { paddingBottom: insets.bottom + 10 }]}>
            <TouchableOpacity style={styles.shareBtn}>
              <Text style={styles.shareBtnText}>📤 Share Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>🗑️ Clear All</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
