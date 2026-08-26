import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

interface TabBarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const tabWidths = useSharedValue<number[]>([]);

  const activeIndex = tabs.indexOf(activeTab);

  useEffect(() => {
    if (tabWidths.value.length === 0) return;
    const offset = tabWidths.value.slice(0, activeIndex).reduce((a, b) => a + b, 0);
    indicatorX.value = withSpring(offset, { damping: 20, stiffness: 300 });
    indicatorWidth.value = withSpring(tabWidths.value[activeIndex] || 0, {
      damping: 20,
      stiffness: 300,
    });
  }, [activeIndex]);

  const handleTabLayout = (index: number, event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    tabWidths.value = [...tabWidths.value];
    tabWidths.value[index] = width;
    if (index === 0) {
      indicatorWidth.value = withSpring(width, { damping: 20, stiffness: 300 });
    }
    if (activeIndex === index) {
      const offset = tabWidths.value.slice(0, index).reduce((a, b) => a + b, 0);
      indicatorX.value = withSpring(offset, { damping: 20, stiffness: 300 });
      indicatorWidth.value = withSpring(width, { damping: 20, stiffness: 300 });
    }
  };

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }));

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <Pressable
          key={tab}
          style={styles.tab}
          onPress={() => onTabChange(tab)}
          onLayout={(e) => handleTabLayout(index, e)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.tabTextActive]}
          >
            {tab}
          </Text>
        </Pressable>
      ))}
      <Animated.View style={[styles.indicator, indicatorStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0D0D12',
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A24',
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A0A0A0',
  },
  tabTextActive: {
    color: '#FF5722',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: '#FF5722',
    borderRadius: 2,
  },
});

export default TabBar;
