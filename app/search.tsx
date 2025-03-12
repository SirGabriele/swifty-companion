import {ImageBackground, Keyboard, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {ScaledSheet} from "react-native-size-matters";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import useFetchStore from "@/stores/fetch.store";
import {router} from "expo-router";
import {useNetInfo} from "@react-native-community/netinfo";

export default function Search() {
    const netInfo = useNetInfo();

    const [isFocused, setIsFocused] = useState(false);
    const [loginInput, setLoginInput] = useState<string | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);
    const {searchUser} = useFetchStore();
    const {t} = useTranslation();

    const clearInput = () => {
        setError(false);
        setLoginInput(undefined);
    }

    const dismissKeyboard = () => {
        if (isFocused) {
            Keyboard.dismiss();
        }
    }

    const isOnlyLetters = (loginInput: string): boolean => {
        return /^[ A-Za-z0-9_-]+$/.test(loginInput);
    }

    const submit = async () => {
        if (!loginInput) {
            return;
        }

        if (!isOnlyLetters(loginInput)) {
            setError(true);
            return;
        }

        if (await searchUser(loginInput.trim().toLowerCase()) !== 200) {
            setError(true);
            return;
        }

        router.push('/profile');
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <ImageBackground source={require('@/assets/images/background.jpg')}
                             style={[styles.pageContainer]}>
                {netInfo.isConnected
                    ? <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={t("SearchScreen.placeholder")}
                            inputMode='text'
                            maxLength={30}
                            value={loginInput}
                            onChangeText={val => {
                                setLoginInput(val);
                                if (error) setError(false);
                            }}
                            onSubmitEditing={submit}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}/>
                        <Ionicons style={styles.crossIcon} name="close-outline" onPress={clearInput}></Ionicons>
                        {error && <Text style={styles.errorMessage}>{t("SearchScreen.incorrectLogin")}</Text>}
                    </View>
                    : <View>
                        <Text style={styles.textWhite}>{t('SearchScreen.networkError')}</Text>
                    </View>
                }
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
}

const textFontSize = '9@s';
const iconFontSize = '20@s';

const styles = ScaledSheet.create({
    clearButton: {
        backgroundColor: 'yellow',
    },
    crossIcon: {
        position: 'absolute',
        right: '5@s',
        color: '#d8d8d8',
        zIndex: 2,
        fontSize: iconFontSize,
    },
    errorInput: {
        borderColor: 'red',
        color: 'red'
    },
    errorMessage: {
        position: 'absolute',
        top: '100%',
        marginTop: '2@s',
        color: 'red',
        fontSize: textFontSize
    },
    inputContainer: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        paddingLeft: '10@s',
        backgroundColor: 'white',
        borderWidth: '1@s',
        borderColor: '#d8d8d8',
        borderRadius: '5@s',
        fontSize: textFontSize,
    },
    textWhite: {
        color: 'white',
    }
});
