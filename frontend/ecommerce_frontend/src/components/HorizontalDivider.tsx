import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Easing, View, Text } from 'react-native';

interface HorizontalDividerProps {
  label?: string;
  color?: string;
  height?: number;
}

const HorizontalDivider: React.FC<HorizontalDividerProps> = ({
  label,
  color = '#2D2D38',
  height = 1,
}) => {
  const scaleX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(scaleX, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [scaleX]);

  return (
    <View style={styles.container}>
      {label ? (
        <>
          <Animated.View
            style={[
              styles.line,
              { height, backgroundColor: color },
              { transform: [{ scaleX }] },
            ]}
          />
          <Text style={[styles.label, { color }]}>{label}</Text>
          <Animated.View
            style={[
              styles.line,
              { height, backgroundColor: color },
              { transform: [{ scaleX }] },
            ]}
          />
        </>
      ) : (
        <Animated.View
          style={[
            styles.fullLine,
            { height, backgroundColor: color },
            { transform: [{ scaleX }] },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  line: {
    flex: 1,
  },
  fullLine: {
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    marginHorizontal: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default HorizontalDivider;
