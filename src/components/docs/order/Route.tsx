import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { IPropsOrderComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { routeName } from 'functions/route'
import { SplitName } from 'functions/split-name'

export const Route: FC<IPropsOrderComponents> = ({ data }) => { 
        const { t } = useTranslation()

        const source: IPropsCardComponent = useMemo(() => ({
                title: "routeDoc",
                items: [
                        {
                                label: 'consonant',
                                info: data?.productionOrder?.approversListOrder?.length > 0 ? data?.productionOrder?.approversListOrder?.map(user => `${SplitName(user?.person?.getFullNameRu)} (${user?.person?.position?.nameRu})`).join(', ') : null,
                        },
                        {
                                label: 'route',
                                info: routeName(data?.productionOrder?.typeOfAgreement) ? t(routeName(data?.productionOrder?.typeOfAgreement)) : "",
                        },
                        {
                                label: 'signing',
                                info: data?.productionOrder?.signer?.getFullNameRu ? `${SplitName(data?.productionOrder?.signer?.getFullNameRu)} (${data?.productionOrder?.signer?.position?.nameRu})}` : '',
                        },
                ]
        }), [data?.productionOrder])

        return (
                <CardComponent {...source} />
        )
}