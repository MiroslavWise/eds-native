import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import type { IPropsProtocolComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

export const ValidForm: FC<IPropsProtocolComponents> = ({ data }) => {
        const { t } = useTranslation()

        const validForm: IPropsCardComponent = useMemo(() => ({
                title: 'Вступает в силу',
                items: [
                        {
                                label: 'Вступает в силу с',
                                info: data?.protocol?.validFrom && moment(data?.protocol?.validFrom).format("LL") || t('date30day')
                        }
                ]
        }), [data?.protocol?.validFrom])

        return (
                <CardComponent {...validForm} />
        )
}