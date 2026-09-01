import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated, Easing, ActivityIndicator } from 'react-native';
import CTAButton from './CTAButton';
import { useAuth } from '../contexts/AuthContext';
import { MailIcon, ShieldIcon, UserIcon, HelpIcon } from './Icons';

interface LoginScreenProps {
  onBack?: () => void;
  onGoToSignup?: () => void;
  onGoToForgot?: () => void;
  onGoToDashboard?: () => void;
  onGoToProductList?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onGoToSignup, onGoToForgot, onGoToDashboard, onGoToProductList }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const fullTitle = 'Welcome Back';
  const { login, isAdmin } = useAuth();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const helperText = 'Sign in to continue to your Dez Collection account';

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

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Login Failed', 'Please enter your email and password');
      return;
    }
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      if (isAdmin) {
        if (onGoToDashboard) onGoToDashboard();
        else if (onBack) onBack();
      } else {
        if (onGoToProductList) onGoToProductList();
        else if (onBack) onBack();
      }
    } else {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  const handleGoogleSignIn = () => {
    Alert.alert('Google Sign-In', 'Google sign-in pressed!');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.iconRow}>
          <ShieldIcon size={32} color="#FF5722" />
        </View>
        <Text style={styles.title}>{displayedTitle}</Text>
        <Text style={styles.helper}>{helperText}</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        <View style={styles.inputWrap}>
          <MailIcon size={18} color="#A0A0A0" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputWrap}>
          <ShieldIcon size={18} color="#A0A0A0" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A0A0A0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <CTAButton title="Login" onPress={handleLogin} color="#FF5722" size="lg" disabled={loading} />
        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="#FF5722" />
            <Text style={styles.loadingText}>Signing you in...</Text>
          </View>
        )}
        <Text style={styles.or}>or</Text>

        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
          <UserIcon size={18} color="#23232B" />
          <Text style={styles.googleBtnText}>Sign in with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupBtn} onPress={onGoToSignup}>
          <Text style={styles.signupBtnText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotBtn} onPress={onGoToForgot}>
          <HelpIcon size={14} color="#FF5722" />
          <Text style={styles.forgotBtnText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.forgot}>{onBack ? '← Back' : ''}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D0D12',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  iconRow: {
    marginBottom: 16,
    backgroundColor: '#23232B',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FF572240',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5722',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 24,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23232B',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2D2D38',
    width: '100%',
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  or: {
    color: '#A0A0A0',
    marginVertical: 12,
    fontSize: 14,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginBottom: 16,
  },
  googleBtnText: {
    color: '#23232B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupBtn: {
    backgroundColor: '#23232B',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FF572240',
  },
  signupBtnText: {
    color: '#FF5722',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'transparent',
    marginBottom: 8,
    marginTop: 4,
  },
  forgotBtnText: {
    color: '#FF5722',
    fontSize: 15,
    fontWeight: 'bold',
  },
  backBtn: {
    marginTop: 12,
  },
  forgot: {
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
  },
  helper: {
    textAlign: 'center',
    color: '#6A6A7A',
    marginBottom: 10,
    fontSize: 11,
    lineHeight: 16,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
  },
  loadingText: {
    color: '#A0A0A0',
    fontSize: 13,
  },
});

export default LoginScreen;
