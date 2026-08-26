import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { TruckIcon } from './Icons';
import ProgressBar from './ProgressBar';

type DeliveryStatus = 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';

interface DeliveryStatusBannerProps {
  status: DeliveryStatus;
  eta?: string;
  trackingId?: string;
}

const STATUS_CONFIG: Record<DeliveryStatus, { label: string; progress: number; accent: string }> = {
  processing: { label: 'Processing', progress: 15, accent: '#FF5722' },
  shipped: { label: 'Shipped', progress: 45, accent: '#FF5722' },
  out_for_delivery: { label: 'Out for Delivery', progress: 80, accent: '#4ECDC4' },
  delivered: { label: 'Delivered', progress: 100, accent: '#4ECDC4' },
};

const DELIVERY_STEPS: DeliveryStatus[] = ['processing', 'shipped', 'out_for_delivery', 'delivered'];

const PulseIndicator: React.FC<{ color: string }> = ({ color }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.5,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.6,
            duration: 1000,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [pulseAnim, opacityAnim]);

  return (
    <View style={styles.pulseWrapper}>
      <Animated.View
        style={[
          styles.pulseRing,
          { backgroundColor: color, opacity: opacityAnim, transform: [{ scale: pulseAnim }] },
        ]}
      />
      <View style={[styles.pulseDot, { backgroundColor: color }]} />
    </View>
  );
};

const DeliveryStatusBanner: React.FC<DeliveryStatusBannerProps> = ({
  status,
  eta,
  trackingId,
}) => {
  const config = STATUS_CONFIG[status];
  const activeIndex = DELIVERY_STEPS.indexOf(status);
  const isDelivered = status === 'delivered';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconBadge, { backgroundColor: config.accent + '20' }]}>
            <TruckIcon size={20} color={config.accent} />
          </View>
          <View>
            <Text style={styles.statusLabel}>{config.label}</Text>
            {trackingId && <Text style={styles.trackingId}>#{trackingId}</Text>}
          </View>
        </View>
        {activeIndex >= 0 && activeIndex < DELIVERY_STEPS.length - 1 && (
          <PulseIndicator color={config.accent} />
        )}
      </View>

      <View style={styles.progressSection}>
        <ProgressBar progress={config.progress} color={config.accent} height={6} />
      </View>

      <View style={styles.stepsRow}>
        {DELIVERY_STEPS.map((step, index) => {
          const stepConfig = STATUS_CONFIG[step];
          const isCompleted = index < activeIndex;
          const isActive = index === activeIndex;

          return (
            <View key={step} style={styles.stepItem}>
              <View
                style={[
                  styles.stepDot,
                  isCompleted && { backgroundColor: '#4ECDC4' },
                  isActive && { backgroundColor: stepConfig.accent, borderColor: stepConfig.accent },
                  !isCompleted && !isActive && styles.stepDotInactive,
                ]}
              />
              <Text
                style={[
                  styles.stepLabel,
                  isCompleted && styles.stepLabelCompleted,
                  isActive && styles.stepLabelActive,
                ]}
              >
                {stepConfig.label}
              </Text>
            </View>
          );
        })}
      </View>

      {eta && (
        <View style={[styles.etaRow, isDelivered && styles.etaDelivered]}>
          <Text style={[styles.etaText, isDelivered && styles.etaTextDelivered]}>
            {isDelivered ? 'Arrived' : `ETA: ${eta}`}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF',
  },
  trackingId: {
    fontSize: 12,
    color: '#6B6B7B',
    marginTop: 1,
  },
  pulseWrapper: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  pulseDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  progressSection: {
    marginBottom: 14,
  },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2D2D38',
    borderWidth: 2,
    borderColor: '#3D3D48',
    marginBottom: 6,
  },
  stepDotInactive: {},
  stepLabel: {
    fontSize: 10,
    color: '#6B6B7B',
    textAlign: 'center',
  },
  stepLabelCompleted: {
    color: '#4ECDC4',
  },
  stepLabelActive: {
    color: '#FF5722',
    fontWeight: 'bold',
  },
  etaRow: {
    backgroundColor: '#1A1A1F',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  etaDelivered: {
    backgroundColor: '#4ECDC420',
  },
  etaText: {
    fontSize: 13,
    color: '#FF5722',
    fontWeight: '600',
  },
  etaTextDelivered: {
    color: '#4ECDC4',
  },
});

export default DeliveryStatusBanner;
