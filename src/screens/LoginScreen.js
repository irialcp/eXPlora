import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Alert,
    Text,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEventsStore } from '../store/eventsStore';
import { useAuthStore } from '../store/authStore';
import EventBottomSheet from '../components/EventBottomSheet';
import { GamingButton } from '../components/GamingButton';
import { GamingCard } from '../components/GamingCard';
import { XPProgressBar } from '../components/XPProgressBar';
import { colors, theme } from '../styles/theme';
import { gamingMapStyle } from '../styles/mapStyles';

export default function MapScreen() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { user } = useAuthStore();
    const {
        filteredEvents,
        userLocation,
        setUserLocation,
        filterEventsByRadius,
        updateEvents
    } = useEventsStore();

    // Mock XP data
    const currentXP = 1240;
    const nextLevelXP = 1500;
    const currentLevel = 7;

    useEffect(() => {
        getCurrentLocation();
        const interval = setInterval(updateEvents, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (userLocation && !user?.isPremium) {
            filterEventsByRadius(5);
        }
    }, [userLocation, user]);

    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permesso negato', 'Abilita la geolocalizzazione per vedere gli eventi vicini');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        } catch (error) {
            Alert.alert('Errore', 'Impossibile ottenere la posizione');
        }
    };

    const getMarkerColor = (type) => {
        switch (type) {
            case 'music': return colors.secondary;
            case 'museum': return colors.primary;
            case 'event': return colors.info;
            case 'food': return colors.xpGold;
            default: return colors.textSecondary;
        }
    };

    if (!userLocation) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loading}>
                    <Text style={styles.loadingText}>🗺️ Caricamento mappa gaming...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* XP Header */}
            <View style={styles.xpHeader}>
                <GamingCard variant="dark" style={styles.xpCard}>
                    <XPProgressBar
                        currentXP={currentXP}
                        nextLevelXP={nextLevelXP}
                        level={currentLevel}
                    />
                </GamingCard>
            </View>

            <MapView
                style={styles.map}
                customMapStyle={gamingMapStyle}
                initialRegion={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
                userLocationAnnotationTitle=""
            >
                {filteredEvents.map((event) => (
                    <Marker
                        key={event.id}
                        coordinate={{
                            latitude: event.latitude,
                            longitude: event.longitude,
                        }}
                        onPress={() => setSelectedEvent(event)}
                    >
                        <View style={[
                            styles.customMarker,
                            { backgroundColor: getMarkerColor(event.type) }
                        ]}>
                            <Text style={styles.markerText}>+{event.xpReward || 25}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>

            {!user?.isPremium && (
                <View style={styles.limitBanner}>
                    <GamingCard variant="secondary" style={styles.limitCard}>
                        <View style={styles.limitContent}>
                            <Text style={styles.limitText}>
                                🎮 Modalità Esploratore: raggio 5km
                            </Text>
                            <GamingButton
                                title="Upgrade"
                                variant="xp"
                                size="small"
                                icon="star"
                            />
                        </View>
                    </GamingCard>
                </View>
            )}

            <EventBottomSheet
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    xpHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        paddingTop: 50,
        paddingHorizontal: theme.spacing.md,
    },
    xpCard: {
        marginBottom: 0,
    },
    map: {
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.surface,
    },
    loadingText: {
        color: colors.xpGold,
        fontSize: 18,
        fontWeight: '600',
    },
    customMarker: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: colors.cardBackground,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    markerText: {
        color: colors.textOnPrimary,
        fontSize: 12,
        fontWeight: 'bold',
    },
    limitBanner: {
        position: 'absolute',
        bottom: 100,
        left: theme.spacing.md,
        right: theme.spacing.md,
        zIndex: 1000,
    },
    limitCard: {
        marginBottom: 0,
    },
    limitContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    limitText: {
        color: colors.textPrimary,
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
});