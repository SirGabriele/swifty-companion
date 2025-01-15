import {ActivityIndicator, Animated, Image, Pressable, Text, View} from "react-native";
import {useFonts} from "expo-font";
import GLOBAL_COLORS from "@/constants/Colors";
import {ScaledSheet} from 'react-native-size-matters'
import {useEffect} from "react";
import {router} from "expo-router";
import GLOBAL_NAMES from "@/constants/Names";
import {useFadeInFadeOutAnimStore} from "@/stores/animations/fade-in-fade-out.anim.store";

export default function WelcomeScreen() {
    const {fadeAnim, startAnim} = useFadeInFadeOutAnimStore();

    useEffect(() => {
        startAnim();
    });

    const [fontsLoaded] = useFonts({
        'Kranky-Regular': require('@/assets/fonts/Kranky-Regular.ttf'),
    })

    const enterApp = () => {
        router.replace('/search');
    }

    return !fontsLoaded ? (
        <View style={styles.pageContainer}>
            <Text>Font is loading...</Text>
            <ActivityIndicator size="small"/>
        </View>
    ) : (
        <Pressable onPress={() => enterApp()} style={styles.pageContainer}>
            <View style={styles.topLevelContent}>
                <Text style={styles.title}>Welcome to</Text>
                <Image source={require('@/assets/gif/rotating-earth.gif')} style={styles.image}
                       resizeMode={'contain'}/>
                <Text style={styles.title}>{GLOBAL_NAMES.APP_TITLE}!</Text>
                <Animated.Text style={[styles.subTitle, {opacity: fadeAnim}]}>
                    (Touch anywhere to enter)
                </Animated.Text>
            </View>
        </Pressable>
    )
}

const styles = ScaledSheet.create({
    image: {
        height: '150@s',
    },
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GLOBAL_COLORS.WELCOME_PAGE.BACKGROUND_COLOR,
    },
    subTitle: {
        fontSize: '13@s',
        fontFamily: 'Kranky-Regular',
    },
    topLevelContent: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Kranky-Regular',
        fontSize: '30@s',
        marginBottom: '10@s',
    },
});