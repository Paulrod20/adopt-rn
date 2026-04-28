import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FavoritesProvider } from './services/FavoritesManager';
import LoginView from './components/auth/LoginView';
import SignUpView from './components/auth/SignUpView';
import MainTabView from './components/tabs/MainTabView';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <FavoritesProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          {isAuthenticated ? (
            <MainTabView />
          ) : (
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
          )}
        </NavigationContainer>
      </GestureHandlerRootView>
    </FavoritesProvider>
  );
}