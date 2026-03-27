import React from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView, Dimensions } from 'react-native';
import CTAButton from './CTAButton';

interface HeroProps {
  onShop: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShop }) => {
  return (
    <View style={styles.hero}>
      <View style={styles.temuStyleHeader}>
        <Text style={styles.temuStyleTitle}>🛍️ DEZ COLLECTION</Text>
        <Text style={styles.temuStyleSubtitle}>Shop. Save. Repeat.</Text>
      </View>

      <View style={styles.temuUrgencyBanner}>
        <Text style={styles.urgencyText}>⚡ Flash Sale — 70% OFF Today</Text>
      </View>

      <View style={styles.temuCTASection}>
        <CTAButton 
          label="🔥 Shop Now" 
          onClick={onShop} 
          variant="primary" 
          color="#FF5722"
          size="lg"
        />
      </View>

      <View style={styles.heroStats}>
        {[
          { n: "50K+", label: "Shoppers" },
          { n: "4.8★", label: "Rated" },
          { n: "1000+", label: "Deals" },
        ].map((s) => (
          <View style={styles.heroStat} key={s.label}>
            <Text style={styles.heroStatN}>{s.n}</Text>
            <Text style={styles.heroStatL}>{s.label}</Text>
          </View>
        ))}
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
          <View style={styles.heroCardTag}><Text style={styles.heroCardTagText}>Limited Drop</Text></View>
          <View style={styles.heroCardLabel}>
            <Text style={styles.heroCardLabelText}>Obsidian Series</Text>
            <Text style={styles.heroCardPrice}>$249</Text>
          </View>
        </View>
        <View style={[styles.heroCardMain]}>
          <View style={styles.heroImgWrap}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' }}
              style={styles.heroImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.heroCardTag}><Text style={styles.heroCardTagText}>Air Drift</Text></View>
          <View style={styles.heroCardLabel}>
            <Text style={styles.heroCardLabelText}>Air Drift</Text>
            <Text style={styles.heroCardPrice}>$129</Text>
          </View>
        </View>
        <View style={[styles.heroCardMain]}>
          <View style={styles.heroImgWrap}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80' }}
              style={styles.heroImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.heroCardTag}><Text style={styles.heroCardTagText}>Urban Core</Text></View>
          <View style={styles.heroCardLabel}>
            <Text style={styles.heroCardLabelText}>Urban Core</Text>
            <Text style={styles.heroCardPrice}>$189</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  temuStyleHeader: {
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
  },
  temuStyleTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF5722',
    letterSpacing: 1,
    marginBottom: 4,
  },
  temuStyleSubtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    fontWeight: '600',
  },
  temuUrgencyBanner: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  urgencyText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  temuCTASection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingVertical: 12,
    gap: 12,
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#E8C97A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF3D4',
  },
  logoBadgeText: {
    color: '#23232B',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 1,
  },
  logoText: {
    alignItems: 'flex-start',
  },
  logoMainText: {
    color: '#E8C97A',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
  },
  logoSubText: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '500',
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
  heroContent: {
    alignItems: 'center',
  },
  heroEyebrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  heroDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8C97A',
    marginRight: 8,
  },
  heroEyebrowText: {
    color: '#E8C97A',
    fontSize: 14,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroTitleLine: {
    // no-op for RN, just for structure
  },
  heroTitleAccent: {
    color: '#E8C97A',
  },
  heroTitleLineSm: {
    fontSize: 24,
  },
  heroSub: {
    color: '#A0A0A0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  heroActions: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  heroStat: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  heroStatN: {
    color: 'white',
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
    backgroundColor: '#E8C97A',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 8,
    marginBottom: 4,
  },
  heroCardTagText: {
    color: '#23232B',
    fontWeight: 'bold',
    fontSize: 12,
  },
  heroCardLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  heroCardLabelText: {
    color: 'white',
    fontSize: 14,
    marginRight: 8,
  },
  heroCardPrice: {
    color: '#E8C97A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  heroCardFloat: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 8,
    width: 90,
  },
  heroCardA: {
    marginTop: 24,
  },
  heroCardB: {
    marginTop: 48,
  },
  heroCardFloatImg: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 4,
  },
  heroCardFloatText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  heroCardFloatPrice: {
    color: '#E8C97A',
    fontSize: 12,
    marginTop: 2,
  },
});

export default Hero;