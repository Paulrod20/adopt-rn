import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { tabStyles } from '../../styles/tabStyles';
import MapScreen from '../map/MapScreen';
import FavoritesView from '../tabs/FavoritesView';
import SettingsView from '../tabs/SettingsView';

interface Props {
  onSignOut: () => void;
}

const Tab = createBottomTabNavigator();

export default function MainTabView({ onSignOut }: Props) {
  function SheltersScreen() {
    return <MapScreen onSignOut={onSignOut} />;
  }

  function FavoritesScreen() {
    return <FavoritesView />;
  }

  function SettingsScreen() {
    return <SettingsView onSignOut={onSignOut} />;
  }

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
