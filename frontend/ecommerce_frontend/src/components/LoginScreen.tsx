import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Animated } from 'react-native';
import CTAButton from './CTAButton';

interface LoginScreenProps {
  onBack?: () => void;
  onGoToSignup?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onGoToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayedTitle, setDisplayedTitle] = useState('');
  const slideAnim = useRef(new Animated.Value(300)).current; // Start off-screen to the right
  const fullTitle = 'Welcome Back';

  useEffect(() => {
    // Slide-in animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();

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

  const handleLogin = () => {
    // Replace with real authentication logic
    Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
  };

  const handleGoogleSignIn = () => {
    // Replace with real Google sign-in logic
    Alert.alert('Google Sign-In', 'Google sign-in pressed!');
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Text style={styles.title}>{displayedTitle}</Text>
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
      <TouchableOpacity style={styles.forgotBtn} onPress={() => Alert.alert('Forgot Password', 'Forgot password pressed!')}>
        <Text style={styles.forgotBtnText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.forgot}>{onBack ? '← Back' : ''}</Text>
      </TouchableOpacity>
    </Animated.View>
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
});

export default LoginScreen;
