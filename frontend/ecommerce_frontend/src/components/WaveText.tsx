import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';

interface WaveTextProps {
  text: string;
  color?: string;
  fontSize?: number;
  style?: object;
}

const WaveLetter: React.FC<{ letter: string; index: number; color: string; fontSize: number }> = ({ letter, index, color, fontSize }) => {
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    const delay = index * 100;
    translateY.value = withRepeat(
      withTiming(-8, { duration: 400, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [translateY, index]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Text style={[styles.letter, { color, fontSize }]}>{letter}</Text>
    </Animated.View>
  );
};

const WaveText: React.FC<WaveTextProps> = ({ text, color = '#FF5722', fontSize = 24, style }) => {
  return (
    <View style={[styles.container, style]}>
      {text.split('').map((letter, i) => (
        <WaveLetter key={i} letter={letter === ' ' ? '\u00A0' : letter} index={i} color={color} fontSize={fontSize} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'flex-end' },
  letter: { fontWeight: 'bold' },
});

export default WaveText;
