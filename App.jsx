import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './src/screens/signin';
import SignUp from './src/screens/signup';
import Home from './src/screens/Home';
import MainPanel from './src/screens/MainPanel';
import Profile from './src/screens/Profile';
import Search from './src/screens/Search';
import Posts from './src/screens/Posts';
import Svg, { Path } from 'react-native-svg';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          if (route.name === 'Home') {
            icon = (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <Path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M9 22V12H15V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            );
          } else if (route.name === 'Profile') {
            icon = (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <Path d="M17 8.5C17 5.73858 14.7614 3.5 12 3.5C9.23858 3.5 7 5.73858 7 8.5C7 11.2614 9.23858 13.5 12 13.5C14.7614 13.5 17 11.2614 17 8.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M19 20.5C19 16.634 15.866 13.5 12 13.5C8.13401 13.5 5 16.634 5 20.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            );
          } else if (route.name === 'Search') {
            icon = (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <Path d="M15.5 15.5L19 19" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M10 16.5C13.3137 16.5 16 13.8137 16 10.5C16 7.18629 13.3137 4.5 10 4.5C6.68629 4.5 4 7.18629 4 10.5C4 13.8137 6.68629 16.5 10 16.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            );
          } else if (route.name === 'Posts') {
            icon = (
              <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                <Path d="M4 7C4 6.44772 4.44772 6 5 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H5C4.44772 18 4 17.5523 4 17V7Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H10C9.44772 11 9 10.5523 9 10Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            );
          }
          return icon;
        },
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: '#666',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MainPanel" component={MainPanel} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

// Stack Navigator for Auth Flow
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={TabNavigator} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;