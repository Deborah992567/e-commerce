import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { CheckIcon } from './Icons';
import FadeInView from './FadeInView';

interface StatusStep {
  label: string;
  date: string;
  completed: boolean;
  active: boolean;
}

interface StatusTimelineProps {
  steps: StatusStep[];
}

const ActiveDot: React.FC = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rippleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(rippleAnim, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(rippleAnim, {
            toValue: 0.3,
            duration: 800,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  }, [pulseAnim, rippleAnim]);

  return (
    <View style={styles.activeDotWrapper}>
      <Animated.View
        style={[
          styles.ripple,
          { opacity: rippleAnim, transform: [{ scale: pulseAnim }] },
        ]}
      />
      <Animated.View
        style={[
          styles.activeDot,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />
    </View>
  );
};

const StatusTimeline: React.FC<StatusTimelineProps> = ({ steps }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <FadeInView
            key={index}
            delay={index * 120}
            duration={500}
            direction="up"
            distance={20}
          >
            <View style={styles.stepRow}>
              <View style={styles.dotColumn}>
                {step.completed ? (
                  <View style={styles.completedDot}>
                    <CheckIcon size={12} color="#0D0D12" />
                  </View>
                ) : step.active ? (
                  <ActiveDot />
                ) : (
                  <View style={styles.pendingDot} />
                )}
                {!isLast && (
                  <View
                    style={[
                      styles.connector,
                      step.completed
                        ? styles.connectorCompleted
                        : styles.connectorPending,
                    ]}
                  />
                )}
              </View>
              <View style={[styles.content, isLast && styles.lastContent]}>
                <Text
                  style={[
                    styles.label,
                    step.completed && styles.labelCompleted,
                    step.active && styles.labelActive,
                    !step.completed && !step.active && styles.labelPending,
                  ]}
                >
                  {step.label}
                </Text>
                <Text style={styles.date}>{step.date}</Text>
              </View>
            </View>
          </FadeInView>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D0D12',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2D2D38',
  },
  stepRow: {
    flexDirection: 'row',
  },
  dotColumn: {
    alignItems: 'center',
    width: 32,
  },
  completedDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4ECDC4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDotWrapper: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF5722',
  },
  activeDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF5722',
  },
  pendingDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2D2D38',
    borderWidth: 2,
    borderColor: '#3D3D48',
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 32,
  },
  connectorCompleted: {
    backgroundColor: '#4ECDC4',
  },
  connectorPending: {
    backgroundColor: '#2D2D38',
  },
  content: {
    flex: 1,
    paddingBottom: 24,
    marginLeft: 12,
  },
  lastContent: {
    paddingBottom: 0,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  labelCompleted: {
    color: '#4ECDC4',
  },
  labelActive: {
    color: '#FF5722',
  },
  labelPending: {
    color: '#6B6B7B',
  },
  date: {
    fontSize: 12,
    color: '#6B6B7B',
  },
});

export default StatusTimeline;
