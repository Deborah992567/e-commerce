import React, { useState } from 'react';
import AppMain from '../../App';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

export default function ScreenRouter() {
  const [screen, setScreen] = useState<'main' | 'login' | 'signup' | 'forgot'>('main');

  // Handler to pass to AppMain for navigation
  const handleShopNow = () => setScreen('login');
  const handleBack = () => setScreen('main');
  const handleGoToSignup = () => setScreen('signup');
  const handleGoToLogin = () => setScreen('login');
  const handleGoToForgot = () => setScreen('forgot');
  const handleBackToLogin = () => setScreen('login');

  if (screen === 'signup') {
    return <SignupScreen onBack={handleBack} onGoToLogin={handleGoToLogin} />;
  }
  if (screen === 'login') {
    return <LoginScreen onBack={handleBack} onGoToSignup={handleGoToSignup} onGoToForgot={handleGoToForgot} />;
  }
  if (screen === 'forgot') {
    return <ForgotPasswordScreen onBack={handleBackToLogin} />;
  }
  return <AppMain onShopNow={handleShopNow} />;
}
