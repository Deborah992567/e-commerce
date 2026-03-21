/**
 * @format
 */

import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ScreenRouter from './src/components/ScreenRouter';
import { name as appName } from './app.json';


const AppWithProvider = () => (
  <SafeAreaProvider>
    <ScreenRouter />
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => AppWithProvider);
