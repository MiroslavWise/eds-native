import { FC, useMemo } from 'react'

import type { IPropsProtocolComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'

export const Route: FC<IPropsProtocolComponents> = ({ data }) => { 

        const route: IPropsCardComponent = useMemo(() => ({
                title: '',
                items: [
                        {
                                label: 'route',
                                info: data?.protocol?.typeOfAgreement,
                        },
                        {
                                label: 'consonant',
                                info: data?.protocol?.approversList?.length > 0
                                        ? data?.protocol?.approversList?.map(user => `${SplitName(user?.person?.getFullNameRu)} (${user?.person?.position?.nameRu})`).join(', ')
                                        : "",
                        }
                ]
        }), [data?.protocol])

        return (
                <CardComponent {...route} />
        )
}