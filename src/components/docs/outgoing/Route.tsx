import { FC } from 'react'

import type { IPropsOutgoingComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'
import { routeName } from 'functions/route'
import { useTranslation } from 'react-i18next'

export const Route: FC<IPropsOutgoingComponents> = ({ data }) => {
        const { t } = useTranslation()

        const route: IPropsCardComponent = {
                title: 'routeDoc',
                items: [
                        {
                                label: 'consonant',
                                info: data?.outgoingDocument?.approversList?.length > 0
                                        ? data?.outgoingDocument?.approversList?.map(user => `${SplitName(user?.person?.getFullNameRu)} (${user?.person?.position?.nameRu})`)
                                        : "",
                        },
                        {
                                label: 'route',
                                info: t(routeName(data?.outgoingDocument?.typeOfAgreement)),
                        },
                        {
                                label: 'signing',
                                info: data?.outgoingDocument?.signer?.getFullNameRu ? `${SplitName(data?.outgoingDocument?.signer?.getFullNameRu)} (${data?.outgoingDocument?.signer?.position?.nameRu})` : "",
                        },
                ]
        }

        return (
                <CardComponent {...route} />
        )
}