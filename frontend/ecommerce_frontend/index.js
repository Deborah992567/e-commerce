/**
 * @format
 */

import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenRouter from './src/components/ScreenRouter';
import { AuthProvider } from './src/contexts/AuthContext';
import { CartProvider } from './src/contexts/CartContext';
import { name as appName } from './app.json';


const AppWithProvider = () => (
  <SafeAreaProvider>
    <AuthProvider>
      <CartProvider>
        <ScreenRouter />
      </CartProvider>
    </AuthProvider>
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => AppWithProvider);
