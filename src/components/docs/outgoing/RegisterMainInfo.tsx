import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import type { IPropsOutgoingComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'
import { languageContent } from 'functions/language'

export const RegisterMainInfo: FC<IPropsOutgoingComponents> = ({ data }) => {
        const { t } = useTranslation()
        
        const details: IPropsCardComponent = {
                title: 'regDetails',
                items: [
                        {
                                label: 'typeDoc',
                                info: data?.outgoingDocument?.documentType?.nameRu,
                        },
                        {
                                label: 'questionNat',
                                info: data?.outgoingDocument?.questionNature?.nameRu,
                        },
                        {
                                label: 'indexCase',
                                info: data?.outgoingDocument?.caseIndex?.case,
                        },
                        {
                                label: 'formDoc',
                                info: t('elFormDoc'),
                        },
                ]
        }

        const execute: IPropsCardComponent = {
                title: 'regExecut',
                items: [
                        {
                                label: 'executors',
                                info: data?.outgoingDocument?.author?.getFullNameRu ? `${SplitName(data?.outgoingDocument?.author?.getFullNameRu)} (${data?.outgoingDocument?.author?.position?.nameRu})` : null,
                        },
                        {
                                label: 'languageDoc',
                                info: languageContent(data?.outgoingDocument?.language),
                        },
                        {
                                label: 'numberOfSheets',
                                info: `${data?.outgoingDocument?.sheetsQuantity || 0} / ${data?.outgoingDocument?.additionsQuantity || 0}`,
                        },
                ]
        }

        return (
                <>
                        <CardComponent {...details} />
                        <CardComponent {...execute}  />
                </>
        )
}