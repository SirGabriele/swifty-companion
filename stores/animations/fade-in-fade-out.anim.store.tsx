import {create} from 'zustand';
import {Animated} from "react-native";

type FadeInFadeOutAnimStore = {
    fadeAnim: Animated.Value;
    startAnim: () => void;
}

export const useFadeInFadeOutAnimStore = create<FadeInFadeOutAnimStore>()((_, get) => ({
    fadeAnim: new Animated.Value(0),
    startAnim: () => {
        const {fadeAnim} = get();
        // Loop the fade-in and fade-out animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1, // Fade in (opacity 1)
                    duration: 2000,
                    useNativeDriver: true, // Execute the animation on the native side of the app. Optimized for performance
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0, // Fade out (opacity 0)
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    },
}))