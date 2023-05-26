import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { View, Text, TouchableOpacity } from 'react-native'

import type { IPropsProtocolComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'
import { styleCards } from './style-cards'

export const DecisionsTaken: FC<IPropsProtocolComponents & {navigation: any}> = ({ data, navigation }) => {
        const { t } = useTranslation()

        const decisionsTaken: IPropsCardComponent = useMemo(() => ({
                title: 'decisionsTaken',
                items: [
                        {
                                label: 'decisionsTaken',
                                info: data?.protocol?.resolutions?.length > 0
                                        ? (
                                                <View style={styleCards.content} >
                                                        {
                                                                data?.protocol?.resolutions?.map(item => (
                                                                        <TouchableOpacity
                                                                                key={item.uuid}
                                                                                onPress={() => {
                                                                                        if (['EXECUTING', 'EXECUTED', 'EXPIRED']?.includes(data?.protocol?.status)) {
                                                                                                navigation.navigate('protocol-resolution', { uuid: item?.uuid })
                                                                                        }
                                                                                }}
                                                                        >
                                                                                <View style={styleCards.item} key={item?.uuid}>
                                                                                        <Text style={styleCards.label}>{t('contentsOfTheItem')}</Text>
                                                                                        <Text style={styleCards.info}>{item?.subject || ""}</Text>
                                                                                        <Text style={styleCards.label}>{t('agenda')}</Text>
                                                                                        <Text style={styleCards.info}>{item?.agenda?.text}</Text>
                                                                                        <Text style={styleCards.label}>{t('contractors')}</Text>
                                                                                        <Text style={styleCards.info}>{item?.protocolExecutors?.length > 0 && item?.protocolExecutors?.map(user =>`${SplitName(user?.person?.getFullNameRu)} (${user?.person?.position?.nameRu})`)?.join(', ') || ""}</Text>
                                                                                        <Text style={styleCards.label}>{t('dateExecution')}</Text>
                                                                                        <Text style={styleCards.info}>{item?.executedDate && moment(item?.executedDate).format('LL') || ""}</Text>
                                                                                        <Text style={styleCards.label}>{t('Subject_of_the_resolution')}</Text>
                                                                                        <Text style={styleCards.info}>{item?.protocolSubject?.text || ""}</Text>
                                                                                </View>
                                                                        </TouchableOpacity>
                                                                ))
                                                        }
                                                </View>
                                        ) : ""
                        }
                ]
        }), [data?.protocol?.resolutions])

        return (
                <CardComponent {...decisionsTaken} />
        )
}