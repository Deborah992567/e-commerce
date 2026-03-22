import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CTAButton from './CTAButton';
import { useAuth } from '../contexts/AuthContext';

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
  const fullTitle = 'Welcome Back';
  const { login } = useAuth();

  const helperText = 'Mock login:\n- admin@ecommerce.com / admin123 (admin)\n- user1@ecommerce.com / user123 (customer)\n- user2@ecommerce.com / user123 (customer)';

  useEffect(() => {
    // Typewriter animation
    let index = 0;
    const typewriterInterval = setInterval(() => {
      if (index < fullTitle.length) {
        setDisplayedTitle(fullTitle.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 100); // 100ms per character

    return () => clearInterval(typewriterInterval);
  }, []);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      // Check if admin login by email (since state update is async)
      if (email === 'admin@ecommerce.com') {
        Alert.alert('Admin Login', 'Welcome to the admin dashboard!');
        if (onGoToDashboard) onGoToDashboard();
      } else {
        Alert.alert('Login Success', `Welcome back, ${email}!`);
        // For regular users, you might want to navigate to user dashboard or main app
        if (onGoToProductList) {
          onGoToProductList();
        } else if (onBack) {
          onBack();
        }
      }
    } else {
      Alert.alert('Login Failed', 'Invalid credentials');
    }
  };

  const handleGoogleSignIn = () => {
    // Replace with real Google sign-in logic
    Alert.alert('Google Sign-In', 'Google sign-in pressed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{displayedTitle}</Text>
      <Text style={styles.helper}>{helperText}</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#A0A0A0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#A0A0A0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CTAButton title="Login" onPress={handleLogin} color="#7B1FA2" size="lg" />
      <Text style={styles.or}>or</Text>
      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
        <Text style={styles.googleBtnText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupBtn} onPress={onGoToSignup}>
        <Text style={styles.signupBtnText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotBtn} onPress={onGoToForgot}>
        <Text style={styles.forgotBtnText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.forgot}>{onBack ? '← Back' : ''}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18181F',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#23232B',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  or: {
    color: '#A0A0A0',
    marginVertical: 12,
    fontSize: 14,
  },
  googleBtn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 16,
  },
  googleBtnText: {
    color: '#23232B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupBtn: {
    backgroundColor: '#23232B',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginBottom: 8,
  },
  signupBtnText: {
    color: '#E8C97A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotBtn: {
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  forgotBtnText: {
    color: '#E8C97A',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgot: {
    color: '#E8C97A',
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  helper: {
    textAlign: 'center',
    color: '#B3B3C2',
    marginBottom: 10,
    fontSize: 12,
    lineHeight: 16,
  },
  adminContainer: {
    marginTop: 16,
    marginBottom: 8,
    opacity: 0.7,
  },
  adminBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'center',
  },
  adminBtnText: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default LoginScreen;
