import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const favoritesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  emptySubtitle: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center',
  },
  list: {
    padding: 16,
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 14,
    padding: 14,
    gap: 14,
  },
  icon: {
    backgroundColor: Colors.adoptBlue,
    borderRadius: 20,
    padding: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    borderRadius: 14,
    marginLeft: 8,
    gap: 4,
  },
  deleteText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  city: { fontSize: 14, color: 'gray' },
});