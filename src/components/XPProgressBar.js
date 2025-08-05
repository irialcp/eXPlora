import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, theme } from '../styles/theme';

export const XPProgressBar = ({
                                  currentXP,
                                  nextLevelXP,
                                  level,
                                  animated = true
                              }) => {
    const progressAnim = useRef(new Animated.Value(0)).current;
    const progress = currentXP / nextLevelXP;

    useEffect(() => {
        if (animated) {
            Animated.timing(progressAnim, {
                toValue: progress,
                duration: 1000,
                useNativeDriver: false,
            }).start();
        } else {
            progressAnim.setValue(progress);
        }
    }, [progress, animated]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.levelBadge}>
                    <Ionicons name="trophy" size={16} color={colors.xpGold} />
                    <Text style={styles.levelText}>LV {level}</Text>
                </View>
                <Text style={styles.xpText}>
                    {currentXP} / {nextLevelXP} XP
                </Text>
            </View>

            <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                    <Animated.View
                        style={[
                            styles.progressFill,
                            {
                                width: progressAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%'],
                                }),
                            }
                        ]}
                    />
                    <View style={styles.progressGlow} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    levelBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: theme.borders.radius.pill,
    },
    levelText: {
        ...theme.typography.caption,
        color: colors.xpGold,
        marginLeft: 4,
        fontWeight: 'bold',
    },
    xpText: {
        ...theme.typography.caption,
        color: colors.textSecondary,
        fontWeight: '600',
    },
    progressContainer: {
        position: 'relative',
    },
    progressTrack: {
        height: 8,
        backgroundColor: colors.cardBackgroundDark,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.xpGold,
        borderRadius: 4,
    },
    progressGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.glowXP,
        borderRadius: 4,
    },
});