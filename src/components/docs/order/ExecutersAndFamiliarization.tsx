import { FC, useMemo } from 'react'

import type { IPropsOrderComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'
import { SplitName } from 'functions/split-name'

export const ExecutersAndFamiliarization: FC<IPropsOrderComponents> = ({ data }) => {
        
        const source: IPropsCardComponent = useMemo(() => ({
                title: "implementersAndIntroducers",
                items: [
                        {
                                label: "contractors",
                                info: data?.productionOrder?.orderreceiverSet?.length > 0
                                        ? data?.productionOrder?.orderreceiverSet
                                                ?.map(user => `${SplitName(user?.person?.getFullNameRu)} (${user?.person?.position?.nameRu})`)
                                                ?.join(', ')
                                        : "",
                        },
                        {
                                label: "synopsis",
                                info: data?.productionOrder?.productionorderfamiliarizationSet?.length > 0
                                        ? data?.productionOrder?.productionorderfamiliarizationSet
                                                ?.map(user => `${SplitName(user?.person?.getFullNameRu)} (${user?.person?.position?.nameRu})`)
                                                ?.join(', ')
                                        : "",
                        },
                ]
        }), [data?.productionOrder])

        return (
                <CardComponent {...source} />
        )
}