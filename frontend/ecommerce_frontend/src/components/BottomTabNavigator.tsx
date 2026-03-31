import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount?: number;
  notificationCount?: number;
}

const TABS = [
  { id: 'home', label: 'Home', icon: '🏠', badge: null },
  { id: 'shop', label: 'Shop', icon: '🛍️', badge: null },
  { id: 'cart', label: 'Cart', icon: '🛒', badge: null },
  { id: 'deals', label: 'Deals', icon: '⚡', badge: null },
  { id: 'account', label: 'Account', icon: '👤', badge: null },
];

interface TabItemProps {
  tab: (typeof TABS)[0];
  isActive: boolean;
  onPress: () => void;
  badge?: number;
}

const TabItem: React.FC<TabItemProps> = ({ tab, isActive, onPress, badge }) => {
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
        toValue: 1.15,
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
    <TouchableOpacity
      style={styles.tabItem}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Animated.Text
          style={[
            styles.tabIcon,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {tab.icon}
        </Animated.Text>
        {badge !== undefined && badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {badge > 99 ? '99+' : badge}
            </Text>
          </View>
        )}
      </View>
      <Animated.Text
        style={[
          styles.tabLabel,
          {
            color: labelColor,
          },
        ]}
      >
        {tab.label}
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
      toValue: activeIndex * (100 / TABS.length),
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [activeTab, underlineX]);

  const tabWidth = 100 / TABS.length;
  const underlineWidth = underlineX.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.bottomTabContainer}>
      <View style={styles.underlineTrack}>
        <Animated.View
          style={[
            styles.underline,
            {
              left: underlineX.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 300],
              }),
              width: 100,
            },
          ]}
        />
      </View>

      <View style={styles.tabsContainer}>
        {TABS.map((tab) => {
          let badgeCount: number | undefined;
          
          if (tab.id === 'shop') {
            badgeCount = cartCount > 0 ? cartCount : undefined;
          } else if (tab.id === 'account') {
            badgeCount = notificationCount > 0 ? notificationCount : undefined;
          }

          return (
            <TabItem
              key={tab.id}
              tab={tab}
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
    paddingBottom: 0,
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
  tabIcon: {
    fontSize: 24,
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
