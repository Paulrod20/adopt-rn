import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animal } from '../../models/Animal';
import { animalProfileStyles } from '../../styles/animalProfileStyles';
import { Platform } from 'react-native';

interface Props {
  animal: Animal;
  onClose: () => void;
  onBookAppointment: () => void;
}

export default function AnimalProfileView({ animal, onClose, onBookAppointment }: Props) {
  const insets = useSafeAreaInsets();
  const topPadding = Math.max(insets.top, Platform.OS === 'ios' ? 44 : 12);

  return (
    <View style={animalProfileStyles.container}>
      {/* Header */}
      <View style={[animalProfileStyles.header, { paddingTop: topPadding }]}>
        <TouchableOpacity
          onPress={onClose}
          style={[animalProfileStyles.closeButton, { top: topPadding }]}
        >
          <Ionicons name="chevron-down" size={24} color="gray" />
        </TouchableOpacity>
        <Text style={animalProfileStyles.title}>{animal.name}</Text>
      </View>

      <ScrollView contentContainerStyle={animalProfileStyles.content}>
        {/* Photo */}
        {animal.fullImageUrl ? (
          <Image
            source={{ uri: animal.fullImageUrl }}
            style={animalProfileStyles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={animalProfileStyles.imagePlaceholder}>
            <Ionicons name="paw" size={60} color="white" />
          </View>
        )}

        {/* Info card */}
        <View style={animalProfileStyles.infoCard}>
          <View style={animalProfileStyles.infoRow}>
            <Ionicons name="heart" size={20} color="gray" />
            <Text style={animalProfileStyles.infoText}>{animal.species}</Text>
          </View>

          <View style={animalProfileStyles.divider} />

          <View style={animalProfileStyles.infoRow}>
            <Ionicons name="paw" size={20} color="gray" />
            <Text style={animalProfileStyles.infoText}>{animal.breed}</Text>
          </View>

          <View style={animalProfileStyles.divider} />

          <View style={animalProfileStyles.infoRow}>
            <Ionicons name="calendar" size={20} color="gray" />
            <Text style={animalProfileStyles.infoText}>{animal.age}</Text>
          </View>

          <View style={animalProfileStyles.divider} />

          <View style={animalProfileStyles.infoRow}>
            <Ionicons name="male-female" size={20} color="gray" />
            <Text style={animalProfileStyles.infoText}>{animal.sex}</Text>
          </View>
        </View>

        {/* Description */}
        {animal.description ? (
          <View style={animalProfileStyles.descriptionCard}>
            <Text style={animalProfileStyles.descriptionTitle}>About {animal.name}</Text>
            <Text style={animalProfileStyles.description}>{animal.description}</Text>
          </View>
        ) : null}

        {/* Book Appointment button */}
        <TouchableOpacity
          style={animalProfileStyles.button}
          onPress={onBookAppointment}
        >
          <Text style={animalProfileStyles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
