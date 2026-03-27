import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput, Share, Clipboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ReferralScreenProps {
  onBack?: () => void;
}

interface Referral {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'completed';
  reward: number;
  date: string;
}

const ReferralScreen: React.FC<ReferralScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [referrals, setReferrals] = useState<Referral[]>([
    { id: '1', name: 'Sarah M.', email: 'sarah@example.com', status: 'completed', reward: 500, date: '2026-03-15' },
    { id: '2', name: 'John D.', email: 'john@example.com', status: 'completed', reward: 500, date: '2026-03-10' },
    { id: '3', name: 'Emma W.', email: 'emma@example.com', status: 'pending', reward: 500, date: '2026-03-25' },
  ]);

  const [referralCode] = useState('DEZ2026PROMO');
  const [totalEarned] = useState(1500);
  const [pendingEarnings] = useState(500);

  const handleCopyCode = () => {
    Clipboard.setString(referralCode);
    Alert.alert('Copied!', 'Referral code copied to clipboard');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Join Dez Collection and get ₦500 bonus! Use my referral code: ${referralCode}. Download now and shop luxury deals! 🛍️`,
        title: 'Refer & Earn with Dez Collection',
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handleShareWhatsApp = () => {
    const message = `Join Dez Collection and get ₦500 bonus! Use my referral code: ${referralCode}. Shop luxury deals! 🛍️`;
    Alert.alert('Share on WhatsApp', message, [
      { text: 'Copy Message', onPress: () => {
        Clipboard.setString(message);
        Alert.alert('Copied!', 'Message copied to clipboard');
      }},
      { text: 'Close', style: 'cancel' }
    ]);
  };

  const handleShareInstagram = () => {
    Alert.alert('Share on Instagram', 'Open Instagram and share your referral code in your story or DM!\n\nCode: ' + referralCode, [
      { text: 'Copy Code', onPress: () => {
        Clipboard.setString(referralCode);
        Alert.alert('Copied!', 'Referral code copied');
      }},
      { text: 'Close', style: 'cancel' }
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>👥 Refer & Earn</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Referral Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Total Earned</Text>
            <Text style={styles.statValue}>₦{totalEarned}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Pending</Text>
            <Text style={styles.statValue}>₦{pendingEarnings}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Friends</Text>
            <Text style={styles.statValue}>{referrals.length}</Text>
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 How It Works</Text>
          <View style={styles.stepContainer}>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Share your referral code with friends</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>They sign up using your code</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>They make first purchase</Text>
            </View>
            <View style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>4</Text>
              </View>
              <Text style={styles.stepText}>You earn ₦500 bonus!</Text>
            </View>
          </View>
        </View>

        {/* Your Referral Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎟️ Your Referral Code</Text>
          <View style={styles.codeContainer}>
            <Text style={styles.codeText}>{referralCode}</Text>
            <TouchableOpacity style={styles.copyBtn} onPress={handleCopyCode}>
              <Text style={styles.copyBtnText}>📋 Copy</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Share Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📤 Share With Friends</Text>
          <View style={styles.shareButtonsContainer}>
            <TouchableOpacity style={[styles.shareBtn, styles.shareBtnGeneral]} onPress={handleShare}>
              <Text style={styles.shareBtnEmoji}>📱</Text>
              <Text style={styles.shareBtnText}>General</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shareBtn, styles.shareBtnWhatsApp]} onPress={handleShareWhatsApp}>
              <Text style={styles.shareBtnEmoji}>💬</Text>
              <Text style={styles.shareBtnText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shareBtn, styles.shareBtnInstagram]} onPress={handleShareInstagram}>
              <Text style={styles.shareBtnEmoji}>📸</Text>
              <Text style={styles.shareBtnText}>Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Referral History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Referral History</Text>
          {referrals.map((referral) => (
            <View key={referral.id} style={styles.referralItem}>
              <View style={styles.referralInfo}>
                <Text style={styles.referralName}>{referral.name}</Text>
                <Text style={styles.referralEmail}>{referral.email}</Text>
                <Text style={styles.referralDate}>{new Date(referral.date).toLocaleDateString()}</Text>
              </View>
              <View style={styles.referralStatus}>
                <View style={[
                  styles.statusBadge,
                  referral.status === 'completed' ? styles.statusCompleted : styles.statusPending
                ]}>
                  <Text style={styles.statusText}>
                    {referral.status === 'completed' ? '✓ Completed' : '⏳ Pending'}
                  </Text>
                </View>
                <Text style={styles.referralReward}>+₦{referral.reward}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Bonus Tiers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎁 Bonus Tiers</Text>
          <View style={styles.tierContainer}>
            <View style={styles.tier}>
              <Text style={styles.tierLevel}>🥉 Bronze</Text>
              <Text style={styles.tierDesc}>5 referrals</Text>
              <Text style={styles.tierBonus}>+₦1,000 bonus</Text>
            </View>
            <View style={styles.tier}>
              <Text style={styles.tierLevel}>🥈 Silver</Text>
              <Text style={styles.tierDesc}>10 referrals</Text>
              <Text style={styles.tierBonus}>+₦3,000 bonus</Text>
            </View>
            <View style={styles.tier}>
              <Text style={styles.tierLevel}>🥇 Gold</Text>
              <Text style={styles.tierDesc}>20 referrals</Text>
              <Text style={styles.tierBonus}>+₦7,000 bonus</Text>
            </View>
          </View>
        </View>

        {/* Terms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Terms & Conditions</Text>
          <Text style={styles.termsText}>
            • Referral rewards are credited after referred friend completes first purchase{'\n'}
            • Maximum ₦10,000 earning per month{'\n'}
            • Cannot refer yourself{'\n'}
            • Rewards valid for 90 days from issue date{'\n'}
            • Bonus tiers reset monthly
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D12' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 14, marginBottom: 20 },
  title: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  scrollContainer: { flex: 1, paddingHorizontal: 14 },
  
  // Stats
  statsContainer: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  statCard: { flex: 1, backgroundColor: '#23232B', borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#E8C97A' },
  statLabel: { color: '#A0A0A0', fontSize: 12, marginBottom: 8 },
  statValue: { color: '#FF5722', fontSize: 20, fontWeight: 'bold' },

  // Sections
  section: { marginBottom: 24 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: '600', marginBottom: 12 },

  // Steps
  stepContainer: { gap: 12 },
  step: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#18181F', borderRadius: 10, padding: 12 },
  stepNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FF5722', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  stepNumberText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  stepText: { color: '#A0A0A0', fontSize: 14, flex: 1 },

  // Code
  codeContainer: { flexDirection: 'row', backgroundColor: '#18181F', borderRadius: 12, padding: 16, alignItems: 'center', borderWidth: 2, borderColor: '#E8C97A', justifyContent: 'space-between' },
  codeText: { color: '#FFF', fontSize: 18, fontWeight: 'bold', letterSpacing: 2 },
  copyBtn: { backgroundColor: '#FF5722', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8 },
  copyBtnText: { color: '#FFF', fontWeight: '600', fontSize: 12 },

  // Share Buttons
  shareButtonsContainer: { flexDirection: 'row', gap: 12, justifyContent: 'space-between' },
  shareBtn: { flex: 1, alignItems: 'center', borderRadius: 12, paddingVertical: 16, borderWidth: 2 },
  shareBtnGeneral: { backgroundColor: '#23232B', borderColor: '#FF5722' },
  shareBtnWhatsApp: { backgroundColor: '#23232B', borderColor: '#34A853' },
  shareBtnInstagram: { backgroundColor: '#23232B', borderColor: '#E1306C' },
  shareBtnEmoji: { fontSize: 24, marginBottom: 4 },
  shareBtnText: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  // Referral Items
  referralItem: { flexDirection: 'row', backgroundColor: '#18181F', borderRadius: 10, padding: 12, marginBottom: 10, justifyContent: 'space-between', alignItems: 'center' },
  referralInfo: { flex: 1 },
  referralName: { color: '#FFF', fontSize: 14, fontWeight: '600', marginBottom: 2 },
  referralEmail: { color: '#A0A0A0', fontSize: 12, marginBottom: 4 },
  referralDate: { color: '#808080', fontSize: 11 },
  referralStatus: { alignItems: 'flex-end' },
  statusBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, marginBottom: 6 },
  statusCompleted: { backgroundColor: '#34A853' },
  statusPending: { backgroundColor: '#FFA500' },
  statusText: { color: '#FFF', fontSize: 11, fontWeight: '600' },
  referralReward: { color: '#FF5722', fontWeight: 'bold', fontSize: 14 },

  // Tiers
  tierContainer: { flexDirection: 'row', gap: 12 },
  tier: { flex: 1, backgroundColor: '#18181F', borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#2D2D38' },
  tierLevel: { fontSize: 16, fontWeight: 'bold', marginBottom: 6, textAlign: 'center' },
  tierDesc: { color: '#A0A0A0', fontSize: 12, marginBottom: 8, textAlign: 'center' },
  tierBonus: { color: '#34A853', fontWeight: '600', fontSize: 12, textAlign: 'center' },

  // Terms
  termsText: { color: '#A0A0A0', fontSize: 13, lineHeight: 20, backgroundColor: '#18181F', borderRadius: 10, padding: 12 },
});

export default ReferralScreen;
