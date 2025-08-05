import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Alert,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useEventsStore } from '../store/eventsStore';
import { useAuthStore } from '../store/authStore';
import EventBottomSheet from '../components/EventBottomSheet';
import { GamingButton } from '../components/GamingButton';
import { GamingCard } from '../components/GamingCard';
import { XPProgressBar } from '../components/XPProgressBar';
import { CustomMapMarker, UserLocationMarker } from '../components/CustomMapMarker';
import { ultraGamingMapStyle, cyberpunkMapStyle } from '../styles/mapStyles';

const colors = require('../styles/colors');
const theme = require('../styles/theme');

const { width, height } = Dimensions.get('window');

export default function MapScreen() {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [mapStyle, setMapStyle] = useState('gaming'); // 'gaming' o 'cyberpunk'
    const [showRadar, setShowRadar] = useState(true);
    const mapRef = useRef(null);
    const pulseAnim = useRef(new Animated.Value(0)).current;
    const radarAnim = useRef(new Animated.Value(0)).current;

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

        // Animazione pulse per marker utente
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Animazione radar
        Animated.loop(
            Animated.timing(radarAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();

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

    const getCurrentMapStyle = () => {
        return mapStyle === 'cyberpunk' ? cyberpunkMapStyle : ultraGamingMapStyle;
    };

    const handleMarkerPress = (event) => {
        setSelectedEvent(event);
        // Anima la mappa verso il marker
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: event.latitude,
                longitude: event.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 1000);
        }
    };

    const centerOnUser = () => {
        if (userLocation && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            }, 1000);
        }
    };

    const toggleMapStyle = () => {
        setMapStyle(prev => prev === 'gaming' ? 'cyberpunk' : 'gaming');
    };

    if (!userLocation) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loading}>
                    <Animated.View style={[
                        styles.loadingIcon,
                        {
                            transform: [{
                                rotate: radarAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                })
                            }]
                        }
                    ]}>
                        <Ionicons name="radar" size={60} color={colors.xpGold} />
                    </Animated.View>
                    <Text style={styles.loadingText}>🗺️ Inizializzazione Gaming Map...</Text>
                    <Text style={styles.loadingSubtext}>Scansione eventi in corso...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* XP Header con design gaming */}
            <View style={styles.xpHeader}>
                <GamingCard variant="dark" style={styles.xpCard}>
                    <XPProgressBar
                        currentXP={currentXP}
                        nextLevelXP={nextLevelXP}
                        level={currentLevel}
                    />
                </GamingCard>
            </View>

            {/* Gaming Controls */}
            <View style={styles.gamingControls}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={toggleMapStyle}
                >
                    <Ionicons
                        name={mapStyle === 'gaming' ? 'skull' : 'game-controller'}
                        size={24}
                        color={colors.xpGold}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => setShowRadar(!showRadar)}
                >
                    <Ionicons
                        name={showRadar ? 'radar' : 'eye-off'}
                        size={24}
                        color={showRadar ? colors.primary : colors.textLight}
                    />
                </TouchableOpacity>
            </View>

            {/* Mappa con Google Maps e stile gaming */}
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={getCurrentMapStyle()}
                initialRegion={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                showsUserLocation={false} // Disabiliamo quella di default
                showsMyLocationButton={false}
                showsCompass={false}
                showsTraffic={false}
                loadingEnabled={true}
                loadingIndicatorColor={colors.xpGold}
                mapPadding={{
                    top: 120,
                    right: 20,
                    bottom: user?.isPremium ? 20 : 100,
                    left: 20,
                }}
            >
                {/* Marker personalizzato per l'utente */}
                {userLocation && (
                    <Marker
                        coordinate={userLocation}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <UserLocationMarker level={currentLevel} />
                    </Marker>
                )}

                {/* Marker personalizzati per gli eventi */}
                {filteredEvents.map((event) => (
                    <Marker
                        key={event.id}
                        coordinate={{
                            latitude: event.latitude,
                            longitude: event.longitude,
                        }}
                        onPress={() => handleMarkerPress(event)}
                        anchor={{ x: 0.5, y: 1 }}
                    >
                        <CustomMapMarker
                            type={event.type}
                            xpReward={event.xpReward || 25}
                            isActive={selectedEvent?.id === event.id}
                            glowing={true}
                            size="medium"
                        />
                    </Marker>
                ))}

                {/* Radar effect intorno all'utente se abilitato */}
                {showRadar && userLocation && (
                    <Marker
                        coordinate={userLocation}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <Animated.View style={[
                            styles.radarCircle,
                            {
                                opacity: radarAnim.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [0.8, 0.3, 0]
                                }),
                                transform: [{
                                    scale: radarAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.5, 3]
                                    })
                                }]
                            }
                        ]} />
                    </Marker>
                )}
            </MapView>

            {/* Gaming HUD Bottom */}
            <View style={styles.gamingHUD}>
                <TouchableOpacity
                    style={styles.centerButton}
                    onPress={centerOnUser}
                >
                    <Ionicons name="locate" size={24} color={colors.xpGold} />
                </TouchableOpacity>

                <View style={styles.eventCounter}>
                    <Ionicons name="trophy" size={20} color={colors.xpGold} />
                    <Text style={styles.eventCountText}>
                        {filteredEvents.length} Quest
                    </Text>
                </View>
            </View>

            {/* Banner Premium/Free con stile gaming */}
            {!user?.isPremium && (
                <View style={styles.limitBanner}>
                    <GamingCard variant="secondary" style={styles.limitCard}>
                        <View style={styles.limitContent}>
                            <Ionicons name="shield" size={24} color={colors.secondary} />
                            <View style={styles.limitTextContainer}>
                                <Text style={styles.limitTitle}>⚡ Modalità Esploratore</Text>
                                <Text style={styles.limitSubtitle}>Raggio 5km • Upgrade per sbloccare tutto</Text>
                            </View>
                            <GamingButton
                                title="UPGRADE"
                                variant="xp"
                                size="small"
                                icon="star"
                                glowing
                            />
                        </View>
                    </GamingCard>
                </View>
            )}

            {/* Bottom Sheet per eventi */}
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
    gamingControls: {
        position: 'absolute',
        top: 120,
        right: theme.spacing.md,
        zIndex: 1000,
        gap: theme.spacing.sm,
    },
    controlButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.cardBackground,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.button,
        borderWidth: 2,
        borderColor: colors.primary,
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
    loadingIcon: {
        marginBottom: theme.spacing.lg,
    },
    loadingText: {
        color: colors.xpGold,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: theme.spacing.sm,
    },
    loadingSubtext: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    radarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: colors.primary,
        backgroundColor: 'transparent',
    },
    gamingHUD: {
        position: 'absolute',
        bottom: user?.isPremium ? 30 : 110,
        left: theme.spacing.md,
        right: theme.spacing.md,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
    },
    centerButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.cardBackground,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.glow,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    eventCounter: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cardBackground,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.borders.radius.pill,
        borderWidth: 2,
        borderColor: colors.primary,
        ...theme.shadows.button,
    },
    eventCountText: {
        marginLeft: theme.spacing.sm,
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    limitBanner: {
        position: 'absolute',
        bottom: 20,
        left: theme.spacing.md,
        right: theme.spacing.md,
        zIndex: 1000,
    },
    limitCard: {
        marginBottom: 0,
    },
    limitContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    limitTextContainer: {
        flex: 1,
    },
    limitTitle: {
        color: colors.textPrimary,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    limitSubtitle: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '500',
    },
});