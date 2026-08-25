import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Animated, Easing } from 'react-native';
import CTAButton from './CTAButton';
import FlashDealsPanel from './FlashDealsPanel';
import { SearchIcon, FireIcon, StarIcon, TrendingUpIcon } from './Icons';

interface HeroProps {
  onShop: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShop }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const bannerPulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bannerPulse, {
          toValue: 1.02,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bannerPulse, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim, slideAnim, bannerPulse]);

  return (
    <Animated.View style={[styles.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.temuStyleHeader}>
        <View style={styles.logoRow}>
          <View style={styles.logoIcon}>
            <FireIcon size={24} color="#FFF" />
          </View>
          <Text style={styles.temuStyleTitle}>DEZ COLLECTION</Text>
        </View>
        <Text style={styles.temuStyleSubtitle}>Shop. Save. Repeat.</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchIcon size={18} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products, brands, deals..."
          placeholderTextColor="#888"
        />
      </View>

      <Animated.View style={[styles.temuUrgencyBanner, { transform: [{ scale: bannerPulse }] }]}>
        <View style={styles.urgencyRow}>
          <FireIcon size={18} color="#FFF" />
          <Text style={styles.urgencyText}>Flash Sale — 70% OFF Today</Text>
          <FireIcon size={18} color="#FFF" />
        </View>
      </Animated.View>

      <View style={styles.temuCTASection}>
        <CTAButton
          label="Shop Now"
          onClick={onShop}
          variant="primary"
          color="#FF5722"
          size="lg"
        />
      </View>

      <View style={styles.heroStats}>
        {[
          { n: "50K+", label: "Shoppers", color: '#FF5722' },
          { n: "4.8", label: "Rated", color: '#FFD700', icon: true },
          { n: "1000+", label: "Deals", color: '#4ECDC4' },
        ].map((s) => (
          <View style={styles.heroStat} key={s.label}>
            <View style={[styles.statDot, { backgroundColor: s.color }]} />
            <Text style={[styles.heroStatN, { color: s.color }]}>{s.n}</Text>
            <Text style={styles.heroStatL}>{s.label}</Text>
          </View>
        ))}
      </View>

      <FlashDealsPanel onFlashDealPress={(dealId) => onShop()} />

      <View style={styles.categoriesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          {[
            { label: 'Best Sellers', color: '#FF5722', icon: <FireIcon size={14} color="#FF5722" /> },
            { label: 'New In', color: '#4ECDC4', icon: <StarIcon size={14} color="#4ECDC4" /> },
            { label: 'Electronics', color: '#A78BFA', icon: <TrendingUpIcon size={14} color="#A78BFA" /> },
            { label: 'Fashion', color: '#FF2D55', icon: <FireIcon size={14} color="#FF2D55" /> },
            { label: 'Home', color: '#FFD700', icon: <StarIcon size={14} color="#FFD700" /> },
            { label: 'Beauty', color: '#E8C97A', icon: <StarIcon size={14} color="#E8C97A" /> },
            { label: 'Sports', color: '#4CAF50', icon: <TrendingUpIcon size={14} color="#4CAF50" /> },
          ].map((cat) => (
            <View key={cat.label} style={[styles.categoryChip, { borderColor: cat.color + '40' }]}>
              {cat.icon}
              <Text style={[styles.categoryText, { color: cat.color }]}>{cat.label}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.socialProofRow}>
        <View style={styles.socialProofItem}>
          <Text style={styles.socialProofValue}>68K+</Text>
          <Text style={styles.socialProofLabel}>Products Sold</Text>
        </View>
        <View style={styles.socialProofItem}>
          <View style={styles.socialProofStars}>
            <StarIcon size={12} color="#FFD700" filled />
            <StarIcon size={12} color="#FFD700" filled />
            <StarIcon size={12} color="#FFD700" filled />
            <StarIcon size={12} color="#FFD700" filled />
            <StarIcon size={12} color="#FFD700" />
          </View>
          <Text style={styles.socialProofLabel}>Avg Rating</Text>
        </View>
        <View style={styles.socialProofItem}>
          <Text style={styles.socialProofValue}>12K+</Text>
          <Text style={styles.socialProofLabel}>Reviews</Text>
        </View>
      </View>

      <ScrollView
        style={styles.heroVisualScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.heroVisualScrollContent}
      >
        <View style={styles.heroCardMain}>
          <View style={styles.heroImgWrap}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80' }}
              style={styles.heroImg}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.heroCardTag, { backgroundColor: '#FF5722' }]}><Text style={styles.heroCardTagText}>Limited Drop</Text></View>
          <View style={styles.heroCardLabel}>
            <Text style={styles.heroCardLabelText}>Obsidian Series</Text>
            <Text style={styles.heroCardPrice}>$249</Text>
          </View>
        </View>
        <View style={styles.heroCardMain}>
          <View style={styles.heroImgWrap}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' }}
              style={styles.heroImg}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.heroCardTag, { backgroundColor: '#4ECDC4' }]}><Text style={styles.heroCardTagText}>Air Drift</Text></View>
          <View style={styles.heroCardLabel}>
            <Text style={styles.heroCardLabelText}>Air Drift</Text>
            <Text style={styles.heroCardPrice}>$129</Text>
          </View>
        </View>
        <View style={styles.heroCardMain}>
          <View style={styles.heroImgWrap}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80' }}
              style={styles.heroImg}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.heroCardTag, { backgroundColor: '#A78BFA' }]}><Text style={styles.heroCardTagText}>Urban Core</Text></View>
          <View style={styles.heroCardLabel}>
            <Text style={styles.heroCardLabelText}>Urban Core</Text>
            <Text style={styles.heroCardPrice}>$189</Text>
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  temuStyleHeader: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 6,
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
  },
  temuStyleTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5722',
    letterSpacing: 2,
  },
  temuStyleSubtitle: {
    fontSize: 15,
    color: '#A0A0A0',
    fontWeight: '500',
    letterSpacing: 1,
  },
  temuUrgencyBanner: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  urgencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  urgencyText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  temuCTASection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  heroVisualScroll: {
    marginTop: 24,
    width: '100%',
  },
  heroVisualScrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  hero: {
    padding: 20,
    alignItems: 'center',
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  statDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  searchContainer: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A3A45',
    backgroundColor: '#1B1B1F',
    paddingHorizontal: 14,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 36,
    color: 'white',
    fontSize: 14,
  },
  categoriesSection: {
    width: '100%',
    marginBottom: 16,
  },
  categoryScroll: {
    paddingBottom: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1A1A1F',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
  },
  socialProofRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 18,
  },
  socialProofItem: {
    alignItems: 'center',
    flex: 1,
  },
  socialProofStars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 2,
  },
  socialProofValue: {
    color: '#E8C97A',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  socialProofLabel: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  heroStat: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  heroStatN: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  heroStatL: {
    color: '#A0A0A0',
    fontSize: 12,
  },
  heroCardMain: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  heroImgWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  heroImg: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  heroCardTag: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 8,
    marginBottom: 4,
  },
  heroCardTagText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 11,
  },
  heroCardLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  heroCardLabelText: {
    color: 'white',
    fontSize: 14,
  },
  heroCardPrice: {
    color: '#E8C97A',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Hero;
