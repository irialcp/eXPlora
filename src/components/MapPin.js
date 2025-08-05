import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/theme';

export const MapPin = ({ type, size = 'medium', glowing = false }) => {
    const getIconName = (eventType) => {
        switch (eventType) {
            case 'music': return 'musical-notes';
            case 'museum': return 'library';
            case 'event': return 'calendar';
            case 'food': return 'restaurant';
            default: return 'location';
        }
    };

    const getColor = (eventType) => {
        switch (eventType) {
            case 'music': return colors.secondary;
            case 'museum': return colors.primary;
            case 'event': return colors.info;
            case 'food': return colors.xpGold;
            default: return colors.textSecondary;
        }
    };

    const iconSize = size === 'large' ? 24 : size === 'small' ? 16 : 20;
    const pinSize = size === 'large' ? 50 : size === 'small' ? 35 : 42;

    return (
        <View style={[
            styles.pin,
            {
                width: pinSize,
                height: pinSize,
                backgroundColor: getColor(type),
            },
            glowing && styles.glowing
        ]}>
            <Ionicons
                name={getIconName(type)}
                size={iconSize}
                color={colors.textOnPrimary}
            />
            <View style={[styles.pinTail, { borderTopColor: getColor(type) }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    pin: {
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        position: 'relative',
    },
    pinTail: {
        position: 'absolute',
        bottom: -8,
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
    },
    glowing: {
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 8,
    },
});
