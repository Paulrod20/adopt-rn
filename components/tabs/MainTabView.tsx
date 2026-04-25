import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { tabStyles } from '../../styles/tabStyles';

function SheltersScreen() {
  const { View, Text } = require('react-native');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Shelters</Text>
    </View>
  );
}

function FavoritesScreen() {
  const { View, Text } = require('react-native');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Favorites</Text>
    </View>
  );
}

function SettingsScreen() {
  const { View, Text } = require('react-native');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function MainTabView() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...tabStyles,
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, string> = {
            Shelters: 'map',
            Favorites: 'heart',
            Settings: 'settings',
          };
          return (
            <Ionicons
              name={icons[route.name] as any}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Shelters" component={SheltersScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}