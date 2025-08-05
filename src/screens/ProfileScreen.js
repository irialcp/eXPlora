import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { useMissionsStore } from '../store/missionsStore';

export default function ProfileScreen() {
    const { user, logout, upgradeToPremium } = useAuthStore();
    const { points, completedMissions } = useMissionsStore();

    const handleUpgrade = () => {
        Alert.alert(
            'Passa a Premium',
            'Vuoi passare alla versione Premium per accedere a tutte le funzionalità?',
            [
                { text: 'Annulla', style: 'cancel' },
                {
                    text: 'Upgrade',
                    onPress: () => {
                        upgradeToPremium();
                        Alert.alert('Congratulazioni!', 'Ora sei un utente Premium!');
                    }
                }
            ]
        );
    };

    const handleLogout = () => {
        Alert.alert(
            'Disconnetti',
            'Sei sicuro di voler uscire?',
            [
                { text: 'Annulla', style: 'cancel' },
                { text: 'Esci', onPress: logout, style: 'destructive' }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.profileInfo}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {user?.name.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        <Text style={styles.name}>{user?.name}</Text>
                        <Text style={styles.email}>{user?.email}</Text>
                        {user?.isPremium && (
                            <View style={styles.premiumBadge}>
                                <Ionicons name="star" size={16} color="#FFD700" />
                                <Text style={styles.premiumText}>Premium</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.statsSection}>
                    <Text style={styles.sectionTitle}>Le tue statistiche</Text>
                    <View style={styles.statsContainer}>
                        <View style={styles.statCard}>
                            <Ionicons name="star" size={24} color="#FFD700" />
                            <Text style={styles.statNumber}>{points}</Text>
                            <Text style={styles.statLabel}>Punti totali</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Ionicons name="trophy" size={24} color="#4CAF50" />
                            <Text style={styles.statNumber}>{completedMissions.length}</Text>
                            <Text style={styles.statLabel}>Missioni completate</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.menuSection}>
                    <Text style={styles.sectionTitle}>Impostazioni</Text>

                    {!user?.isPremium && (
                        <TouchableOpacity style={styles.upgradeCard} onPress={handleUpgrade}>
                            <View style={styles.upgradeContent}>
                                <Ionicons name="star" size={24} color="#FFD700" />
                                <View style={styles.upgradeText}>
                                    <Text style={styles.upgradeTitle}>Passa a Premium</Text>
                                    <Text style={styles.upgradeDescription}>
                                        Accedi a tutti gli eventi e agli itinerari personalizzati
                                    </Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#007AFF" />
                            </View>
                        </TouchableOpacity>
                    )}

                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="notifications" size={20} color="#666" />
                            <Text style={styles.menuText}>Notifiche</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="help-circle" size={20} color="#666" />
                            <Text style={styles.menuText}>Aiuto e supporto</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.menuItem}>
                            <Ionicons name="information-circle" size={20} color="#666" />
                            <Text style={styles.menuText}>Informazioni</Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.menuItem, styles.logoutItem]}
                            onPress={handleLogout}
                        >
                            <Ionicons name="log-out" size={20} color="#FF3B30" />
                            <Text style={[styles.menuText, styles.logoutText]}>Disconnetti</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        padding: 20,
        paddingTop: 60,
        alignItems: 'center',
    },
    profileInfo: {
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    premiumBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FFD700',
    },
    premiumText: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    statsSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },
    menuSection: {
        padding: 20,
    },
    upgradeCard: {
        backgroundColor: '#FFF8E1',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#FFD700',
    },
    upgradeContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    upgradeText: {
        flex: 1,
        marginLeft: 15,
    },
    upgradeTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    upgradeDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    menuContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
    },
    logoutItem: {
        borderBottomWidth: 0,
    },
    logoutText: {
        color: '#FF3B30',
    },
});