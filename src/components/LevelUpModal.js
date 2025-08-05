import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, theme } from '../styles/theme';
import { GamingButton } from './GamingButton';

export const LevelUpModal = ({ visible, level, onClose }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(glowAnim, {
                            toValue: 1,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(glowAnim, {
                            toValue: 0,
                            duration: 1000,
                            useNativeDriver: true,
                        }),
                    ])
                ),
            ]).start();
        } else {
            scaleAnim.setValue(0);
            glowAnim.setValue(0);
        }
    }, [visible]);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.modal,
                        {
                            transform: [{ scale: scaleAnim }],
                            opacity: scaleAnim,
                        }
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.glowEffect,
                            {
                                opacity: glowAnim,
                            }
                        ]}
                    />

                    <View style={styles.content}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="trophy" size={60} color={colors.xpGold} />
                        </View>

                        <Text style={styles.title}>LEVEL UP!</Text>
                        <Text style={styles.levelText}>Livello {level}</Text>
                        <Text style={styles.description}>
                            Hai raggiunto un nuovo livello! Continua ad esplorare per sbloccare nuove ricompense.
                        </Text>

                        <GamingButton
                            title="Fantastico!"
                            variant="xp"
                            onPress={onClose}
                            glowing
                        />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        margin: theme.spacing.lg,
        borderRadius: theme.borders.radius.xl,
        position: 'relative',
    },
    glowEffect: {
        position: 'absolute',
        top: -20,
        left: -20,
        right: -20,
        bottom: -20,
        backgroundColor: colors.glowXP,
        borderRadius: theme.borders.radius.xl + 20,
    },
    content: {
        backgroundColor: colors.cardBackground,
        borderRadius: theme.borders.radius.xl,
        padding: theme.spacing.xl,
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.xpGold,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    title: {
        ...theme.typography.h1,
        color: colors.xpGold,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
        letterSpacing: 2,
    },
    levelText: {
        ...theme.typography.h2,
        color: colors.primary,
        textAlign: 'center',
        marginBottom: theme.spacing.md,
    },
    description: {
        ...theme.typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
        lineHeight: 24,
    },
});