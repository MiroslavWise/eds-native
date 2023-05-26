import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


import type { IPropsIncomingComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'
import COLORS from 'assets/colors'



export const Summary: FC<IPropsIncomingComponents & { refetch(): Promise<any>, navigation: any }> = ({ data, navigation, refetch }) => {
        const { t } = useTranslation()
        const summary: IPropsCardComponent = useMemo(() => {
                const item: IPropsCardComponent= {
                        title: 'execSum',
                        items: [
                                {
                                        label: 'execSum',
                                        info: data?.incomingDocument?.summary,
                                },
                        ]
                }
                if (!!data?.incomingDocument?.replyingTo?.registerNumber?.stringNumber) { 
                        item.items.push(
                                {
                                        label: 'replyTo',
                                        info: (
                                                <View style={styles.content}>
                                                        <Text style={styles.label}>{t('replyTo')}</Text>
                                                        <TouchableOpacity
                                                                onPress={() => {
                                                                        navigation.navigate('outgoing', { uuid: data?.incomingDocument?.replyingTo?.uuid})
                                                                }}
                                                        >
                                                                <Text style={styles.info}> {`${t('outgoingDocument')} №${data?.incomingDocument?.replyingTo?.registerNumber?.stringNumber}`}</Text>
                                                        </TouchableOpacity>
                                                        
                                                </View>
                                        ),
                                        type: 'fc',
                                }
                        )
                }

                if (data?.incomingDocument?.replyTo?.length > 0) {
                        item.items.push(
                                {
                                        label: 'рas_a_link_to',
                                        info: (
                                                <View style={styles.content}>
                                                        <Text style={styles.label}>{t('рas_a_link_to')}</Text>
                                                        <View style={styles.contentLink}>
                                                                {
                                                                        data?.incomingDocument?.replyTo?.map(item => {
                                                                                if (item?.target?.modelInfo?.modelName === "internaldocument") {
                                                                                        return (
                                                                                                <TouchableOpacity
                                                                                                        key={item?.target?.uuid}
                                                                                                        onPress={() => {
                                                                                                                navigation.navigate('internal', { uuid: item?.target?.uuid })
                                                                                                        }}
                                                                                                >
                                                                                                        <Text style={styles.info}>{`${t('internalDocument')}: №${item?.target?.originalNumber || item?.target?.registerNumber}`}</Text>
                                                                                                </TouchableOpacity>
                                                                                        )
                                                                                }
                                                                                if (item?.target?.modelInfo?.modelName === "protocol") { 
                                                                                        return (
                                                                                                <TouchableOpacity
                                                                                                        key={item?.target?.uuid}
                                                                                                        onPress={() => {
                                                                                                                navigation.navigate('protocol', { uuid: item?.target?.uuid })
                                                                                                        }}
                                                                                                >
                                                                                                        <Text style={styles.info}> {`${t('protocol')}: №${item?.target?.originalNumber || item?.target?.registerNumber}`}</Text>
                                                                                                </TouchableOpacity>
                                                                                        )
                                                                                }
                                                                                if (item?.target?.modelInfo?.modelName === "order") { 
                                                                                        return (
                                                                                                <TouchableOpacity
                                                                                                        key={item?.target?.uuid}
                                                                                                        onPress={() => {
                                                                                                                navigation.navigate('order', { uuid: item?.target?.uuid })
                                                                                                        }}
                                                                                                >
                                                                                                        <Text style={styles.info}> {`${t('productionOrder')}: №${item?.target?.originalNumber || item?.target?.registerNumber}`}</Text>
                                                                                                </TouchableOpacity>
                                                                                        )
                                                                                }
                                                                        })
                                                                }
                                                        </View>
                                                </View>
                                        )
                                }
                        )
                }

                return item
        }, [data?.incomingDocument])

        return (
                <CardComponent {...summary} />
        )
}

const styles = StyleSheet.create({
        content: {
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
        },
        label: {
                color: COLORS.gray,
                fontSize: 14,
                fontWeight: '600',
        },
        info: {
                color: COLORS.main,
                fontSize: 13,
                fontWeight: '500',
        },
        contentLink: {
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
        },
})