import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Shelter } from '../../models/Shelter';
import { listStyles } from '../../styles/listStyles';

interface Props {
  shelters: Shelter[];
  onSelectShelter: (shelter: Shelter) => void;
}

export default function ShelterListView({
  shelters,
  onSelectShelter,
}: Props) {

  return (
    <View style={listStyles.container}>
      <Text style={listStyles.title}>Shelters Near You</Text>

      {/* FlatList = List { ForEach } in SwiftUI */}
      <FlatList
        data={shelters}
        keyExtractor={(item) => item.id}
        contentContainerStyle={listStyles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={listStyles.card}
            onPress={() => onSelectShelter(item)}
          >
            <View style={listStyles.icon}>
              <Ionicons name="paw" size={18} color="white" />
            </View>
            <View style={listStyles.info}>
              <Text style={listStyles.name}>{item.name}</Text>
              <Text style={listStyles.city}>{item.city}, {item.state}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="gray" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}