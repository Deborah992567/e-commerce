import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, Easing, ActivityIndicator } from 'react-native';
import CTAButton from './CTAButton';
import { api } from '../services/api';
import { MailIcon, ShieldIcon } from './Icons';

interface ForgotPasswordScreenProps {
  onBack?: () => void;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const fullTitle = 'Reset Password';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    let index = 0;
    const typewriterInterval = setInterval(() => {
      if (index < fullTitle.length) {
        setDisplayedTitle(fullTitle.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 100);
    return () => clearInterval(typewriterInterval);
  }, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleResetPassword = async () => {
    if (!email.trim()) { Alert.alert('Error', 'Please enter your email'); return; }
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSent(true);
    } catch (e) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.iconRow}>
          <ShieldIcon size={32} color="#FF5722" />
        </View>
        <Text style={styles.title}>{displayedTitle}</Text>
        <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>

        {sent ? (
          <View style={styles.sentBox}>
            <MailIcon size={40} color="#4ECDC4" />
            <Text style={styles.sentTitle}>Check Your Email</Text>
            <Text style={styles.sentText}>We sent a password reset link to {email}</Text>
          </View>
        ) : (
          <>
            <View style={styles.inputWrap}>
              <MailIcon size={18} color="#A0A0A0" />
              <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#A0A0A0" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            </View>
            <CTAButton title="Send Reset Link" onPress={handleResetPassword} color="#FF5722" size="lg" disabled={loading} />
            {loading && (
              <View style={styles.loadingRow}>
                <ActivityIndicator color="#FF5722" />
                <Text style={styles.loadingText}>Sending...</Text>
              </View>
            )}
          </>
        )}

        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.back}>{onBack ? '← Back to Login' : ''}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D0D12', padding: 24 },
  content: { width: '100%', maxWidth: 360, alignItems: 'center' },
  iconRow: { marginBottom: 16, backgroundColor: '#23232B', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#FF572240' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FF5722', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#A0A0A0', marginBottom: 24, textAlign: 'center' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#23232B', borderRadius: 12, paddingHorizontal: 14, marginBottom: 24, borderWidth: 1, borderColor: '#2D2D38', width: '100%' },
  input: { flex: 1, color: 'white', fontSize: 16, paddingVertical: 12, paddingHorizontal: 10 },
  backBtn: { marginTop: 24 },
  back: { color: '#A0A0A0', fontSize: 16, textAlign: 'center' },
  sentBox: { alignItems: 'center', backgroundColor: '#23232B', borderRadius: 16, padding: 24, borderWidth: 1, borderColor: '#4ECDC440', width: '100%', marginBottom: 24 },
  sentTitle: { fontSize: 18, fontWeight: 'bold', color: '#4ECDC4', marginTop: 12 },
  sentText: { fontSize: 14, color: '#A0A0A0', textAlign: 'center', marginTop: 8 },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  loadingText: {
    color: '#A0A0A0',
    fontSize: 13,
  },
});

export default ForgotPasswordScreen;
