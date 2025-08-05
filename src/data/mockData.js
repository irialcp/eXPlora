export const mockEvents = [
    {
        id: 1,
        title: "Concerto Jazz al Parco",
        type: "music",
        latitude: 38.1157,
        longitude: 13.3613,
        description: "Serata di jazz sotto le stelle con artisti locali",
        time: "21:00",
        date: "2024-08-05",
        participants: 45,
        xpReward: 50,
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 2,
        title: "Mostra d'Arte Contemporanea",
        type: "museum",
        latitude: 38.1180,
        longitude: 13.3650,
        description: "Opere innovative di artisti siciliani emergenti",
        time: "10:00-18:00",
        date: "2024-08-05",
        participants: 23,
        xpReward: 75,
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 3,
        title: "Festival della Pizza",
        type: "food",
        latitude: 38.1140,
        longitude: 13.3580,
        description: "Le migliori pizzerie della città in una sola location",
        time: "19:00",
        date: "2024-08-05",
        participants: 78,
        xpReward: 30,
        image: "https://via.placeholder.com/300x200"
    },
    {
        id: 4,
        title: "Caccia al Tesoro Urbana",
        type: "event",
        latitude: 38.1200,
        longitude: 13.3700,
        description: "Un'avventura interattiva per le strade del centro",
        time: "15:00",
        date: "2024-08-05",
        participants: 35,
        xpReward: 100,
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