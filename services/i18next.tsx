import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import fr from '@/assets/locales/fr.json';
import en from '@/assets/locales/en.json';
import es from '@/assets/locales/es.json';

const languageResources = {
    fr: {translation: fr},
    en: {translation: en},
    es: {translation: es},
};

i18next.use(initReactI18next).init(
    {
        compatibilityJSON: 'v4',
        lng: 'en',
        fallbackLng: 'en',
        resources: languageResources,
    },
    (err) => {
        if (err) {
            console.error('i18next initialization error:', err);
        } else {
            console.debug('i18next initialized successfully');
        }
    }
);

export default i18next;
