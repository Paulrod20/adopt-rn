import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Shelter } from '../../models/Shelter';
import { listStyles } from '../../styles/listStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  shelters: Shelter[];
  onSelectShelter: (shelter: Shelter) => void;
}

export default function ShelterListView({ shelters, onSelectShelter }: Props) {
  // @State var searchText = "" in Swift
  const [searchText, setSearchText] = useState('');

  // Same filter logic as your Swift filteredShelters computed property
  const filteredShelters = shelters.filter(
    (s) =>
      searchText === '' ||
      s.name.toLowerCase().includes(searchText.toLowerCase()) ||
      s.city.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={listStyles.container}>
      <Text style={listStyles.title}>Shelters Near You</Text>

      {/* This replaces .searchable(text:) from SwiftUI */}
      <View style={listStyles.searchBar}>
        <Ionicons name="search" size={16} color="gray" />
        <TextInput
          style={listStyles.searchInput}
          placeholder="Search shelters..."
          value={searchText}
          onChangeText={setSearchText}
          clearButtonMode="while-editing"
        />
      </View>

      {/* FlatList = List { ForEach } in SwiftUI */}
      <FlatList
        data={filteredShelters}
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
              <Text style={listStyles.city}>{item.city}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="gray" />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}