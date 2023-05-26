import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import type { IPropsInternalComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

export const RegistrationDetails: FC<IPropsInternalComponents> = ({ data }) => {
        const { t } = useTranslation()
        
        const main: IPropsCardComponent = {
                title: 'regDetails',
                items: [
                        {
                                label: 'typeDoc',
                                info: data?.internalDocument?.documentType?.nameRu,
                        },
                        {
                                label: 'questionNat',
                                info: data?.internalDocument?.questionNature?.nameRu,
                        },
                        {
                                label: 'indexCase',
                                info: data?.internalDocument?.caseIndex?.caseName,
                        },
                        {
                                label: 'formDoc',
                                info: t('elFormDoc'),
                        }
                ],
        }

        return (
                <CardComponent {...main} />
        )
}