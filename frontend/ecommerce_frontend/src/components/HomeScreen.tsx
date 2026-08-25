import React, { useRef, useEffect } from 'react';
import { StatusBar, StyleSheet, ScrollView, View, Animated, Easing, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Hero from './Hero';
import AnimatedCart from './AnimatedCart';
import FeaturedProducts from './FeaturedProducts';
import GamificationPanel from './GamificationPanel';
import SpinToWin from './SpinToWin';
import CTAButton from './CTAButton';
import { HomeIcon, ShopIcon, CartIcon, FireIcon, TagIcon, TruckIcon } from './Icons';

interface HomeScreenProps {
  onShopNow?: () => void;
  onViewCart?: () => void;
}

const Section: React.FC<{ children: React.ReactNode; delay?: number; style?: object }> = ({ children, delay = 0, style }) => {
  const translateY = useRef(new Animated.Value(40)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: 0, duration: 700, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 700, delay, useNativeDriver: true }),
    ]).start();
  }, [delay, opacity, translateY]);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
};

const Divider: React.FC<{ delay?: number }> = ({ delay = 0 }) => {
  const scaleX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleX, { toValue: 1, duration: 600, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, delay, useNativeDriver: true }),
    ]).start();
  }, [delay, opacity, scaleX]);

  return (
    <Animated.View style={[styles.dividerRow, { opacity }]}>
      <Animated.View style={[styles.dividerLine, { transform: [{ scaleX }] }]} />
      <View style={styles.dividerDiamond} />
      <Animated.View style={[styles.dividerLine, { transform: [{ scaleX }] }]} />
    </Animated.View>
  );
};

const HomeScreen: React.FC<HomeScreenProps> = ({ onShopNow, onViewCart }) => {
  const insets = useSafeAreaInsets();

  const handleAddToCart = (id: number) => {
    console.log(`Add to cart: ${id}`);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D12" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top, paddingBottom: insets.bottom + 40 }]}
        showsVerticalScrollIndicator={false}
      >
        <Section delay={0}>
          <Hero onShop={onShopNow} />
        </Section>

        <Divider delay={400} />

        <Section delay={500} style={styles.sectionPad}>
          <View style={styles.ctaSection}>
            <CTAButton title="Shop Now" onPress={onShopNow || (() => {})} color="#FF5722" size="lg" />
            <CTAButton title="View Cart" onPress={onViewCart || (() => {})} color="#4ECDC4" variant="outline" size="lg" />
          </View>
        </Section>

        <Divider delay={700} />

        <Section delay={800} style={styles.sectionPad}>
          <View style={styles.infoBar}>
            <View style={styles.infoItem}>
              <TruckIcon size={20} color="#4ECDC4" />
              <Text style={styles.infoText}>Free Shipping</Text>
            </View>
            <View style={styles.infoItem}>
              <FireIcon size={20} color="#FF5722" />
              <Text style={styles.infoText}>Hot Deals</Text>
            </View>
            <View style={styles.infoItem}>
              <TagIcon size={20} color="#FFD700" />
              <Text style={styles.infoText}>Best Prices</Text>
            </View>
          </View>
        </Section>

        <Divider delay={1000} />

        <Section delay={1100} style={styles.sectionPad}>
          <FeaturedProducts onAddToCart={handleAddToCart} />
        </Section>
      </ScrollView>
    </View>
  );
};

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
  },
  dividerDiamond: {
    width: 5,
    height: 5,
    backgroundColor: '#FF572240',
    borderWidth: 1,
    borderColor: '#FF572280',
    transform: [{ rotate: '45deg' }],
  },
  ctaSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 4,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  infoBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#23232B',
    marginHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default HomeScreen;
