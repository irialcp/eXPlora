// app.json
/*{
  "expo": {
    "name": "eXPlora",
    "slug": "explora",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      ""
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-location"
    ]
  }
}

// package.json
{
  "name": "explora",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.6",
    "@react-navigation/native": "^6.0.2",
    "@react-navigation/stack": "^6.0.7",
    "@react-navigation/bottom-tabs": "^6.0.5",
    "react-native-screens": "~3.22.0",
    "react-native-safe-area-context": "4.6.3",
    "react-native-maps": "1.7.1",
    "expo-location": "~16.1.0",
    "zustand": "^4.4.1",
    "react-native-vector-icons": "^10.0.0",
    "@expo/vector-icons": "^13.0.0",
    "react-native-gesture-handler": "~2.12.0",
    "react-native-reanimated": "~3.3.0",
    "@react-native-bottom-sheet/bottom-sheet": "^4.4.7"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}

// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Screens
import MapScreen from './src/screens/MapScreen';
import MissionsScreen from './src/screens/MissionsScreen';
import PointsScreen from './src/screens/PointsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ItineraryScreen from './src/screens/ItineraryScreen';
import LoginScreen from './src/screens/LoginScreen';

// Store
import { useAuthStore } from './src/store/authStore';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  const { user } = useAuthStore();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Mappa') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Missioni') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Punti') {
            iconName = focused ? 'star' : 'star-outline';
          } else if (route.name === 'Itinerari') {
            iconName = focused ? 'trail-sign' : 'trail-sign-outline';
          } else if (route.name === 'Profilo') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Mappa" component={MapScreen} />
      <Tab.Screen name="Missioni" component={MissionsScreen} />
      <Tab.Screen name="Punti" component={PointsScreen} />
      {user?.isPremium && (
        <Tab.Screen name="Itinerari" component={ItineraryScreen} />
      )}
      <Tab.Screen name="Profilo" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <NavigationContainer>
      <StatusBar styles="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// src/store/authStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  
  login: (userData) => set({
    isAuthenticated: true,
    user: userData
  }),
  
  logout: () => set({
    isAuthenticated: false,
    user: null
  }),
  
  upgradeToPremium: () => set((state) => ({
    user: { ...state.user, isPremium: true }
  }))
}));

// src/store/eventsStore.js
import { create } from 'zustand';
import { mockEvents } from '../data/mockData';

export const useEventsStore = create((set, get) => ({
  events: mockEvents,
  filteredEvents: mockEvents,
  userLocation: null,
  
  setUserLocation: (location) => set({ userLocation: location }),
  
  filterEventsByRadius: (radius) => {
    const { events, userLocation } = get();
    if (!userLocation) return;
    
    const filtered = events.filter(event => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        event.latitude,
        event.longitude
      );
      return distance <= radius;
    });
    
    set({ filteredEvents: filtered });
  },
  
  updateEvents: () => {
    // Simula aggiornamento in tempo reale
    setTimeout(() => {
      const { events } = get();
      const updatedEvents = events.map(event => ({
        ...event,
        participants: Math.floor(Math.random() * 100) + 10
      }));
      set({ events: updatedEvents, filteredEvents: updatedEvents });
    }, 5000);
  }
}));

// Funzione helper per calcolare la distanza
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Raggio della Terra in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// src/store/missionsStore.js
import { create } from 'zustand';
import { mockMissions } from '../data/mockData';

export const useMissionsStore = create((set, get) => ({
  missions: mockMissions,
  completedMissions: [],
  points: 0,
  
  completeMission: (missionId) => {
    const { missions, completedMissions, points } = get();
    const mission = missions.find(m => m.id === missionId);
    
    if (mission && !completedMissions.includes(missionId)) {
      set({
        completedMissions: [...completedMissions, missionId],
        points: points + mission.points
      });
    }
  },
  
  resetDailyMissions: () => {
    set({
      missions: mockMissions,
      completedMissions: []
    });
  }
}));

// src/data/mockData.js
export const mockEvents = [
  {
    id: 1,
    title: "Concerto Jazz al Parco",
    type: "music",
    latitude: 38.1157,
    longitude: 13.3613,
    description: "Serata di jazz sotto le stelle",
    time: "21:00",
    date: "2024-08-05",
    participants: 45,
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 2,
    title: "Mostra d'Arte Contemporanea",
    type: "museum",
    latitude: 38.1180,
    longitude: 13.3650,
    description: "Opere di artisti siciliani",
    time: "10:00-18:00",
    date: "2024-08-05",
    participants: 23,
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 3,
    title: "Festival della Pizza",
    type: "event",
    latitude: 38.1140,
    longitude: 13.3580,
    description: "Le migliori pizzerie della città",
    time: "19:00",
    date: "2024-08-05",
    participants: 78,
    image: "https://via.placeholder.com/300x200"
  }
];

export const mockMissions = [
  {
    id: 1,
    title: "Visita un museo",
    description: "Scopri l'arte locale visitando un museo nelle vicinanze",
    points: 50,
    type: "museum",
    icon: "library"
  },
  {
    id: 2,
    title: "Partecipa a un evento musicale",
    description: "Ascolta musica dal vivo in città",
    points: 30,
    type: "music",
    icon: "musical-notes"
  },
  {
    id: 3,
    title: "Prova un piatto locale",
    description: "Assaggia una specialità del territorio",
    points: 25,
    type: "food",
    icon: "restaurant"
  }
];

export const mockRewards = [
  {
    id: 1,
    title: "Sconto 20% Ristorante Da Mario",
    description: "Valido per cene",
    cost: 100,
    category: "food"
  },
  {
    id: 2,
    title: "Ingresso gratuito Museo Archeologico",
    description: "Valido per 1 persona",
    cost: 150,
    category: "culture"
  },
  {
    id: 3,
    title: "Aperitivo gratuito Bar Centrale",
    description: "Dalle 18:00 alle 20:00",
    cost: 75,
    category: "drinks"
  }
];

// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { useAuthStore } from '../store/authStore';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Errore', 'Inserisci email e password');
      return;
    }
    
    // Mock login
    const userData = {
      id: 1,
      email: email,
      name: email.split('@')[0],
      isPremium: email.includes('premium')
    };
    
    login(userData);
  };
  
  const handleGuestLogin = () => {
    const guestData = {
      id: 2,
      email: 'guest@explora.com',
      name: 'Ospite',
      isPremium: false
    };
    
    login(guestData);
  };
  
  return (
    <SafeAreaView styles={styles.container}>
      <View styles={styles.content}>
        <Text styles={styles.title}>eXPlora</Text>
        <Text styles={styles.subtitle}>Scopri la cultura intorno a te</Text>
        
        <View styles={styles.form}>
          <TextInput
            styles={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            styles={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity styles={styles.loginButton} onPress={handleLogin}>
            <Text styles={styles.loginButtonText}>Accedi</Text>
          </TouchableOpacity>
          
          <TouchableOpacity styles={styles.guestButton} onPress={handleGuestLogin}>
            <Text styles={styles.guestButtonText}>Continua come ospite</Text>
          </TouchableOpacity>
          
          <Text styles={styles.hint}>
            Suggerimento: usa "premium@test.com" per account premium
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginBottom: 50,
  },
  form: {
    gap: 15,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  guestButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  guestButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  hint: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginTop: 20,
  },
});

// src/screens/MapScreen.js
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
      <SafeAreaView styles={styles.container}>
        <View styles={styles.loading}>
          <Text>Caricamento mappa...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView styles={styles.container}>
      <MapView
        styles={styles.map}
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
        <View styles={styles.limitBanner}>
          <Text styles={styles.limitText}>
            Versione gratuita: eventi entro 5km
          </Text>
          <TouchableOpacity styles={styles.upgradeButton}>
            <Text styles={styles.upgradeText}>Passa a Premium</Text>
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

// src/components/EventBottomSheet.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EventBottomSheet({ event, onClose }) {
  if (!event) return null;
  
  const getTypeIcon = (type) => {
    switch (type) {
      case 'music': return 'musical-notes';
      case 'museum': return 'library';
      case 'event': return 'calendar';
      default: return 'location';
    }
  };
  
  return (
    <Modal
      visible={!!event}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View styles={styles.overlay}>
        <TouchableOpacity styles={styles.backdrop} onPress={onClose} />
        <View styles={styles.bottomSheet}>
          <View styles={styles.handle} />
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{ uri: event.image }} styles={styles.image} />
            
            <View styles={styles.content}>
              <View styles={styles.header}>
                <View styles={styles.typeContainer}>
                  <Ionicons 
                    name={getTypeIcon(event.type)} 
                    size={20} 
                    color="#007AFF" 
                  />
                  <Text styles={styles.typeText}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Text>
                </View>
                
                <TouchableOpacity onPress={onClose}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              
              <Text styles={styles.title}>{event.title}</Text>
              <Text styles={styles.description}>{event.description}</Text>
              
              <View styles={styles.details}>
                <View styles={styles.detailRow}>
                  <Ionicons name="time" size={16} color="#666" />
                  <Text styles={styles.detailText}>{event.time}</Text>
                </View>
                
                <View styles={styles.detailRow}>
                  <Ionicons name="calendar" size={16} color="#666" />
                  <Text styles={styles.detailText}>{event.date}</Text>
                </View>
                
                <View styles={styles.detailRow}>
                  <Ionicons name="people" size={16} color="#666" />
                  <Text styles={styles.detailText}>
                    {event.participants} partecipanti
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity styles={styles.actionButton}>
                <Text styles={styles.actionButtonText}>Partecipa</Text>
              </TouchableOpacity>
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
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  typeText: {
    marginLeft: 5,
    color: '#007AFF',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  details: {
    gap: 10,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

// src/screens/MissionsScreen.js
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
    <SafeAreaView styles={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View styles={styles.header}>
          <Text styles={styles.title}>Missioni di oggi</Text>
          <View styles={styles.pointsContainer}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text styles={styles.pointsText}>{points} punti</Text>
          </View>
        </View>
        
        <View styles={styles.missionsContainer}>
          {missions.map((mission) => {
            const isCompleted = completedMissions.includes(mission.id);
            
            return (
              <View key={mission.id} styles={styles.missionCard}>
                <View styles={styles.missionHeader}>
                  <View styles={styles.missionIcon}>
                    <Ionicons 
                      name={mission.icon} 
                      size={24} 
                      color={isCompleted ? '#4CAF50' : '#007AFF'} 
                    />
                  </View>
                  <View styles={styles.missionInfo}>
                    <Text styles={styles.missionTitle}>{mission.title}</Text>
                    <Text styles={styles.missionDescription}>
                      {mission.description}
                    </Text>
                  </View>
                  <View styles={styles.pointsBadge}>
                    <Text styles={styles.pointsBadgeText}>+{mission.points}</Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  styles={[
                    styles.actionButton,
                    isCompleted && styles.completedButton
                  ]}
                  onPress={() => handleCompleteMission(mission.id)}
                  disabled={isCompleted}
                >
                  <Text styles={[
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
        
        <View styles={styles.progressSection}>
          <Text styles={styles.progressTitle}>Progresso giornaliero</Text>
          <View styles={styles.progressBar}>
            <View 
              styles={[
                styles.progressFill,
                { width: `${(completedMissions.length / missions.length) * 100}%` }
              ]} 
            />
          </View>
          <Text styles={styles.progressText}>
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

// src/screens/PointsScreen.js
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
    <SafeAreaView styles={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View styles={styles.header}>
          <Text styles={styles.title}>I miei punti</Text>
          <View styles={styles.pointsCard}>
            <Ionicons name="star" size={40} color="#FFD700" />
            <Text styles={styles.pointsNumber}>{points}</Text>
            <Text styles={styles.pointsLabel}>punti disponibili</Text>
          </View>
        </View>
        
        <View styles={styles.section}>
          <Text styles={styles.sectionTitle}>Premi disponibili</Text>
          
          <View styles={styles.rewardsContainer}>
            {mockRewards.map((reward) => {
              const canAfford = points >= reward.cost;
              
              return (
                <View key={reward.id} styles={styles.rewardCard}>
                  <View styles={styles.rewardHeader}>
                    <View styles={[styles.categoryIcon, !canAfford && styles.disabledIcon]}>
                      <Ionicons 
                        name={getCategoryIcon(reward.category)} 
                        size={24} 
                        color={canAfford ? '#007AFF' : '#ccc'} 
                      />
                    </View>
                    <View styles={styles.rewardInfo}>
                      <Text styles={[styles.rewardTitle, !canAfford && styles.disabledText]}>
                        {reward.title}
                      </Text>
                      <Text styles={[styles.rewardDescription, !canAfford && styles.disabledText]}>
                        {reward.description}
                      </Text>
                    </View>
                  </View>
                  
                  <View styles={styles.rewardFooter}>
                    <View styles={styles.costContainer}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text styles={styles.costText}>{reward.cost} punti</Text>
                    </View>
                    
                    <TouchableOpacity 
                      styles={[
                        styles.redeemButton,
                        !canAfford && styles.disabledButton
                      ]}
                      onPress={() => handleRedeemReward(reward)}
                      disabled={!canAfford}
                    >
                      <Text styles={[
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
        
        <View styles={styles.section}>
          <Text styles={styles.sectionTitle}>Come guadagnare punti</Text>
          <View styles={styles.tipsContainer}>
            <View styles={styles.tip}>
              <Ionicons name="trophy" size={20} color="#007AFF" />
              <Text styles={styles.tipText}>Completa le missioni giornaliere</Text>
            </View>
            <View styles={styles.tip}>
              <Ionicons name="location" size={20} color="#007AFF" />
              <Text styles={styles.tipText}>Partecipa agli eventi</Text>
            </View>
            <View styles={styles.tip}>
              <Ionicons name="people" size={20} color="#007AFF" />
              <Text styles={styles.tipText}>Invita amici all'app</Text>
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

// src/screens/ProfileScreen.js
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
import { useAuthStore } from '../store/authStore';
import { useMissionsStore } from '../store/missionsStore';

export default function ProfileScreen() {
  const { user, logout, upgradeToPremium } = useAuthStore();
  const { points, completedMissions } = useMissionsStore();
  
  const handleUpgrade = () => {
    Alert.alert(
      'Passa a Premium',
      'Vuoi passare alla versione Premium per accedere a tutte le funzionalità?',
      [
        { text: 'Annulla', styles: 'cancel' },
        { 
          text: 'Upgrade', 
          onPress: () => {
            upgradeToPremium();
            Alert.alert('Congratulazioni!', 'Ora sei un utente Premium!');
          }
        }
      ]
    );
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Disconnetti',
      'Sei sicuro di voler uscire?',
      [
        { text: 'Annulla', styles: 'cancel' },
        { text: 'Esci', onPress: logout, styles: 'destructive' }
      ]
    );
  };
  
  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View styles={styles.header}>
          <View styles={styles.profileInfo}>
            <View styles={styles.avatar}>
              <Text styles={styles.avatarText}>
                {user?.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text styles={styles.name}>{user?.name}</Text>
            <Text styles={styles.email}>{user?.email}</Text>
            {user?.isPremium && (
              <View styles={styles.premiumBadge}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text styles={styles.premiumText}>Premium</Text>
              </View>
            )}
          </View>
        </View>
        
        <View styles={styles.statsSection}>
          <Text styles={styles.sectionTitle}>Le tue statistiche</Text>
          <View styles={styles.statsContainer}>
            <View styles={styles.statCard}>
              <Ionicons name="star" size={24} color="#FFD700" />
              <Text styles={styles.statNumber}>{points}</Text>
              <Text styles={styles.statLabel}>Punti totali</Text>
            </View>
            <View styles={styles.statCard}>
              <Ionicons name="trophy" size={24} color="#4CAF50" />
              <Text styles={styles.statNumber}>{completedMissions.length}</Text>
              <Text styles={styles.statLabel}>Missioni completate</Text>
            </View>
          </View>
        </View>
        
        <View styles={styles.menuSection}>
          <Text styles={styles.sectionTitle}>Impostazioni</Text>
          
          {!user?.isPremium && (
            <TouchableOpacity styles={styles.upgradeCard} onPress={handleUpgrade}>
              <View styles={styles.upgradeContent}>
                <Ionicons name="star" size={24} color="#FFD700" />
                <View styles={styles.upgradeText}>
                  <Text styles={styles.upgradeTitle}>Passa a Premium</Text>
                  <Text styles={styles.upgradeDescription}>
                    Accedi a tutti gli eventi e agli itinerari personalizzati
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#007AFF" />
              </View>
            </TouchableOpacity>
          )}
          
          <View styles={styles.menuContainer}>
            <TouchableOpacity styles={styles.menuItem}>
              <Ionicons name="notifications" size={20} color="#666" />
              <Text styles={styles.menuText}>Notifiche</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
            
            <TouchableOpacity styles={styles.menuItem}>
              <Ionicons name="help-circle" size={20} color="#666" />
              <Text styles={styles.menuText}>Aiuto e supporto</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
            
            <TouchableOpacity styles={styles.menuItem}>
              <Ionicons name="information-circle" size={20} color="#666" />
              <Text styles={styles.menuText}>Informazioni</Text>
              <Ionicons name="chevron-forward" size={20} color="#ccc" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              styles={[styles.menuItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <Ionicons name="log-out" size={20} color="#FF3B30" />
              <Text styles={[styles.menuText, styles.logoutText]}>Disconnetti</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  premiumText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  menuSection: {
    padding: 20,
  },
  upgradeCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  upgradeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upgradeText: {
    flex: 1,
    marginLeft: 15,
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  upgradeDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#FF3B30',
  },
});

// src/screens/ItineraryScreen.js
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
    <SafeAreaView styles={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View styles={styles.header}>
          <Text styles={styles.title}>Itinerari personalizzati</Text>
          <Text styles={styles.subtitle}>
            Lascia che l'AI crei il tuo itinerario perfetto
          </Text>
        </View>
        
        <View styles={styles.formSection}>
          <Text styles={styles.formTitle}>Pianifica il tuo viaggio</Text>
          
          <View styles={styles.inputGroup}>
            <Text styles={styles.label}>Seleziona città</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View styles={styles.citySelector}>
                {cities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    styles={[
                      styles.cityButton,
                      selectedCity === city && styles.selectedCityButton
                    ]}
                    onPress={() => setSelectedCity(city)}
                  >
                    <Text styles={[
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
          
          <View styles={styles.inputGroup}>
            <Text styles={styles.label}>Durata (giorni)</Text>
            <View styles={styles.daysSelector}>
              {[1, 2, 3, 4, 5].map((days) => (
                <TouchableOpacity
                  key={days}
                  styles={[
                    styles.dayButton,
                    selectedDays === days && styles.selectedDayButton
                  ]}
                  onPress={() => setSelectedDays(days)}
                >
                  <Text styles={[
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
            styles={[styles.generateButton, isGenerating && styles.generatingButton]}
            onPress={generateItinerary}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Text styles={styles.generateButtonText}>Generazione in corso...</Text>
            ) : (
              <>
                <Ionicons name="sparkles" size={20} color="white" />
                <Text styles={styles.generateButtonText}>Genera itinerario</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        
        {generatedItinerary && (
          <View styles={styles.itinerarySection}>
            <Text styles={styles.itineraryTitle}>
              Itinerario per {generatedItinerary.city}
            </Text>
            <Text styles={styles.itinerarySubtitle}>
              {generatedItinerary.days} {generatedItinerary.days === 1 ? 'giorno' : 'giorni'}
            </Text>
            
            <View styles={styles.stopsContainer}>
              {generatedItinerary.stops.map((stop, index) => (
                <View key={stop.id} styles={styles.stopCard}>
                  <View styles={styles.stopHeader}>
                    <View styles={styles.stepNumber}>
                      <Text styles={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <View styles={styles.stopInfo}>
                      <Text styles={styles.stopName}>{stop.name}</Text>
                      <Text styles={styles.stopDescription}>{stop.description}</Text>
                    </View>
                    <View styles={styles.stopIcon}>
                      <Ionicons 
                        name={getStopIcon(stop.type)} 
                        size={20} 
                        color="#007AFF" 
                      />
                    </View>
                  </View>
                  
                  <View styles={styles.stopDetails}>
                    <View styles={styles.timeInfo}>
                      <Ionicons name="time" size={16} color="#666" />
                      <Text styles={styles.timeText}>{stop.time}</Text>
                    </View>
                    <View styles={styles.durationInfo}>
                      <Ionicons name="hourglass" size={16} color="#666" />
                      <Text styles={styles.durationText}>{stop.duration}</Text>
                    </View>
                  </View>
                  
                  {index < generatedItinerary.stops.length - 1 && (
                    <View styles={styles.connector} />
                  )}
                </View>
              ))}
            </View>
            
            <TouchableOpacity styles={styles.saveButton}>
              <Ionicons name="bookmark" size={20} color="white" />
              <Text styles={styles.saveButtonText}>Salva itinerario</Text>
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
    borderColor: '#007AFF',*/