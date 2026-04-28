import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { Ionicons } from '@expo/vector-icons';
import { useFavorites } from '../../services/FavoritesManager';
import { Colors } from '../../constants/Colors';
import { favoritesStyles } from '../../styles/favoritesStyles';

export default function FavoritesView() {
  const { favorites, removeFavorite } = useFavorites();

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      style={favoritesStyles.deleteButton}
      onPress={() => removeFavorite(id)}
    >
      <Ionicons name="trash" size={22} color="white" />
      <Text style={favoritesStyles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={favoritesStyles.container}>
      <Text style={favoritesStyles.title}>Favorites</Text>

      {favorites.length === 0 ? (
        <View style={favoritesStyles.empty}>
          <Ionicons name="heart-outline" size={60} color={Colors.gray} />
          <Text style={favoritesStyles.emptyTitle}>No Favorites Yet</Text>
          <Text style={favoritesStyles.emptySubtitle}>
            Tap the heart on any shelter to save it here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={favoritesStyles.list}
          renderItem={({ item }) => (
            <ReanimatedSwipeable renderRightActions={() => renderRightActions(item.id)}>
              <View style={favoritesStyles.card}>
                <View style={favoritesStyles.icon}>
                  <Ionicons name="paw" size={18} color="white" />
                </View>
                <View style={favoritesStyles.info}>
                  <Text style={favoritesStyles.name}>{item.name}</Text>
                  <Text style={favoritesStyles.city}>{item.city}</Text>
                </View>
              </View>
            </ReanimatedSwipeable>
          )}
        />
      )}
    </SafeAreaView>
  );
}