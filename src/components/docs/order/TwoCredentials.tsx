import { FC, useMemo } from 'react'
import moment from 'moment'

import type { IPropsOrderComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { languageContent } from 'functions/language'
import { SplitName } from 'functions/split-name'

export const TwoCredentials: FC<IPropsOrderComponents> = ({ data }) => { 

        const source: IPropsCardComponent = useMemo(() => ({
                title: "regExecut",
                items: [
                        {
                                label: 'executors',
                                info: data?.productionOrder?.author?.getFullNameRu ? `${SplitName(data?.productionOrder?.author?.getFullNameRu)} (${data?.productionOrder?.author?.position?.nameRu})` : null,
                        },
                        {
                                label: 'languageDoc',
                                info: languageContent(data?.productionOrder?.language),
                        },
                        {
                                label: 'numberOfSheets',
                                info: `${data?.productionOrder?.listQuantityLetters || 0} / ${data?.productionOrder?.listQuantityAttachments || 0}`,
                        },
                        {
                                label: 'dateExecution',
                                info: data?.productionOrder?.periodOfExecution && moment(data?.productionOrder?.periodOfExecution).format('LL'),
                        },
                ]
        }), [data?.productionOrder])

        return (
                <CardComponent {...source} />
        )
}