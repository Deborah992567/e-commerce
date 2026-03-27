import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';

interface UserGamification {
  streakDays: number;
  totalPoints: number;
  unlockedBadges: string[];
  lastLoginDate: string;
}

interface DailyReward {
  day: number;
  points: number;
  claimed: boolean;
}

const DAILY_REWARDS: DailyReward[] = [
  { day: 1, points: 10, claimed: true },
  { day: 2, points: 15, claimed: true },
  { day: 3, points: 20, claimed: true },
  { day: 4, points: 25, claimed: true },
  { day: 5, points: 30, claimed: true },
  { day: 6, points: 40, claimed: false },
  { day: 7, points: 100, claimed: false },
];

interface GamificationPanelProps {
  onClaimReward?: (points: number) => void;
}

const GamificationPanel: React.FC<GamificationPanelProps> = ({ onClaimReward }) => {
  const [gamification, setGamification] = useState<UserGamification>({
    streakDays: 5,
    totalPoints: 1850,
    unlockedBadges: ['first-purchase', 'spender-25k', 'reviewer-5'],
    lastLoginDate: new Date().toISOString().split('T')[0],
  });

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleDayPress = (day: number) => {
    const reward = DAILY_REWARDS.find((r) => r.day === day);
    if (reward && !reward.claimed) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      Alert.alert(
        '🎉 Reward Claimed!',
        `You earned ${reward.points} points!`,
        [
          {
            text: 'Great!',
            onPress: () => {
              setGamification({
                ...gamification,
                totalPoints: gamification.totalPoints + reward.points,
              });
              onClaimReward?.(reward.points);
            },
          },
        ]
      );
    }
  };

  const BADGES = [
    { id: 'first-purchase', emoji: '🛍️', label: 'First Buy', color: '#FF5722' },
    { id: 'spender-25k', emoji: '💰', label: '25K Club', color: '#E8C97A' },
    { id: 'reviewer-5', emoji: '⭐', label: '5-Star Rev', color: '#4ECDC4' },
  ];

  return (
    <View style={styles.gamificationContainer}>
      {/* Streak Section */}
      <View style={styles.streakSection}>
        <View style={styles.streakCard}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <View style={styles.streakContent}>
            <Text style={styles.streakLabel}>Daily Streak</Text>
            <Text style={styles.streakValue}>{gamification.streakDays} Days</Text>
            <Text style={styles.streakSubtext}>Login tomorrow to continue!</Text>
          </View>
        </View>
      </View>

      {/* Points Display */}
      <View style={styles.pointsSection}>
        <View style={styles.pointsCard}>
          <Text style={styles.pointsEmoji}>⭐</Text>
          <Text style={styles.pointsLabel}>Reward Points</Text>
          <Text style={styles.pointsValue}>{gamification.totalPoints}</Text>
          <Text style={styles.pointsSubtext}>Use to unlock deals</Text>
        </View>
      </View>

      {/* Daily Login Rewards */}
      <View style={styles.dailyRewardsSection}>
        <Text style={styles.sectionTitle}>📅 Daily Login Rewards</Text>
        <View style={styles.rewardsGrid}>
          {DAILY_REWARDS.map((reward) => (
            <TouchableOpacity
              key={reward.day}
              style={[
                styles.rewardBox,
                reward.claimed && styles.rewardBoxClaimed,
                !reward.claimed && styles.rewardBoxActive,
              ]}
              onPress={() => handleDayPress(reward.day)}
              disabled={reward.claimed}
            >
              <Text style={styles.rewardDay}>Day {reward.day}</Text>
              <Text style={styles.rewardPoints}>{reward.points}pt</Text>
              {reward.claimed && (
                <View style={styles.claimedCheckmark}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              )}
              {!reward.claimed && (
                <Text style={styles.claimText}>Tap</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Unlocked Badges */}
      <View style={styles.badgesSection}>
        <Text style={styles.sectionTitle}>🏆 Unlocked Badges</Text>
        <View style={styles.badgesContainer}>
          {BADGES.map((badge) => (
            <View
              key={badge.id}
              style={[
                styles.badge,
                gamification.unlockedBadges.includes(badge.id)
                  ? styles.badgeUnlocked
                  : styles.badgeLocked,
              ]}
            >
              <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
              <Text style={styles.badgeLabel}>{badge.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Referral Section */}
      <View style={styles.referralSection}>
        <View style={styles.referralCard}>
          <Text style={styles.referralEmoji}>👥</Text>
          <View style={styles.referralContent}>
            <Text style={styles.referralLabel}>Refer & Earn</Text>
            <Text style={styles.referralSubtext}>Get ₦500 per friend</Text>
          </View>
          <TouchableOpacity style={styles.referralButton}>
            <Text style={styles.referralButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gamificationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  streakSection: {
    width: '100%',
  },
  streakCard: {
    backgroundColor: '#FF5722',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  streakEmoji: {
    fontSize: 48,
  },
  streakContent: {
    flex: 1,
  },
  streakLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.9,
  },
  streakValue: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  streakSubtext: {
    color: '#FFF',
    fontSize: 12,
    opacity: 0.8,
  },
  pointsSection: {
    width: '100%',
  },
  pointsCard: {
    backgroundColor: '#23232B',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E8C97A',
  },
  pointsEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  pointsLabel: {
    color: '#A0A0A0',
    fontSize: 14,
    marginBottom: 8,
  },
  pointsValue: {
    color: '#E8C97A',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pointsSubtext: {
    color: '#808080',
    fontSize: 12,
  },
  dailyRewardsSection: {
    width: '100%',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  rewardBox: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#2D2D38',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D3D48',
  },
  rewardBoxClaimed: {
    backgroundColor: '#1A1A1F',
    borderColor: '#4ECDC4',
    opacity: 0.6,
  },
  rewardBoxActive: {
    backgroundColor: '#23232B',
    borderColor: '#FF5722',
    borderWidth: 2,
  },
  rewardDay: {
    color: '#A0A0A0',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  rewardPoints: {
    color: '#FF5722',
    fontSize: 18,
    fontWeight: 'bold',
  },
  claimedCheckmark: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#0D0D12',
    fontWeight: 'bold',
    fontSize: 12,
  },
  claimText: {
    position: 'absolute',
    bottom: 4,
    fontSize: 10,
    color: '#FF5722',
    fontWeight: '600',
  },
  badgesSection: {
    width: '100%',
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  badge: {
    flex: 1,
    backgroundColor: '#2D2D38',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3D3D48',
  },
  badgeUnlocked: {
    backgroundColor: '#23232B',
    borderColor: '#E8C97A',
    borderWidth: 2,
  },
  badgeLocked: {
    opacity: 0.5,
  },
  badgeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeLabel: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  referralSection: {
    width: '100%',
    marginTop: 8,
  },
  referralCard: {
    backgroundColor: '#4ECDC4',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  referralEmoji: {
    fontSize: 40,
  },
  referralContent: {
    flex: 1,
  },
  referralLabel: {
    color: '#0D0D12',
    fontSize: 16,
    fontWeight: 'bold',
  },
  referralSubtext: {
    color: '#0D0D12',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
  },
  referralButton: {
    backgroundColor: '#0D0D12',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  referralButtonText: {
    color: '#4ECDC4',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default GamificationPanel;
