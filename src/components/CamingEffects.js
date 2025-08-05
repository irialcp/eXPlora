// src/components/GamingEffects.js - Effetti speciali per la mappa
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const colors = require('../styles/colors');
const { width, height } = Dimensions.get('window');

// Effetto Radar Scanning
export const RadarEffect = ({ center, radius = 200, active = true }) => {
    const scanAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (active) {
            // Animazione radar rotante
            Animated.loop(
                Animated.timing(scanAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ).start();

            // Pulse effect
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [active]);

    if (!active) return null;

    return (
        <View style={[styles.radarContainer, { left: center.x - radius/2, top: center.y - radius/2 }]}>
            {/* Cerchi radar */}
            <View style={[styles.radarCircle, { width: radius, height: radius }]} />
            <View style={[styles.radarCircle, { width: radius * 0.7, height: radius * 0.7 }]} />
            <View style={[styles.radarCircle, { width: radius * 0.4, height: radius * 0.4 }]} />

            {/* Linea scanner rotante */}
            <Animated.View
                style={[
                    styles.radarLine,
                    {
                        width: radius / 2,
                        left: radius / 2,
                        top: radius / 2,
                        transform: [{
                            rotate: scanAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        }]
                    }
                ]}
            />

            {/* Pulse centrale */}
            <Animated.View
                style={[
                    styles.radarCenter,
                    {
                        left: radius / 2 - 5,
                        top: radius / 2 - 5,
                        opacity: pulseAnim,
                        transform: [{
                            scale: pulseAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1.2]
                            })
                        }]
                    }
                ]}
            />
        </View>
    );
};

// Effetto Matrix Rain per background
export const MatrixRain = ({ active = false }) => {
    const rainAnims = useRef(
        Array.from({ length: 20 }, () => new Animated.Value(-100))
    ).current;

    useEffect(() => {
        if (active) {
            const animations = rainAnims.map((anim, index) =>
                Animated.loop(
                    Animated.timing(anim, {
                        toValue: height + 100,
                        duration: 3000 + Math.random() * 2000,
                        useNativeDriver: true,
                    }),
                    { delay: index * 200 }
                )
            );

            Animated.parallel(animations).start();
        }
    }, [active]);

    if (!active) return null;

    return (
        <View style={styles.matrixContainer}>
            {rainAnims.map((anim, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.matrixDrop,
                        {
                            left: (index * width / 20) + Math.random() * 50,
                            transform: [{ translateY: anim }]
                        }
                    ]}
                />
            ))}
        </View>
    );
};

// Effetto Neon Glow per UI elements
export const NeonGlow = ({ children, color = colors.primary, intensity = 1 }) => {
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: intensity,
                    duration: 1000,
                    useNativeDriver: false,
                }),
                Animated.timing(glowAnim, {
                    toValue: intensity * 0.3,
                    duration: 1000,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.neonGlow,
                {
                    shadowColor: color,
                    shadowOpacity: glowAnim,
                    shadowRadius: glowAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 20]
                    }),
                }
            ]}
        >
            {children}
        </Animated.View>
    );
};

// Particelle fluttuanti
export const FloatingParticles = ({ count = 15, active = true }) => {
    const particleAnims = useRef(
        Array.from({ length: count }, () => ({
            x: new Animated.Value(Math.random() * width),
            y: new Animated.Value(Math.random() * height),
            opacity: new Animated.Value(0),
        }))
    ).current;

    useEffect(() => {
        if (active) {
            particleAnims.forEach((particle, index) => {
                // Movimento X
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(particle.x, {
                            toValue: Math.random() * width,
                            duration: 5000 + Math.random() * 3000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(particle.x, {
                            toValue: Math.random() * width,
                            duration: 5000 + Math.random() * 3000,
                            useNativeDriver: true,
                        }),
                    ])
                ).start();

                // Movimento Y
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(particle.y, {
                            toValue: Math.random() * height,
                            duration: 4000 + Math.random() * 4000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(particle.y, {
                            toValue: Math.random() * height,
                            duration: 4000 + Math.random() * 4000,
                            useNativeDriver: true,
                        }),
                    ])
                ).start();

                // Fade in/out
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(particle.opacity, {
                            toValue: 0.7,
                            duration: 2000,
                            useNativeDriver: true,
                        }),
                        Animated.timing(particle.opacity, {
                            toValue: 0.1,
                            duration: 2000,
                            useNativeDriver: true,
                        }),
                    ])
                ).start();
            });
        }
    }, [active]);

    if (!active) return null;

    return (
        <View style={styles.particlesContainer}>
            {particleAnims.map((particle, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.particle,
                        {
                            transform: [
                                { translateX: particle.x },
                                { translateY: particle.y }
                            ],
                            opacity: particle.opacity,
                        }
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    // Radar Styles
    radarContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radarCircle: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 9999,
        opacity: 0.3,
    },
    radarLine: {
        position: 'absolute',
        height: 2,
        backgroundColor: colors.xpGold,
        transformOrigin: '0% 50%',
    },
    radarCenter: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.xpGold,
    },

    // Matrix Styles
    matrixContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
    },
    matrixDrop: {
        position: 'absolute',
        width: 2,
        height: 20,
        backgroundColor: colors.primary,
        opacity: 0.6,
    },

    // Neon Glow
    neonGlow: {
        elevation: 10,
    },

    // Particles
    particlesContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
    },
    particle: {
        position: 'absolute',
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.xpGold,
    },
});