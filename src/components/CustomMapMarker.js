// Marker gaming personalizzati
import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const colors = require('../styles/colors');
const theme = require('../styles/theme');

export const CustomMapMarker = ({
                                    type,
                                    xpReward = 25,
                                    isActive = false,
                                    glowing = true,
                                    size = 'medium'
                                }) => {
    const getMarkerConfig = (eventType) => {
        const configs = {
            music: {
                icon: 'musical-notes',
                color: colors.secondary,
                glowColor: colors.glowSecondary,
                emoji: '🎵'
            },
            museum: {
                icon: 'library',
                color: colors.primary,
                glowColor: colors.glowPrimary,
                emoji: '🏛️'
            },
            event: {
                icon: 'calendar',
                color: colors.info,
                glowColor: 'rgba(33, 150, 243, 0.4)',
                emoji: '🎉'
            },
            food: {
                icon: 'restaurant',
                color: colors.xpGold,
                glowColor: colors.glowXP,
                emoji: '🍕'
            },
            default: {
                icon: 'location',
                color: colors.textSecondary,
                glowColor: 'rgba(153, 153, 153, 0.3)',
                emoji: '📍'
            }
        };
        return configs[eventType] || configs.default;
    };

    const config = getMarkerConfig(type);
    const markerSize = size === 'large' ? 60 : size === 'small' ? 40 : 50;
    const iconSize = size === 'large' ? 28 : size === 'small' ? 18 : 24;

    return (
        <View style={styles.markerContainer}>
            {/* Effetto glow animato */}
            {glowing && (
                <Animated.View
                    style={[
                        styles.glowEffect,
                        {
                            width: markerSize + 20,
                            height: markerSize + 20,
                            borderRadius: (markerSize + 20) / 2,
                            backgroundColor: config.glowColor,
                        }
                    ]}
                />
            )}

            {/* Marker principale */}
            <View
                style={[
                    styles.marker,
                    {
                        width: markerSize,
                        height: markerSize,
                        borderRadius: markerSize / 2,
                        backgroundColor: config.color,
                        borderColor: isActive ? colors.xpGold : colors.cardBackground,
                        borderWidth: isActive ? 3 : 2,
                    }
                ]}
            >
                {/* Icona principale */}
                <Ionicons
                    name={config.icon}
                    size={iconSize}
                    color={colors.textOnPrimary}
                />

                {/* Badge XP */}
                <View style={styles.xpBadge}>
                    <Text style={styles.xpText}>+{xpReward}</Text>
                </View>
            </View>

            {/* Puntina in basso */}
            <View
                style={[
                    styles.markerTail,
                    { borderTopColor: config.color }
                ]}
            />

            {/* Pulse effect per marker attivi */}
            {isActive && (
                <Animated.View
                    style={[
                        styles.pulseEffect,
                        {
                            width: markerSize + 10,
                            height: markerSize + 10,
                            borderRadius: (markerSize + 10) / 2,
                            borderColor: colors.xpGold,
                        }
                    ]}
                />
            )}
        </View>
    );
};

// Marker speciale per l'utente
export const UserLocationMarker = ({ level = 1 }) => {
    return (
        <View style={styles.userMarkerContainer}>
            <View style={styles.userGlow} />
            <View style={styles.userMarker}>
                <Ionicons name="person" size={24} color={colors.textOnPrimary} />
                <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>{level}</Text>
                </View>
            </View>
            <View style={styles.userPulse} />
        </View>
    );
};

const styles = StyleSheet.create({
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    glowEffect: {
        position: 'absolute',
        opacity: 0.6,
    },
    marker: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        position: 'relative',
    },
    xpBadge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: colors.xpGold,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: colors.cardBackground,
    },
    xpText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.textOnSecondary,
    },
    markerTail: {
        marginTop: -2,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    pulseEffect: {
        position: 'absolute',
        borderWidth: 2,
        opacity: 0.5,
    },

    // User marker styles
    userMarkerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    userGlow: {
        position: 'absolute',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.glowPrimary,
        opacity: 0.4,
    },
    userMarker: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: colors.xpGold,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
    },
    levelBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: colors.xpGold,
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.cardBackground,
    },
    levelText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.textOnSecondary,
    },
    userPulse: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: colors.primary,
        opacity: 0.6,
    },
});