import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Product } from '../types';

interface TemuAliExpressProductGridProps {
  onAddToCart: (product: Product) => void;
  onProductPress: (id: number) => void;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones Noise Cancelling Over-Ear',
    price: 29.99,
    oldPrice: 59.99,
    badge: 'Hot Sale',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
    rating: 4.5,
    reviews: 2847,
    store: 'AudioTech Official Store',
    freeShipping: true,
    plusEligible: true,
    discount: 50,
    sold: 15420,
  },
  {
    id: 2,
    name: 'Smart Watch Fitness Tracker Heart Rate Monitor GPS',
    price: 45.99,
    oldPrice: 89.99,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80',
    rating: 4.3,
    reviews: 1923,
    store: 'WearableTech Hub',
    freeShipping: true,
    plusEligible: false,
    discount: 49,
    sold: 8750,
  },
  {
    id: 3,
    name: 'Portable Charger 20000mAh Fast Charging Power Bank',
    price: 19.99,
    oldPrice: 39.99,
    img: 'https://images.unsplash.com/photo-1609594040184-52b9b3f8f3ba?w=300&q=80',
    rating: 4.7,
    reviews: 4521,
    store: 'PowerSolutions Ltd',
    freeShipping: true,
    plusEligible: true,
    discount: 50,
    sold: 23100,
  },
  {
    id: 4,
    name: 'LED Strip Lights RGB Smart Home Lighting Kit',
    price: 15.99,
    oldPrice: 29.99,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80',
    rating: 4.4,
    reviews: 1234,
    store: 'SmartHome Essentials',
    freeShipping: false,
    plusEligible: false,
    discount: 47,
    sold: 6780,
  },
  {
    id: 5,
    name: 'Stainless Steel Insulated Water Bottle 500ml',
    price: 12.99,
    oldPrice: 24.99,
    img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80',
    rating: 4.6,
    reviews: 3456,
    store: 'KitchenWare Pro',
    freeShipping: true,
    plusEligible: true,
    discount: 48,
    sold: 18900,
  },
  {
    id: 6,
    name: 'Gaming Mouse RGB Backlit 16000 DPI Wireless',
    price: 34.99,
    oldPrice: 69.99,
    img: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&q=80',
    rating: 4.8,
    reviews: 5678,
    store: 'GamingGear Plus',
    freeShipping: true,
    plusEligible: true,
    discount: 50,
    sold: 31200,
    badge: 'Choice',
  },
  {
    id: 7,
    name: 'Mini Projector HD 1080P Home Theater Portable',
    price: 89.99,
    oldPrice: 149.99,
    img: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&q=80',
    rating: 4.2,
    reviews: 892,
    store: 'Home Entertainment Co',
    freeShipping: true,
    plusEligible: false,
    discount: 40,
    sold: 5430,
  },
  {
    id: 8,
    name: 'Electric Toothbrush Sonic Clean Replacement Heads',
    price: 24.99,
    oldPrice: 49.99,
    img: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=300&q=80',
    rating: 4.5,
    reviews: 2134,
    store: 'OralCare Plus',
    freeShipping: true,
    plusEligible: true,
    discount: 50,
    sold: 12890,
  },
];

const ProductCard: React.FC<{ product: Product; onAddToCart: (id: number) => void; onProductPress: (id: number) => void }> = ({
  product,
  onAddToCart,
  onProductPress,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('⭐');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('⭐');
      } else {
        stars.push('☆');
      }
    }
    return stars.join('');
  };

  return (
    <TouchableOpacity style={styles.productCard} onPress={() => onProductPress(product.id)} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.img }} style={styles.productImage} />
        {product.discount && product.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
        {product.badge && (
          <View style={[styles.badge, product.badge === 'Choice' ? styles.choiceBadge : styles.hotBadge]}>
            <Text style={styles.badgeText}>{product.badge}</Text>
          </View>
        )}
        {product.freeShipping && (
          <View style={styles.freeShippingBadge}>
            <Text style={styles.freeShippingText}>Free Ship</Text>
          </View>
        )}
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingStars}>{renderStars(product.rating || 0)}</Text>
          <Text style={styles.ratingText}>({product.reviews})</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₦{product.price}</Text>
          {product.oldPrice && (
            <Text style={styles.oldPrice}>₦{product.oldPrice}</Text>
          )}
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
          <Text style={styles.soldText}>{product.sold} sold</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => onAddToCart(product)}
          >
            <Text style={styles.addToCartText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TemuAliExpressProductGrid: React.FC<TemuAliExpressProductGridProps> = ({ onAddToCart, onProductPress }) => {
  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onAddToCart={onAddToCart}
      onProductPress={onProductPress}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={SAMPLE_PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 8,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productCard: {
    backgroundColor: '#23232B',
    borderRadius: 8,
    width: '48%',
    borderWidth: 1,
    borderColor: '#2D2D38',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#FF5722',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  hotBadge: {
    backgroundColor: '#FF9800',
  },
  choiceBadge: {
    backgroundColor: '#E91E63',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  freeShippingBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
  },
  freeShippingText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 10,
  },
  productTitle: {
    fontSize: 11,
    color: '#FFF',
    fontWeight: '500',
    lineHeight: 14,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingStars: {
    fontSize: 9,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 9,
    color: '#A0A0A0',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#E8C97A',
    marginRight: 6,
  },
  oldPrice: {
    fontSize: 11,
    color: '#A0A0A0',
    textDecorationLine: 'line-through',
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  storeName: {
    fontSize: 9,
    color: '#A0A0A0',
    flex: 1,
  },
  plusBadge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 2,
    marginLeft: 4,
  },
  plusText: {
    fontSize: 7,
    color: '#FFF',
    fontWeight: 'bold',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  soldText: {
    fontSize: 9,
    color: '#A0A0A0',
  },
  addToCartButton: {
    backgroundColor: '#E8C97A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  addToCartText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0D0D12',
  },
});

export default TemuAliExpressProductGrid;