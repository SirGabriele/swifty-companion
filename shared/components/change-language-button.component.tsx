import {Image, Pressable, View} from 'react-native';
import React from "react";
import {HandledLanguages} from "@/constants/types/HandledLanguages.type";
import {HandledLanguagesList} from "@/constants/types/HandledLanguages.type";
import useLanguageStore, {LangRequireSource} from "@/stores/change-language.store";

export default function ChangeLanguageButton() {
    const {isLangListShown, openCloseLangList, selectedLanguage, changeLanguage, flagsImgSrc} = useLanguageStore();

    const filteredLangList = Object.entries(HandledLanguagesList).filter(([_, value]) => value !== selectedLanguage);

    const handleOnPress = () => openCloseLangList();
    const handleChangeLanguage = (lang: HandledLanguages) => () => changeLanguage(lang);

    return (
        <View>
            {/* Display the currently selected language */}
            <Pressable onPress={handleOnPress}>
                <Image source={flagsImgSrc[selectedLanguage as keyof LangRequireSource]}></Image>
            </Pressable>
            {/* When the language list is shown, displays all the other language choices */}
            {isLangListShown && filteredLangList.map(([key, value]) => (
                <Pressable key={key} onPress={handleChangeLanguage(value as HandledLanguages)}>
                    <Image source={flagsImgSrc[value as keyof LangRequireSource]}/>
                </Pressable>
            ))}
        </View>
    );
}
