import i18nPlugin from 'i18next';
import { initReactI18next } from 'react-i18next';

import ru from 'constants/translation/ru'
import kz from 'constants/translation/kz'
import en from 'constants/translation/en'

export default i18nPlugin
        .use(initReactI18next)
        .init({
                resources: {
                        ru: { translations: ru },
                        en: { translations: en },
                        kz: { translations: kz },
                },
                fallbackLng: 'ru',
                keySeparator: false,
                supportedLngs: ['ru', 'en', 'kz'],
                ns: ['translations'],
                defaultNS: 'translations',
                interpolation: {
                        escapeValue: false,
                },
});