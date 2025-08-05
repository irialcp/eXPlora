// src/styles/theme.js
const colors = require('./colors');

const theme = {
    colors,

    // Gaming Typography
    typography: {
        h1: {
            fontSize: 32,
            fontWeight: 'bold',
            letterSpacing: -0.5,
        },
        h2: {
            fontSize: 24,
            fontWeight: 'bold',
            letterSpacing: -0.3,
        },
        h3: {
            fontSize: 20,
            fontWeight: '600',
            letterSpacing: -0.2,
        },
        body: {
            fontSize: 16,
            fontWeight: '400',
            lineHeight: 22,
        },
        caption: {
            fontSize: 14,
            fontWeight: '500',
        },
        xpCounter: {
            fontSize: 18,
            fontWeight: 'bold',
            letterSpacing: 0.5,
        }
    },

    // Gaming Shadows
    shadows: {
        card: {
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
        },
        button: {
            shadowColor: colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
        },
        glow: {
            shadowColor: colors.xpGold,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 10,
            elevation: 8,
        }
    },

    // Gaming Borders
    borders: {
        radius: {
            small: 8,
            medium: 12,
            large: 16,
            xl: 20,
            pill: 50,
        },
        gaming: {
            borderWidth: 2,
            borderColor: colors.primary,
        }
    },

    // Gaming Spacing
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    }
};

module.exports = theme;
module.exports.theme = theme;
module.exports.colors = colors;
module.exports.default = theme;