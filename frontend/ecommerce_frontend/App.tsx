/**
 * Dez Collection — Dark Luxury Landing Page
 */
import React, { useRef, useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  ScrollView,
  View,
  Animated,
  Easing,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Hero from './src/components/Hero';
import AnimatedCart from './src/components/AnimatedCart';
import FeaturedProducts from './src/components/FeaturedProducts';
import GamificationPanel from './src/components/GamificationPanel';
import SpinToWin from './src/components/SpinToWin';
import BottomTabNavigator from './src/components/BottomTabNavigator';
import CTAButton from './src/components/CTAButton';
import FlashDealsPanel from './src/components/FlashDealsPanel';
import ClearancePanel from './src/components/ClearancePanel';
import CoinsBalance from './src/components/CoinsBalance';
import ShippingIndicator from './src/components/ShippingIndicator';

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
      Animated.timing(scaleX, {
        toValue: 1,
        duration: 600,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
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

const CTASection: React.FC<{ onShopNow: () => void; onViewCart: () => void; onDeals?: () => void }> = ({
  onShopNow,
  onViewCart,
  onDeals,
}) => (
  <View style={styles.ctaSection}>
    <CTAButton title="Shop Now" onPress={onShopNow} color="#E8C97A" size="lg" icon="→" />
    <CTAButton title="View Cart" onPress={onViewCart} color="#C4A4F0" variant="outline" size="lg" icon="🛒" />
    {onDeals && <CTAButton title="Deals" onPress={onDeals} color="#FF5722" variant="outline" size="lg" icon="⚡" />}
  </View>
);

function App(): React.ReactElement {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'deals' | 'account'>('home');
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount] = useState(0);
  const [coins, setCoins] = useState(1850);
  const [cartTotal, setCartTotal] = useState(45);

  const handleShopNow = () => {
    setActiveTab('shop');
    console.log('Shop now pressed!');
  };

  const handleDealsNow = () => {
    setActiveTab('deals');
    console.log('Deals now pressed!');
  };

  const handleViewCart = () => {
    setActiveTab('shop');
    console.log('View cart pressed!');
  };

  const handleAddToCart = (id: number) => {
    setCartCount((prev) => prev + 1);
    setCartTotal((prev) => prev + 25); // Simulate adding $25 per item
    console.log(`Add to cart: ${id}`);
  };

  const handleClaimReward = (rewardCoins: number) => {
    setCoins((prev) => prev + rewardCoins);
    console.log(`Claimed ${rewardCoins} coins`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingTop: insets.top, paddingBottom: insets.bottom + 100 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <Section delay={0}>
              <Hero onShop={handleDealsNow} />
            </Section>

            <Divider delay={400} />

            <Section delay={500} style={styles.sectionPad}>
              <CTASection onShopNow={handleShopNow} onViewCart={handleViewCart} onDeals={handleDealsNow} />
            </Section>

            <Divider delay={700} />

            <Section delay={800} style={styles.sectionPad}>
              <AnimatedCart count={cartCount} />
            </Section>

            <Divider delay={1000} />

            <Section delay={1100} style={styles.sectionPad}>
              <FeaturedProducts onAddToCart={handleAddToCart} />
            </Section>
          </ScrollView>
        );

      case 'shop':
        return (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingTop: insets.top, paddingBottom: insets.bottom + 100 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <Section delay={0} style={styles.sectionPad}>
              <View style={styles.tabHeaderContainer}>
                <Text style={styles.tabHeaderTitle}>🛍️ Shop All Products</Text>
                <Text style={styles.tabHeaderSubtitle}>Browse our full collection</Text>
              </View>
            </Section>

            <Divider delay={200} />

            <Section delay={300} style={styles.sectionPad}>
              <FeaturedProducts onAddToCart={handleAddToCart} />
            </Section>

            <Divider delay={500} />

            <Section delay={600} style={styles.sectionPad}>
              <ShippingIndicator cartTotal={cartTotal} minimumThreshold={50} />
            </Section>

            <Divider delay={700} />

            <Section delay={800} style={styles.sectionPad}>
              <AnimatedCart count={cartCount} />
            </Section>
          </ScrollView>
        );

      case 'deals':
        return (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingTop: insets.top, paddingBottom: insets.bottom + 100 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <Section delay={0} style={styles.sectionPad}>
              <View style={styles.tabHeaderContainer}>
                <Text style={styles.tabHeaderTitle}>⚡ Flash Deals & Rewards</Text>
                <Text style={styles.tabHeaderSubtitle}>Spin, streaks, badges, refer & earn</Text>
              </View>
            </Section>

            <Section delay={100} style={styles.sectionPad}>
              <CoinsBalance coins={coins} />
            </Section>

            <Divider delay={200} />

            <Section delay={300} style={styles.sectionPad}>
              <FlashDealsPanel onFlashDealPress={(id) => console.log('Flash deal:', id)} />
            </Section>

            <Divider delay={500} />

            <Section delay={600} style={styles.sectionPad}>
              <ClearancePanel onClearancePress={(id) => console.log('Clearance item:', id)} />
            </Section>

            <Divider delay={800} />

            <Section delay={900} style={styles.sectionPad}>
              <SpinToWin onPrizeWon={(prize) => console.log('Prize won:', prize)} />
            </Section>

            <Divider delay={1100} />

            <Section delay={1200} style={styles.sectionPad}>
              <GamificationPanel onClaimReward={handleClaimReward} />
            </Section>
          </ScrollView>
        );

      case 'account':
        return (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              { paddingTop: insets.top, paddingBottom: insets.bottom + 100 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <Section delay={0} style={styles.sectionPad}>
              <View style={styles.tabHeaderContainer}>
                <Text style={styles.tabHeaderTitle}>👤 My Account</Text>
                <Text style={styles.tabHeaderSubtitle}>Manage your profile, orders and settings</Text>
              </View>
            </Section>

            <Divider delay={200} />

            <Section delay={300} style={styles.sectionPad}>
              <View style={styles.accountSection}>
                <View style={styles.accountCard}>
                  <Text style={styles.accountCardTitle}>Account Settings</Text>
                  <Text style={styles.accountCardItem}>📧 Email & Password</Text>
                  <Text style={styles.accountCardItem}>🔔 Notifications</Text>
                  <Text style={styles.accountCardItem}>🛡️ Privacy & Security</Text>
                </View>
              </View>
            </Section>

            <Divider delay={500} />

            <Section delay={600} style={styles.sectionPad}>
              <View style={styles.accountSection}>
                <View style={styles.accountCard}>
                  <Text style={styles.accountCardTitle}>Help & Support</Text>
                  <Text style={styles.accountCardItem}>📞 Contact Us</Text>
                  <Text style={styles.accountCardItem}>❓ FAQ</Text>
                  <Text style={styles.accountCardItem}>⚖️ Terms & Conditions</Text>
                </View>
              </View>
            </Section>
          </ScrollView>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D12" />
      {renderTabContent()}
      <BottomTabNavigator
        activeTab={activeTab}
        onTabChange={(tab: string) => setActiveTab(tab as 'home' | 'shop' | 'deals' | 'account')}
        cartCount={cartCount}
        notificationCount={notificationCount}
      />
    </View>
  );
}

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
    backgroundColor: '#E8C97A40',
    borderWidth: 1,
    borderColor: '#E8C97A80',
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
  tabHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  tabHeaderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  tabHeaderSubtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  accountSection: {
    paddingHorizontal: 20,
  },
  accountCard: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  accountCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  accountCardItem: {
    fontSize: 14,
    color: '#A0A0A0',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2D2D38',
  },
});

export default App;
