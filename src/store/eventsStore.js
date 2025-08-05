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