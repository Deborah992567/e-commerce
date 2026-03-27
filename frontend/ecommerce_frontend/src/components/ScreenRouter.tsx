import React, { useState } from 'react';
import { View } from 'react-native';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import DashboardScreen from './DashboardScreen';
import CartScreen from './CartScreen';
import ProductListScreen from './ProductListScreen';
import ProfileScreen from './ProfileScreen';
import ProductDetailScreen from './ProductDetailScreen';
import CheckoutScreen from './CheckoutScreen';
import OrderSuccessScreen from './OrderSuccessScreen';
import OrderHistoryScreen from './OrderHistoryScreen';
import OrderDetailScreen from './OrderDetailScreen';
import ReviewsScreen from './ReviewsScreen';
import WishlistScreen from './WishlistScreen';
import RecommendationsPanel from './RecommendationsPanel';
import PushNotificationsManager from './PushNotificationsManager';
import BottomTabNavigator from './BottomTabNavigator';
import { useAuth } from '../contexts/AuthContext';

export default function ScreenRouter() {
  const [screen, setScreen] = useState<'main' | 'login' | 'signup' | 'forgot' | 'dashboard' | 'cart' | 'productList' | 'profile' | 'productDetail' | 'checkout' | 'orderSuccess' | 'orderHistory' | 'orderDetail' | 'reviews' | 'wishlist' | 'notifications'>('main');
  const [previousScreen, setPreviousScreen] = useState<typeof screen>('main');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const { isAdmin, user } = useAuth();

  // Map screen to active tab
  const getActiveTab = () => {
    if (screen === 'main' || screen === 'dashboard') return 'home';
    if (screen === 'productList' || screen === 'productDetail') return 'shop';
    if (screen === 'cart' || screen === 'checkout' || screen === 'orderSuccess') return 'shop';
    if (screen === 'profile' || screen === 'wishlist' || screen === 'notifications') return 'account';
    return 'home';
  };

  // Handle tab navigation
  const handleTabChange = (tab: string) => {
    if (tab === 'home') setScreen('main');
    if (tab === 'shop') setScreen('productList');
    if (tab === 'deals') setScreen('main'); // Could be a dedicated deals screen
    if (tab === 'account') setScreen('profile');
  };

  // Handler to pass to AppMain for navigation
  const handleShopNow = () => setScreen('login');
  const handleBack = () => setScreen('main');
  const handleGoToSignup = () => setScreen('signup');
  const handleGoToLogin = () => setScreen('login');
  const handleGoToForgot = () => setScreen('forgot');
  const handleGoToDashboard = () => {
    if (isAdmin) {
      setScreen('dashboard');
    }
  };
  const handleGoToProducts = () => setScreen('productList');
  const handleGoToProductDetail = (product: any) => {
    setSelectedProduct(product);
    setScreen('productDetail');
  };
  const handleBackFromProductDetail = () => {
    setScreen('productList');
    setSelectedProduct(null);
  };
  const handleViewCart = () => {
    setPreviousScreen(screen);
    setScreen('cart');
  };
  const handleGoToCart = (from: typeof screen) => {
    setPreviousScreen(from);
    setScreen('cart');
  };
  const handleGoToProfile = () => setScreen('profile');
  const handleBackToLogin = () => setScreen('login');
  const handleCartBack = () => {
    // Go back to the immediate previous route, falling back to main
    setScreen(previousScreen || 'main');
  };
  const handleGoToCheckout = () => setScreen('checkout');
  const handleOrderSuccess = () => setScreen('orderSuccess');
  const handleContinueShopping = () => setScreen('productList');
  const handleViewOrders = () => setScreen('orderHistory');
  const handleGoToOrderHistory = () => setScreen('orderHistory');
  const handleViewOrderDetail = (order: any) => {
    setSelectedOrder(order);
    setScreen('orderDetail');
  };
  const handleBackFromOrderDetail = () => {
    setScreen('orderHistory');
    setSelectedOrder(null);
  };
  const handleGoToReviews = (product: any) => {
    setSelectedProduct(product);
    setScreen('reviews');
  };
  const handleBackFromReviews = () => {
    setScreen('productDetail');
    setSelectedProduct(null);
  };
  const handleGoToWishlist = () => setScreen('wishlist');
  const handleBackFromWishlist = () => setScreen('productList');
  const handleGoToNotifications = () => setScreen('notifications');
  const handleBackFromNotifications = () => setScreen('profile');

  if (screen === 'signup') {
    return <SignupScreen onBack={handleBack} onGoToLogin={handleGoToLogin} onGoToProductList={handleGoToProducts} />;
  }
  if (screen === 'login') {
    return <LoginScreen onBack={handleBack} onGoToSignup={handleGoToSignup} onGoToForgot={handleGoToForgot} onGoToDashboard={handleGoToDashboard} onGoToProductList={handleGoToProducts} />;
  }
  if (screen === 'forgot') {
    return <ForgotPasswordScreen onBack={handleBackToLogin} />;
  }
  if (screen === 'dashboard') {
    return <DashboardScreen onBack={handleBack} />;
  }
  if (screen === 'productList') {
    return <ProductListScreen onBack={handleBack} onGoToProductDetail={handleGoToProductDetail} onGoToProfile={handleGoToProfile} onGoToCart={() => handleGoToCart('productList')} onLogout={() => setScreen('main')} />;
  }
  if (screen === 'cart') {
    return <CartScreen onBack={handleCartBack} onCheckout={handleGoToCheckout} />;
  }
  if (screen === 'profile') {
    return <ProfileScreen onBack={handleBack} onGoToOrderHistory={handleGoToOrderHistory} onGoToWishlist={handleGoToWishlist} onGoToNotifications={handleGoToNotifications} />;
  }
  if (screen === 'productDetail' && selectedProduct) {
    return <ProductDetailScreen product={selectedProduct} onBack={handleBackFromProductDetail} onViewReviews={handleGoToReviews} />;
  }
  if (screen === 'checkout') {
    return <CheckoutScreen onBack={() => setScreen('cart')} onOrderSuccess={handleOrderSuccess} />;
  }
  if (screen === 'orderSuccess') {
    return <OrderSuccessScreen onContinueShopping={handleContinueShopping} onViewOrders={handleViewOrders} />;
  }
  if (screen === 'orderHistory') {
    return <OrderHistoryScreen onBack={handleBack} onViewDetails={handleViewOrderDetail} />;
  }
  if (screen === 'orderDetail' && selectedOrder) {
    return <OrderDetailScreen order={selectedOrder} onBack={handleBackFromOrderDetail} />;
  }
  if (screen === 'reviews' && selectedProduct) {
    return <ReviewsScreen productId={selectedProduct.id} productName={selectedProduct.name} onClose={handleBackFromReviews} />;
  }
  if (screen === 'wishlist') {
    return <WishlistScreen onBack={handleBackFromWishlist} onAddToCart={() => setScreen('cart')} />;
  }
  if (screen === 'notifications') {
    return <PushNotificationsManager onBack={handleBackFromNotifications} />;
  }

  // Render main screen based on state
  const renderMainContent = () => {
    if (screen === 'main') return <HomeScreen onShopNow={handleShopNow} onViewCart={handleViewCart} />;
    if (screen === 'productList') return <ProductListScreen onBack={handleBack} onGoToProductDetail={handleGoToProductDetail} onGoToProfile={handleGoToProfile} onGoToCart={() => handleGoToCart('productList')} onLogout={() => setScreen('main')} />;
    if (screen === 'cart') return <CartScreen onBack={handleCartBack} onCheckout={handleGoToCheckout} />;
    if (screen === 'profile') return <ProfileScreen onBack={handleBack} onGoToOrderHistory={handleGoToOrderHistory} onGoToWishlist={handleGoToWishlist} onGoToNotifications={handleGoToNotifications} />;
    if (screen === 'productDetail' && selectedProduct) return <ProductDetailScreen product={selectedProduct} onBack={handleBackFromProductDetail} onViewReviews={handleGoToReviews} />;
    if (screen === 'checkout') return <CheckoutScreen onBack={() => setScreen('cart')} onOrderSuccess={handleOrderSuccess} />;
    if (screen === 'orderSuccess') return <OrderSuccessScreen onContinueShopping={handleContinueShopping} onViewOrders={handleViewOrders} />;
    if (screen === 'orderHistory') return <OrderHistoryScreen onBack={handleBack} onViewDetails={handleViewOrderDetail} />;
    if (screen === 'orderDetail' && selectedOrder) return <OrderDetailScreen order={selectedOrder} onBack={handleBackFromOrderDetail} />;
    if (screen === 'reviews' && selectedProduct) return <ReviewsScreen productId={selectedProduct.id} productName={selectedProduct.name} onClose={handleBackFromReviews} />;
    if (screen === 'wishlist') return <WishlistScreen onBack={handleBackFromWishlist} onAddToCart={() => setScreen('cart')} />;
    return <HomeScreen onShopNow={handleShopNow} onViewCart={handleViewCart} />;
  };

  // Show bottom navigation only for main authenticated screens
  const showBottomNav = !['login', 'signup', 'forgot', 'dashboard', 'checkout', 'orderSuccess', 'notifications'].includes(screen);

  return (
    <View style={{ flex: 1 }}>
      {renderMainContent()}
      {showBottomNav && (
        <BottomTabNavigator
          activeTab={getActiveTab()}
          onTabChange={handleTabChange}
          cartCount={cartCount}
          notificationCount={0}
        />
      )}
    </View>
  );
}
