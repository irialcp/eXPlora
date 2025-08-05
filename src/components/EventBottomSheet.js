import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    ScrollView,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GamingButton } from './GamingButton';
import { GamingCard } from './GamingCard';
import { colors, theme } from '../styles/theme';

export default function EventBottomSheet({ event, onClose }) {
    if (!event) return null;

    const getTypeIcon = (type) => {
        switch (type) {
            case 'music': return 'musical-notes';
            case 'museum': return 'library';
            case 'event': return 'calendar';
            case 'food': return 'restaurant';
            default: return 'location';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'music': return colors.secondary;
            case 'museum': return colors.primary;
            case 'event': return colors.info;
            case 'food': return colors.xpGold;
            default: return colors.textSecondary;
        }
    };

    return (
        <Modal
            visible={!!event}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.backdrop} onPress={onClose} />
                <View style={styles.bottomSheet}>
                    <View style={styles.handle} />

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Image source={{ uri: event.image }} style={styles.image} />

                        <View style={styles.content}>
                            <GamingCard variant="default">
                                <View style={styles.header}>
                                    <View style={[
                                        styles.typeContainer,
                                        { backgroundColor: `${getTypeColor(event.type)}20` }
                                    ]}>
                                        <Ionicons
                                            name={getTypeIcon(event.type)}
                                            size={20}
                                            color={getTypeColor(event.type)}
                                        />
                                        <Text style={[styles.typeText, { color: getTypeColor(event.type) }]}>
                                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                        </Text>
                                    </View>

                                    <View style={styles.xpReward}>
                                        <Ionicons name="star" size={16} color={colors.xpGold} />
                                        <Text style={styles.xpText}>+{event.xpReward || 25} XP</Text>
                                    </View>
                                </View>

                                <Text style={styles.title}>{event.title}</Text>
                                <Text style={styles.description}>{event.description}</Text>

                                <View style={styles.details}>
                                    <View style={styles.detailRow}>
                                        <Ionicons name="time" size={16} color={colors.textSecondary} />
                                        <Text style={styles.detailText}>{event.time}</Text>
                                    </View>

                                    <View style={styles.detailRow}>
                                        <Ionicons name="calendar" size={16} color={colors.textSecondary} />
                                        <Text style={styles.detailText}>{event.date}</Text>
                                    </View>

                                    <View style={styles.detailRow}>
                                        <Ionicons name="people" size={16} color={colors.textSecondary} />
                                        <Text style={styles.detailText}>
                                            {event.participants} esploratori
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.actions}>
                                    <GamingButton
                                        title="Partecipa alla Quest"
                                        variant="primary"
                                        size="large"
                                        icon="rocket"
                                        xpReward={event.xpReward || 25}
                                        glowing
                                    />

                                    <GamingButton
                                        title="Chiudi"
                                        variant="outline"
                                        size="medium"
                                        onPress={onClose}
                                    />
                                </View>
                            </GamingCard>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: colors.overlay,
    },
    backdrop: {
        flex: 1,
    },
    bottomSheet: {
        backgroundColor: colors.cardBackground,
        borderTopLeftRadius: theme.borders.radius.xl,
        borderTopRightRadius: theme.borders.radius.xl,
        maxHeight: '80%',
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderColor: colors.primary,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: colors.primary,
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    image: {
        width: '100%',
        height: 200,
        backgroundColor: colors.cardBackgroundDark,
    },
    content: {
        padding: theme.spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borders.radius.pill,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    typeText: {
        marginLeft: theme.spacing.sm,
        fontWeight: '600',
    },
    xpReward: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borders.radius.pill,
    },
    xpText: {
        marginLeft: theme.spacing.xs,
        color: colors.xpGold,
        fontWeight: 'bold',
        fontSize: 14,
    },
    title: {
        ...theme.typography.h2,
        color: colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    description: {
        ...theme.typography.body,
        color: colors.textSecondary,
        marginBottom: theme.spacing.lg,
    },
    details: {
        gap: theme.spacing.md,
        marginBottom: theme.spacing.lg,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        marginLeft: theme.spacing.md,
        fontSize: 16,
        color: colors.textPrimary,
        fontWeight: '500',
    },
    actions: {
        gap: theme.spacing.md,
    },
});