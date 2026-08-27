import React, { useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, Animated, View } from 'react-native';

interface TickerTextProps {
  text: string;
  speed?: number;
  style?: object;
  backgroundColor?: string;
}

const TickerText: React.FC<TickerTextProps> = ({
  text,
  speed = 15000,
  style,
  backgroundColor = '#23232B',
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (containerWidth === 0 || textWidth === 0) return;

    const totalDistance = containerWidth + textWidth;

    translateX.setValue(containerWidth);

    Animated.loop(
      Animated.timing(translateX, {
        toValue: -textWidth,
        duration: speed,
        useNativeDriver: true,
      }),
    ).start();
  }, [containerWidth, textWidth, speed, translateX]);

  const repeatedText = `${text}   ${text}   ${text}   `;

  return (
    <View
      style={[styles.container, { backgroundColor }]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        style={[
          styles.animatedContainer,
          { transform: [{ translateX }] },
        ]}
      >
        <Text
          style={[styles.text, style]}
          onLayout={(e) => setTextWidth(e.nativeEvent.layout.width / 3)}
          numberOfLines={1}
        >
          {repeatedText}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  animatedContainer: {
    flexDirection: 'row',
  },
  text: {
    color: '#FF5722',
    fontSize: 14,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
});

export default TickerText;
