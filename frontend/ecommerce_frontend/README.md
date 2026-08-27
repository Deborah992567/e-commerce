<div align="center">

# Dez Collection

### A Premium E-Commerce Mobile App

Built with React Native | Dark Theme | 120+ Components | 40+ Animations

[![React Native](https://img.shields.io/badge/React_Native-0.84.1-61DAFB?logo=react&logoColor=white)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-Private-red)](#)

</div>

---

## About

**Dez Collection** is a feature-rich, Temu-style e-commerce mobile application built from scratch with React Native. It showcases a modern dark UI, extensive SVG icon system, 40+ custom animations, gamification features, and a complete shopping experience — all running on both iOS and Android.

This project was built to demonstrate advanced React Native development including custom animation systems, persistent state management, complex navigation, and polished UI/UX design.

## Screenshots

The app features a sleek dark theme with an accent color of `#FF5722` (Deep Orange):

- **Onboarding** — 5-step animated walkthrough with parallax scrolling
- **Home** — Hero banner, flash deals, featured products, gamification panel
- **Shop** — Full product grid with search, filters, and sort
- **Cart** — Quantity management, promo codes, checkout flow
- **Deals** — Spin-to-win wheel, daily streaks, badges, referral rewards
- **Profile** — User settings, order history, notifications

## Features

| Category | Features |
|----------|----------|
| **Shopping** | Product catalog, search & filters, shopping cart, checkout flow, wishlist, order tracking |
| **Gamification** | Spin-to-win wheel, daily streaks, badges, coin rewards, referral program |
| **User Experience** | Animated onboarding, skeleton loading, pull-to-refresh, toast notifications |
| **Auth** | Login/signup, forgot password, role-based access (Admin/Customer) |
| **Animations** | 40+ custom animations — confetti, particles, neon glow, wave text, rainbow borders, and more |
| **Icons** | 35+ hand-crafted SVG icons built with react-native-svg |
| **Persistence** | Cart, wishlist, onboarding state persisted with AsyncStorage |

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native 0.84** | Core mobile framework |
| **TypeScript 5.8** | Type safety across the codebase |
| **React 19** | UI rendering |
| **react-native-reanimated 3.17** | Advanced spring/physics-based animations |
| **react-native-svg** | Custom SVG icon library (35+ icons) |
| **react-native-safe-area-context** | Safe area handling for all devices |
| **@react-native-async-storage** | Persistent local storage (cart, wishlist, onboarding) |
| **react-native-linear-gradient** | Gradient effects on banners and buttons |
| **react-native-vector-icons** | Additional icon support |

## Getting Started

### Prerequisites

- **Node.js** >= 22.11.0
- **React Native CLI** environment ([setup guide](https://reactnative.dev/docs/set-up-your-environment))
- **Xcode** 15+ (for iOS) or **Android Studio** (for Android)
- **CocoaPods** (for iOS dependencies)

### Installation

```bash
# Clone the repository
git clone https://github.com/Deborah992567/e-commerce.git
cd e-commerce/frontend/ecommerce_frontend

# Install dependencies
npm install

# Install iOS pods (iOS only)
cd ios && pod install && cd ..
```

### Running the App

```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

### Mock Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@ecommerce.com` | `admin123` |
| Customer | `user1@ecommerce.com` | `user123` |

## Project Structure

```
frontend/ecommerce_frontend/
├── App.tsx                              # Root component, tab navigation, state
├── index.js                             # Entry point with providers
├── src/
│   ├── components/
│   │   ├── Icons.tsx                    # 35+ SVG icon components
│   │   │
│   │   ├── OnboardingScreen.tsx         # Animated 5-step onboarding
│   │   ├── HomeScreen.tsx               # Home tab with sections
│   │   ├── ShopPage.tsx                 # Shop with search & filters
│   │   ├── CartScreen.tsx               # Shopping cart
│   │   ├── ProductDetailScreen.tsx      # Product detail view
│   │   ├── CheckoutScreen.tsx           # Checkout flow
│   │   ├── ProfileScreen.tsx            # User profile
│   │   ├── LoginScreen.tsx              # Login with animations
│   │   ├── SignupScreen.tsx             # Registration
│   │   ├── DealsScreen.tsx              # Deals & rewards hub
│   │   ├── DashboardScreen.tsx          # Admin dashboard
│   │   ├── OrderHistoryScreen.tsx       # Order history
│   │   ├── OrderDetailScreen.tsx        # Order tracking
│   │   ├── WishlistScreen.tsx           # Saved products
│   │   ├── ReviewsScreen.tsx            # Product reviews
│   │   ├── ReferralScreen.tsx           # Referral program
│   │   ├── WelcomeBanner.tsx            # Time-based greeting
│   │   ├── FeatureHighlights.tsx        # Why shop with us
│   │   ├── FlashBanner.tsx              # Animated deal banner
│   │   ├── BottomTabNavigator.tsx       # 5-tab navigation
│   │   │
│   │   ├── SplashScreen.tsx             # Bouncing bag + particles
│   │   ├── Confetti.tsx                 # Celebration confetti
│   │   ├── FloatingHearts.tsx           # Instagram Live hearts
│   │   ├── TypewriterText.tsx           # Letter-by-letter typing
│   │   ├── RainbowBorder.tsx            # Cycling rainbow border
│   │   ├── NeonGlow.tsx                 # Neon glow effect
│   │   ├── WaveText.tsx                 # Per-letter wave animation
│   │   ├── ParticleBurst.tsx            # Explosion particles
│   │   ├── FlipCard.tsx                 # 3D card flip
│   │   ├── ShakeAnimation.tsx           # Error shake feedback
│   │   ├── BounceInList.tsx             # Staggered spring entrance
│   │   └── ... (40+ animation components)
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx               # Authentication state
│   │   ├── CartContext.tsx               # Cart state (AsyncStorage)
│   │   ├── WishlistContext.tsx           # Wishlist state (AsyncStorage)
│   │   └── NotificationContext.tsx       # Notification settings
│   │
│   └── types.ts                         # Shared TypeScript types
```

## Dark Theme

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#0D0D12` | Screen background |
| Card | `#23232B` | Card backgrounds |
| Border | `#2D2D38` | Card borders, dividers |
| Accent | `#FF5722` | Primary actions, highlights |
| Success | `#4ECDC4` | Positive states, confirmations |
| Error | `#FF2D55` | Errors, warnings |
| Gold | `#FFD700` | Stars, ratings |
| Muted | `#A0A0A0` | Secondary text |

## Animation Library

40+ custom animations built with **react-native-reanimated** and **Animated API**:

| Category | Components |
|----------|-----------|
| **Entrance** | `AnimatedCard`, `BounceInList`, `FadeInView`, `SlideInText`, `SplashScreen` |
| **Text** | `TypewriterText`, `WaveText`, `BouncyText`, `GradientText` |
| **Feedback** | `ShakeAnimation`, `Toast`, `PulseAnimation`, `ParticleBurst`, `Confetti` |
| **Visual** | `RainbowBorder`, `NeonGlow`, `GlowBorder`, `GlowPulse`, `WaveAnimation` |
| **Loading** | `SpinnerDots`, `LoadingDots`, `Shimmer`, `SkeletonLoader` |
| **Fun** | `FloatingHearts`, `FloatingEmoji`, `FlipCard`, `FlipIcon`, `LightningStrike` |
| **Navigation** | `BounceArrow`, `TabBar`, `ProgressDots`, `AnimatedHeader` |

## License

This project is private. All rights reserved to Dez Collection 2026.
