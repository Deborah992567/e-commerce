import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StarIcon } from './Icons';
import ProgressBar from './ProgressBar';

interface RatingBarProps {
  stars: number;
  count: number;
  total: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ stars, count, total }) => {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.starLabel}>
        <StarIcon size={16} color="#FFD700" filled />
        <Text style={styles.starText}>{stars}</Text>
      </View>
      <View style={styles.barContainer}>
        <ProgressBar
          progress={percentage}
          color="#FF5722"
          height={8}
          animated
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.countText}>{count}</Text>
        <Text style={styles.percentText}>{percentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0D0D12',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 6,
  },
  starLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 36,
    gap: 4,
  },
  starText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
  },
  barContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 70,
    justifyContent: 'flex-end',
    gap: 8,
  },
  countText: {
    color: '#888',
    fontSize: 13,
  },
  percentText: {
    color: '#555',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default RatingBar;
