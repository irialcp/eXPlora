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

export default function MissionsScreen() {
    const { missions, completedMissions, points, completeMission } = useMissionsStore();

    const handleCompleteMission = (missionId) => {
        Alert.alert(
            'Missione completata!',
            'Hai completato questa missione e guadagnato punti.',
            [
                {
                    text: 'OK',
                    onPress: () => completeMission(missionId)
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Missioni di oggi</Text>
                    <View style={styles.pointsContainer}>
                        <Ionicons name="star" size={20} color="#FFD700" />
                        <Text style={styles.pointsText}>{points} punti</Text>
                    </View>
                </View>

                <View style={styles.missionsContainer}>
                    {missions.map((mission) => {
                        const isCompleted = completedMissions.includes(mission.id);

                        return (
                            <View key={mission.id} style={styles.missionCard}>
                                <View style={styles.missionHeader}>
                                    <View style={styles.missionIcon}>
                                        <Ionicons
                                            name={mission.icon}
                                            size={24}
                                            color={isCompleted ? '#4CAF50' : '#007AFF'}
                                        />
                                    </View>
                                    <View style={styles.missionInfo}>
                                        <Text style={styles.missionTitle}>{mission.title}</Text>
                                        <Text style={styles.missionDescription}>
                                            {mission.description}
                                        </Text>
                                    </View>
                                    <View style={styles.pointsBadge}>
                                        <Text style={styles.pointsBadgeText}>+{mission.points}</Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        isCompleted && styles.completedButton
                                    ]}
                                    onPress={() => handleCompleteMission(mission.id)}
                                    disabled={isCompleted}
                                >
                                    <Text style={[
                                        styles.actionButtonText,
                                        isCompleted && styles.completedButtonText
                                    ]}>
                                        {isCompleted ? 'Completata' : 'Completa'}
                                    </Text>
                                    {isCompleted && (
                                        <Ionicons name="checkmark" size={16} color="#4CAF50" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>

                <View style={styles.progressSection}>
                    <Text style={styles.progressTitle}>Progresso giornaliero</Text>
                    <View style={styles.progressBar}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: `${(completedMissions.length / missions.length) * 100}%` }
                            ]}
                        />
                    </View>
                    <Text style={styles.progressText}>
                        {completedMissions.length} di {missions.length} missioni completate
                    </Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    pointsText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    missionsContainer: {
        paddingHorizontal: 20,
        gap: 15,
    },
    missionCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    missionHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    missionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f8ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    missionInfo: {
        flex: 1,
    },
    missionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    missionDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    pointsBadge: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
    },
    pointsBadgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    actionButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    completedButton: {
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    completedButtonText: {
        color: '#4CAF50',
    },
    progressSection: {
        margin: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    progressTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginBottom: 10,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});