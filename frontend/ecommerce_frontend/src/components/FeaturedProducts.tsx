import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Product } from '../types';

const { width } = Dimensions.get('window');

const mockProducts: Product[] = [
  { id: '1', name: 'Velvet Noir', price: 10.99, image: 'image1', description: 'Description 1' },
  { id: '2', name: 'Obsidian Edge', price: 20.99, image: 'image2', description: 'Description 2' },
  { id: '3', name: 'Amber Luxe', price: 30.99, image: 'image3', description: 'Description 3' },
  { id: '4', name: 'Pearl Mist', price: 40.99, image: 'image4', description: 'Description 4' },
];

const ACCENT_COLORS = ['#E8C97A', '#C4A4F0', '#7AC8E8', '#F0A4C4'];
const CARD_HEIGHT = 200;

// ── Animated Product Card ──────────────────────────────────────────────────
interface ProductCardProps {
  product: Product;
  index: number;
  accent: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index, accent }) => {
  const slideY = useRef(new Animated.Value(60)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Staggered entrance
    Animated.parallel([
      Animated.timing(slideY, {
        toValue: 0,
        duration: 600,
        delay: index * 120,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay: index * 120,
        useNativeDriver: true,
      }),
    ]).start();

    // Looping shimmer on the accent line
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1800,
          delay: index * 300,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 10,
    }).start();
  };

  const shimmerOpacity = shimmer.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  });

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          opacity,
          transform: [{ translateY: slideY }, { scale }],
        },
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.card}
      >
        {/* Animated accent bar */}
        <Animated.View
          style={[
            styles.accentBar,
            { backgroundColor: accent, opacity: shimmerOpacity },
          ]}
        />

        {/* Decorative circle */}
        <View style={[styles.decorCircle, { borderColor: accent + '30' }]} />

        {/* Index badge */}
        <View style={[styles.badge, { backgroundColor: accent + '20', borderColor: accent + '50' }]}>
          <Text style={[styles.badgeText, { color: accent }]}>
            {String(index + 1).padStart(2, '0')}
          </Text>
        </View>

        {/* Content */}
        <View style={styles.cardContent}>
          <Text style={styles.productName} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.productDescription} numberOfLines={1}>
            {product.description}
          </Text>
        </View>

        {/* Price row */}
        <View style={styles.priceRow}>
          <Text style={[styles.productPrice, { color: accent }]}>
            ${product.price.toFixed(2)}
          </Text>
          <View style={[styles.ctaButton, { backgroundColor: accent }]}>
            <Text style={styles.ctaText}>Add →</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

// ── Header with animated underline ────────────────────────────────────────
const AnimatedHeader: React.FC = () => {
  const underlineWidth = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(titleY, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.timing(underlineWidth, {
        toValue: 1,
        duration: 900,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        { opacity: titleOpacity, transform: [{ translateY: titleY }] },
      ]}
    >
      <Text style={styles.eyebrow}>CURATED COLLECTION</Text>
      <Text style={styles.title}>Featured{'\n'}Products</Text>
      <Animated.View
        style={[
          styles.titleUnderline,
          { transform: [{ scaleX: underlineWidth }] },
        ]}
      />
    </Animated.View>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
const FeaturedProducts: React.FC = () => {
  return (
    <View style={styles.screen}>
      {/* Background texture dots */}
      {[...Array(6)].map((_, i) => (
        <View
          key={i}
          style={[
            styles.bgDot,
            {
              top: `${15 + i * 15}%`,
              right: i % 2 === 0 ? -20 : undefined,
              left: i % 2 !== 0 ? -20 : undefined,
              width: 80 + i * 20,
              height: 80 + i * 20,
            },
          ]}
        />
      ))}

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <AnimatedHeader />

        <View style={styles.grid}>
          {mockProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              accent={ACCENT_COLORS[index % ACCENT_COLORS.length]}
            />
          ))}
        </View>

        {/* Footer tag */}
        <View style={styles.footer}>
          <View style={styles.footerDot} />
          <Text style={styles.footerText}>4 items available</Text>
          <View style={styles.footerDot} />
        </View>
      </ScrollView>
    </View>
  );
};

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0D0D12',
    position: 'relative',
    overflow: 'hidden',
  },
  bgDot: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: '#ffffff04',
    borderWidth: 1,
    borderColor: '#ffffff06',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // Header
  headerContainer: {
    marginBottom: 36,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 4,
    color: '#E8C97A',
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: 'Courier',
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#F0EDE6',
    lineHeight: 48,
    letterSpacing: -1,
  },
  titleUnderline: {
    marginTop: 14,
    height: 2,
    width: 60,
    backgroundColor: '#E8C97A',
    transformOrigin: 'left',
  },

  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  cardWrapper: {
    width: (width - 54) / 2,
  },
  card: {
    backgroundColor: '#16161F',
    borderRadius: 16,
    padding: 16,
    height: CARD_HEIGHT,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ffffff0A',
    justifyContent: 'space-between',
    position: 'relative',
  },

  // Decorative
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  decorCircle: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1,
    top: -30,
    right: -30,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    fontFamily: 'Courier',
  },

  // Content
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F0EDE6',
    letterSpacing: -0.3,
    marginBottom: 3,
  },
  productDescription: {
    fontSize: 11,
    color: '#6B6B7B',
    letterSpacing: 0.2,
  },

  // Price row
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  ctaButton: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ctaText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D0D12',
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 32,
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#3A3A48',
  },
  footerText: {
    fontSize: 11,
    color: '#3A3A48',
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: 'Courier',
  },
});

export default FeaturedProducts;