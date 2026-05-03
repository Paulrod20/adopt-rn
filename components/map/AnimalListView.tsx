import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animal } from '../../models/Animal';
import { fetchAnimals, mapRGAnimalToAnimal } from '../../services/RescueGroupsService';
import { animalListStyles } from '../../styles/animalListStyles';

interface Props {
  shelterId: string;
  shelterName: string;
  onSelectAnimal: (animal: Animal) => void;
  onClose: () => void;
}

export default function AnimalListView({ shelterId, shelterName, onSelectAnimal, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  const headerTopInset =
    Platform.OS === 'ios' ? Math.max(insets.top, 44) : Math.max(insets.top, 12);

  useEffect(() => {
    loadAnimals();
  }, []);

  const loadAnimals = async () => {
    try {
      const raw = await fetchAnimals(shelterId);
      const mapped = raw.map((a) => mapRGAnimalToAnimal(a, shelterId));
      setAnimals(mapped);
    } catch (error) {
      console.error('Error loading animals:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={animalListStyles.container}>
      {/* Header */}
      <View style={[animalListStyles.header, { paddingTop: headerTopInset }]}> 
        <TouchableOpacity
          onPress={onClose}
          style={[animalListStyles.closeButton, { top: headerTopInset - 2 }]}
        >
          <Ionicons name="chevron-down" size={24} color="gray" />
        </TouchableOpacity>
        <Text style={animalListStyles.title}>Available Animals</Text>
        <Text style={animalListStyles.subtitle}>{shelterName}</Text>
      </View>

      {loading ? (
        <View style={animalListStyles.loading}>
          <ActivityIndicator size="large" color="#38b6ff" />
          <Text style={animalListStyles.loadingText}>Finding animals...</Text>
        </View>
      ) : animals.length === 0 ? (
        <View style={animalListStyles.empty}>
          <Ionicons name="paw-outline" size={60} color="gray" />
          <Text style={animalListStyles.emptyTitle}>No Animals Listed</Text>
          <Text style={animalListStyles.emptySubtitle}>
            This shelter hasn't listed any animals yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={animals}
          keyExtractor={(item) => item.id}
          contentContainerStyle={animalListStyles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={animalListStyles.card}
              onPress={() => onSelectAnimal(item)}
            >
              {item.thumbnailUrl ? (
                <Image
                  source={{ uri: item.thumbnailUrl }}
                  style={animalListStyles.image}
                />
              ) : (
                <View style={animalListStyles.imagePlaceholder}>
                  <Ionicons name="paw" size={24} color="white" />
                </View>
              )}
              <View style={animalListStyles.info}>
                <Text style={animalListStyles.name}>{item.name}</Text>
                <Text style={animalListStyles.breed}>{item.breed}</Text>
                <Text style={animalListStyles.details}>
                  {item.age} • {item.sex}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="gray" />
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}