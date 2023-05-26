import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { View, Text } from 'react-native'

import type { IPropsProtocolComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'
import { styleCards } from './style-cards'

export const Solution: FC<IPropsProtocolComponents> = ({ data }) => { 
        const { t } = useTranslation()

        const solution: IPropsCardComponent = useMemo(() => ({
                title: 'agenda',
                items: [
                        {
                                label: 'agenda',
                                info: data?.protocol?.protocolagendaSet?.length > 0
                                        ? (
                                                <View style={styleCards.content} >
                                                        {
                                                                data?.protocol?.protocolagendaSet?.map(item => (
                                                                        <View style={styleCards.item} key={item.uuid}>
                                                                                <Text style={styleCards.label}>{t('agenda')}</Text>
                                                                                <Text style={styleCards.info}>{item?.text || ""}</Text>
                                                                        </View>
                                                                ))
                                                        }
                                                </View>
                                        ) : "",
                                type: 'fc',
                        }
                ]
        }), [data?.protocol?.protocolagendaSet])

        return (
                <CardComponent {...solution} />
        )
}