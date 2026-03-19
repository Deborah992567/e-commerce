/**
 * Debbie's E-Commerce — Dark Luxury Landing Page
 */
import React, { useRef, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Animated,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Hero from './src/components/Hero';
import AnimatedCart from './src/components/AnimatedCart';
import FeaturedProducts from './src/components/FeaturedProducts';
import CTAButton from './src/components/CTAButton';

// ── Section wrapper with slide-up + fade entrance ─────────────────────────
interface SectionProps {
  children: React.ReactNode;
  delay?: number;
  style?: object;
}

const Section: React.FC<SectionProps> = ({ children, delay = 0, style }) => {
  const translateY = useRef(new Animated.Value(40)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 700,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 700,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
};

// ── Horizontal divider with center diamond ────────────────────────────────
const Divider: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const scaleX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleX, { toValue: 1, duration: 600, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.dividerRow, { opacity }]}>
      <Animated.View style={[styles.dividerLine, { transform: [{ scaleX }] }]} />
      <View style={styles.dividerDiamond} />
      <Animated.View style={[styles.dividerLine, { transform: [{ scaleX }] }]} />
    </Animated.View>
  );
};

// ── CTA section with label ────────────────────────────────────────────────
const CTASection: React.FC<{ onShopNow: () => void; onViewCart: () => void }> = ({
  onShopNow,
  onViewCart,
}) => (
  <View style={styles.ctaSection}>
    <CTAButton
      title="Shop Now"
      onPress={onShopNow}
      color="#E8C97A"
      size="lg"
      icon="→"
    />
    <CTAButton
      title="View Cart"
      onPress={onViewCart}
      color="#C4A4F0"
      variant="outline"
      size="lg"
      icon="🛒"
    />
  </View>
);

// ── Main App ──────────────────────────────────────────────────────────────
function App(): React.JSX.Element {
  const insets = useSafeAreaInsets();

  const handleShopNow = () => console.log('Shop now pressed!');
  const handleViewCart = () => console.log('View cart pressed!');

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D12" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top, paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ── */}
        <Section delay={0}>
          <Hero />
        </Section>

        <Divider delay={400} />

        {/* ── CTA Buttons ── */}
        <Section delay={500} style={styles.sectionPad}>
          <CTASection onShopNow={handleShopNow} onViewCart={handleViewCart} />
        </Section>

        <Divider delay={700} />

        {/* ── Cart ── */}
        <Section delay={800} style={styles.sectionPad}>
          <AnimatedCart />
        </Section>

        <Divider delay={1000} />

        {/* ── Featured Products ── */}
        <Section delay={1100} style={styles.sectionPad}>
          <FeaturedProducts />
        </Section>
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D0D12',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionPad: {
    paddingVertical: 8,
  },

  // Divider
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 24,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ffffff08',
    transformOrigin: 'left',
  },
  dividerDiamond: {
    width: 5,
    height: 5,
    backgroundColor: '#E8C97A40',
    borderWidth: 1,
    borderColor: '#E8C97A80',
    transform: [{ rotate: '45deg' }],
  },

  // CTA section
  ctaSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 4,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});

export default App;