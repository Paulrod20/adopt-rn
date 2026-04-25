import { Colors } from '../constants/Colors';

export const tabStyles = {
  tabBarActiveTintColor: Colors.adoptBlue,
  tabBarInactiveTintColor: Colors.gray,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute' as const,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: '600' as const,
  },
};