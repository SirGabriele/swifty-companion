import {Stack} from "expo-router";
import ChangeLanguageButton from "@/shared/components/change-language-button.component";
import {StyleSheet, View} from "react-native";

export default function RootLayout() {
    return (
        <View style={styles.container}>
            <View style={styles.languageButtonContainer}>
                <ChangeLanguageButton/>
            </View>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="search"/>
            </Stack>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    languageButtonContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 10,
    },
});