import { Colors } from '../constants/Colors';

export const tabStyles = {
  tabBarActiveTintColor: Colors.adoptBlue,
  tabBarInactiveTintColor: Colors.gray,
  headerShown: false,
  tabBarStyle: {
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
  },
  tabBarLabelStyle: {
    fontSize: 10,
    fontWeight: '600' as const,
  },
};