import { FC, useMemo } from 'react'

import type { IPropsIncomingComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'

export const InternalsPerformers: FC<IPropsIncomingComponents> = ({ data }) => {
        
        const performers: IPropsCardComponent = useMemo(() => ({
                title: 'internalsPerformers',
                items: [
                        {
                                label: 'Internal_performer',
                                info: data?.incomingDocument?.incomingdocumentinternalexecutorSet?.length
                                        ? data?.incomingDocument?.incomingdocumentinternalexecutorSet?.map(user => `${SplitName(user?.person?.getFullNameRu)} (${user?.person?.position?.nameRu})`)
                                        : "",
                        },
                        {
                                label: 'responsible',
                                info: data?.incomingDocument?.responsible?.uuid ? `${SplitName(data?.incomingDocument?.responsible?.getFullNameRu)} (${data?.incomingDocument?.responsible?.position?.nameRu})` : "",
                        },
                        {
                                label: 'synopsis',
                                info: data && data?.incomingDocument?.incomingdocumentfamiliarizationSet?.length
                                        ? data?.incomingDocument?.incomingdocumentfamiliarizationSet?.map(user => `${SplitName(user?.person?.getFullNameRu)} (${user?.person?.position?.nameRu})`)
                                        : "",
                        },
                ]
        }), [data?.incomingDocument])

        return (
                <CardComponent {...performers} />
        )
}