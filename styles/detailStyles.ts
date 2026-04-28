import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  closeButton: {
    position: 'absolute',
    left: 16,
    top: 60,
    zIndex: 10,
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
      flex: 1,
    textAlign: 'center',
  },
  content: {
    padding: 16,
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    backgroundColor: Colors.adoptBlue,
    borderRadius: 50,
    padding: 24,
    marginVertical: 16,
  },
  infoCard: {
    width: '100%',
    backgroundColor: Colors.lightGray,
    borderRadius: 14,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 15,
    flex: 1,
  },
  divider: {
    height: 0.5,
    backgroundColor: '#e0e0e0',
  },
  button: {
    width: '100%',
    backgroundColor: Colors.adoptBlue,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  favoriteButton: {
    position: 'absolute',
    right: 16,
    top: 60,
    zIndex: 10,
    padding: 8,
  },
});
