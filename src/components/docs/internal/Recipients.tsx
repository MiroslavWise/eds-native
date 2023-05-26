import { FC } from 'react'

import type { IPropsInternalComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'

export const Recipients: FC<IPropsInternalComponents> = ({ data }) => {
        
        const recipients: IPropsCardComponent = {
                title: 'recipients',
                items: [
                        {
                                label: 'recipients',
                                info: data?.internalDocument?.internaldocumentreceiverSet?.length > 0
                                        ? data?.internalDocument?.internaldocumentreceiverSet?.map(user => `${SplitName(user?.person?.getFullNameRu)} (${user?.person?.position?.nameRu})`).join(', ')
                                        : "",
                        }
                ]
        }

        return (
                <CardComponent {...recipients} />
        )
}