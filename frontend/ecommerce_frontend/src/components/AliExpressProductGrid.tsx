import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  store: string;
  freeShipping: boolean;
  plusEligible: boolean;
  discount?: number;
  sold: number;
}

interface AliExpressProductGridProps {
  onAddToCart: (id: number) => void;
  onProductPress: (id: number) => void;
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones Noise Cancelling',
    price: 29.99,
    oldPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80',
    rating: 4.5,
    reviews: 2847,
    store: 'AudioTech Store',
    freeShipping: true,
    plusEligible: true,
    discount: 50,
    sold: 15420,
  },
  {
    id: 2,
    name: 'Smart Watch Fitness Tracker Heart Rate Monitor',
    price: 45.99,
    oldPrice: 89.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80',
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
    image: 'https://images.unsplash.com/photo-1609594040184-52b9b3f8f3ba?w=300&q=80',
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
    name: 'LED Strip Lights RGB Smart Home Lighting',
    price: 15.99,
    oldPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80',
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
    name: 'Stainless Steel Water Bottle 500ml Insulated',
    price: 12.99,
    oldPrice: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&q=80',
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
    name: 'Wireless Gaming Mouse RGB Backlit 16000 DPI',
    price: 34.99,
    oldPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&q=80',
    rating: 4.8,
    reviews: 5678,
    store: 'GamingGear Plus',
    freeShipping: true,
    plusEligible: true,
    discount: 50,
    sold: 31200,
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

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  return (
    <TouchableOpacity style={styles.productCard} onPress={() => onProductPress(product.id)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
        {product.freeShipping && (
          <View style={styles.freeShippingBadge}>
            <Text style={styles.freeShippingText}>Free Shipping</Text>
          </View>
        )}
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingStars}>{renderStars(product.rating)}</Text>
          <Text style={styles.ratingText}>({product.reviews})</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>₦{product.price}</Text>
          {product.oldPrice && (
            <Text style={styles.oldPrice}>₦{product.oldPrice}</Text>
          )}
        </View>

        <Text style={styles.soldText}>{product.sold} sold</Text>

        <View style={styles.storeContainer}>
          <Text style={styles.storeName}>{product.store}</Text>
          {product.plusEligible && (
            <View style={styles.plusBadge}>
              <Text style={styles.plusText}>PLUS</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => onAddToCart(product.id)}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const AliExpressProductGrid: React.FC<AliExpressProductGridProps> = ({ onAddToCart, onProductPress }) => {
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
  },
  imageContainer: {
    position: 'relative',
    height: 150,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
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
  freeShippingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  freeShippingText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '500',
    lineHeight: 16,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingStars: {
    fontSize: 10,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 10,
    color: '#A0A0A0',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E8C97A',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 12,
    color: '#A0A0A0',
    textDecorationLine: 'line-through',
  },
  soldText: {
    fontSize: 10,
    color: '#A0A0A0',
    marginBottom: 4,
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  storeName: {
    fontSize: 10,
    color: '#A0A0A0',
    flex: 1,
  },
  plusBadge: {
    backgroundColor: '#FF5722',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
    marginLeft: 4,
  },
  plusText: {
    fontSize: 8,
    color: '#FFF',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#E8C97A',
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0D0D12',
  },
});

export default AliExpressProductGrid;