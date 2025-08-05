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
import { useMissionsStore } from '../store/missionsStore';
import { mockRewards } from '../data/mockData';

export default function PointsScreen() {
    const { points } = useMissionsStore();

    const handleRedeemReward = (reward) => {
        if (points < reward.cost) {
            Alert.alert('Punti insufficienti', 'Non hai abbastanza punti per questo premio');
            return;
        }

        Alert.alert(
            'Premio riscattato!',
            `Hai riscattato: ${reward.title}`,
            [{ text: 'OK' }]
        );
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'food': return 'restaurant';
            case 'culture': return 'library';
            case 'drinks': return 'wine';
            default: return 'gift';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>I miei punti</Text>
                    <View style={styles.pointsCard}>
                        <Ionicons name="star" size={40} color="#FFD700" />
                        <Text style={styles.pointsNumber}>{points}</Text>
                        <Text style={styles.pointsLabel}>punti disponibili</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Premi disponibili</Text>

                    <View style={styles.rewardsContainer}>
                        {mockRewards.map((reward) => {
                            const canAfford = points >= reward.cost;

                            return (
                                <View key={reward.id} style={styles.rewardCard}>
                                    <View style={styles.rewardHeader}>
                                        <View style={[styles.categoryIcon, !canAfford && styles.disabledIcon]}>
                                            <Ionicons
                                                name={getCategoryIcon(reward.category)}
                                                size={24}
                                                color={canAfford ? '#007AFF' : '#ccc'}
                                            />
                                        </View>
                                        <View style={styles.rewardInfo}>
                                            <Text style={[styles.rewardTitle, !canAfford && styles.disabledText]}>
                                                {reward.title}
                                            </Text>
                                            <Text style={[styles.rewardDescription, !canAfford && styles.disabledText]}>
                                                {reward.description}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.rewardFooter}>
                                        <View style={styles.costContainer}>
                                            <Ionicons name="star" size={16} color="#FFD700" />
                                            <Text style={styles.costText}>{reward.cost} punti</Text>
                                        </View>

                                        <TouchableOpacity
                                            style={[
                                                styles.redeemButton,
                                                !canAfford && styles.disabledButton
                                            ]}
                                            onPress={() => handleRedeemReward(reward)}
                                            disabled={!canAfford}
                                        >
                                            <Text style={[
                                                styles.redeemButtonText,
                                                !canAfford && styles.disabledButtonText
                                            ]}>
                                                {canAfford ? 'Riscatta' : 'Non disponibile'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Come guadagnare punti</Text>
                    <View style={styles.tipsContainer}>
                        <View style={styles.tip}>
                            <Ionicons name="trophy" size={20} color="#007AFF" />
                            <Text style={styles.tipText}>Completa le missioni giornaliere</Text>
                        </View>
                        <View style={styles.tip}>
                            <Ionicons name="location" size={20} color="#007AFF" />
                            <Text style={styles.tipText}>Partecipa agli eventi</Text>
                        </View>
                        <View style={styles.tip}>
                            <Ionicons name="people" size={20} color="#007AFF" />
                            <Text style={styles.tipText}>Invita amici all'app</Text>
                        </View>
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
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    pointsCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    pointsNumber: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    pointsLabel: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    section: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    rewardsContainer: {
        gap: 15,
    },
    rewardCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    rewardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    categoryIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f8ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    disabledIcon: {
        backgroundColor: '#f5f5f5',
    },
    rewardInfo: {
        flex: 1,
    },
    rewardTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
    },
    rewardDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    disabledText: {
        color: '#ccc',
    },
    rewardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    costContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    costText: {
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    redeemButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    disabledButton: {
        backgroundColor: '#f0f0f0',
    },
    redeemButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    disabledButtonText: {
        color: '#ccc',
    },
    tipsContainer: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    tipText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
    },
});