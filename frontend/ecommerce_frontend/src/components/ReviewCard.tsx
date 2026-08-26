import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AnimatedAvatar from './AnimatedAvatar';
import AnimatedCard from './AnimatedCard';
import { StarIcon, HeartIcon, CheckIcon } from './Icons';

interface ReviewCardProps {
  author: string;
  avatarUri?: string;
  rating: number;
  content: string;
  date: string;
  helpfulCount: number;
  verified?: boolean;
  delay?: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  author,
  avatarUri,
  rating,
  content,
  date,
  helpfulCount,
  verified = false,
  delay = 0,
}) => {
  const [helpful, setHelpful] = useState(false);
  const [count, setCount] = useState(helpfulCount);

  const handleHelpful = () => {
    if (helpful) {
      setCount((c) => c - 1);
    } else {
      setCount((c) => c + 1);
    }
    setHelpful((h) => !h);
  };

  return (
    <AnimatedCard delay={delay} style={styles.card}>
      <View style={styles.header}>
        <AnimatedAvatar uri={avatarUri} size={40} borderColor="#FF5722" />
        <View style={styles.authorInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.authorName}>{author}</Text>
            {verified && (
              <View style={styles.verifiedRow}>
                <CheckIcon size={14} color="#4CAF50" />
                <Text style={styles.verifiedBadge}>Verified</Text>
              </View>
            )}
          </View>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            size={16}
            color={star <= rating ? '#FFD700' : '#3A3A48'}
            filled={star <= rating}
          />
        ))}
      </View>

      <Text style={styles.content}>{content}</Text>

      <TouchableOpacity style={styles.helpfulBtn} onPress={handleHelpful}>
        <HeartIcon size={16} color={helpful ? '#FF5722' : '#707080'} filled={helpful} />
        <Text style={[styles.helpfulText, helpful && styles.helpfulTextActive]}>
          Helpful ({count})
        </Text>
      </TouchableOpacity>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  authorInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedBadge: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    color: '#707080',
    fontSize: 12,
    marginTop: 2,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 10,
  },
  content: {
    color: '#A0A0B0',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  helpfulBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#302926',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 6,
  },
  helpfulText: {
    color: '#707080',
    fontSize: 12,
    fontWeight: '600',
  },
  helpfulTextActive: {
    color: '#FF5722',
  },
});

export default ReviewCard;
