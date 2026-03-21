import React, { useState } from 'react';
import AppMain from '../../App';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';

export default function ScreenRouter() {
  const [screen, setScreen] = useState<'main' | 'login' | 'signup'>('main');

  // Handler to pass to AppMain for navigation
  const handleShopNow = () => setScreen('login');
  const handleBack = () => setScreen('main');
  const handleGoToSignup = () => setScreen('signup');
  const handleGoToLogin = () => setScreen('login');

  if (screen === 'signup') {
    return <SignupScreen onBack={handleBack} onGoToLogin={handleGoToLogin} />;
  }
  if (screen === 'login') {
    return <LoginScreen onBack={handleBack} onGoToSignup={handleGoToSignup} />;
  }
  return <AppMain onShopNow={handleShopNow} />;
}
