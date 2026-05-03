import React, { useRef, useState, useEffect } from 'react';
import { View, Animated, Dimensions, Modal, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shelter } from '../../models/Shelter';
import {
  fetchShelters,
  getDistanceMiles,
  mapRGShelterToShelter,
  RGShelter,
} from '../../services/RescueGroupsService';
import { mapStyles } from '../../styles/mapStyles';
import ShelterListView from './ShelterListView';
import ShelterDetailView from './ShelterDetailView';
import SettingsView from '../tabs/SettingsView';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SHEET_PEEK = 115;
const SHEET_EXPANDED = SCREEN_HEIGHT * 0.5;
const MAX_DISTANCE_MILES = 50;
const API_PAGE_SIZE = 250;
const MIN_NEARBY_RESULTS = 5;

const DEFAULT_REGION = {
  latitude: 35.2271,
  longitude: -80.8431,
  latitudeDelta: 0.15,
  longitudeDelta: 0.15,
};

const hasCoordinates = (s: RGShelter) => {
  const lat = s.attributes.lat ?? s.attributes.latitude;
  const lon = s.attributes.lon ?? s.attributes.longitude;
  return lat != null && lon != null;
};

const mapValidShelters = (items: RGShelter[]) =>
  items.filter(hasCoordinates).map(mapRGShelterToShelter);

const dedupeShelters = (items: Shelter[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

export default function MapScreen({ onSignOut }: { onSignOut: () => void }) {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView | null>(null);
  const sheetHeight = useRef(new Animated.Value(SHEET_PEEK)).current;

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [shelters, setShelters] = useState<Shelter[]>([]);

  useEffect(() => {
    loadShelters();
  }, []);

  const loadShelters = async () => {
    let postalCode = '28201';
    let userLatitude: number | null = null;
    let userLongitude: number | null = null;

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const pos = await Location.getCurrentPositionAsync({});
        userLatitude = pos.coords.latitude;
        userLongitude = pos.coords.longitude;

        mapRef.current?.animateToRegion({
          latitude: userLatitude,
          longitude: userLongitude,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15,
        }, 400);

        const geocode = await Location.reverseGeocodeAsync({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        if (geocode[0]?.postalCode) postalCode = geocode[0].postalCode;
      }
    } catch (error) {
      console.error('Location failed, using Charlotte fallback:', error);
    }

    const pageOneShelters = await fetchShelters(postalCode, {
      limit: API_PAGE_SIZE,
      page: 1,
      distance: MAX_DISTANCE_MILES,
    });

    let mapped = mapValidShelters(pageOneShelters);

    if (userLatitude != null && userLongitude != null) {
      let nearby = mapped.filter(
        (shelter) =>
          getDistanceMiles(
            userLatitude,
            userLongitude,
            shelter.latitude,
            shelter.longitude
          ) <= MAX_DISTANCE_MILES
      );

      // Backup 1: if first page is sparse, sample one more page before falling back.
      if (nearby.length < MIN_NEARBY_RESULTS) {
        const pageTwoShelters = await fetchShelters(postalCode, {
          limit: API_PAGE_SIZE,
          page: 2,
          distance: MAX_DISTANCE_MILES,
        });

        const combined = dedupeShelters([
          ...mapped,
          ...mapValidShelters(pageTwoShelters),
        ]);

        nearby = combined.filter(
          (shelter) =>
            getDistanceMiles(
              userLatitude as number,
              userLongitude as number,
              shelter.latitude,
              shelter.longitude
            ) <= MAX_DISTANCE_MILES
        );

        mapped = combined;
      }

      if (nearby.length > 0) {
        mapped = nearby;
      } else {
        // Backup 2: present the closest available options from fetched data.
        mapped = mapped
          .slice()
          .sort(
            (a, b) =>
              getDistanceMiles(userLatitude, userLongitude, a.latitude, a.longitude) -
              getDistanceMiles(userLatitude, userLongitude, b.latitude, b.longitude)
          )
          .slice(0, 25);
      }
    }

    if (mapped.length === 0) {
      const fallback = await fetchShelters('28201', {
        limit: API_PAGE_SIZE,
        page: 1,
        distance: MAX_DISTANCE_MILES,
      });
      mapped = mapValidShelters(fallback);
    }

    setShelters(mapped);
  };

  const toggleSheet = () => {
    const toValue = isExpanded ? SHEET_PEEK : SHEET_EXPANDED;
    Animated.spring(sheetHeight, { toValue, useNativeDriver: false }).start();
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={mapStyles.container}>
      <MapView
        ref={(ref) => { mapRef.current = ref; }}
        style={mapStyles.map}
        initialRegion={DEFAULT_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {shelters.map((shelter) => (
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

      <TouchableOpacity
        style={[mapStyles.profileButton, { top: insets.top + 12 }]}
        onPress={() => setShowMenu(true)}
      >
        <Ionicons name="person" size={20} color="white" />
      </TouchableOpacity>

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

      <Animated.View style={[mapStyles.sheet, { height: sheetHeight }]}>
        <View style={mapStyles.handleContainer} onTouchEnd={toggleSheet}>
          <View style={mapStyles.handle} />
        </View>
        <ShelterListView
          shelters={shelters}
          onSelectShelter={setSelectedShelter}
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
