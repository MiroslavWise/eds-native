import { FC } from 'react'

import type { IPropsInternalComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

export const Summary: FC<IPropsInternalComponents> = ({ data }) => {
        
        const summary: IPropsCardComponent = {
                title: 'execSum',
                items: [
                        {
                                label: 'execSum',
                                info: data?.internalDocument?.summary,
                        },
                ]
        }

        return (
                <CardComponent {...summary} />
        )
}