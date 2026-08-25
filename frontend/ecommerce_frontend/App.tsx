/**
 * Dez Collection — Temu-Style E-Commerce App
 */
import React, { useRef, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, ScrollView, View, Animated, Easing, Text } from 'react-native';
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
import TemuAliExpressProductGrid from './src/components/TemuAliExpressProductGrid';
import ShopPage from './src/components/ShopPage';
import CartScreen from './src/components/CartScreen';
import ProductDetailScreen from './src/components/ProductDetailScreen';
import { useCart } from './src/contexts/CartContext';
import { FireIcon, MailIcon, BellIcon, ShieldIcon, PhoneIcon, HelpIcon, ScaleIcon, UserIcon, TagIcon } from './src/components/Icons';

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

const CTASection: React.FC<{ onShopNow: () => void; onViewCart: () => void; onDeals?: () => void }> = ({ onShopNow, onViewCart, onDeals }) => (
  <View style={styles.ctaSection}>
    <CTAButton title="Shop Now" onPress={onShopNow} color="#FF5722" size="lg" icon="→" />
    <CTAButton title="View Cart" onPress={onViewCart} color="#4ECDC4" variant="outline" size="lg" />
    {onDeals && <CTAButton title="Deals" onPress={onDeals} color="#FFD700" variant="outline" size="lg" />}
  </View>
);

function App(): React.ReactElement {
  const insets = useSafeAreaInsets();
  const { totalItems, addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'cart' | 'productDetail' | 'deals' | 'account'>('home');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [notificationCount] = useState(0);
  const [coins, setCoins] = useState(1850);

  const handleShopNow = () => setActiveTab('shop');
  const handleDealsNow = () => setActiveTab('deals');
  const handleViewCart = () => setActiveTab('shop');
  const handleAddToCart = (product: any) => addToCart(product);
  const handleGoToProductDetail = (product: any) => { setSelectedProduct(product); setActiveTab('productDetail'); };
  const handleClaimReward = (rewardCoins: number) => setCoins((prev) => prev + rewardCoins);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <ScrollView style={styles.scroll} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top, paddingBottom: insets.bottom + 100 }]} showsVerticalScrollIndicator={false}>
            <Section delay={0}><Hero onShop={handleDealsNow} /></Section>
            <Divider delay={400} />
            <Section delay={500} style={styles.sectionPad}><CTASection onShopNow={handleShopNow} onViewCart={handleViewCart} onDeals={handleDealsNow} /></Section>
            <Divider delay={700} />
            <Section delay={800} style={styles.sectionPad}><AnimatedCart count={totalItems} /></Section>
            <Divider delay={1000} />
            <Section delay={1100} style={styles.sectionPad}><FeaturedProducts onAddToCart={handleAddToCart} /></Section>
          </ScrollView>
        );
      case 'shop':
        return <ShopPage onAddToCart={handleAddToCart} cartCount={totalItems} onProductPress={handleGoToProductDetail} />;
      case 'cart':
        return <CartScreen onBack={() => setActiveTab('shop')} onCheckout={() => setActiveTab('shop')} />;
      case 'productDetail':
        return <ProductDetailScreen product={selectedProduct} onBack={() => setActiveTab('shop')} />;
      case 'deals':
        return (
          <ScrollView style={styles.scroll} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top, paddingBottom: insets.bottom + 100 }]} showsVerticalScrollIndicator={false}>
            <Section delay={0} style={styles.sectionPad}>
              <View style={styles.tabHeaderContainer}>
                <View style={styles.tabHeaderRow}>
                  <FireIcon size={28} color="#FF5722" />
                  <Text style={styles.tabHeaderTitle}>Flash Deals & Rewards</Text>
                </View>
                <Text style={styles.tabHeaderSubtitle}>Spin, streaks, badges, refer & earn</Text>
              </View>
            </Section>
            <Section delay={100} style={styles.sectionPad}><CoinsBalance coins={coins} /></Section>
            <Divider delay={200} />
            <Section delay={300} style={styles.sectionPad}><FlashDealsPanel onFlashDealPress={(id) => console.log('Flash deal:', id)} /></Section>
            <Divider delay={500} />
            <Section delay={600} style={styles.sectionPad}><ClearancePanel onClearancePress={(id) => console.log('Clearance item:', id)} /></Section>
            <Divider delay={800} />
            <Section delay={900} style={styles.sectionPad}><SpinToWin onPrizeWon={(prize) => console.log('Prize won:', prize)} /></Section>
            <Divider delay={1100} />
            <Section delay={1200} style={styles.sectionPad}><GamificationPanel onClaimReward={handleClaimReward} /></Section>
          </ScrollView>
        );
      case 'account':
        return (
          <ScrollView style={styles.scroll} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top, paddingBottom: insets.bottom + 100 }]} showsVerticalScrollIndicator={false}>
            <Section delay={0} style={styles.sectionPad}>
              <View style={styles.tabHeaderContainer}>
                <View style={styles.tabHeaderRow}>
                  <UserIcon size={28} color="#A78BFA" />
                  <Text style={styles.tabHeaderTitle}>My Account</Text>
                </View>
                <Text style={styles.tabHeaderSubtitle}>Manage your profile, orders and settings</Text>
              </View>
            </Section>
            <Divider delay={200} />
            <Section delay={300} style={styles.sectionPad}>
              <View style={styles.accountSection}>
                <View style={styles.accountCard}>
                  <View style={styles.accountCardTitleRow}>
                    <MailIcon size={18} color="#E8C97A" />
                    <Text style={styles.accountCardTitle}>Account Settings</Text>
                  </View>
                  <View style={styles.accountCardItem}><MailIcon size={16} color="#4ECDC4" /><Text style={styles.accountCardItemText}>Email & Password</Text></View>
                  <View style={styles.accountCardItem}><BellIcon size={16} color="#FFD700" /><Text style={styles.accountCardItemText}>Notifications</Text></View>
                  <View style={[styles.accountCardItem, { borderBottomWidth: 0 }]}><ShieldIcon size={16} color="#4ECDC4" /><Text style={styles.accountCardItemText}>Privacy & Security</Text></View>
                </View>
              </View>
            </Section>
            <Divider delay={500} />
            <Section delay={600} style={styles.sectionPad}>
              <View style={styles.accountSection}>
                <View style={styles.accountCard}>
                  <View style={styles.accountCardTitleRow}>
                    <HelpIcon size={18} color="#A78BFA" />
                    <Text style={styles.accountCardTitle}>Help & Support</Text>
                  </View>
                  <View style={styles.accountCardItem}><PhoneIcon size={16} color="#4ECDC4" /><Text style={styles.accountCardItemText}>Contact Us</Text></View>
                  <View style={styles.accountCardItem}><HelpIcon size={16} color="#A78BFA" /><Text style={styles.accountCardItemText}>FAQ</Text></View>
                  <View style={[styles.accountCardItem, { borderBottomWidth: 0 }]}><ScaleIcon size={16} color="#A0A0A0" /><Text style={styles.accountCardItemText}>Terms & Conditions</Text></View>
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
      <BottomTabNavigator activeTab={activeTab} onTabChange={(tab: string) => setActiveTab(tab as any)} cartCount={totalItems} notificationCount={notificationCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D0D12' },
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  sectionPad: { paddingVertical: 8 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 24, paddingHorizontal: 24, gap: 10 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#ffffff08' },
  dividerDiamond: { width: 5, height: 5, backgroundColor: '#FF572240', borderWidth: 1, borderColor: '#FF572280', transform: [{ rotate: '45deg' }] },
  ctaSection: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 4, paddingHorizontal: 20, paddingVertical: 16 },
  tabHeaderContainer: { paddingHorizontal: 20, paddingVertical: 20, alignItems: 'center' },
  tabHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  tabHeaderTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF', textAlign: 'center' },
  tabHeaderSubtitle: { fontSize: 14, color: '#A0A0A0', textAlign: 'center' },
  accountSection: { paddingHorizontal: 20 },
  accountCard: { backgroundColor: '#23232B', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#2D2D38' },
  accountCardTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  accountCardTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFF' },
  accountCardItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 4, borderBottomWidth: 1, borderBottomColor: '#2D2D3820' },
  accountCardItemText: { fontSize: 14, color: '#A0A0A0', fontWeight: '500' },
});

export default App;
