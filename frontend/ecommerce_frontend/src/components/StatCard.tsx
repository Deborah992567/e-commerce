import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AnimatedCard from './AnimatedCard';
import CounterAnimation from './CounterAnimation';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  trend?: {
    direction: 'up' | 'down';
    percentage: number;
  };
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, prefix = '', suffix = '', trend, delay = 0 }) => {
  return (
    <AnimatedCard delay={delay} style={styles.card}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
      <CounterAnimation
        from={0}
        to={value}
        prefix={prefix}
        suffix={suffix}
        style={styles.value}
      />
      {trend && (
        <View style={styles.trendRow}>
          <Text
            style={[
              styles.trendArrow,
              trend.direction === 'up' ? styles.trendPositive : styles.trendNegative,
            ]}
          >
            {trend.direction === 'up' ? '\u2191' : '\u2193'}
          </Text>
          <Text
            style={[
              styles.trendPercentage,
              trend.direction === 'up' ? styles.trendPositive : styles.trendNegative,
            ]}
          >
            {trend.percentage}%
          </Text>
        </View>
      )}
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF572230',
  },
  iconContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: '#A0A0A0',
    marginBottom: 6,
    fontWeight: '500',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trendArrow: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  trendPercentage: {
    fontSize: 13,
    fontWeight: '600',
  },
  trendPositive: {
    color: '#4ECDC4',
  },
  trendNegative: {
    color: '#FF2D55',
  },
});

export default StatCard;
