import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const animalProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  content: {
    padding: 16,
    gap: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 16,
  },
  imagePlaceholder: {
    width: '100%',
    height: 280,
    borderRadius: 16,
    backgroundColor: Colors.adoptBlue,
    alignItems: 'center',
    justifyContent: 'center',
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
  descriptionCard: {
    width: '100%',
    backgroundColor: Colors.lightGray,
    borderRadius: 14,
    padding: 16,
    gap: 8,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 22,
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
});