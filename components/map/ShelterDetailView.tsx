import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Shelter } from '../../models/Shelter';
import { detailStyles } from '../../styles/detailStyles';

interface Props {
  shelter: Shelter;
  onClose: () => void;
}

export default function ShelterDetailView({ shelter, onClose }: Props) {
  return (
    <View style={detailStyles.container}>
      {/* Header */}
      <View style={detailStyles.header}>
        <TouchableOpacity onPress={onClose} style={detailStyles.closeButton}>
          <Ionicons name="chevron-down" size={24} color="gray" />
        </TouchableOpacity>
        <Text style={detailStyles.title}>{shelter.name}</Text>
      </View>

      <ScrollView contentContainerStyle={detailStyles.content}>
        {/* Paw icon */}
        <View style={detailStyles.iconContainer}>
          <Ionicons name="paw" size={50} color="white" />
        </View>

        {/* Info rows */}
        <View style={detailStyles.infoCard}>
          <View style={detailStyles.infoRow}>
            <Ionicons name="location" size={20} color="gray" />
            <Text style={detailStyles.infoText}>{shelter.address}</Text>
          </View>

          <View style={detailStyles.divider} />

          <View style={detailStyles.infoRow}>
            <Ionicons name="call" size={20} color="gray" />
            <Text style={detailStyles.infoText}>{shelter.phone}</Text>
          </View>

          <View style={detailStyles.divider} />

          <View style={detailStyles.infoRow}>
            <Ionicons name="map" size={20} color="gray" />
            <Text style={detailStyles.infoText}>{shelter.city}</Text>
          </View>
        </View>

        {/* Visit button */}
        <TouchableOpacity style={detailStyles.button}>
          <Text style={detailStyles.buttonText}>View Animals</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
