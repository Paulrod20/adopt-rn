import React, { useRef, useState } from 'react';
import { View, Animated, Dimensions, Modal, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { mockShelters, Shelter } from '../../models/Shelter';
import { mapStyles } from '../../styles/mapStyles';
import ShelterListView from './ShelterListView';
import ShelterDetailView from './ShelterDetailView';
import SettingsView from '../tabs/SettingsView';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SHEET_PEEK = 115;
const SHEET_EXPANDED = SCREEN_HEIGHT * 0.5;

interface Props {
  onSignOut: () => void;
}

export default function MapScreen({ onSignOut }: Props) {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const sheetHeight = useRef(new Animated.Value(SHEET_PEEK)).current;
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const toggleSheet = () => {
    const toValue = isExpanded ? SHEET_PEEK : SHEET_EXPANDED;
    Animated.spring(sheetHeight, {
      toValue,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const handleSelectShelter = (shelter: Shelter) => {
    setSelectedShelter(shelter);
  };

  return (
    <View style={mapStyles.container}>
      <MapView
        style={mapStyles.map}
        initialRegion={{
          latitude: 35.2271,
          longitude: -80.8431,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {mockShelters.map((shelter) => (
          <Marker
            key={shelter.id}
            coordinate={{
              latitude: shelter.latitude,
              longitude: shelter.longitude,
            }}
            title={shelter.name}
            description={shelter.city}
          >
            <View style={mapStyles.pin}>
              <Ionicons name="paw" size={18} color="white" />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Profile button */}
      <TouchableOpacity
        style={[mapStyles.profileButton, { top: insets.top + 12 }]}
        onPress={() => setShowMenu(true)}
      >
        <Ionicons name="person" size={20} color="white" />
      </TouchableOpacity>

      {/* Dropdown menu */}
      <Modal
        visible={showMenu}
        transparent
        animationType="fade"
        onRequestClose={() => setShowMenu(false)}
      >
        <TouchableOpacity
          style={mapStyles.menuOverlay}
          onPress={() => setShowMenu(false)}
        >
          <View style={[mapStyles.menuContainer, { top: insets.top + 62 }]}>
            <TouchableOpacity
              style={mapStyles.menuItem}
              onPress={() => {
                setShowMenu(false);
                setShowSettings(true);
              }}
            >
              <Ionicons name="settings-outline" size={20} color="black" />
              <Text style={mapStyles.menuText}>Settings</Text>
            </TouchableOpacity>

            <View style={mapStyles.menuDivider} />

            <TouchableOpacity
              style={mapStyles.menuItem}
              onPress={() => {
                setShowMenu(false);
                onSignOut();
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="red" />
              <Text style={[mapStyles.menuText, { color: 'red' }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Settings modal */}
      <Modal
        visible={showSettings}
        animationType="slide"
        onRequestClose={() => setShowSettings(false)}
      >
        <SettingsView onSignOut={() => {
          setShowSettings(false);
          onSignOut();
        }} />
      </Modal>

      <Animated.View style={[mapStyles.sheet, { height: sheetHeight, bottom: tabBarHeight }]}>
        <View style={mapStyles.handleContainer} onTouchEnd={toggleSheet}>
          <View style={mapStyles.handle} />
        </View>
        <ShelterListView
          shelters={mockShelters}
          onSelectShelter={handleSelectShelter}
        />
      </Animated.View>

      <Modal
        visible={selectedShelter !== null}
        animationType="slide"
        onRequestClose={() => setSelectedShelter(null)}
      >
        {selectedShelter && (
          <ShelterDetailView
            shelter={selectedShelter}
            onClose={() => setSelectedShelter(null)}
          />
        )}
      </Modal>
    </View>
  );
}
