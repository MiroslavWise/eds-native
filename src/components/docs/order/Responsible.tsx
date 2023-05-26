import { FC, useMemo } from 'react'

import type { IPropsOrderComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'
import { SplitName } from 'functions/split-name'

export const Responsible: FC<IPropsOrderComponents> = ({ data }) => {
        
        const source: IPropsCardComponent = useMemo(() => (
                {
                        title: "responsibleExecuted",
                        items: [
                                {
                                        label: "responsible",
                                        info: data?.productionOrder?.responsibleForExecute?.getFullNameRu ? `${SplitName(data?.productionOrder?.responsibleForExecute?.getFullNameRu)} (${data?.productionOrder?.responsibleForExecute?.position?.nameRu})` : "",
                                },
                        ]
                }
        ), [data])

        return (
                <CardComponent {...source} />
        )
}