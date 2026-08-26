# Dez Collection — E-Commerce App

A Temu-style e-commerce mobile app built with React Native, featuring a dark theme, SVG icon library, rich animations, and gamification features.

## Features

- **Product Catalog** — Browse products with filters, search, categories, and sort options
- **Shopping Cart** — Add/remove items, quantity management, persistent storage via AsyncStorage
- **Checkout Flow** — Address selection, payment methods, order confirmation
- **User Authentication** — Login/signup with mock auth (admin + customer roles)
- **Gamification** — Spin-to-win wheel, daily streaks, badges, referral rewards
- **Wishlist** — Save and manage favorite products with sort/filter
- **Order Management** — Order history, detail tracking, delivery status timeline
- **Notifications** — Push notification preferences, in-app notification management
- **Admin Dashboard** — User stats, product management, recent orders overview
- **Reviews System** — View and write product reviews with star ratings

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React Native | 0.84.1 | Core framework |
| TypeScript | 5.8.3 | Type safety |
| React | 19.2.3 | UI library |
| react-native-svg | 15.15.3 | Custom SVG icon library (30+ icons) |
| react-native-safe-area-context | 5.5.2 | Safe area handling |
| AsyncStorage | 3.0.1 | Persistent storage (cart, wishlist) |

## Project Structure

```
frontend/ecommerce_frontend/
├── App.tsx                          # Root component with tab navigation
├── index.js                         # Entry point with provider wrappers
├── src/
│   ├── components/
│   │   ├── Icons.tsx                # 30+ SVG icon components
│   │   ├── BottomTabNavigator.tsx   # 5-tab bottom navigation
│   │   ├── Hero.tsx                 # Landing hero section
│   │   ├── ShopPage.tsx             # Full shop page with search/filters
│   │   ├── CartScreen.tsx           # Shopping cart view
│   │   ├── ProductDetailScreen.tsx  # Product detail with specs
│   │   ├── CheckoutScreen.tsx       # Checkout flow
│   │   ├── FeaturedProducts.tsx     # Product grid with category filters
│   │   ├── HomeScreen.tsx           # Home tab layout
│   │   ├── DealsScreen.tsx          # Deals & rewards hub
│   │   ├── ProfileScreen.tsx        # User profile & settings
│   │   ├── LoginScreen.tsx          # Login with typewriter animation
│   │   ├── SignupScreen.tsx         # Registration form
│   │   ├── ForgotPasswordScreen.tsx # Password reset flow
│   │   ├── DashboardScreen.tsx      # Admin dashboard
│   │   ├── OrderHistoryScreen.tsx   # Past orders list
│   │   ├── OrderDetailScreen.tsx    # Order detail with tracking
│   │   ├── OrderSuccessScreen.tsx   # Post-checkout confirmation
│   │   ├── WishlistScreen.tsx       # Saved products
│   │   ├── ReviewsScreen.tsx        # Product reviews
│   │   ├── ReferralScreen.tsx       # Referral program
│   │   ├── FilterPanel.tsx          # Advanced filter modal
│   │   ├── ProductListScreen.tsx    # Temu-style product listing
│   │   ├── TemuAliExpressProductGrid.tsx  # Product card grid
│   │   ├── RecommendationsPanel.tsx # AI recommendations
│   │   ├── PushNotificationsManager.tsx   # Notification settings
│   │   │
│   │   │   # ── Animation Components ──
│   │   ├── AnimatedCard.tsx         # Spring scale + fade entrance
│   │   ├── AnimatedBadge.tsx        # Pulsing badge
│   │   ├── AnimatedStar.tsx         # Spin + spring star
│   │   ├── AnimatedPriceTag.tsx     # Price with discount badge
│   │   ├── AnimatedAvatar.tsx       # Avatar with online pulse
│   │   ├── AnimatedCart.tsx         # Animated cart with badge
│   │   ├── AnimatedHeader.tsx       # Fade-in header
│   │   ├── BouncyText.tsx           # Bouncing text entrance
│   │   ├── CounterAnimation.tsx     # Animated number counter
│   │   ├── FadeInView.tsx           # Directional fade-in
│   │   ├── FloatingAction.tsx       # Floating action button
│   │   ├── GradientBanner.tsx       # Shimmer banner
│   │   ├── GradientText.tsx         # Gradient-style text
│   │   ├── NotificationDot.tsx      # Pulsing notification dot
│   │   ├── ProgressBar.tsx          # Animated progress bar
│   │   ├── Pulse.tsx                # Pulsing scale wrapper
│   │   ├── Shimmer.tsx              # Shimmer loading effect
│   │   ├── SkeletonLoader.tsx       # Skeleton placeholders
│   │   ├── SwipeableCard.tsx        # Pan-gesture swipeable
│   │   ├── WavyDivider.tsx          # Animated section divider
│   │   │
│   │   │   # ── Utility Components ──
│   │   ├── CTAButton.tsx            # Universal CTA button
│   │   ├── ErrorBoundary.tsx        # Error boundary with retry
│   │   ├── EmptyState.tsx           # Empty state placeholder
│   │   ├── LoadingOverlay.tsx       # Full-screen loading
│   │   ├── PullToRefresh.tsx        # Pull-to-refresh wrapper
│   │   ├── Toast.tsx                # Toast notifications
│   │   ├── FlashDealsPanel.tsx      # Flash deal cards
│   │   ├── ClearancePanel.tsx       # Clearance sale cards
│   │   ├── CoinsBalance.tsx         # Coin balance display
│   │   ├── GamificationPanel.tsx    # Streaks, badges, rewards
│   │   ├── SpinToWin.tsx            # Prize wheel
│   │   ├── ShippingIndicator.tsx    # Free shipping progress
│   │   └── Hero.tsx                 # Landing hero section
│   │
│   ├── contexts/
│   │   ├── AuthContext.tsx           # Auth state (mock users)
│   │   ├── CartContext.tsx           # Cart state (AsyncStorage)
│   │   ├── WishlistContext.tsx       # Wishlist state (AsyncStorage)
│   │   └── NotificationContext.tsx   # Notification settings
│   │
│   └── types.ts                     # Shared TypeScript types
```

## Dark Theme Colors

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

## Getting Started

### Prerequisites

- Node.js >= 22.11.0
- React Native CLI setup ([guide](https://reactnative.dev/docs/set-up-your-environment))
- Xcode (iOS) / Android Studio (Android)

### Installation

```bash
cd frontend/ecommerce_frontend
npm install
```

### Running

```bash
# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

### Mock Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@ecommerce.com | admin123 |
| Customer | user1@ecommerce.com | user123 |

## SVG Icon Library

The app includes 30+ custom SVG icons in `Icons.tsx` built with `react-native-svg`:

`HomeIcon` · `ShopIcon` · `CartIcon` · `DealsIcon` · `UserIcon` · `HeartIcon` · `BellIcon` · `SearchIcon` · `StarIcon` · `FireIcon` · `TruckIcon` · `TagIcon` · `ClockIcon` · `TrophyIcon` · `GiftIcon` · `CheckIcon` · `MailIcon` · `ShieldIcon` · `PackageIcon` · `MinusIcon` · `PlusIcon` · `TrashIcon` · `FilterIcon` · `SortIcon` · `ChevronLeftIcon` · `ChevronRightIcon` · `TrendingUpIcon` · `UsersIcon` · `CoinsIcon` · `CartBagIcon` · `PhoneIcon` · `HelpIcon` · `ScaleIcon` · `LogOutIcon` · `CreditCardIcon` · `DealsIcon`

## Animation Library

| Component | Animation Type | Use Case |
|-----------|---------------|----------|
| `AnimatedCard` | Spring scale + fade | Product card entrance |
| `AnimatedBadge` | Pulsing scale | Status badges |
| `AnimatedStar` | Spin + spring | Star ratings |
| `AnimatedPriceTag` | Spring scale + opacity | Price display |
| `AnimatedAvatar` | Spring + pulse ring | User avatars |
| `BouncyText` | Spring bounce | Headers, labels |
| `CounterAnimation` | Easing count | Stats, numbers |
| `FadeInView` | Directional slide-in | Section entrance |
| `FloatingAction` | Spring + float idle | FAB button |
| `GradientBanner` | Shimmer sweep | Promo banners |
| `NotificationDot` | Spring + pulse | Badge dots |
| `ProgressBar` | Easing fill | Progress indicators |
| `Pulse` | Looping scale | Attention grabber |
| `Shimmer` | Linear sweep | Loading skeletons |
| `SkeletonLoader` | Opacity pulse | Placeholder loading |
| `SwipeableCard` | Pan gesture | Swipe actions |
| `WavyDivider` | TranslateX loop | Section dividers |
| `Toast` | Spring + fade | Notifications |
| `LoadingOverlay` | Spin + fade | Full-screen loading |

## All Components

Every file in `src/components/` (91 total):

### Core Screens

| File | Description |
|------|-------------|
| `HomeScreen.tsx` | Main home tab layout with sections |
| `ShopPage.tsx` | Full shop page with search and filters |
| `CartScreen.tsx` | Shopping cart view |
| `ProductDetailScreen.tsx` | Product detail page with specs and images |
| `ProductListScreen.tsx` | Temu-style product listing |
| `CheckoutScreen.tsx` | Checkout flow |
| `ProfileScreen.tsx` | User profile and settings |
| `LoginScreen.tsx` | Login with typewriter animation |
| `SignupScreen.tsx` | Registration form |
| `ForgotPasswordScreen.tsx` | Password reset flow |
| `DashboardScreen.tsx` | Admin dashboard |
| `OrderHistoryScreen.tsx` | Past orders list |
| `OrderDetailScreen.tsx` | Order detail with tracking |
| `OrderSuccessScreen.tsx` | Post-checkout confirmation |
| `WishlistScreen.tsx` | Saved products |
| `ReviewsScreen.tsx` | Product reviews listing and submission |
| `ReferralScreen.tsx` | Referral program |
| `DealsScreen.tsx` | Deals and rewards hub |
| `Hero.tsx` | Landing hero section |
| `BottomTabNavigator.tsx` | 5-tab bottom navigation |
| `Icons.tsx` | 30+ SVG icon components |

### Animation Components

| File | Description |
|------|-------------|
| `AnimatedCard.tsx` | Spring scale and fade entrance |
| `AnimatedBadge.tsx` | Pulsing badge |
| `AnimatedStar.tsx` | Spin and spring star |
| `AnimatedPriceTag.tsx` | Price with discount badge animation |
| `AnimatedAvatar.tsx` | Avatar with online pulse ring |
| `AnimatedCart.tsx` | Animated cart icon with badge |
| `AnimatedHeader.tsx` | Fade-in header |
| `BouncyText.tsx` | Bouncing text entrance animation |
| `CounterAnimation.tsx` | Animated number counter |
| `FadeInView.tsx` | Directional fade-in wrapper |
| `FloatingAction.tsx` | Floating action button |
| `GradientBanner.tsx` | Shimmer gradient banner |
| `GradientText.tsx` | Gradient-style text |
| `NotificationDot.tsx` | Pulsing notification dot |
| `ProgressBar.tsx` | Animated progress bar |
| `Pulse.tsx` | Pulsing scale wrapper |
| `Shimmer.tsx` | Shimmer loading effect |
| `SkeletonLoader.tsx` | Skeleton placeholder loading |
| `SwipeableCard.tsx` | Pan-gesture swipeable card |
| `WavyDivider.tsx` | Animated wavy section divider |

### UI Components

| File | Description |
|------|-------------|
| `Badge.tsx` | Reusable badge with color and size variants |
| `ProductCard.tsx` | Product card with image, price, and actions |
| `CartItem.tsx` | Cart item row with quantity controls |
| `OrderCard.tsx` | Order summary card with status |
| `ReviewCard.tsx` | Individual review with rating and helpful vote |
| `RatingBar.tsx` | Star rating bar with count and progress |
| `AddressCard.tsx` | Address display card with select and delete |
| `PaymentMethodCard.tsx` | Payment method card with brand colors |
| `StatCard.tsx` | Dashboard stat card with trend indicator |
| `InfoCard.tsx` | Info card with icon and optional action |
| `CouponCard.tsx` | Coupon card with copy-to-clipboard |
| `OrderTimelineStep.tsx` | Single step in order tracking timeline |
| `StatusTimeline.tsx` | Full animated status timeline |
| `NotificationItem.tsx` | Notification row with swipe and read state |
| `FeaturedBanner.tsx` | Featured product banner with CTA |
| `PromoBanner.tsx` | Promotional banner with gradient |
| `SectionHeader.tsx` | Section title with optional action link |
| `TabBar.tsx` | Animated tab bar with sliding indicator |
| `StoreHeader.tsx` | Store header with avatar and follow button |
| `ImageCarousel.tsx` | Horizontal image carousel with dot indicators |
| `ColorSelector.tsx` | Color option selector with spring animation |
| `SizeSelector.tsx` | Size option selector with spring animation |
| `QuantitySelector.tsx` | Increment/decrement quantity controls |
| `PriceSlider.tsx` | Dual-thumb price range slider |
| `PriceComparison.tsx` | Current vs original price with savings |
| `CategoryChip.tsx` | Category filter chip with active state |
| `CountdownTimer.tsx` | Countdown timer with urgent-state styling |
| `CartSummary.tsx` | Cart total breakdown with shipping progress |
| `ShippingBadge.tsx` | Free/shipping badge with pulse animation |
| `DeliveryStatusBanner.tsx` | Delivery status with progress bar |
| `DeliveryMap.tsx` | Delivery map placeholder with ETA |
| `HorizontalDivider.tsx` | Animated horizontal divider with optional label |
| `RecentlyViewed.tsx` | Recently viewed products horizontal list |
| `SearchHistory.tsx` | Recent search terms with AsyncStorage |
| `AppVersionFooter.tsx` | App version and branding footer |
| `SocialShare.tsx` | Social share buttons for sharing and referral |

### Utility Components

| File | Description |
|------|-------------|
| `CTAButton.tsx` | Universal call-to-action button |
| `ErrorBoundary.tsx` | Error boundary with retry UI |
| `EmptyState.tsx` | Empty state placeholder |
| `LoadingOverlay.tsx` | Full-screen loading overlay |
| `PullToRefresh.tsx` | Pull-to-refresh wrapper |
| `Toast.tsx` | Toast notification component |
| `FlashDealsPanel.tsx` | Flash deal cards with countdown |
| `ClearancePanel.tsx` | Clearance sale cards |
| `CoinsBalance.tsx` | Coin balance display |
| `GamificationPanel.tsx` | Streaks, badges, and rewards panel |
| `SpinToWin.tsx` | Prize wheel game |
| `ShippingIndicator.tsx` | Free shipping progress indicator |
| `RecommendationsPanel.tsx` | AI-powered product recommendations |
| `PushNotificationsManager.tsx` | Push notification settings manager |
| `RippleEffect.tsx` | Touch ripple effect wrapper |

## License

Private — Dez Collection © 2026
