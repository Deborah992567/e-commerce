import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  LayoutChangeEvent,
} from 'react-native';

interface PriceSliderProps {
  min: number;
  max: number;
  initialMin: number;
  initialMax: number;
  onRangeChange: (range: { min: number; max: number }) => void;
}

const TRACK_HEIGHT = 6;
const THUMB_SIZE = 24;

const formatNaira = (value: number): string => {
  return `₦${value.toLocaleString()}`;
};

const PriceSlider: React.FC<PriceSliderProps> = ({
  min,
  max,
  initialMin,
  initialMax,
  onRangeChange,
}) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const [minVal, setMinVal] = useState(
    Math.max(min, Math.min(initialMin, max)),
  );
  const [maxVal, setMaxVal] = useState(
    Math.max(min, Math.min(initialMax, max)),
  );

  const minAnim = useRef(new Animated.Value(0)).current;
  const maxAnim = useRef(new Animated.Value(0)).current;

  const clamp = (val: number, lo: number, hi: number) =>
    Math.min(hi, Math.max(lo, val));

  const valueToX = (value: number) => {
    if (trackWidth === 0) return 0;
    return ((value - min) / (max - min)) * trackWidth;
  };

  const xToValue = (x: number) => {
    const ratio = clamp(x, 0, trackWidth) / trackWidth;
    return Math.round(min + ratio * (max - min));
  };

  const emitChange = (lo: number, hi: number) => {
    onRangeChange({ min: lo, max: hi });
  };

  const minResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const baseX = valueToX(minVal);
        const newX = clamp(baseX + gestureState.dx, 0, valueToX(maxVal) - THUMB_SIZE);
        const newVal = xToValue(newX);
        if (newVal !== minVal) {
          minAnim.setValue(newX);
          setMinVal(newVal);
        }
      },
      onPanResponderRelease: () => {
        emitChange(minVal, maxVal);
      },
    }),
  ).current;

  const maxResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const baseX = valueToX(maxVal);
        const newX = clamp(baseX + gestureState.dx, valueToX(minVal) + THUMB_SIZE, trackWidth);
        const newVal = xToValue(newX);
        if (newVal !== maxVal) {
          maxAnim.setValue(newX);
          setMaxVal(newVal);
        }
      },
      onPanResponderRelease: () => {
        emitChange(minVal, maxVal);
      },
    }),
  ).current;

  const onTrackLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setTrackWidth(w);
    minAnim.setValue(valueToX(minVal));
    maxAnim.setValue(valueToX(maxVal));
  };

  const leftPos = valueToX(minVal);
  const rightPos = valueToX(maxVal);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.rangeText}>{formatNaira(minVal)}</Text>
        <Text style={styles.label}>Price Range</Text>
        <Text style={styles.rangeText}>{formatNaira(maxVal)}</Text>
      </View>

      <View style={styles.sliderRow}>
        <View style={styles.trackWrapper} onLayout={onTrackLayout}>
          {/* Background track */}
          <View style={styles.track} />

          {/* Filled range */}
          <View
            style={[
              styles.fill,
              {
                left: leftPos,
                width: rightPos - leftPos,
              },
            ]}
          />

          {/* Min thumb */}
          <Animated.View
            style={[
              styles.thumb,
              { transform: [{ translateX: minAnim }] },
            ]}
            {...minResponder.panHandlers}
          />

          {/* Max thumb */}
          <Animated.View
            style={[
              styles.thumb,
              { transform: [{ translateX: maxAnim }] },
            ]}
            {...maxResponder.panHandlers}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.endLabel}>{formatNaira(min)}</Text>
        <Text style={styles.endLabel}>{formatNaira(max)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D12',
    padding: 16,
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#9E9E9E',
    fontSize: 14,
    fontWeight: '500',
  },
  rangeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  trackWrapper: {
    flex: 1,
    height: THUMB_SIZE,
    justifyContent: 'center',
  },
  track: {
    position: 'absolute',
    height: TRACK_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: '#23232B',
    borderRadius: TRACK_HEIGHT / 2,
  },
  fill: {
    position: 'absolute',
    height: TRACK_HEIGHT,
    backgroundColor: '#FF5722',
    borderRadius: TRACK_HEIGHT / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FF5722',
    borderWidth: 3,
    borderColor: '#0D0D12',
    shadowColor: '#FF5722',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  endLabel: {
    color: '#6B6B76',
    fontSize: 12,
  },
});

export default PriceSlider;
