import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import con require per evitare problemi
const colors = require('../styles/colors');
const theme = require('../styles/theme');

export const GamingButton = ({
                                 title,
                                 onPress,
                                 variant = 'primary',
                                 size = 'medium',
                                 icon,
                                 disabled = false,
                                 glowing = false,
                                 xpReward = null
                             }) => {
    const getButtonStyle = () => {
        const baseStyle = [styles.button, styles[size]];

        if (disabled) {
            baseStyle.push(styles.disabled);
        } else {
            baseStyle.push(styles[variant]);
            if (glowing) baseStyle.push(styles.glowing);
        }

        return baseStyle;
    };

    const getTextStyle = () => {
        return [
            styles.buttonText,
            styles[`${size}Text`],
            disabled ? styles.disabledText : styles[`${variant}Text`]
        ];
    };

    return (
        <TouchableOpacity
            style={getButtonStyle()}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.8}
        >
            <View style={styles.buttonContent}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={size === 'large' ? 24 : 20}
                        color={disabled ? colors.textLight : colors.textOnPrimary}
                        style={styles.buttonIcon}
                    />
                )}
                <Text style={getTextStyle()}>{title}</Text>
                {xpReward && (
                    <View style={styles.xpBadge}>
                        <Ionicons name="star" size={14} color={colors.xpGold} />
                        <Text style={styles.xpText}>+{xpReward}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: theme.borders.radius.medium,
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
        ...theme.shadows.button,
    },

    // Variants
    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
    },
    xp: {
        backgroundColor: colors.xpGold,
    },

    // Sizes
    small: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
    },
    medium: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.lg,
    },
    large: {
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
    },

    // States
    disabled: {
        backgroundColor: colors.cardBackgroundDark,
        shadowOpacity: 0,
        elevation: 0,
    },
    glowing: {
        ...theme.shadows.glow,
    },

    // Content
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonIcon: {
        marginRight: theme.spacing.sm,
    },
    buttonText: {
        fontWeight: '600',
        textAlign: 'center',
    },

    // Text variants
    primaryText: {
        color: colors.textOnPrimary,
    },
    secondaryText: {
        color: colors.textOnSecondary,
    },
    outlineText: {
        color: colors.primary,
    },
    xpText: {
        color: colors.textOnSecondary,
    },
    disabledText: {
        color: colors.textLight,
    },

    // Text sizes
    smallText: {
        fontSize: 14,
    },
    mediumText: {
        fontSize: 16,
    },
    largeText: {
        fontSize: 18,
    },

    // XP Badge
    xpBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginLeft: theme.spacing.sm,
    },
});