import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const MainPanel = ({ navigation: tabNavigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    // Use root navigation ref to reset
    tabNavigation.getParent().reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
    Alert.alert('Success', 'Logged out successfully');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Button title="Logout" color="#1E90FF" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f0f4f8' },
  title: { fontSize: 24, color: '#1E90FF', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});

export default MainPanel;