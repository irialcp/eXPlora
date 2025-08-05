import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Alert,
    Text,
    TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEventsStore } from '../store/eventsStore';
import { useAuthStore } from '../store/authStore';
import EventBottomSheet from '../components/EventBottomSheet';

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

    useEffect(() => {
        getCurrentLocation();
        const interval = setInterval(updateEvents, 30000); // Aggiorna ogni 30s
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (userLocation && !user?.isPremium) {
            filterEventsByRadius(5); // 5km per utenti free
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
            case 'music': return '#FF6B6B';
            case 'museum': return '#4ECDC4';
            case 'event': return '#45B7D1';
            default: return '#95A5A6';
        }
    };

    if (!userLocation) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loading}>
                    <Text>Caricamento mappa...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {filteredEvents.map((event) => (
                    <Marker
                        key={event.id}
                        coordinate={{
                            latitude: event.latitude,
                            longitude: event.longitude,
                        }}
                        pinColor={getMarkerColor(event.type)}
                        onPress={() => setSelectedEvent(event)}
                    />
                ))}
            </MapView>

            {!user?.isPremium && (
                <View style={styles.limitBanner}>
                    <Text style={styles.limitText}>
                        Versione gratuita: eventi entro 5km
                    </Text>
                    <TouchableOpacity style={styles.upgradeButton}>
                        <Text style={styles.upgradeText}>Passa a Premium</Text>
                    </TouchableOpacity>
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
    },
    map: {
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    limitBanner: {
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    limitText: {
        color: 'white',
        fontSize: 12,
    },
    upgradeButton: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    upgradeText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    },
});