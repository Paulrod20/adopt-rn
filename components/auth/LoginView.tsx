import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { authStyles } from '../../styles/authStyles';
import { Colors } from '../../constants/Colors';

// Props are like parameters you pass into a SwiftUI view
// In Swift: ShelterListView(shelters: shelters, onSelect: handler)
// In RN:    <LoginView onLogin={handler} onNavigateToSignUp={handler} />
interface Props {
  onLogin: () => void;
  onNavigateToSignUp: () => void;
}

export default function LoginView({ onLogin, onNavigateToSignUp }: Props) {
  // @State var email = "" in Swift
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    // KeyboardAvoidingView pushes the form up when the keyboard appears
    // Same as .ignoresSafeArea(.keyboard) behavior in SwiftUI
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Ionicons name="paw" size={60} color={Colors.adoptBlue} />
      <Text style={authStyles.title}>Adopt</Text>
      <Text style={authStyles.subtitle}>Find your perfect companion</Text>

      {/* TextInput = TextField in SwiftUI */}
      <TextInput
        style={authStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={authStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* TouchableOpacity = Button in SwiftUI */}
      <TouchableOpacity style={authStyles.button} onPress={onLogin}>
        <Text style={authStyles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onNavigateToSignUp}>
        <Text style={authStyles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
