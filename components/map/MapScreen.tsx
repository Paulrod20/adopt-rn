import React, { useRef, useState } from 'react';
import { View, Animated, Dimensions, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { mockShelters, Shelter } from '../../models/Shelter';
import { mapStyles } from '../../styles/mapStyles';
import ShelterListView from './ShelterListView';
import ShelterDetailView from './ShelterDetailView';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SHEET_PEEK = 115;
const SHEET_EXPANDED = SCREEN_HEIGHT * 0.5;

export default function MapScreen() {
  const sheetHeight = useRef(new Animated.Value(SHEET_PEEK)).current;
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);

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

      <Animated.View style={[mapStyles.sheet, { height: sheetHeight }]}>
        <View style={mapStyles.handleContainer} onTouchEnd={toggleSheet}>
          <View style={mapStyles.handle} />
        </View>
        <ShelterListView
          shelters={mockShelters}
          onSelectShelter={handleSelectShelter}
        />
      </Animated.View>

      {/* Modal slides up when a shelter is tapped — like .sheet in SwiftUI */}
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
