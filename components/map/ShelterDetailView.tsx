import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Shelter } from '../../models/Shelter';
import { Animal } from '../../models/Animal';
import AnimalListView from './AnimalListView';
import { detailStyles } from '../../styles/detailStyles';
import { useFavorites } from '../../services/FavoritesManager';

interface Props {
  shelter: Shelter;
  onClose: () => void;
}

export default function ShelterDetailView({ shelter, onClose }: Props) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(shelter.id);
  const hasAddress = !!shelter.address;
  const hasPhone = !!shelter.phone;
  const [showAnimals, setShowAnimals] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);

  const handleCloseAnimals = () => {
    setShowAnimals(false);
    setSelectedAnimal(null);
  };

  return (
    <View style={detailStyles.container}>
      {/* Header */}
      <View style={detailStyles.header}>
        <TouchableOpacity onPress={onClose} style={detailStyles.closeButton}>
          <Ionicons name="chevron-down" size={24} color="gray" />
        </TouchableOpacity>

        <Text style={detailStyles.title}>{shelter.name}</Text>

        <TouchableOpacity
          style={detailStyles.favoriteButton}
          onPress={() =>
            favorited ? removeFavorite(shelter.id) : addFavorite(shelter)
          }
        >
          <Ionicons
            name={favorited ? 'heart' : 'heart-outline'}
            size={24}
            color={favorited ? 'red' : 'gray'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={detailStyles.content}>
        {/* Paw icon */}
        <View style={detailStyles.iconContainer}>
          <Ionicons name="paw" size={50} color="white" />
        </View>

        {/* Info rows */}
        <View style={detailStyles.infoCard}>
          {hasAddress ? (
            <View style={detailStyles.infoRow}>
              <Ionicons name="location" size={20} color="gray" />
              <Text style={detailStyles.infoText}>{shelter.address}</Text>
            </View>
          ) : null}

          {hasPhone ? (
            <>
              {hasAddress ? <View style={detailStyles.divider} /> : null}
              <View style={detailStyles.infoRow}>
                <Ionicons name="call" size={20} color="gray" />
                <Text style={detailStyles.infoText}>{shelter.phone}</Text>
              </View>
            </>
          ) : null}

          {hasAddress || hasPhone ? <View style={detailStyles.divider} /> : null}

          <View style={detailStyles.infoRow}>
            <Ionicons name="map" size={20} color="gray" />
            <Text style={detailStyles.infoText}>
              {shelter.city}
              {shelter.state ? `, ${shelter.state}` : ''}
            </Text>
          </View>
        </View>

        {/* Visit button */}
        <TouchableOpacity
          style={detailStyles.button}
          onPress={() => setShowAnimals(true)}
        >
          <Text style={detailStyles.buttonText}>View Animals</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showAnimals}
        animationType="slide"
        onRequestClose={handleCloseAnimals}
      >
        <AnimalListView
          shelterId={shelter.id}
          shelterName={shelter.name}
          onSelectAnimal={(animal) => setSelectedAnimal(animal)}
          onClose={handleCloseAnimals}
        />
      </Modal>
    </View>
  );
}