import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { theme } from './theme';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackground,
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
    title: {
        fontSize: 54,
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
    }
});