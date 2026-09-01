/**
 * @format
 */

import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './App';
import { AuthProvider } from './src/contexts/AuthContext';
import { CartProvider } from './src/contexts/CartContext';
import { WishlistProvider } from './src/contexts/WishlistContext';
import { NotificationProvider } from './src/contexts/NotificationContext';
import { ProductProvider } from './src/contexts/ProductContext';
import { name as appName } from './app.json';


const AppWithProvider = () => (
  <SafeAreaProvider>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <NotificationProvider>
            <ProductProvider>
              <App />
            </ProductProvider>
          </NotificationProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => AppWithProvider);

