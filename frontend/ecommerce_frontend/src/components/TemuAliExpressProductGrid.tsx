import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Product } from '../types';
import { StarIcon, TruckIcon, TagIcon, FireIcon } from './Icons';
import { SkeletonProductCard } from './SkeletonLoader';
import { useProducts } from '../contexts/ProductContext';

interface TemuAliExpressProductGridProps {
  onAddToCart: (product: Product) => void;
  onProductPress: (product: Product) => void;
  category?: string;
}

const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void; onProductPress: (product: Product) => void }> = ({ product, onAddToCart, onProductPress }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(<StarIcon key={i} size={10} color="#FFD700" filled={i < fullStars} />);
    }
    return stars;
  };

  return (
    <TouchableOpacity style={styles.productCard} onPress={() => onProductPress(product)} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.img }} style={styles.productImage} />
        {product.discount && product.discount > 0 && (
          <View style={styles.discountBadge}>
            <TagIcon size={8} color="#FFF" />
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
        {product.badge && (
          <View style={[styles.badge, product.badge === 'Choice' ? styles.choiceBadge : styles.hotBadge]}>
            {product.badge === 'Choice' ? <StarIcon size={8} color="#FFF" filled /> : <FireIcon size={8} color="#FFF" />}
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
        {product.freeShipping && (
          <View style={styles.freeShippingBadge}>
            <TruckIcon size={8} color="#FFF" />
            <Text style={styles.freeShippingText}>Free Ship</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>{product.name}</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.starsRow}>{renderStars(product.rating || 0)}</View>
          {typeof product.reviews === 'number' && <Text style={styles.ratingText}>({product.reviews})</Text>}
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₦{product.price}</Text>
          {product.oldPrice && <Text style={styles.oldPrice}>₦{product.oldPrice}</Text>}
        </View>
        <View style={styles.storeContainer}>
          <Text style={styles.storeName} numberOfLines={1}>{product.store}</Text>
          {product.plusEligible && (
            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>PLUS</Text>
            </View>
          )}
        </View>
        <View style={styles.bottomContainer}>
          {typeof product.sold === 'number' ? <Text style={styles.soldText}>{product.sold} sold</Text> : <View />}
          <TouchableOpacity style={styles.addToCartButton} onPress={() => onAddToCart(product)}>
            <Text style={styles.addToCartText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TemuAliExpressProductGrid: React.FC<TemuAliExpressProductGridProps> = ({ onAddToCart, onProductPress, category }) => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {[1,2,3,4].map(i => <SkeletonProductCard key={i} />)}
        </View>
      </View>
    );
  }

  const visibleProducts =
    category && category !== 'All'
      ? products.filter((p) => (p.category ?? '').toLowerCase() === category.toLowerCase())
      : products;

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {visibleProducts.slice(0, 40).map((item) => (
          <ProductCard key={item.id.toString()} product={item} onAddToCart={onAddToCart} onProductPress={onProductPress} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContainer: { padding: 8, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  productCard: {
    backgroundColor: '#23232B', borderRadius: 12, width: '48%', borderWidth: 1, borderColor: '#2D2D38', overflow: 'hidden', marginBottom: 12,
  },
  imageContainer: { position: 'relative', height: 140 },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  discountBadge: {
    position: 'absolute', top: 6, left: 6, backgroundColor: '#FF5722', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4,
    flexDirection: 'row', alignItems: 'center', gap: 3,
  },
  discountText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  badge: {
    position: 'absolute', top: 6, right: 6, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4,
    flexDirection: 'row', alignItems: 'center', gap: 3,
  },
  hotBadge: { backgroundColor: '#FF9800' },
  choiceBadge: { backgroundColor: '#E91E63' },
  badgeText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
  freeShippingBadge: {
    position: 'absolute', bottom: 6, left: 6, backgroundColor: '#4CAF50', paddingHorizontal: 4, paddingVertical: 2, borderRadius: 3,
    flexDirection: 'row', alignItems: 'center', gap: 2,
  },
  freeShippingText: { color: '#FFF', fontSize: 8, fontWeight: 'bold' },
  productInfo: { padding: 10 },
  productTitle: { fontSize: 11, color: '#FFF', fontWeight: '500', lineHeight: 14, marginBottom: 4 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 4 },
  starsRow: { flexDirection: 'row', gap: 1 },
  ratingText: { fontSize: 9, color: '#A0A0A0' },
  priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 4, gap: 6 },
  currentPrice: { fontSize: 13, fontWeight: 'bold', color: '#FF5722' },
  oldPrice: { fontSize: 11, color: '#A0A0A0', textDecorationLine: 'line-through' },
  storeContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  storeName: { fontSize: 9, color: '#A0A0A0', flex: 1 },
  plusBadge: { backgroundColor: '#FF5722', paddingHorizontal: 3, paddingVertical: 1, borderRadius: 2, marginLeft: 4 },
  plusText: { fontSize: 7, color: '#FFF', fontWeight: 'bold' },
  bottomContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  soldText: { fontSize: 9, color: '#A0A0A0' },
  addToCartButton: { backgroundColor: '#FF5722', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  addToCartText: { fontSize: 10, fontWeight: 'bold', color: '#FFF' },
});

export default TemuAliExpressProductGrid;
