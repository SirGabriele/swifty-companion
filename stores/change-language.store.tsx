import {create} from 'zustand';
import {handledLanguages} from "@/types/handledLanguages.type";
import {ImageRequireSource} from "react-native/Libraries/Image/ImageSource";
import {Dimensions} from "react-native";
import GLOBAL_VALUES from "@/constants/Values";
import i18next from "@/services/i18next";

type LanguageStore = {
    isLangListShown: boolean,
    openCloseLangList: () => void,
    selectedLanguage: string,
    changeLanguage: (lang: handledLanguages) => void,
    flagsImgSrc: LangRequireSource,
}

export type LangRequireSource = {
    fr: ImageRequireSource,
    en: ImageRequireSource,
    es: ImageRequireSource,
}

/**
 * Require the correct icon depending on to the screen's size :
 * 1. Find the shortest length of the screen (between width and height)<br/>
 * 2. Multiply this value by GLOBAL_VALUES.FLAG_ICON_SIZE_TO_SCREEN_RATIO<br/>
 * 3. Browse through the array of resolutions to find the closest one
 * 4. Require and return the appropriate files
 */
function getCorrectSource(): LangRequireSource {
    const {width, height} = Dimensions.get('window');
    const shortestLength = Math.min(width, height)
    const targetValue = shortestLength * GLOBAL_VALUES.FLAG_ICON_SIZE_TO_SCREEN_RATIO;
    const resolutionToUse = GLOBAL_VALUES.IMG_RESOLUTIONS.reduce((prev, curr) =>
        Math.abs(curr - targetValue) < Math.abs(prev - targetValue) ? curr : prev
    );

    switch (resolutionToUse) {
        case 32: {
            return {
                fr: require(`@/assets/flags/flag_fr_32x32.png`),
                en: require(`@/assets/flags/flag_uk_32x32.png`),
                es: require(`@/assets/flags/flag_es_32x32.png`),
            }
        }
        case 64:
        default: {
            return {
                fr: require(`@/assets/flags/flag_fr_64x64.png`),
                en: require(`@/assets/flags/flag_uk_64x64.png`),
                es: require(`@/assets/flags/flag_es_64x64.png`),
            }
        }
        case 128: {
            return {
                fr: require(`@/assets/flags/flag_fr_128x128.png`),
                en: require(`@/assets/flags/flag_uk_128x128.png`),
                es: require(`@/assets/flags/flag_es_128x128.png`),
            }
        }
    }
}

const useLanguageStore = create<LanguageStore>((set, get) => ({
    isLangListShown: false,
    openCloseLangList: () => {
        set({isLangListShown: !get().isLangListShown})
    },
    selectedLanguage: i18next.language,
    changeLanguage: (lang) => {
        i18next.changeLanguage(lang).then(() => {
            set({isLangListShown: false, selectedLanguage: lang});
        });
    },
    flagsImgSrc: getCorrectSource(),
}));

export default useLanguageStore;
