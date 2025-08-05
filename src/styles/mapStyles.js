// src/styles/mapStyles.js - Stile Gaming Ultra per Google Maps
export const ultraGamingMapStyle = [
    // Sfondo generale dark con tinta gaming
    {
        elementType: 'geometry',
        stylers: [
            { color: '#0a0a0a' }, // Nero profondo
            { lightness: -20 }
        ]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            { color: '#17726d' }, // Primary teal per il testo
            { weight: 'bold' }
        ]
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            { color: '#000000' },
            { weight: 3 }
        ]
    },

    // Strade con effetto neon
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
            { color: '#1a1a1a' },
            { lightness: 10 }
        ]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
            { color: '#17726d' }, // Primary teal per i bordi strade
            { lightness: -10 },
            { weight: 1 }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
            { color: '#d4692b' }, // Secondary orange per autostrade
            { lightness: -20 }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
            { color: '#ffa726' }, // XP gold per bordi autostrade
            { lightness: 20 },
            { weight: 2 }
        ]
    },

    // Acqua con effetto cyber
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
            { color: '#0f4f4b' }, // Primary dark per acqua
            { lightness: -30 }
        ]
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
            { color: '#17726d' }, // Primary teal
            { lightness: -40 }
        ]
    },

    // Parchi e aree verdi con tinta gaming
    {
        featureType: 'landscape.natural',
        elementType: 'geometry',
        stylers: [
            { color: '#1a2e1a' }, // Verde scuro gaming
            { saturation: 30 }
        ]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
            { color: '#2d4a2d' }, // Verde medio gaming
            { lightness: -20 }
        ]
    },

    // Edifici con effetto futuristico
    {
        featureType: 'poi.business',
        elementType: 'geometry',
        stylers: [
            { color: '#2d2d2d' },
            { lightness: -10 }
        ]
    },
    {
        featureType: 'poi.business',
        elementType: 'labels.text.fill',
        stylers: [
            { color: '#ffa726' } // XP gold per business
        ]
    },

    // Punti di interesse gaming
    {
        featureType: 'poi.attraction',
        elementType: 'geometry',
        stylers: [
            { color: '#4a1a4a' }, // Viola scuro
            { lightness: 10 }
        ]
    },
    {
        featureType: 'poi.attraction',
        elementType: 'labels.text.fill',
        stylers: [
            { color: '#ab47bc' } // Premium viola
        ]
    },

    // Transit con colori gaming
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
            { color: '#1a1a2e' },
            { lightness: 5 }
        ]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [
            { color: '#d4692b' } // Secondary orange
        ]
    },

    // Amministrative con bordi neon
    {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
            { color: '#17726d' },
            { lightness: 20 },
            { weight: 1 }
        ]
    },

    // Effetti speciali per landmark
    {
        featureType: 'poi.place_of_worship',
        elementType: 'geometry',
        stylers: [
            { color: '#4a4a1a' },
            { lightness: 15 }
        ]
    },
    {
        featureType: 'poi.place_of_worship',
        elementType: 'labels.text.fill',
        stylers: [
            { color: '#ffa726' }
        ]
    },

    // Nascondi elementi non necessari per look più pulito
    {
        featureType: 'poi.medical',
        elementType: 'labels',
        stylers: [
            { visibility: 'off' }
        ]
    },
    {
        featureType: 'poi.school',
        elementType: 'labels',
        stylers: [
            { visibility: 'simplified' }
        ]
    }
];

// Stile alternativo più estremo
export const cyberpunkMapStyle = [
    {
        elementType: 'geometry',
        stylers: [{ color: '#000000' }]
    },
    {
        elementType: 'labels.text.fill',
        stylers: [{ color: '#00ff41' }] // Matrix green
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            { color: '#000000' },
            { weight: 2 }
        ]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#1a1a1a' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [
            { color: '#00ff41' },
            { weight: 1 }
        ]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#ff0080' }] // Neon pink
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#0080ff' }] // Neon blue
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#004d00' }] // Dark green
    }
];