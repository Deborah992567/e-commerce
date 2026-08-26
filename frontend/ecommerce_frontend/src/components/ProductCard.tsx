import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Product } from '../types';
import { StarIcon, TagIcon, TruckIcon, FireIcon, HeartIcon } from './Icons';
import AnimatedCard from './AnimatedCard';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onProductPress?: (product: Product) => void;
  onWishlistToggle?: (product: Product) => void;
  delay?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductPress, onWishlistToggle, delay = 0 }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, friction: 4, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(<StarIcon key={i} size={12} color={i < fullStars ? '#FFD700' : '#3A3A48'} filled={i < fullStars} />);
    }
    return stars;
  };

  return (
    <AnimatedCard delay={delay}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => onProductPress?.(product)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View style={styles.imageWrap}>
            <Image source={{ uri: product.img }} style={styles.image} />
            {product.badge && (
              <View style={styles.badge}>
                {product.badge === 'Hot Sale' || product.badge === 'Hot' ? (
                  <FireIcon size={10} color="#FFF" />
                ) : (
                  <TagIcon size={10} color="#FFF" />
                )}
                <Text style={styles.badgeText}>{product.badge}</Text>
              </View>
            )}
            {product.discount && product.discount > 0 && (
              <View style={styles.discountBadge}>
                <TagIcon size={8} color="#FFF" />
                <Text style={styles.discountText}>-{product.discount}%</Text>
              </View>
            )}
            <TouchableOpacity style={styles.heartBtn} onPress={() => onWishlistToggle?.(product)}>
              <HeartIcon size={16} color="#FF2D55" />
            </TouchableOpacity>
          </View>

          <View style={styles.info}>
            <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

            <View style={styles.ratingRow}>
              <View style={styles.stars}>{renderStars(product.rating || 0)}</View>
              <Text style={styles.reviewCount}>{product.reviews}</Text>
            </View>

            {product.freeShipping && (
              <View style={styles.shippingRow}>
                <TruckIcon size={12} color="#4ECDC4" />
                <Text style={styles.shippingText}>Free Shipping</Text>
              </View>
            )}

            <View style={styles.priceRow}>
              <Text style={styles.price}>₦{product.price.toLocaleString()}</Text>
              {product.oldPrice && product.oldPrice > product.price && (
                <Text style={styles.oldPrice}>₦{product.oldPrice.toLocaleString()}</Text>
              )}
            </View>

            {onAddToCart && (
              <TouchableOpacity style={styles.addBtn} onPress={() => onAddToCart(product)}>
                <Text style={styles.addBtnText}>Add to Cart</Text>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </TouchableOpacity>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#23232B', borderRadius: 16, borderWidth: 1, borderColor: '#2D2D3840', overflow: 'hidden' },
  imageWrap: { position: 'relative' },
  image: { width: '100%', height: 160 },
  badge: { position: 'absolute', top: 8, left: 8, backgroundColor: '#FF5722', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3, flexDirection: 'row', alignItems: 'center', gap: 3 },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  discountBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#FF2D55', borderRadius: 6, paddingHorizontal: 6, paddingVertical: 3, flexDirection: 'row', alignItems: 'center', gap: 3 },
  discountText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  heartBtn: { position: 'absolute', bottom: 8, right: 8, backgroundColor: '#23232B', borderRadius: 16, padding: 6, borderWidth: 1, borderColor: '#2D2D38' },
  info: { padding: 12 },
  name: { color: '#FFF', fontSize: 13, fontWeight: '600', lineHeight: 18, marginBottom: 6 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  stars: { flexDirection: 'row', gap: 1 },
  reviewCount: { color: '#A0A0A0', fontSize: 11 },
  shippingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  shippingText: { color: '#4ECDC4', fontSize: 11, fontWeight: '500' },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  price: { color: '#FF5722', fontSize: 18, fontWeight: 'bold' },
  oldPrice: { color: '#A0A0A0', fontSize: 13, textDecorationLine: 'line-through' },
  addBtn: { backgroundColor: '#FF5722', borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  addBtnText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
});

export default ProductCard;
