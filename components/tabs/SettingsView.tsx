import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { settingsStyles } from '../../styles/settingsStyles';

interface SettingsViewProps { 
    onSignOut: () => void;
}

export default function SettingsView({ onSignOut }: SettingsViewProps) { 
    return (
        <SafeAreaView style={settingsStyles.container}>
            <Text style={settingsStyles.title}>Settings</Text>
            
            {/* Profile Section */}
            <View style={settingsStyles.section}>
                <View style={settingsStyles.profileRow}>
                    <View style={settingsStyles.avatar}>
                        <Ionicons name='person' size={30} color='white' />
                    </View>
                    <View>
                        <Text style={settingsStyles.profileName}>Paul Rodriguez</Text>
                        <Text style={settingsStyles.profileEmail}>paul@example.com</Text>
                    </View>
                </View>
            </View>

            {/* App Section */}
            <View style={settingsStyles.section}>
                <Text style={settingsStyles.sectionTitle}>App</Text>
                <View style={settingsStyles.card}>
                    <View style={settingsStyles.row}>
                        <Ionicons name='information-circle' size={20} color='gray' />
                        <Text style={settingsStyles.rowText}>Version 1.0.0</Text>
                    </View>
                </View>
            </View>

            {/* Sign Out */}
            <View style={settingsStyles.section}>
                <TouchableOpacity style={settingsStyles.signOutButton} onPress={onSignOut}>
                    <Ionicons name='log-out' size={20} color='red' />
                    <Text style={settingsStyles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
