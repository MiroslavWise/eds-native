import { i18n as i18nModel } from 'i18next';

const changeLanguage = (lng: string, i18n: i18nModel) => {
    i18n.changeLanguage(lng);
};

export default changeLanguage;
