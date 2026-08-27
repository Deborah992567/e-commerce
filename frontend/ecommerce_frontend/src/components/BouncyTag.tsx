import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';

interface BouncyTagProps {
  text: string;
  color?: string;
  textColor?: string;
  style?: object;
}

const BouncyTag: React.FC<BouncyTagProps> = ({ text, color = '#FF5722', textColor = '#FFF', style }) => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.08, { duration: 600 }),
      -1,
      true,
    );
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.tag, { backgroundColor: color }, animatedStyle, style]}>
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' },
  text: { fontSize: 11, fontWeight: 'bold' },
});

export default BouncyTag;
