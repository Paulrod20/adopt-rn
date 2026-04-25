import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginView from './components/auth/LoginView';
import SignUpView from './components/auth/SignUpView';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login">
          {(props) => (
            <LoginView
              onLogin={() => setIsAuthenticated(true)}
              onNavigateToSignUp={() => props.navigation.navigate('SignUp')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="SignUp">
          {(props) => (
            <SignUpView
              onSignUp={() => setIsAuthenticated(true)}
              onNavigateToLogin={() => props.navigation.goBack()}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
