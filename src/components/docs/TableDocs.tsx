import { FC, useMemo, Dispatch } from 'react'
import { useTranslation } from 'react-i18next'

import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

import type { TTitleDocs } from 'types/store/documents'

import TitleDocs from './TitleDocs'
import Loader from '../Loader'
import Filters from './Filters'
import Pagination from '../Pagination'

import COLORS, { DATA_STATUSES, TAllStatus } from 'assets/colors'
import { SplitText } from 'functions/split-text'

interface IProps{
        data: any[]
        navigation: any
        type: TTitleDocs
        loading: boolean
        pagination: {
                page: number
                total: number | undefined
                setPage: Dispatch<number>
        }
}

const TableDocs: FC<IProps> = ({ data, navigation, type, loading, pagination }) => {
        const { page, total, setPage } = pagination
        const { t } = useTranslation()
        
        const exType = useMemo(() => {
                if (type === 'productionOrders') return 'orders'
                return type
        }, [type])

        return (
                <View style={styles.container}>
                        <TitleDocs type={type} />
                        {/* <Filters type={exType} /> */}
                        <Pagination
                                page={page}
                                total={total}
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
                                        <View style={styles.col1}>
                                                <Text style={styles.textCol}>{t('status')}</Text>
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
                                                        renderItem={item => <ItemRender item={item?.item} navigation={navigation} type={type} />}
                                                        keyExtractor={item => `${item?.uuid}_internal`}
                                                />
                                        )
                        }
                </View>
        )
}

export default TableDocs

interface IPropsItem{
        item: any
        navigation: any
        type: TTitleDocs
}

const ItemRender: FC<IPropsItem> = ({ item, navigation, type }) => {
        const { t } = useTranslation()
        const { status } = item

        const handlePushDocument = () => {
                switch (type) {
                        case 'incomings':
                                navigation.navigate('incoming', { uuid: item?.uuid })
                                break;
                        case 'outgoings':
                                navigation.navigate('outgoing', { uuid: item?.uuid })
                                break;
                        case 'internals':
                                navigation.navigate('internal', { uuid: item?.uuid })
                                break;
                        case 'protocols':
                                navigation.navigate('protocol', { uuid: item?.uuid })
                                break;
                        case 'productionOrders':
                                navigation.navigate('order', { uuid: item?.uuid })
                                break;
                        default:
                                () => { };
                }
        }

        return (
                <TouchableOpacity onPress={handlePushDocument}>
                        <View style={styles.row}>
                                <View style={styles.col1}>
                                        <Text style={styles.textCol}>{item?.register_number?.string_number || item?.temp_number || t("No_number")}</Text>
                                </View>
                                <View style={styles.col2}>
                                        <Text style={styles.textCol}>{
                                                type === "productionOrders"
                                                        ? SplitText(item?.name_ru)
                                                        : SplitText(item?.summary)
                                        }</Text>
                                </View>
                                <View style={styles.col1}>
                                        <Text style={{ color: DATA_STATUSES?.hasOwnProperty(status) ? DATA_STATUSES[status as TAllStatus]?.color : 'gray' }}>
                                                {DATA_STATUSES?.hasOwnProperty(status) ? t(DATA_STATUSES[status as TAllStatus]?.title) : t('draft')}
                                        </Text>
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
                backgroundColor: '#fff',
                width: '100%',
                height: '100%'
        },
        header: {
                height: 40,
                backgroundColor: '#f1f8ff',
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
        col2: {
                width: "50%",
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