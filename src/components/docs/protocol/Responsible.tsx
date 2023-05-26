import { FC, useMemo } from 'react'

import type { IPropsProtocolComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'

export const Responsible: FC<IPropsProtocolComponents> = ({ data }) => {
        
        const responsible: IPropsCardComponent = useMemo(() => ({
                title: 'responsibleExecuted',
                items: [
                        {
                                label: 'responsible',
                                info: data?.protocol?.responsibleForExecute?.getFullNameRu ? `${SplitName(data?.protocol?.responsibleForExecute?.getFullNameRu)} (${data?.protocol?.responsibleForExecute?.position?.nameRu})` : "",
                        },
                ]
        }), [data?.protocol?.responsibleForExecute])

        return (
                <CardComponent {...responsible} />
        )
}