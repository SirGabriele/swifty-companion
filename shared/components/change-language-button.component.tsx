import {Image, Pressable, View} from 'react-native';
import {handledLanguages} from "@/constants/types/handled-languages.type";
import {handledLanguagesList} from "@/constants/types/handled-languages.type";
import useLanguageStore, {LangRequireSource} from "@/stores/change-language.store";

export default function ChangeLanguageButton() {
    const {isLangListShown, openCloseLangList, selectedLanguage, changeLanguage, flagsImgSrc} = useLanguageStore();

    const filteredLangList = Object.entries(handledLanguagesList).filter(([_, value]) => value !== selectedLanguage);

    const handleOnPress = () => openCloseLangList();
    const handleChangeLanguage = (lang: handledLanguages) => () => changeLanguage(lang);

    return (
        <View>
            {/* Display the currently selected language */}
            <Pressable onPress={handleOnPress} hitSlop={10}>
                <Image source={flagsImgSrc[selectedLanguage as keyof LangRequireSource]}></Image>
            </Pressable>
            {/* When the language list is shown, displays all the other language choices */}
            {isLangListShown && filteredLangList.map(([key, value]) => (
                <Pressable hitSlop={{left: 20}} key={key} onPress={handleChangeLanguage(value as handledLanguages)}>
                    <Image source={flagsImgSrc[value as keyof LangRequireSource]}/>
                </Pressable>
            ))}
        </View>
    );
}
