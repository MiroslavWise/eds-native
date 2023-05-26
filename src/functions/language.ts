import type { TypeLanguage } from "../types/graphql"

export const languageContent = (lang: TypeLanguage | undefined) => {
        if(!lang) return ""
        const obj = {
                RU: 'Русский',
                KZ: 'Қазақша',
                EN: 'English',
                KZRU: 'Казахско-русский',
                OTHER: 'Другой',
                KZOTHER: 'Казахский-другой',
                KZOther: 'Казахский-другой',
                RUOTHER: 'Русский-другой',
                RUOther: 'Русский-другой',
        }

        return obj.hasOwnProperty(lang) ? obj[lang] : null
}