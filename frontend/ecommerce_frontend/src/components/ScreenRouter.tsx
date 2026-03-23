import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import DashboardScreen from './DashboardScreen';
import CartScreen from './CartScreen';
import ProductListScreen from './ProductListScreen';
import ProfileScreen from './ProfileScreen';
import ProductDetailScreen from './ProductDetailScreen';
import { useAuth } from '../contexts/AuthContext';

export default function ScreenRouter() {
  const [screen, setScreen] = useState<'main' | 'login' | 'signup' | 'forgot' | 'dashboard' | 'cart' | 'productList' | 'profile' | 'productDetail'>('main');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { isAdmin, user } = useAuth();

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
  const handleViewCart = () => setScreen('cart');
  const handleGoToProfile = () => setScreen('profile');
  const handleBackToLogin = () => setScreen('login');
  const handleCartBack = () => {
    if (user) {
      setScreen('productList');
    } else {
      setScreen('main');
    }
  };

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
    return <ProductListScreen onBack={handleBack} onGoToProductDetail={handleGoToProductDetail} onGoToProfile={handleGoToProfile} onGoToCart={() => setScreen('cart')} onLogout={() => setScreen('main')} />;
  }
  if (screen === 'cart') {
    return <CartScreen onBack={handleCartBack} />;
  }
  if (screen === 'profile') {
    return <ProfileScreen onBack={handleBack} />;
  }
  if (screen === 'productDetail' && selectedProduct) {
    return <ProductDetailScreen product={selectedProduct} onBack={handleBackFromProductDetail} />;
  }
  return <HomeScreen onShopNow={handleShopNow} onViewCart={handleViewCart} />;
}
