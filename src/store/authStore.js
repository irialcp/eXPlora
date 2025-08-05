// src/store/authStore.js - Versione debug per risolvere il problema
import { create } from 'zustand';

export const useAuthStore = create((set, get) => ({
    isAuthenticated: true, // Impostiamo temporaneamente a true per debug
    user: {
        id: 1,
        name: 'Gaming Explorer',
        email: 'player@cityquest.com',
        isPremium: false, // Cambia a true per testare modalità premium
    },

    login: (userData) => {
        console.log('Login called with:', userData);
        set({
            isAuthenticated: true,
            user: userData
        });
    },

    logout: () => {
        console.log('Logout called');
        set({
            isAuthenticated: false,
            user: null
        });
    },

    upgradeToPremium: () => {
        console.log('Upgrade to premium called');
        set((state) => ({
            user: state.user ? { ...state.user, isPremium: true } : null
        }));
    },

    // Getter helper per accesso sicuro
    getUser: () => {
        const state = get();
        return state.user;
    },

    // Getter per verificare se è premium
    isPremium: () => {
        const state = get();
        return state.user?.isPremium || false;
    }
}));