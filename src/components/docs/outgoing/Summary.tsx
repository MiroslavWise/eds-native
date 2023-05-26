import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import type { IPropsOutgoingComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'



export const Summary: FC<IPropsOutgoingComponents> = ({ data }) => {
        const { t } = useTranslation()

        const summary: IPropsCardComponent = {
                title: 'execSum',
                items: [
                        {
                                label: 'execSum',
                                info: data?.outgoingDocument?.summary,
                        },
                        {
                                label: 'replyTo',
                                info: data?.outgoingDocument?.replyingTo?.registerNumber?.stringNumber ? `${t('document')} №${data?.outgoingDocument?.replyingTo?.registerNumber?.stringNumber}` : "",
                        },
                ]
        }

        return (
                <CardComponent {...summary} />
        )
}