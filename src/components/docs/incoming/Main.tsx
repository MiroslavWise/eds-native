import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import type { IPropsIncomingComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'
import { FREQUENCY } from 'functions/frenc'
import { languageContent } from 'functions/language'

export const Main: FC<IPropsIncomingComponents> = ({ data }) => {
        const { t } = useTranslation()
        
        const main: IPropsCardComponent = useMemo(() => ({
                title: 'regExecut',
                items: [
                        {
                                label: 'correspondent',
                                info: data?.incomingDocument?.correspondent?.nameRu,
                        },
                        {
                                label: 'sourceNumAndDate',
                                info: data?.incomingDocument?.originalNumber && data?.incomingDocument?.date && `${data?.incomingDocument?.originalNumber} / ${moment(data?.incomingDocument?.date).format('LL')}`,
                        },
                        {
                                label: 'author',
                                info: data?.incomingDocument?.author,
                        },
                        {
                                label: 'typeDoc',
                                info: data?.incomingDocument?.documentType?.nameRu,
                        },
                        {
                                label: 'questionNat',
                                info: data?.incomingDocument?.questionNature?.nameRu,
                        },
                        {
                                label: 'typeControl',
                                info: data?.incomingDocument?.controlType?.nameRu || t('NO_CONTROL'),
                        },
                        {
                                label: 'freqOfControl',
                                info: data && FREQUENCY?.includes(data?.incomingDocument?.frequencyOfControl) ? t(data?.incomingDocument?.frequencyOfControl) : '',
                        },
                        {
                                label: 'dateExecution',
                                info: data?.incomingDocument?.executionDate && moment(data?.incomingDocument?.executionDate).format('LL') || 'Нет даты исполнения',
                        },
                        {
                                label: 'languageDoc',
                                info: languageContent(data?.incomingDocument?.language),
                        },
                        {
                                label: 'numberOfSheets',
                                info: `${data?.incomingDocument?.sheetsQuantity || 0} / ${data?.incomingDocument?.additionsQuantity || 0}`
                        },
                ]
        }), [data?.incomingDocument])

        return (
                <CardComponent {...main} />
        )
}