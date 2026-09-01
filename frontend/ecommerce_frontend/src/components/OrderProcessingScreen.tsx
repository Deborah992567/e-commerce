import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PackageIcon, TruckIcon, CheckIcon } from './Icons';
import { OrderResult } from './CheckoutScreen';

interface OrderProcessingScreenProps {
  onComplete: () => void;
  order?: OrderResult | null;
}

const STAGES = [
  { key: 'packing', label: 'Packing your order', icon: 'package', color: '#FFD700' },
  { key: 'shipping', label: 'Ready to ship', icon: 'truck', color: '#4ECDC4' },
  { key: 'done', label: 'Order confirmed', icon: 'check', color: '#4CAF50' },
];

const OrderProcessingScreen: React.FC<OrderProcessingScreenProps> = ({ onComplete, order }) => {
  const insets = useSafeAreaInsets();
  const orderId = order?.orderId;
  const [stageIndex, setStageIndex] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const packAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    STAGES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setStageIndex(i), i * 1800)
      );
    });
    timers.push(setTimeout(() => onComplete(), STAGES.length * 1800 + 400));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (stageIndex + 1) / STAGES.length,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [stageIndex, progress]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(floatAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();
  }, [floatAnim]);

  useEffect(() => {
    if (stageIndex === 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(packAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
          Animated.timing(packAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
        ])
      ).start();
    }
  }, [stageIndex, packAnim]);

  const renderStageIcon = (stage: typeof STAGES[number]) => {
    const isActive = STAGES.indexOf(stage) === stageIndex;
    const isPast = STAGES.indexOf(stage) < stageIndex;
    let icon: React.ReactNode = null;
    if (stage.icon === 'package') icon = <PackageIcon size={20} color={isPast ? '#0D0D12' : '#FFF'} />;
    if (stage.icon === 'truck') icon = <TruckIcon size={20} color={isPast ? '#0D0D12' : '#FFF'} />;
    if (stage.icon === 'check') icon = <CheckIcon size={20} color={isActive ? '#0D0D12' : '#FFF'} />;

    return (
      <View
        key={stage.key}
        style={[
          styles.timelineNode,
          { borderColor: stage.color },
          isActive && { backgroundColor: stage.color, transform: [{ scale: 1.05 }] },
          isPast && { backgroundColor: stage.color },
        ]}
      >
        {icon || <View style={styles.emptyNode} />}
      </View>
    );
  };

  const currentStage = STAGES[stageIndex];

  return (
    <View style={[styles.container, { paddingTop: insets.top + 40 }]}>
      <Text style={styles.title}>Processing Your Order</Text>
      <Text style={styles.subtitle}>Please wait, we are preparing your package</Text>

      <View style={styles.timeline}>
        {STAGES.map((stage, i) => (
          <React.Fragment key={stage.key}>
            {i > 0 && (
              <View style={[styles.timelineLine, { top: 28 }]}>
                <Animated.View
                  style={[
                    styles.timelineLineFill,
                    { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
                  ]}
                />
              </View>
            )}
            <View style={styles.timelineItem}>
              {renderStageIcon(stage)}
              <Text
                style={[
                  styles.timelineLabel,
                  (i === stageIndex || i < stageIndex) && styles.timelineLabelActive,
                ]}
              >
                {stage.label}
              </Text>
            </View>
          </React.Fragment>
        ))}
      </View>

      <Animated.View
        style={[
          styles.stateBox,
          {
            opacity: packAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.85] }),
            transform: [
              { scale: packAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] }) },
              { translateY: floatAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) },
            ],
          },
        ]}
      >
        <View style={[styles.stateIconCircle, { borderColor: currentStage.color }]}>
          {currentStage.icon === 'package' && <PackageIcon size={40} color={currentStage.color} />}
          {currentStage.icon === 'truck' && <TruckIcon size={40} color={currentStage.color} />}
          {currentStage.icon === 'check' && <CheckIcon size={40} color={currentStage.color} />}
        </View>
        <Text style={[styles.stateLabel, { color: currentStage.color }]}>{currentStage.label}</Text>
        <Text style={styles.stateHint}>
          {currentStage.key === 'packing' && 'Your items are being carefully packed in a secure box'}
          {currentStage.key === 'shipping' && 'Package is ready to leave our warehouse'}
          {currentStage.key === 'done' && 'Payment confirmed, tracking available shortly'}
        </Text>
      </Animated.View>

      <View style={styles.progressTrack}>
        <Animated.View style={[styles.progressFill, { width: progress.interpolate({ inputRange: [0, 1], outputRange: ['5%', '95%'] }) }]} />
      </View>

      {orderId ? <Text style={styles.orderId}>Order #{orderId}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12', paddingHorizontal: 24, alignItems: 'center' },
  title: { color: '#FFF', fontSize: 26, fontWeight: 'bold', marginTop: 10 },
  subtitle: { color: '#A0A0A0', fontSize: 15, marginTop: 8, textAlign: 'center' },
  timeline: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', marginTop: 40, position: 'relative' },
  timelineItem: { alignItems: 'center', width: 90 },
  timelineNode: { width: 56, height: 56, borderRadius: 28, borderWidth: 3, backgroundColor: '#18181F', alignItems: 'center', justifyContent: 'center' },
  emptyNode: { width: 0, height: 0 },
  timelineLabel: { color: '#A0A0A0', fontSize: 12, marginTop: 8, textAlign: 'center', fontWeight: '600' },
  timelineLabelActive: { color: '#FFF' },
  timelineLine: { position: 'absolute', left: 45, right: 45, height: 3, backgroundColor: '#2D2D38' },
  timelineLineFill: { height: 3, backgroundColor: '#FF5722' },
  stateBox: { marginTop: 60, alignItems: 'center' },
  stateIconCircle: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, backgroundColor: '#18181F', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  stateLabel: { fontSize: 20, fontWeight: '700' },
  stateHint: { color: '#A0A0A0', fontSize: 14, marginTop: 10, textAlign: 'center' },
  progressTrack: { height: 8, width: '80%', backgroundColor: '#2D2D38', borderRadius: 4, marginTop: 60, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4, backgroundColor: '#FF5722' },
  orderId: { color: '#FFD700', fontSize: 14, fontWeight: '600', marginTop: 24 },
});

export default OrderProcessingScreen;
