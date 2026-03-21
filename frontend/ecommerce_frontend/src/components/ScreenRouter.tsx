import React, { useState } from 'react';
import AppMain from '../../App';
import LoginScreen from './LoginScreen';

export default function ScreenRouter() {
  const [screen, setScreen] = useState<'main' | 'login'>('main');

  // Handler to pass to AppMain for navigation
  const handleShopNow = () => setScreen('login');
  const handleBack = () => setScreen('main');

  if (screen === 'login') {
    return <LoginScreen onBack={handleBack} />;
  }
  return <AppMain onShopNow={handleShopNow} />;
}
