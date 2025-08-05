import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, theme } from '../styles/theme';

export const GamingCard = ({
                               children,
                               variant = 'default',
                               glowing = false,
                               style = {}
                           }) => {
    const getCardStyle = () => {
        const baseStyle = [styles.card];

        baseStyle.push(styles[variant]);
        if (glowing) baseStyle.push(styles.glowing);
        baseStyle.push(style);

        return baseStyle;
    };

    return (
        <View style={getCardStyle()}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: theme.borders.radius.large,
        padding: theme.spacing.lg,
        ...theme.shadows.card,
    },

    default: {
        backgroundColor: colors.cardBackground,
    },

    dark: {
        backgroundColor: colors.cardBackgroundDark,
    },

    primary: {
        backgroundColor: colors.primaryBackground,
        borderWidth: 1,
        borderColor: colors.primaryLight,
    },

    secondary: {
        backgroundColor: colors.secondaryBackground,
        borderWidth: 1,
        borderColor: colors.secondaryLight,
    },

    xp: {
        backgroundColor: colors.cardBackground,
        borderWidth: 2,
        borderColor: colors.xpGold,
    },

    glowing: {
        ...theme.shadows.glow,
    },
});