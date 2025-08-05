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
            <StatusBar style="auto" />
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