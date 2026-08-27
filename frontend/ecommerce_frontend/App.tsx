/**
 * Dez Collection — Temu-Style E-Commerce App
 * Navigation: 5 bottom tabs + a full-screen secondary screen stack
 * (checkout, order success, order history, order detail, wishlist, reviews, referral, profile, product detail)
 */
import React, { useRef, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, ScrollView, View, Animated, Easing, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCart } from './src/contexts/CartContext';
import { useAuth } from './src/contexts/AuthContext';
import { useNotifications } from './src/contexts/NotificationContext';

import OnboardingScreen from './src/components/OnboardingScreen';
import Hero from './src/components/Hero';
import AnimatedCart from './src/components/AnimatedCart';
import FeaturedProducts from './src/components/FeaturedProducts';
import BottomTabNavigator from './src/components/BottomTabNavigator';
import CTAButton from './src/components/CTAButton';
import FlashDealsPanel from './src/components/FlashDealsPanel';
import ClearancePanel from './src/components/ClearancePanel';
import CoinsBalance from './src/components/CoinsBalance';
import ShippingIndicator from './src/components/ShippingIndicator';
import GamificationPanel from './src/components/GamificationPanel';
import SpinToWin from './src/components/SpinToWin';
import ShopPage from './src/components/ShopPage';
import CartScreen from './src/components/CartScreen';
import CheckoutScreen from './src/components/CheckoutScreen';
import OrderSuccessScreen from './src/components/OrderSuccessScreen';
import OrderProcessingScreen from './src/components/OrderProcessingScreen';
import ProfileScreen from './src/components/ProfileScreen';
import OrderHistoryScreen from './src/components/OrderHistoryScreen';
import OrderDetailScreen from './src/components/OrderDetailScreen';
import WishlistScreen from './src/components/WishlistScreen';
import ReviewsScreen from './src/components/ReviewsScreen';
import ReferralScreen from './src/components/ReferralScreen';
import LoginScreen from './src/components/LoginScreen';
import ProductDetailScreen from './src/components/ProductDetailScreen';
import { FireIcon, UserIcon } from './src/components/Icons';

type Tab = 'home' | 'shop' | 'cart' | 'deals' | 'account';
type Screen =
  | null
  | 'login'
  | 'checkout'
  | 'orderProcessing'
  | 'orderSuccess'
  | 'orderHistory'
  | 'orderDetail'
  | 'wishlist'
  | 'reviews'
  | 'referral'
  | 'profile'
  | 'productDetail';

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

function App(): React.ReactElement {
  const insets = useSafeAreaInsets();
  const { totalItems, addToCart, clearCart, totalPrice } = useCart();
  const { unreadCount } = useNotifications();
  const [tab, setTab] = useState<Tab>('home');
  const [screen, setScreen] = useState<Screen>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [reviewsProduct, setReviewsProduct] = useState<any>(null);
  const [coins, setCoins] = useState(1850);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [lastOrder, setLastOrder] = useState<any>(null);

  useEffect(() => {
    AsyncStorage.getItem('onboardingComplete').then((val) => {
      if (val === 'true') setShowOnboarding(false);
    });
  }, []);

  const handleOnboardingComplete = () => {
    AsyncStorage.setItem('onboardingComplete', 'true');
    setShowOnboarding(false);
  };

  // ---- Navigation helpers ----
  const goTab = (t: Tab) => { setScreen(null); setTab(t); };
  const goScreen = (s: Screen) => setScreen(s);

  const handleShopNow = () => goTab('shop');
  const handleDealsNow = () => goTab('deals');
  const handleViewCart = () => goTab('cart');
  const handleAddToCart = (product: any) => addToCart(product);

  const handleProductPress = (product: any) => {
    setSelectedProduct(product);
    goScreen('productDetail');
  };

  const handleGoToProductDetail = (product: any) => handleProductPress(product);

  const handleCheckoutComplete = () => {
    setLastOrder({ id: `EC-${Date.now().toString().slice(-6)}`, date: new Date().toISOString() });
    clearCart();
    goScreen('orderProcessing');
  };

  const handleOpenProfileSub = (s: Screen) => {
    setScreen(s);
  };

  const handleOrderSuccessContinue = () => goTab('home');
  const handleOrderSuccessViewOrders = () => goScreen('orderHistory');

  // ---- Render main tab content ----
  const renderTabHome = () => (
    <ScrollView style={styles.scroll} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top, paddingBottom: insets.bottom + 100 }]} showsVerticalScrollIndicator={false}>
      <Section delay={0}><Hero onShop={handleDealsNow} /></Section>
      <Divider delay={400} />
      <Section delay={500} style={styles.sectionPad}>
        <View style={styles.ctaSection}>
          <CTAButton title="Shop Now" onPress={handleShopNow} color="#FF5722" size="lg" icon="→" />
          <CTAButton title="View Cart" onPress={handleViewCart} color="#4ECDC4" variant="outline" size="lg" />
          <CTAButton title="Deals" onPress={handleDealsNow} color="#FFD700" variant="outline" size="lg" />
        </View>
      </Section>
      <Divider delay={700} />
      <Section delay={800} style={styles.sectionPad}><AnimatedCart count={totalItems} /></Section>
      <Divider delay={1000} />
      <Section delay={1100} style={styles.sectionPad}><FeaturedProducts onAddToCart={handleAddToCart} /></Section>
    </ScrollView>
  );

  const renderTabAccount = () => {
    if (screen === 'profile') return null;
    return (
      <ProfileScreen
        onGoToOrderHistory={() => handleOpenProfileSub('orderHistory')}
        onGoToWishlist={() => handleOpenProfileSub('wishlist')}
        onGoToNotifications={() => handleOpenProfileSub('profile')}
        onGoToReferral={() => handleOpenProfileSub('referral')}
      />
    );
  };

  const renderTabContent = () => {
    switch (tab) {
      case 'home': return renderTabHome();
      case 'shop': return <ShopPage onAddToCart={handleAddToCart} cartCount={totalItems} onProductPress={handleGoToProductDetail} />;
      case 'cart': return <CartScreen onBack={() => goTab('shop')} onCheckout={() => goScreen('checkout')} />;
      case 'deals':
        return (
          <ScrollView style={styles.scroll} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top, paddingBottom: insets.bottom + 100 }]} showsVerticalScrollIndicator={false}>
            <Section delay={0} style={styles.sectionPad}>
              <View style={styles.tabHeaderContainer}>
                <View style={styles.tabHeaderRow}><FireIcon size={28} color="#FF5722" /><Text style={styles.tabHeaderTitle}>Flash Deals & Rewards</Text></View>
                <Text style={styles.tabHeaderSubtitle}>Spin, streaks, badges, refer & earn</Text>
              </View>
            </Section>
            <Section delay={100} style={styles.sectionPad}><CoinsBalance coins={coins} /></Section>
            <Divider delay={200} />
            <Section delay={300} style={styles.sectionPad}><FlashDealsPanel onFlashDealPress={(id) => console.log('Flash deal:', id)} /></Section>
            <Divider delay={500} />
            <Section delay={600} style={styles.sectionPad}><ClearancePanel onClearancePress={(id) => console.log('Clearance item:', id)} /></Section>
            <Divider delay={800} />
            <Section delay={900} style={styles.sectionPad}><SpinToWin onPrizeWon={(prize) => { if (typeof prize.discount === 'string' && prize.discount.includes('₦')) { setCoins((c) => c + 500); } else { setCoins((c) => c + 50); } }} /></Section>
            <Divider delay={1100} />
            <Section delay={1200} style={styles.sectionPad}><ShippingIndicator subtotal={totalPrice} /></Section>
            <Divider delay={1300} />
            <Section delay={1400} style={styles.sectionPad}><GamificationPanel onClaimReward={(c) => setCoins((prev) => prev + c)} /></Section>
          </ScrollView>
        );
      case 'account': return renderTabAccount();
      default: return null;
    }
  };

  // ---- Render full-screen secondary screens ----
  const renderSecondaryScreen = () => {
    switch (screen) {
      case 'login':
        return <LoginScreen onBack={() => goTab('account')} />;
      case 'checkout':
        return <CheckoutScreen onBack={() => goTab('cart')} onOrderSuccess={handleCheckoutComplete} />;
      case 'orderSuccess':
        return <OrderSuccessScreen onContinueShopping={handleOrderSuccessContinue} onViewOrders={handleOrderSuccessViewOrders} />;
      case 'orderProcessing':
        return <OrderProcessingScreen onComplete={() => goScreen('orderSuccess')} orderId={lastOrder?.id} />;
      case 'orderHistory':
        return <OrderHistoryScreen onBack={() => goTab('account')} onViewDetails={(order) => { setSelectedOrder(order); goScreen('orderDetail'); }} />;
      case 'orderDetail':
        return <OrderDetailScreen order={selectedOrder} onBack={() => goScreen('orderHistory')} />;
      case 'wishlist':
        return <WishlistScreen onBack={() => goTab('account')} onAddToCart={undefined} />;
      case 'reviews':
        return <ReviewsScreen productId={reviewsProduct?.id ?? 1} productName={reviewsProduct?.name ?? 'Product'} onClose={() => goTab('account')} />;
      case 'referral':
        return <ReferralScreen onBack={() => goTab('account')} />;
      case 'profile':
        return <ProfileScreen onGoToOrderHistory={() => handleOpenProfileSub('orderHistory')} onGoToWishlist={() => handleOpenProfileSub('wishlist')} onGoToNotifications={() => handleOpenProfileSub('profile')} onGoToReferral={() => handleOpenProfileSub('referral')} onBack={() => goTab('account')} />;
      case 'productDetail':
        return <ProductDetailScreen product={selectedProduct} onBack={() => goTab('shop')} />;
      default:
        return null;
    }
  };

  const secondaryScreen = renderSecondaryScreen();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0D0D12" />
      {showOnboarding ? (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      ) : secondaryScreen ? (
        <>
          {secondaryScreen}
        </>
      ) : (
        <>
          {renderTabContent()}
          <BottomTabNavigator activeTab={tab} onTabChange={(t: string) => goTab(t as Tab)} cartCount={totalItems} notificationCount={unreadCount} />
        </>
      )}
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
});

export default App;
