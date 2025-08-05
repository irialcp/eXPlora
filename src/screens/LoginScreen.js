import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { GamingButton } from '../components/GamingButton';
import { GamingCard } from '../components/GamingCard';

// Import con require per evitare problemi
const colors = require('../styles/colors');
const theme = require('../styles/theme');

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const { login } = useAuthStore();

    const handleAuth = () => {
        if (!email || !password || (!isLogin && !name)) {
            Alert.alert('Errore', 'Compila tutti i campi');
            return;
        }

        // Simula autenticazione
        const userData = {
            id: 1,
            name: isLogin ? 'Explorer' : name,
            email: email,
            isPremium: false,
        };

        login(userData);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.content}>
                    {/* Logo Section */}
                    <View style={styles.logoContainer}>
                        <View style={styles.logoIcon}>
                            <Ionicons name="map" size={60} color={colors.primary} />
                        </View>
                        <Text style={styles.title}>CityQuest</Text>
                        <View style={styles.tagline}>
                            <Text style={styles.subtitle}>🎮 GAMING EXPLORER</Text>
                        </View>
                    </View>

                    {/* Form Section */}
                    <GamingCard variant="primary" style={styles.formCard}>
                        <Text style={styles.formTitle}>
                            {isLogin ? 'Accedi' : 'Registrati'}
                        </Text>

                        {!isLogin && (
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Nome</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Il tuo nome gaming"
                                    value={name}
                                    onChangeText={setName}
                                    placeholderTextColor={colors.textLight}
                                />
                            </View>
                        )}

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="player@cityquest.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor={colors.textLight}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="La tua password segreta"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                placeholderTextColor={colors.textLight}
                            />
                        </View>

                        <GamingButton
                            title={isLogin ? 'Inizia l\'avventura!' : 'Crea account'}
                            onPress={handleAuth}
                            variant="primary"
                            size="large"
                            icon="rocket"
                            glowing
                        />

                        <TouchableOpacity
                            style={styles.switchButton}
                            onPress={() => setIsLogin(!isLogin)}
                        >
                            <Text style={styles.switchText}>
                                {isLogin
                                    ? 'Nuovo esploratore? Registrati'
                                    : 'Hai già un account? Accedi'
                                }
                            </Text>
                        </TouchableOpacity>
                    </GamingCard>

                    {/* Features Preview */}
                    <View style={styles.featuresContainer}>
                        <View style={styles.feature}>
                            <Ionicons name="trophy" size={24} color={colors.xpGold} />
                            <Text style={styles.featureText}>Guadagna XP</Text>
                        </View>
                        <View style={styles.feature}>
                            <Ionicons name="location" size={24} color={colors.secondary} />
                            <Text style={styles.featureText}>Scopri eventi</Text>
                        </View>
                        <View style={styles.feature}>
                            <Ionicons name="people" size={24} color={colors.primary} />
                            <Text style={styles.featureText}>Sfida amici</Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackground,
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: theme.spacing.lg,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.xxl,
    },
    logoIcon: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.cardBackground,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
        ...theme.shadows.glow,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: theme.spacing.md,
        letterSpacing: -1,
        textShadowColor: colors.glowPrimary,
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 20,
    },
    tagline: {
        backgroundColor: colors.surface,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borders.radius.pill,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    subtitle: {
        fontSize: 16,
        color: colors.xpGold,
        fontWeight: '600',
        letterSpacing: 1,
    },
    formCard: {
        marginBottom: theme.spacing.xl,
    },
    formTitle: {
        ...theme.typography.h2,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    inputGroup: {
        marginBottom: theme.spacing.md,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: theme.spacing.sm,
    },
    input: {
        backgroundColor: colors.cardBackground,
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: theme.borders.radius.medium,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        fontSize: 16,
        color: colors.textPrimary,
    },
    switchButton: {
        marginTop: theme.spacing.lg,
        alignItems: 'center',
    },
    switchText: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '600',
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    feature: {
        alignItems: 'center',
    },
    featureText: {
        marginTop: theme.spacing.sm,
        fontSize: 14,
        fontWeight: '600',
        color: colors.textSecondary,
    },
});