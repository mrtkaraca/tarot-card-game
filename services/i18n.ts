import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from '@/constants/localization';

const languageResources = {
    en:{
        translation:en
    }
}

i18n
.use(initReactI18next)
.init({
    lng:'en',
    fallbackLng: 'en',
    resources: languageResources
});

export default i18n;