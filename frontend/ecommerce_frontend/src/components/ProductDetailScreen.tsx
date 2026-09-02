import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import { api } from '../services/api';
import { Product } from '../types';
import { ChevronLeftIcon, StarIcon, CheckIcon, MinusIcon, PlusIcon, PackageIcon } from './Icons';
import AnimatedStar from './AnimatedStar';

interface ProductDetailScreenProps {
  product: Product;
  onBack?: () => void;
  onViewReviews?: (product: Product) => void;
}

const PRODUCT_DETAILS: { [key: number]: any } = {
  1: { images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'], description: 'Premium running shoes designed for comfort and performance.', fullDescription: 'The Phantom Runner is engineered with cutting-edge sole technology and premium materials. Perfect for runners who demand both style and substance.', rating: 4.8, reviews: 245, inStock: true, sizes: ['6', '7', '8', '9', '10', '11', '12', '13'], specs: [{ label: 'Material', value: 'Mesh & Rubber' }, { label: 'Weight', value: '280g' }, { label: 'Sizes', value: '6-13' }], relatedProducts: [2, 7, 8] },
  2: { images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80'], description: 'Stylish outerwear jacket for modern fashion enthusiasts.', fullDescription: 'The Void Jacket combines contemporary design with premium comfort.', rating: 4.6, reviews: 189, inStock: true, sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], specs: [{ label: 'Material', value: '100% Polyester' }, { label: 'Care', value: 'Machine Washable' }], relatedProducts: [1, 3, 9] },
  3: { images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'], description: 'Smart timepiece with elegant design and modern functionality.', fullDescription: 'The Eclipse Watch is a perfect blend of style and technology.', rating: 4.9, reviews: 312, inStock: true, sizes: [], specs: [{ label: 'Display', value: 'AMOLED' }, { label: 'Battery Life', value: '7 Days' }, { label: 'Water Resistance', value: '5ATM' }], relatedProducts: [4, 6, 10] },
};

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ product, onBack, onViewReviews }) => {
  const insets = useSafeAreaInsets();
  const { addToCart } = useCart();
  const { products } = useProducts();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [related, setRelated] = useState<Product[]>([]);

  const details = PRODUCT_DETAILS[product.id] || {
    images: [product.img], description: 'High-quality product', fullDescription: 'Premium product designed for quality and comfort.',
    rating: 4.5, reviews: 100, inStock: true, sizes: [], specs: [{ label: 'Quality', value: 'Premium' }], relatedProducts: [],
  };

  useEffect(() => {
    let active = true;
    (async () => {
      let list: Product[] = [];
      try {
        const res = await api.get<{ items: Product[] }>(`/products/${product.id}/related`);
        if (active && res && Array.isArray(res.items) && res.items.length > 0) list = res.items;
      } catch (e) {
        // backend offline — fall back to local filtering below
      }
      if (list.length === 0) {
        list = products
          .filter((p) => p.id !== product.id && (p.category ?? '').toLowerCase() === (product.category ?? '').toLowerCase())
          .slice(0, 6);
        if (list.length === 0) {
          list = products.filter((p) => p.id !== product.id).slice(0, 6);
        }
      }
      if (active) setRelated(list);
    })();
    return () => {
      active = false;
    };
  }, [product.id]);

  const handleAddToCart = () => {
    if (details.sizes && details.sizes.length > 0 && !selectedSize) {
      Alert.alert('Select size', 'Please select a size before adding to cart');
      return;
    }
    const cartItem = { ...product, image: (product as any).image || (product as any).img || details.images?.[0] || '', description: (product as any).description || details.description || '', size: selectedSize };
    for (let i = 0; i < quantity; i++) { addToCart(cartItem as any); }
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 1.15, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const formatCurrency = (value: number) => `₦${value.toFixed(2)}`;
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ChevronLeftIcon size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Product Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: details.images[selectedImage] }} style={styles.mainImage} />
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          )}
        </View>

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

          <TouchableOpacity onPress={() => onViewReviews?.(product)} style={styles.ratingRow}>
            <View style={styles.starsRow}>
              {[1,2,3,4,5].map(i => <AnimatedStar key={i} size={16} filled={i <= Math.floor(details.rating)} delay={i * 100} />)}
            </View>
            <Text style={styles.ratingValue}>{details.rating}</Text>
            <Text style={styles.reviews}>({details.reviews} reviews)</Text>
          </TouchableOpacity>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            {product.oldPrice && <Text style={styles.oldPrice}>{formatCurrency(product.oldPrice)}</Text>}
          </View>

          <View style={styles.stockRow}>
            {details.inStock ? (
              <View style={styles.inStockRow}>
                <CheckIcon size={14} color="#4CAF50" />
                <Text style={styles.inStock}>In Stock</Text>
                {typeof product.stock === 'number' && product.stock <= 5 && product.stock > 0 && (
                  <Text style={styles.lowStock}>• Only {product.stock} left</Text>
                )}
              </View>
            ) : (
              <Text style={styles.outOfStock}>Out of Stock</Text>
            )}
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{details.fullDescription}</Text>
        </View>

        {details.sizes && details.sizes.length > 0 && (
          <View style={styles.sizeSection}>
            <Text style={styles.sectionTitle}>Select Size</Text>
            <View style={styles.sizeGrid}>
              {details.sizes.map((size: string) => (
                <TouchableOpacity key={size} onPress={() => setSelectedSize(size)} style={[styles.sizeButton, selectedSize === size && styles.sizeButtonSelected]}>
                  <Text style={[styles.sizeButtonText, selectedSize === size && styles.sizeButtonTextSelected]}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.specsSection}>
          <Text style={styles.sectionTitle}>Specifications</Text>
          {details.specs.map((spec: any, index: number) => (
            <View key={index} style={styles.specRow}>
              <Text style={styles.specLabel}>{spec.label}</Text>
              <Text style={styles.specValue}>{spec.value}</Text>
            </View>
          ))}
        </View>

        {related.length > 0 && (
          <View style={styles.relatedSection}>
            <Text style={styles.sectionTitle}>You may also like</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedRow}>
              {related.map((r) => (
                <TouchableOpacity key={r.id} style={styles.relatedCard}>
                  <Image source={{ uri: r.img }} style={styles.relatedImage} />
                  <Text style={styles.relatedName} numberOfLines={1}>{r.name}</Text>
                  <Text style={styles.relatedPrice}>{formatCurrency(r.price)}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.spacer} />
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 10 }]}>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.quantityBtn}>
            <MinusIcon size={18} />
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityBtn}>
            <PlusIcon size={18} />
          </TouchableOpacity>
        </View>
        <Animated.View style={{ transform: [{ scale: scaleAnim }], flex: 1 }}>
          <TouchableOpacity onPress={handleAddToCart} style={[styles.addToCartBtn, details.sizes && details.sizes.length > 0 && !selectedSize && styles.addToCartBtnDisabled]} disabled={!details.inStock}>
            <PackageIcon size={18} color="#FFF" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#1F1F2A' },
  backBtn: { padding: 8 },
  title: { color: '#FFF', fontSize: 18, fontWeight: '700', flex: 1, textAlign: 'center' },
  content: { paddingHorizontal: 14, paddingTop: 16 },
  imageContainer: { position: 'relative', marginBottom: 16, borderRadius: 16, overflow: 'hidden' },
  mainImage: { width: '100%', height: 340, backgroundColor: '#1F1F2A', borderRadius: 16 },
  discountBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: '#FF5722', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  discountText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  infoSection: { marginBottom: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  titleSection: { flex: 1 },
  productName: { color: '#FFF', fontSize: 22, fontWeight: '700', marginBottom: 4 },
  category: { color: '#A0A0A0', fontSize: 14 },
  badgeContainer: { marginLeft: 12 },
  badge: { backgroundColor: '#FF5722', color: '#FFF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, fontSize: 12, fontWeight: '700', overflow: 'hidden' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 6 },
  starsRow: { flexDirection: 'row', gap: 2 },
  ratingValue: { color: '#FFD700', fontSize: 16, fontWeight: '700' },
  reviews: { color: '#A0A0A0', fontSize: 14 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 12 },
  price: { color: '#FF5722', fontSize: 28, fontWeight: '700' },
  oldPrice: { color: '#7A7A8A', fontSize: 18, textDecorationLine: 'line-through' },
  stockRow: { marginBottom: 16 },
  inStockRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  inStock: { color: '#4CAF50', fontSize: 14, fontWeight: '600' },
  lowStock: { color: '#FF9800', fontSize: 14, fontWeight: '600' },
  outOfStock: { color: '#FF6B6B', fontSize: 14, fontWeight: '600' },
  descriptionSection: { marginBottom: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#1F1F2A' },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 12 },
  description: { color: '#C0C0C8', fontSize: 14, lineHeight: 22 },
  sizeSection: { marginBottom: 48, paddingBottom: 40, borderBottomWidth: 1, borderBottomColor: '#1F1F2A' },
  sizeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  sizeButton: { minWidth: '18%', paddingVertical: 8, paddingHorizontal: 4, borderRadius: 8, borderWidth: 1.5, borderColor: '#1F1F2A', backgroundColor: '#18181F', alignItems: 'center', justifyContent: 'center' },
  sizeButtonSelected: { backgroundColor: '#FF5722', borderColor: '#FF5722' },
  sizeButtonText: { color: '#A0A0A0', fontSize: 12, fontWeight: '600' },
  sizeButtonTextSelected: { color: '#FFF', fontWeight: '700' },
  specsSection: { marginBottom: 24, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#1F1F2A' },
  specRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#18181F' },
  specLabel: { color: '#A0A0A0', fontSize: 14 },
  specValue: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  relatedSection: { marginBottom: 24 },
  relatedRow: { gap: 12, paddingBottom: 4 },
  relatedCard: { width: 140 },
  relatedImage: { width: 140, height: 140, backgroundColor: '#1F1F2A', borderRadius: 12, marginBottom: 8 },
  relatedName: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  relatedPrice: { color: '#FF5722', fontSize: 14, fontWeight: '700', marginTop: 4 },
  spacer: { height: 100 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#0D0D12', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#1F1F2A', gap: 12 },
  quantityControl: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181F', borderRadius: 8, paddingHorizontal: 8 },
  quantityBtn: { paddingHorizontal: 12, paddingVertical: 8 },
  quantityValue: { color: '#FFF', fontSize: 16, fontWeight: '600', minWidth: 30, textAlign: 'center' },
  addToCartBtn: { flex: 1, backgroundColor: '#FF5722', borderRadius: 12, paddingVertical: 14, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
  addToCartBtnDisabled: { backgroundColor: '#A0A0A0', opacity: 0.6 },
  addToCartText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
});

export default ProductDetailScreen;
