import React, { useState } from 'react';
import AppMain from '../../App';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import DashboardScreen from './DashboardScreen';
import { useAuth } from '../contexts/AuthContext';

export default function ScreenRouter() {
  const [screen, setScreen] = useState<'main' | 'login' | 'signup' | 'forgot' | 'dashboard'>('main');
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
  const handleBackToLogin = () => setScreen('login');

  if (screen === 'signup') {
    return <SignupScreen onBack={handleBack} onGoToLogin={handleGoToLogin} />;
  }
  if (screen === 'login') {
    return <LoginScreen onBack={handleBack} onGoToSignup={handleGoToSignup} onGoToForgot={handleGoToForgot} onGoToDashboard={handleGoToDashboard} />;
  }
  if (screen === 'forgot') {
    return <ForgotPasswordScreen onBack={handleBackToLogin} />;
  }
  if (screen === 'dashboard') {
    return <DashboardScreen onBack={handleBack} />;
  }
  return <AppMain onShopNow={handleShopNow} />;
}
