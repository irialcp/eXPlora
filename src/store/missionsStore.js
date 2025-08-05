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