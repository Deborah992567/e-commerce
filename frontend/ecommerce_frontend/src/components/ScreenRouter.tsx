import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import DashboardScreen from './DashboardScreen';
import CartScreen from './CartScreen';
import ProductListScreen from './ProductListScreen';
import ProfileScreen from './ProfileScreen';
import { useAuth } from '../contexts/AuthContext';

export default function ScreenRouter() {
  const [screen, setScreen] = useState<'main' | 'login' | 'signup' | 'forgot' | 'dashboard' | 'cart' | 'productList' | 'profile'>('main');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { isAdmin } = useAuth();

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
  const handleViewCart = () => setScreen('cart');
  const handleGoToProfile = () => setScreen('profile');
  const handleBackToLogin = () => setScreen('login');

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
    return <ProductListScreen onBack={handleBack} onGoToProductDetail={handleGoToProductDetail} onGoToProfile={handleGoToProfile} onLogout={() => setScreen('main')} />;
  }
  if (screen === 'cart') {
    return <CartScreen onBack={handleBack} />;
  }
  if (screen === 'profile') {
    return <ProfileScreen onBack={handleBack} />;
  }
  return <HomeScreen onShopNow={handleShopNow} onViewCart={handleViewCart} />;
}
