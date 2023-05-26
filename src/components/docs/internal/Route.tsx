import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import type { IPropsInternalComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'
import { SplitName } from 'functions/split-name'
import { routeName } from 'functions/route'


export const Route: FC<IPropsInternalComponents> = ({ data }) => {
        const { t } = useTranslation()

        const route: IPropsCardComponent = {
                title: 'routeDoc',
                items: [
                        {
                                label: 'consonant',
                                info: data?.internalDocument?.approversList?.length > 0 ? data?.internalDocument?.approversList?.map(user => `${SplitName(user?.person?.getFullNameRu)} (${user?.person?.position?.nameRu})`).join(', ') : "",
                        },
                        {
                                label: 'route',
                                info: routeName(data?.internalDocument?.typeOfAgreement) ? t(routeName(data?.internalDocument?.typeOfAgreement)) : "",
                        },
                        {
                                label: 'signing',
                                info: data?.internalDocument?.signer?.getFullNameRu ? `${SplitName(data?.internalDocument?.signer?.getFullNameRu)} (${data?.internalDocument?.signer?.position?.nameRu})}` : "",
                        }
                ]
        }
        
        return (
                <CardComponent {...route} />
        )
}