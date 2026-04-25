import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { mockShelters } from '../../models/Shelter';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { mapStyles } from '../../styles/mapStyles';

export default function MapScreen() { 
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
                        {/* Custom marker */}
                        <View style={mapStyles.pin}>
                        <Ionicons name="paw" size={18} color="white" />
                        </View>
                    </Marker>
                    ))}
            </MapView>
        </View>
    );
}
