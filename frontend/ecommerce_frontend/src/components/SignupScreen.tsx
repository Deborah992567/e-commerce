import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, Easing } from 'react-native';
import CTAButton from './CTAButton';
import { UserIcon, MailIcon, ShieldIcon, HelpIcon } from './Icons';

interface SignupScreenProps {
  onBack?: () => void;
  onGoToLogin?: () => void;
  onGoToProductList?: () => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ onBack, onGoToLogin, onGoToProductList }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const fullTitle = 'Create Account';
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

  const handleSignup = () => {
    if (!name.trim()) { Alert.alert('Error', 'Please enter your full name'); return; }
    if (!email.trim()) { Alert.alert('Error', 'Please enter your email address'); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { Alert.alert('Error', 'Please enter a valid email address'); return; }
    if (!password.trim()) { Alert.alert('Error', 'Please enter a password'); return; }
    if (password.length < 6) { Alert.alert('Error', 'Password must be at least 6 characters'); return; }
    if (!confirmPassword.trim()) { Alert.alert('Error', 'Please confirm your password'); return; }
    if (password !== confirmPassword) { Alert.alert('Error', 'Passwords do not match!'); return; }
    Alert.alert('Signup Successful', `Welcome, ${name}!`);
    if (onGoToProductList) onGoToProductList();
    else if (onBack) onBack();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.iconRow}>
          <UserIcon size={32} color="#FF5722" />
        </View>
        <Text style={styles.title}>{displayedTitle}</Text>
        <Text style={styles.subtitle}>Join us today</Text>

        <View style={styles.inputWrap}>
          <UserIcon size={18} color="#A0A0A0" />
          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#A0A0A0" value={name} onChangeText={setName} autoCapitalize="words" />
        </View>
        <View style={styles.inputWrap}>
          <MailIcon size={18} color="#A0A0A0" />
          <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#A0A0A0" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        </View>
        <View style={styles.inputWrap}>
          <ShieldIcon size={18} color="#A0A0A0" />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#A0A0A0" value={password} onChangeText={setPassword} secureTextEntry />
        </View>
        <View style={styles.inputWrap}>
          <ShieldIcon size={18} color="#A0A0A0" />
          <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#A0A0A0" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
        </View>

        <CTAButton title="Sign Up" onPress={handleSignup} color="#FF5722" size="lg" />
        <Text style={styles.or}>or</Text>

        <TouchableOpacity style={styles.googleBtn} onPress={() => Alert.alert('Google Sign-In', 'Google sign-in pressed!')}>
          <UserIcon size={18} color="#23232B" />
          <Text style={styles.googleBtnText}>Sign up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={onGoToLogin}>
          <Text style={styles.loginBtnText}>Already have an account? Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.back}>{onBack ? '← Back' : ''}</Text>
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
  subtitle: { fontSize: 16, color: '#A0A0A0', marginBottom: 24 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#23232B', borderRadius: 12, paddingHorizontal: 14, marginBottom: 14, borderWidth: 1, borderColor: '#2D2D38', width: '100%' },
  input: { flex: 1, color: 'white', fontSize: 16, paddingVertical: 12, paddingHorizontal: 10 },
  or: { color: '#A0A0A0', marginVertical: 12, fontSize: 14 },
  googleBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14, marginBottom: 16 },
  googleBtnText: { color: '#23232B', fontWeight: 'bold', fontSize: 16 },
  loginBtn: { backgroundColor: 'transparent', marginBottom: 8, marginTop: 4 },
  loginBtnText: { color: '#FF5722', fontSize: 15, fontWeight: 'bold', textAlign: 'center' },
  backBtn: { marginTop: 12 },
  back: { color: '#A0A0A0', fontSize: 14, textAlign: 'center' },
});

export default SignupScreen;
