import { FC, useMemo } from 'react'

import type { IPropsOrderComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

export const OneCredentials: FC<IPropsOrderComponents> = ({ data }) => {
        
        const source: IPropsCardComponent = useMemo(() => ({
                title: "regDetails",
                items: [
                        {
                                label: "orderType",
                                info: data?.productionOrder?.orderType?.nameRu,
                        },
                        {
                                label: "indexCase",
                                info: data?.productionOrder?.caseIndex?.caseName,
                        },
                        {
                                label: "nameOfOrderRus",
                                info: data?.productionOrder?.nameRu,
                        },
                        {
                                label: "nameOfOrderKz",
                                info: data?.productionOrder?.nameKz,
                        },
                ]
        }), [data?.productionOrder])

        return (
                <CardComponent {...source} />
        )
}