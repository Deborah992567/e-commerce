import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';
import CTAButton from './CTAButton';

interface ProductDetailScreenProps {
  product: Product;
  onBack?: () => void;
}

// Extended product details
const PRODUCT_DETAILS: { [key: number]: any } = {
  1: {
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80&flip=true',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80&sat=-100',
    ],
    description: 'Premium running shoes designed for comfort and performance. Features advanced cushioning technology for all-day wear.',
    fullDescription: 'The Phantom Runner is engineered with cutting-edge sole technology and premium materials. Perfect for runners who demand both style and substance. The breathable upper keeps your feet cool, while the responsive cushioning absorbs impact with every stride.',
    rating: 4.8,
    reviews: 245,
    inStock: true,
    specs: [
      { label: 'Material', value: 'Mesh & Rubber' },
      { label: 'Weight', value: '280g' },
      { label: 'Sizes', value: '6-13' },
    ],
    relatedProducts: [2, 7, 8],
  },
  2: {
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80&flip=true',
    ],
    description: 'Stylish outerwear jacket for modern fashion enthusiasts. Versatile and comfortable for any season.',
    fullDescription: 'The Void Jacket combines contemporary design with premium comfort. Made from high-quality materials, it\'s perfect for layering or wearing solo. Features adjustable cuffs and a sleek silhouette that pairs with any outfit.',
    rating: 4.6,
    reviews: 189,
    inStock: true,
    specs: [
      { label: 'Material', value: '100% Polyester' },
      { label: 'Care', value: 'Machine Washable' },
      { label: 'Sizes', value: 'XS-XXL' },
    ],
    relatedProducts: [1, 3, 9],
  },
  3: {
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    ],
    description: 'Smart timepiece with elegant design and modern functionality.',
    fullDescription: 'The Eclipse Watch is a perfect blend of style and technology. Track your daily activities with precision sensors, receive notifications on the go, and stay connected throughout the day. Water-resistant design ensures durability.',
    rating: 4.9,
    reviews: 312,
    inStock: true,
    specs: [
      { label: 'Display', value: 'AMOLED' },
      { label: 'Battery Life', value: '7 Days' },
      { label: 'Water Resistance', value: '5ATM' },
    ],
    relatedProducts: [4, 6, 10],
  },
};

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ product, onBack }) => {
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [scaleAnim] = useState(new Animated.Value(1));

  const details = PRODUCT_DETAILS[product.id] || {
    images: [product.img],
    description: 'High-quality product',
    fullDescription: 'This is a premium product designed for quality and comfort.',
    rating: 4.5,
    reviews: 100,
    inStock: true,
    specs: [
      { label: 'Quality', value: 'Premium' },
      { label: 'Warranty', value: '1 Year' },
    ],
    relatedProducts: [],
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.15,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Product Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: details.images[selectedImage] }}
            style={styles.mainImage}
          />
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          )}
        </View>

        {/* Image Thumbnails */}
        {details.images.length > 1 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.thumbnailContainer}
          >
            {details.images.map((image: string, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(index)}
                style={[
                  styles.thumbnail,
                  selectedImage === index && styles.thumbnailActive,
                ]}
              >
                <Image source={{ uri: image }} style={styles.thumbnailImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Product Info */}
        <View style={styles.infoSection}>
          <View style={styles.headerRow}>
            <View style={styles.titleSection}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.category}>{product.category}</Text>
            </View>
            {product.badge && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badge}>{product.badge}</Text>
              </View>
            )}
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Text style={styles.stars}>⭐ {details.rating}</Text>
            <Text style={styles.reviews}>({details.reviews} reviews)</Text>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            {product.oldPrice && (
              <Text style={styles.oldPrice}>
                {formatCurrency(product.oldPrice)}
              </Text>
            )}
          </View>

          {/* Stock Status */}
          <View style={styles.stockRow}>
            <Text style={details.inStock ? styles.inStock : styles.outOfStock}>
              {details.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{details.fullDescription}</Text>
        </View>

        {/* Specifications */}
        <View style={styles.specsSection}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          {details.specs.map((spec: any, index: number) => (
            <View key={index} style={styles.specRow}>
              <Text style={styles.specLabel}>{spec.label}</Text>
              <Text style={styles.specValue}>{spec.value}</Text>
            </View>
          ))}
        </View>

        {/* Related Products (placeholder) */}
        <View style={styles.relatedSection}>
          <Text style={styles.sectionTitle}>You May Also Like</Text>
          <View style={styles.relatedGrid}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.relatedCard}>
                <View style={styles.relatedImage} />
                <Text style={styles.relatedName}>Product {item}</Text>
                <Text style={styles.relatedPrice}>$99.99</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            style={styles.quantityBtn}
          >
            <Text style={styles.quantityBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.quantityBtn}
          >
            <Text style={styles.quantityBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            onPress={handleAddToCart}
            style={styles.addToCartBtn}
            disabled={!details.inStock}
          >
            <Text style={styles.addToCartText}>🛒 Add to Cart</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
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
  content: {
    paddingHorizontal: 14,
    paddingTop: 16,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: 340,
    backgroundColor: '#1F1F2A',
    borderRadius: 16,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  discountText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 14,
  },
  thumbnailContainer: {
    marginBottom: 16,
  },
  thumbnail: {
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailActive: {
    borderColor: '#E8C97A',
  },
  thumbnailImage: {
    width: 70,
    height: 70,
    backgroundColor: '#1F1F2A',
  },
  infoSection: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    flex: 1,
  },
  productName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  category: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  badgeContainer: {
    marginLeft: 12,
  },
  badge: {
    backgroundColor: '#E8C97A',
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    color: '#FFC107',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  reviews: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    color: '#E8C97A',
    fontSize: 28,
    fontWeight: '700',
    marginRight: 12,
  },
  oldPrice: {
    color: '#7A7A8A',
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
  stockRow: {
    marginBottom: 16,
  },
  inStock: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  outOfStock: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  descriptionSection: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    color: '#C0C0C8',
    fontSize: 14,
    lineHeight: 22,
  },
  specsSection: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1F1F2A',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#18181F',
  },
  specLabel: {
    color: '#A0A0A0',
    fontSize: 14,
  },
  specValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  relatedSection: {
    marginBottom: 24,
  },
  relatedGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  relatedCard: {
    flex: 1,
    backgroundColor: '#18181F',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
  },
  relatedImage: {
    width: '100%',
    height: 80,
    backgroundColor: '#23232B',
    borderRadius: 8,
    marginBottom: 8,
  },
  relatedName: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  relatedPrice: {
    color: '#E8C97A',
    fontSize: 12,
    fontWeight: '700',
  },
  spacer: {
    height: 100,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0D0D12',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1F1F2A',
    gap: 12,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181F',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  quantityBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quantityBtnText: {
    color: '#E8C97A',
    fontSize: 18,
    fontWeight: '700',
  },
  quantityValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartBtn: {
    flex: 1,
    backgroundColor: '#E8C97A',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ProductDetailScreen;
