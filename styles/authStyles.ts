import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 12,
    backgroundColor: Colors.background,
  },
  logo: {
    fontSize: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.adoptBlue,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 12,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.adoptBlue,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  link: {
    color: Colors.adoptBlue,
    marginTop: 8,
  },
});