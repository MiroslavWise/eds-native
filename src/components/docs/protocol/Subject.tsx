import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { View, Text } from 'react-native'

import type { IPropsProtocolComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'
import { styleCards } from './style-cards'

export const Subject: FC<IPropsProtocolComponents> = ({ data }) => { 
        const { t } = useTranslation()

        const subject: IPropsCardComponent = useMemo(() => ({
                title: 'topic',
                items: [
                        {
                                label: 'topic',
                                info: data?.protocol?.protocolsubjectSet?.length > 0
                                        ? (
                                                <View style={styleCards.content} >
                                                        {
                                                                data?.protocol?.protocolsubjectSet?.map(item => (
                                                                        <View style={styleCards.item} key={item.uuid}>
                                                                                <Text style={styleCards.label}>{t('Topic_name')}</Text>
                                                                                <Text style={styleCards.info}>{item?.name || ""}</Text>
                                                                                <Text style={styleCards.label}>{t('textTopic')}</Text>
                                                                                <Text style={styleCards.info}>{item?.text || ""}</Text>
                                                                                <Text style={styleCards.label}>{t('reporter')}</Text>
                                                                                <Text style={styleCards.info}>{item?.speaker?.uuid && `${SplitName(item?.speaker?.getFullNameRu)} (${item?.speaker?.position?.nameRu})` || ""}</Text>
                                                                        </View>
                                                                ))
                                                        }
                                                </View>
                                        ) : "",
                                type: 'fc',
                        }
                ]
        }), [data?.protocol?.protocolsubjectSet])

        return (
                <CardComponent {...subject} />
        )
}