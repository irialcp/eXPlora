import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ItineraryScreen() {
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDays, setSelectedDays] = useState(1);
    const [generatedItinerary, setGeneratedItinerary] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const cities = ['Palermo', 'Catania', 'Messina', 'Siracusa', 'Agrigento', 'Trapani'];

    const generateItinerary = async () => {
        if (!selectedCity) {
            Alert.alert('Errore', 'Seleziona una città');
            return;
        }

        setIsGenerating(true);

        // Simula chiamata AI
        setTimeout(() => {
            const mockItinerary = {
                city: selectedCity,
                days: selectedDays,
                stops: [
                    {
                        id: 1,
                        name: `Centro Storico di ${selectedCity}`,
                        description: 'Passeggiata tra i monumenti principali',
                        time: '09:00',
                        duration: '2h',
                        type: 'culture'
                    },
                    {
                        id: 2,
                        name: 'Museo Archeologico',
                        description: 'Visita alle collezioni storiche',
                        time: '11:30',
                        duration: '1.5h',
                        type: 'museum'
                    },
                    {
                        id: 3,
                        name: 'Pranzo tipico',
                        description: 'Ristorante con cucina locale',
                        time: '13:00',
                        duration: '1h',
                        type: 'food'
                    },
                    {
                        id: 4,
                        name: 'Parco pubblico',
                        description: 'Relax e passeggiata nel verde',
                        time: '15:00',
                        duration: '1h',
                        type: 'nature'
                    }
                ]
            };

            setGeneratedItinerary(mockItinerary);
            setIsGenerating(false);
        }, 3000);
    };

    const getStopIcon = (type) => {
        switch (type) {
            case 'culture': return 'library';
            case 'museum': return 'business';
            case 'food': return 'restaurant';
            case 'nature': return 'leaf';
            default: return 'location';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Itinerari personalizzati</Text>
                    <Text style={styles.subtitle}>
                        Lascia che l'AI crei il tuo itinerario perfetto
                    </Text>
                </View>

                <View style={styles.formSection}>
                    <Text style={styles.formTitle}>Pianifica il tuo viaggio</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Seleziona città</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.citySelector}>
                                {cities.map((city) => (
                                    <TouchableOpacity
                                        key={city}
                                        style={[
                                            styles.cityButton,
                                            selectedCity === city && styles.selectedCityButton
                                        ]}
                                        onPress={() => setSelectedCity(city)}
                                    >
                                        <Text style={[
                                            styles.cityButtonText,
                                            selectedCity === city && styles.selectedCityButtonText
                                        ]}>
                                            {city}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Durata (giorni)</Text>
                        <View style={styles.daysSelector}>
                            {[1, 2, 3, 4, 5].map((days) => (
                                <TouchableOpacity
                                    key={days}
                                    style={[
                                        styles.dayButton,
                                        selectedDays === days && styles.selectedDayButton
                                    ]}
                                    onPress={() => setSelectedDays(days)}
                                >
                                    <Text style={[
                                        styles.dayButtonText,
                                        selectedDays === days && styles.selectedDayButtonText
                                    ]}>
                                        {days}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.generateButton, isGenerating && styles.generatingButton]}
                        onPress={generateItinerary}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <Text style={styles.generateButtonText}>Generazione in corso...</Text>
                        ) : (
                            <>
                                <Ionicons name="sparkles" size={20} color="white" />
                                <Text style={styles.generateButtonText}>Genera itinerario</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>

                {generatedItinerary && (
                    <View style={styles.itinerarySection}>
                        <Text style={styles.itineraryTitle}>
                            Itinerario per {generatedItinerary.city}
                        </Text>
                        <Text style={styles.itinerarySubtitle}>
                            {generatedItinerary.days} {generatedItinerary.days === 1 ? 'giorno' : 'giorni'}
                        </Text>

                        <View style={styles.stopsContainer}>
                            {generatedItinerary.stops.map((stop, index) => (
                                <View key={stop.id} style={styles.stopCard}>
                                    <View style={styles.stopHeader}>
                                        <View style={styles.stepNumber}>
                                            <Text style={styles.stepNumberText}>{index + 1}</Text>
                                        </View>
                                        <View style={styles.stopInfo}>
                                            <Text style={styles.stopName}>{stop.name}</Text>
                                            <Text style={styles.stopDescription}>{stop.description}</Text>
                                        </View>
                                        <View style={styles.stopIcon}>
                                            <Ionicons
                                                name={getStopIcon(stop.type)}
                                                size={20}
                                                color="#007AFF"
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.stopDetails}>
                                        <View style={styles.timeInfo}>
                                            <Ionicons name="time" size={16} color="#666" />
                                            <Text style={styles.timeText}>{stop.time}</Text>
                                        </View>
                                        <View style={styles.durationInfo}>
                                            <Ionicons name="hourglass" size={16} color="#666" />
                                            <Text style={styles.durationText}>{stop.duration}</Text>
                                        </View>
                                    </View>

                                    {index < generatedItinerary.stops.length - 1 && (
                                        <View style={styles.connector} />
                                    )}
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity style={styles.saveButton}>
                            <Ionicons name="bookmark" size={20} color="white" />
                            <Text style={styles.saveButtonText}>Salva itinerario</Text>
                        </TouchableOpacity>
                    </View>
                )}
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
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
    },
    formSection: {
        padding: 20,
    },
    formTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    citySelector: {
        flexDirection: 'row',
        gap: 10,
    },
    cityButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedCityButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF'
    }
});