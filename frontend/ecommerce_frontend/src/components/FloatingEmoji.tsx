import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface FloatingEmojiProps {
  emojis?: string[];
  count?: number;
  active?: boolean;
}

const Emoji: React.FC<{ emoji: string; index: number; total: number }> = ({ emoji, index, total }) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    const delay = index * 200;
    const xOffset = ((index % 3) - 1) * 30;
    translateX.value = withRepeat(
      withTiming(xOffset, { duration: 2000 + index * 300, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
    translateY.value = withRepeat(
      withTiming(-200 - index * 40, { duration: 2500 + index * 200, easing: Easing.out(Easing.ease) }),
      -1,
      false,
    );
    opacity.value = withRepeat(
      withTiming(0.8, { duration: 800 }),
      -1,
      true,
    );
  }, [translateX, translateY, opacity, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.emojiWrapper, animatedStyle]}>
      <Text style={styles.emoji}>{emoji}</Text>
    </Animated.View>
  );
};

const FloatingEmoji: React.FC<FloatingEmojiProps> = ({
  emojis = ['🛒', '🎉', '💰', '⭐', '🎁'],
  count = 8,
}) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <Emoji key={i} emoji={emojis[i % emojis.length]} index={i} total={count} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 300, overflow: 'hidden' },
  emojiWrapper: { position: 'absolute', bottom: 0 },
  emoji: { fontSize: 24 },
});

export default FloatingEmoji;
