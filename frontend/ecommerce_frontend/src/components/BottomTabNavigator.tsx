import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { HomeIcon, ShopIcon, CartIcon, DealsIcon, UserIcon } from './Icons';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount?: number;
  notificationCount?: number;
}

interface TabItemProps {
  id: string;
  label: string;
  icon: React.FC<{ size?: number; color?: string }>;
  isActive: boolean;
  onPress: () => void;
  badge?: number;
}

const TABS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'shop', label: 'Shop', icon: ShopIcon },
  { id: 'cart', label: 'Cart', icon: CartIcon },
  { id: 'deals', label: 'Deals', icon: DealsIcon },
  { id: 'account', label: 'Account', icon: UserIcon },
];

const TabItem: React.FC<TabItemProps> = ({ id, label, icon: Icon, isActive, onPress, badge }) => {
  const [scaleAnim] = useState(new Animated.Value(1));
  const [colorAnim] = useState(new Animated.Value(isActive ? 1 : 0));

  useEffect(() => {
    Animated.timing(colorAnim, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isActive, colorAnim]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };

  const iconColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#808080', '#FF5722'],
  });

  const labelColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#808080', '#FF5722'],
  });

  return (
    <TouchableOpacity style={styles.tabItem} onPress={handlePress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Icon size={24} color={isActive ? '#FF5722' : '#808080'} />
        </Animated.View>
        {badge !== undefined && badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
          </View>
        )}
      </View>
      <Animated.Text style={[styles.tabLabel, { color: labelColor }]}>
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

const BottomTabNavigator: React.FC<TabBarProps> = ({
  activeTab,
  onTabChange,
  cartCount = 0,
  notificationCount = 0,
}) => {
  const [underlineX] = useState(new Animated.Value(0));

  useEffect(() => {
    const activeIndex = TABS.findIndex((t) => t.id === activeTab);
    Animated.timing(underlineX, {
      toValue: activeIndex,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab, underlineX]);

  return (
    <View style={styles.bottomTabContainer}>
      <View style={styles.underlineTrack}>
        <Animated.View
          style={[
            styles.underline,
            {
              left: underlineX.interpolate({
                inputRange: [0, 4],
                outputRange: ['0%', '25%'],
              }),
            },
          ]}
        />
      </View>
      <View style={styles.tabsContainer}>
        {TABS.map((tab) => {
          let badgeCount: number | undefined;
          if (tab.id === 'cart') {
            badgeCount = cartCount > 0 ? cartCount : undefined;
          } else if (tab.id === 'account') {
            badgeCount = notificationCount > 0 ? notificationCount : undefined;
          }
          return (
            <TabItem
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onPress={() => onTabChange(tab.id)}
              badge={badgeCount}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabContainer: {
    position: 'relative',
    backgroundColor: '#0D0D12',
    borderTopWidth: 1,
    borderTopColor: '#23232B',
  },
  underlineTrack: {
    height: 3,
    backgroundColor: '#2D2D38',
    width: '100%',
    position: 'relative',
  },
  underline: {
    height: 3,
    backgroundColor: '#FF5722',
    width: '20%',
    position: 'absolute',
    top: 0,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -12,
    backgroundColor: '#FF5722',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0D0D12',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});

export default BottomTabNavigator;
