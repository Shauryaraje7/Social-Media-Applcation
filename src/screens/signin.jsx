import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLogo from '../components/AppLogo';

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isDarkMode = useColorScheme() === 'dark';

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem('userToken', data.token); // Store the token
        Alert.alert('Success', data.message);
        navigation.navigate('Auth'); // Match the old navigation target
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.log('Fetch error:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode && styles.darkSafeArea]}>
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <AppLogo style={styles.logo} />
        <Text style={[styles.title, isDarkMode && styles.darkTitle]}>SocialConnect</Text>
        <View style={[styles.card, isDarkMode && styles.darkCard]}>
          <Text style={[styles.subtitle, isDarkMode && styles.darkSubtitle]}>Sign In</Text>
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Button title="Sign In" color="#1E90FF" onPress={handleSignIn} />
          <View style={styles.signupContainer}>
            <Text style={[styles.signupText, isDarkMode && styles.darkSignupText]}>Don't have an account? </Text>
            <Text style={[styles.signupLink, isDarkMode && styles.darkSignupLink]} onPress={() => navigation.navigate('SignUp')}>Sign Up</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f4f8' },
  darkSafeArea: { backgroundColor: '#1A1A2E' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#1A1A2E',
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: '#1E90FF',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  darkTitle: {
    color: '#FFD166',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  darkCard: {
    backgroundColor: '#2E2E3A',
  },
  subtitle: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  darkSubtitle: {
    color: '#E8ECEF',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#3A3A50',
    borderColor: '#4A4A60',
    color: '#E8ECEF',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  darkSignupText: {
    color: '#B0B0C0',
  },
  signupLink: {
    fontSize: 14,
    color: '#1E90FF',
    fontWeight: 'bold',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  darkSignupLink: {
    color: '#FFD166',
  },
});

export default SignIn;