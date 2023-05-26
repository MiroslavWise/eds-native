import { FC } from 'react'
import moment from 'moment'

import type { IPropsInternalComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'
import { languageContent } from 'functions/language'
import { useTranslation } from 'react-i18next'

export const DetailsSender: FC<IPropsInternalComponents> = ({ data }) => {
        const { t } = useTranslation()

        const details: IPropsCardComponent = {
                title: 'regExecut',
                items: [
                        {
                                label: 'typeDoc',
                                info: data?.internalDocument?.author ? `${SplitName(data?.internalDocument?.author?.getFullNameRu)} (${data?.internalDocument?.author?.position?.nameRu})` : "",
                        },
                        {
                                label: 'languageDoc',
                                info: languageContent(data?.internalDocument?.language),
                        },
                        {
                                label: 'noteDoc',
                                info: data?.internalDocument?.note,
                        },
                        {
                                label: 'dateExecution',
                                info: data?.internalDocument?.periodOfExecution === null ? t('date30day') :  moment(data?.internalDocument?.periodOfExecution).format('LL'),
                        },
                ]
        }

        return (
                <CardComponent {...details} />
        )
}