import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { authStyles } from '../../styles/authStyles';

interface Props {
  onSignUp: () => void;
  onNavigateToLogin: () => void;
}

export default function SignUpView({ onSignUp, onNavigateToLogin }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView
            style={authStyles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Text style={authStyles.logo}>🐾</Text>
            <Text style={authStyles.title}>Create your account</Text>
            <Text style={authStyles.subtitle}>Start finding your companion</Text>

            <TextInput
                style={authStyles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
            />
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

            <TouchableOpacity style={authStyles.button} onPress={onSignUp}>
                <Text style={authStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onNavigateToLogin}>
                <Text style={authStyles.link}>Already have an account? Log In</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}
