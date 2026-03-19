import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Pressable,
  Easing,
} from 'react-native';

interface CartItem {
  id: string;
  name: string;
  price: number;
  accent: string;
}

interface AnimatedCartProps {
  items?: CartItem[];
  onCheckout?: () => void;
}

const MOCK_ITEMS: CartItem[] = [
  { id: '1', name: 'Velvet Noir', price: 10.99, accent: '#E8C97A' },
  { id: '2', name: 'Obsidian Edge', price: 20.99, accent: '#C4A4F0' },
  { id: '3', name: 'Amber Luxe', price: 30.99, accent: '#7AC8E8' },
];

// ── Floating particle ──────────────────────────────────────────────────────
const Particle: React.FC<{ color: string; delay: number }> = ({ color, delay }) => {
  const y = useRef(new Animated.Value(0)).current;
  const x = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const size = 3 + Math.random() * 4;
  const offsetX = -30 + Math.random() * 60;

  useEffect(() => {
    const loop = () => {
      y.setValue(0);
      x.setValue(0);
      opacity.setValue(0);
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(y, { toValue: -60, duration: 2200, easing: Easing.out(Easing.quad), useNativeDriver: true }),
          Animated.timing(x, { toValue: offsetX, duration: 2200, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.7, duration: 400, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: 1800, useNativeDriver: true }),
          ]),
        ]),
      ]).start(loop);
    };
    loop();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: 10,
        left: '50%',
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        transform: [{ translateX: x }, { translateY: y }],
      }}
    />
  );
};

// ── Cart Item Row ──────────────────────────────────────────────────────────
const CartRow: React.FC<{ item: CartItem; index: number; onRemove: (id: string) => void }> = ({
  item,
  index,
  onRemove,
}) => {
  const slideX = useRef(new Animated.Value(-40)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const removeScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideX, { toValue: 0, duration: 400, delay: index * 100, easing: Easing.out(Easing.back(1.5)), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, delay: index * 100, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleRemove = () => {
    Animated.parallel([
      Animated.timing(slideX, { toValue: 80, duration: 300, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start(() => onRemove(item.id));
  };

  return (
    <Animated.View style={[styles.row, { opacity, transform: [{ translateX: slideX }] }]}>
      <View style={[styles.rowDot, { backgroundColor: item.accent }]} />
      <Text style={styles.rowName} numberOfLines={1}>{item.name}</Text>
      <Text style={[styles.rowPrice, { color: item.accent }]}>${item.price.toFixed(2)}</Text>
      <Pressable
        onPressIn={() => Animated.spring(removeScale, { toValue: 0.8, useNativeDriver: true, speed: 40 }).start()}
        onPressOut={() => { Animated.spring(removeScale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 12 }).start(); handleRemove(); }}
      >
        <Animated.Text style={[styles.removeBtn, { transform: [{ scale: removeScale }] }]}>✕</Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
const AnimatedCart: React.FC<AnimatedCartProps> = ({
  items: propItems = MOCK_ITEMS,
  onCheckout,
}) => {
  const [items, setItems] = useState(propItems);

  // Icon animations
  const float = useRef(new Animated.Value(0)).current;
  const iconScale = useRef(new Animated.Value(0.6)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const badgeScale = useRef(new Animated.Value(0)).current;
  const totalOpacity = useRef(new Animated.Value(0)).current;
  const checkoutY = useRef(new Animated.Value(20)).current;
  const checkoutOpacity = useRef(new Animated.Value(0)).current;
  const shimmer = useRef(new Animated.Value(0)).current;

  const total = items.reduce((sum, i) => sum + i.price, 0);

  useEffect(() => {
    // Mount sequence
    Animated.sequence([
      Animated.parallel([
        Animated.spring(iconScale, { toValue: 1, useNativeDriver: true, speed: 6, bounciness: 14 }),
        Animated.timing(iconOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.spring(badgeScale, { toValue: 1, useNativeDriver: true, speed: 10, bounciness: 20 }),
      Animated.parallel([
        Animated.timing(totalOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(checkoutOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(checkoutY, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
    ]).start();

    // Float loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, { toValue: -8, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(float, { toValue: 0, duration: 1800, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();

    // Shimmer loop on checkout button
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 2000, delay: 1500, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const shimmerX = shimmer.interpolate({ inputRange: [0, 1], outputRange: [-100, 240] });

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <View style={styles.screen}>

      {/* Particles */}
      {['#E8C97A', '#C4A4F0', '#7AC8E8', '#F0A4C4', '#E8C97A'].map((c, i) => (
        <Particle key={i} color={c} delay={i * 440} />
      ))}

      {/* Icon area */}
      <Animated.View style={[styles.iconArea, { transform: [{ translateY: float }, { scale: iconScale }], opacity: iconOpacity }]}>
        {/* Glow ring */}
        <View style={styles.glowRing} />
        <View style={styles.glowRingInner} />
        <Text style={styles.cartIcon}>🛒</Text>

        {/* Badge */}
        <Animated.View style={[styles.badge, { transform: [{ scale: badgeScale }] }]}>
          <Text style={styles.badgeText}>{items.length}</Text>
        </Animated.View>
      </Animated.View>

      {/* Title */}
      <Animated.View style={[styles.titleRow, { opacity: iconOpacity }]}>
        <View style={styles.titleLine} />
        <Text style={styles.cartTitle}>YOUR CART</Text>
        <View style={styles.titleLine} />
      </Animated.View>

      {/* Items list */}
      <View style={styles.itemsList}>
        {items.length === 0 ? (
          <Text style={styles.emptyText}>Cart is empty</Text>
        ) : (
          items.map((item, i) => (
            <CartRow key={item.id} item={item} index={i} onRemove={removeItem} />
          ))
        )}
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Total */}
      <Animated.View style={[styles.totalRow, { opacity: totalOpacity }]}>
        <Text style={styles.totalLabel}>TOTAL</Text>
        <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
      </Animated.View>

      {/* Checkout button */}
      <Animated.View style={[styles.checkoutWrapper, { opacity: checkoutOpacity, transform: [{ translateY: checkoutY }] }]}>
        <Pressable style={styles.checkoutButton} onPress={onCheckout}>
          <Animated.View style={[styles.shimmerBar, { transform: [{ translateX: shimmerX }, { rotate: '20deg' }] }]} />
          <Text style={styles.checkoutText}>Checkout</Text>
          <Text style={styles.checkoutArrow}>→</Text>
        </Pressable>
      </Animated.View>

    </View>
  );
};

// ── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#0D0D12',
    borderRadius: 24,
    padding: 24,
    margin: 16,
    borderWidth: 1,
    borderColor: '#ffffff0A',
    overflow: 'hidden',
    alignItems: 'center',
  },

  // Icon
  iconArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
    width: 100,
    height: 100,
  },
  glowRing: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E8C97A22',
    backgroundColor: '#E8C97A08',
  },
  glowRingInner: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#E8C97A33',
    backgroundColor: '#E8C97A0D',
  },
  cartIcon: {
    fontSize: 44,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#E8C97A',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#0D0D12',
    fontFamily: 'Courier',
  },

  // Title
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    width: '100%',
  },
  titleLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffffff10',
  },
  cartTitle: {
    fontSize: 10,
    letterSpacing: 4,
    color: '#E8C97A',
    fontWeight: '700',
    fontFamily: 'Courier',
  },

  // Rows
  itemsList: {
    width: '100%',
    gap: 10,
    minHeight: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16161F',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#ffffff08',
    gap: 10,
  },
  rowDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  rowName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#F0EDE6',
    letterSpacing: -0.2,
  },
  rowPrice: {
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'Courier',
  },
  removeBtn: {
    fontSize: 11,
    color: '#4A4A5A',
    fontWeight: '700',
    paddingLeft: 4,
  },
  emptyText: {
    color: '#3A3A48',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Courier',
    letterSpacing: 2,
  },

  // Divider & total
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ffffff08',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 18,
  },
  totalLabel: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#6B6B7B',
    fontWeight: '700',
    fontFamily: 'Courier',
    alignSelf: 'flex-end',
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F0EDE6',
    letterSpacing: -1,
  },

  // Checkout
  checkoutWrapper: {
    width: '100%',
  },
  checkoutButton: {
    backgroundColor: '#E8C97A',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    overflow: 'hidden',
  },
  shimmerBar: {
    position: 'absolute',
    width: 40,
    height: 80,
    backgroundColor: 'rgba(255,255,255,0.25)',
    top: -20,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0D0D12',
    fontFamily: 'Courier',
    letterSpacing: 0.5,
  },
  checkoutArrow: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0D0D12',
  },

  // Particles
});

export default AnimatedCart;