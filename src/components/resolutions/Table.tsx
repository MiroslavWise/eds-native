import { Dispatch, FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

import type { TExecutorsResolution, TExecutorsDenied } from './types'

type TResolutions = "incomings" | "internals" | "protocols" | "orders"

import Loader from 'components/Loader'
import TitleDocs from 'components/docs/TitleDocs'
import Pagination from 'components/Pagination'

import COLORS, { COLOR_STATUS_RESOLUTIONS, COLOR_RESOLUTION_EXECUTORS, TStatusResolution } from 'assets/colors'
import { SplitText } from 'functions/split-text'
import { SplitName } from 'functions/split-name'

interface IProps{
        data: any[]
        loading: boolean
        type: TResolutions
        navigation: any
        pagination: {
                total: number | undefined
                page: number
                setPage: Dispatch<number>
                offset?: number
        }
        typeExecutors: TExecutorsResolution
        typeDenied: TExecutorsDenied
}


const Table: FC<IProps> = ({ data, loading, type, navigation, pagination, typeExecutors, typeDenied }) => {
        const { t } = useTranslation()
        const { page, total, setPage, offset } = pagination

        const name: Record<TResolutions, string> = useMemo(() => ({
                incomings: "res_incoming_doc",
                internals: "res_internal_doc",
                protocols: "res_protocol_doc",
                orders: "res_order_doc",
        }), [type, t])
        
        return (
                <View style={styles.container}>
                        <TitleDocs title={name[type]} docOrRes='res' />
                        <Pagination
                                page={page}
                                total={total}
                                offset={offset}
                                setPage={setPage}
                        />
                        <View style={styles.header}>
                                <View style={styles.row}>
                                        <View style={styles.col1}>
                                                <Text style={styles.textCol}>{t('regAndNum')}</Text>
                                        </View>
                                        <View style={styles.col2}>
                                                <Text style={styles.textCol}>{t('execSum')}</Text>
                                        </View>
                                        <View style={styles.col3}>
                                                <Text style={styles.textCol}>{t('contractors')}</Text>
                                        </View>
                                </View>
                        </View>
                        {
                                loading
                                        ? (<Loader />)
                                        : (
                                                <FlatList
                                                        style={styles.flatList}
                                                        data={data}
                                                        renderItem={item => <ItemRender item={item?.item} navigation={navigation} type={type} typeExecutors={typeExecutors} typeDenied={typeDenied} />}
                                                        keyExtractor={item => `${item?.uuid}_internal_res`}
                                                />
                                        )
                        }
                </View>
        )
}

export default Table

interface IPropsItem{
        item: any
        navigation: any
        type: TResolutions
        typeExecutors: TExecutorsResolution
        typeDenied: TExecutorsDenied
}

const ItemRender: FC<IPropsItem> = ({ item, navigation, type, typeExecutors, typeDenied }) => { 
        const { t } = useTranslation()
        const { status }: {status: TStatusResolution} = item
        const handlePushDocument = () => {
                switch (type) {
                        case 'incomings':
                                navigation.navigate('incoming-resolution', { uuid: item?.uuid })
                                break;
                        case 'internals':
                                navigation.navigate('internal-resolution', { uuid: item?.uuid })
                                break;
                        case 'protocols':
                                navigation.navigate('protocol-resolution', { uuid: item?.uuid })
                                break;
                        case 'orders':
                                navigation.navigate('order-resolution', { uuid: item?.uuid })
                                break;
                        default:
                                () => { };
                }
        }

        return (
                <TouchableOpacity onPress={handlePushDocument}>
                        <View style={styles.row}>
                                <View style={styles.col1}>
                                        <Text style={[styles.textCol, {color: COLOR_STATUS_RESOLUTIONS[status][0]}]}>{item?.document?.registerNumber?.stringNumber}</Text>
                                </View>
                                <View style={styles.col2}>
                                        <Text style={styles.textCol}>{
                                                type === "orders"
                                                        ? SplitText(item?.document?.nameRu, 25)
                                                        : SplitText(item?.document?.summary, 25)
                                        } / { SplitText(item?.text?.text, 25) }</Text>
                                </View>
                                <View style={[styles.col3, styles.column]}>
                                        {
                                                item[typeExecutors]?.map((user: any) => (
                                                        <Text
                                                                key={`${item?.uuid}_${user?.person?.uuid}`}
                                                                style={{
                                                                        color: user?.[typeDenied]?.uuid
                                                                                ? COLOR_RESOLUTION_EXECUTORS.warning
                                                                                : user?.isExecuted && user?.isExpired
                                                                                        ? COLOR_RESOLUTION_EXECUTORS.warn_dark
                                                                                        : user?.isExpired && item?.children?.some((per: any) => per?.author?.uuid === user?.person?.uuid)
                                                                                                ? COLOR_RESOLUTION_EXECUTORS.secondary
                                                                                                : user?.isExecuted && !user?.isExpired
                                                                                                        ? COLOR_RESOLUTION_EXECUTORS.success
                                                                                                        : user?.isExpired && !user?.isExecuted
                                                                                                                ? COLOR_RESOLUTION_EXECUTORS.error
                                                                                                                : item?.children?.some((per: any) => per?.author?.uuid === user?.person?.uuid)
                                                                                                                        ? COLOR_RESOLUTION_EXECUTORS.primary
                                                                                                                        : COLOR_RESOLUTION_EXECUTORS.default
                                                                }}
                                                        >{ SplitName(user?.person?.getFullNameRu) }</Text>
                                                ))
                                        }
                                </View>
                        </View>
                </TouchableOpacity>
        )
}


export const styles = StyleSheet.create({
        container: {
                flex: 1,
                padding: 5,
                paddingTop: 5,
                backgroundColor: COLORS.white,
                width: '100%',
                height: '100%'
        },
        header: {
                height: 40,
                backgroundColor: COLORS.white,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: '100%',
                marginBottom: 5,
        },
        row: {
                backgroundColor: '#ddd',
                display: "flex",
                flexDirection: 'row',
                alignItems: "center",
                width: '100%',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
        },
        col1: {
                width: '25%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
        },
        column: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                
        },
        col2: {
                width: "45%",
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
        },
        col3: {
                width: '30%',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
        },
        textCol: {
                color: COLORS.main,
        },
        flatList: {
                width: '100%',
                marginBottom: 5,
        },
})