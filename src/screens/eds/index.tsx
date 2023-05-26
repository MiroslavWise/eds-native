import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query';
import { QueryResult, useQuery as useQueryApollo } from '@apollo/client';

import { View, FlatList, StyleSheet, Text } from "react-native";

import type { IPropsItemsEDS } from "../../types/item-eds";

import ComponentsCarousel from "../../components/ComponentsCarousel";

import type { ICurrentTotalDocs, IPropsTotal, TTypeUrlCount } from '../../types/store/total-count';

import COLORS from "../../assets/colors";
import { axiosInstance } from '../../context/ContextAxios';
import { COUNT_DOCUMENTS } from '../../assets/axios/api-total';
import { total_all_documents } from '../../apollo/user';

const imgINCOMING = require('../../assets/image/docs/incoming.png')
const imgOUTGOING = require('../../assets/image/docs/outgoing.png')
const imgINTERNAL = require('../../assets/image/docs/internal.png')
const imgPROTOCOL = require('../../assets/image/docs/protocol.png')
const imgORDER = require('../../assets/image/docs/order.png')
// const imgINC_APP = require('../../assets/image/docs/incom_app.png')
// const imgRES_APP = require('../../assets/image/docs/resolution_app.png')

const getDataCount = async (): Promise<ICurrentTotalDocs>=> {
        const ARRAY_URL: TTypeUrlCount[] = ['incoming', 'outgoing', 'internal', 'protocol', 'order']

        return Promise.all([
                ...ARRAY_URL.map((item: TTypeUrlCount) => (
                        axiosInstance.get(COUNT_DOCUMENTS[item]).then(data => ({
                                [item]: data?.data
                        }))
                ))
        ])
                .then(data => {
                        const obj = {}
                        data.forEach(item => { Object.assign(obj, item) })
                        return obj as ICurrentTotalDocs
                })
                .catch(e => {
                        console.error(e)
                        return {} as ICurrentTotalDocs
                })
}

const ITEMS = ({ total, total_res }: { total: ICurrentTotalDocs, total_res: IPropsTotal }): IPropsItemsEDS[] => ([
        {
                title: 'My_documents',
                items: [
                        {
                                label: 'incomings',
                                path: 'incomings',
                                img: imgINCOMING,
                                total: total?.incoming?.total || 0,
                                other: [
                                        ['Received', total?.incoming?.on_registration || 0],
                                        ['executing', total?.incoming?.executing || 0],
                                        ['Expired', total?.incoming?.expired || 0],
                                ]
                        },
                        {
                                label: 'outgoings',
                                path: 'outgoings',
                                img: imgOUTGOING,
                                total: total?.outgoing?.total || 0,
                                other: [
                                        ['pendingApprove', total?.outgoing?.pending_approve || 0],
                                        ['pendingSigning', total?.outgoing?.pending_signing || 0],
                                        ['onRegistration', total?.outgoing?.on_registration || 0],
                                        ['sent', total?.outgoing?.sent || 0],
                                        ['send_error', total?.outgoing?.send_error || 0],
                                ]
                        },
                        {
                                label: 'internals',
                                path: 'internals',
                                img: imgINTERNAL,
                                total: total?.internal?.total || 0,
                                other: [
                                        ['pendingApprove', total?.internal?.pending_approve || 0],
                                        ['pendingSigning', total?.internal?.pending_signing || 0],
                                        ['executing', total?.internal?.executing || 0],
                                        ['Expired', total?.internal?.expired || 0]
                                ]
                        },
                        {
                                label: 'protocols',
                                path: 'protocols',
                                img: imgPROTOCOL,
                                total: total?.protocol?.total || 0,
                                other: [
                                        ['pendingApprove', total?.protocol?.pending_approve || 0],
                                        ['pendingSigning', total?.protocol?.pending_signing || 0],
                                        ['executing', total?.protocol?.executing || 0],
                                        ['expired', total?.protocol?.expired || 0]
                                ]
                        },
                        {
                                label: 'productionOrders',
                                path: 'orders',
                                img: imgORDER,
                                total: total?.order?.total || 0,
                                other: [
                                        ['pendingApprove', total?.order?.pending_approve || 0],
                                        ['pendingSigning', total?.order?.pending_signing || 0],
                                        ['executing', total?.order?.executing || 0],
                                        ['expired', total?.order?.expired || 0],
                                ]
                        },
                ]
        },
        {
                title: 'My_resolutions',
                items: [
                        {
                                label: 'res_incoming_doc',
                                path: 'incomings-resolution',
                                img: imgINCOMING,
                                total: total_res?.incomingDocumentResolutions?.totalCount || 0,
                                other: [
                                        ['signedet_', total_res?.incomingDocumentResolutions?.totalCount || 0],
                                        ['rejected', 0],
                                ]
                        },
                        {
                                label: 'res_internal_doc',
                                path: 'internals-resolution',
                                img: imgINTERNAL,
                                total: total_res?.internalDocumentResolutions?.totalCount || 0,
                                other: [
                                        ['signedet_', total_res?.internalDocumentResolutions?.totalCount || 0],
                                        ['rejected', 0],
                                ]
                        },
                        {
                                label: 'res_protocol_doc',
                                path: 'protocols-resolution',
                                img: imgPROTOCOL,
                                total: total_res?.protocolResolutions?.totalCount || 0,
                                other: [
                                        ['signedet_', total_res?.protocolResolutions?.totalCount || 0],
                                        ['rejected', 0],
                                ]
                        },
                        {
                                label: 'res_order_doc',
                                path: 'orders-resolution',
                                img: imgORDER,
                                total: total_res?.productionOrderResolutions?.totalCount || 0,
                                other: [
                                        ['signedet_', total_res?.productionOrderResolutions?.totalCount || 0],
                                        ['rejected', 0],
                                ]
                        },
                ],
        }
])

const IndexEDS = ({ navigation }) => {
        const { t } = useTranslation()

        const { data, isLoading } = useQuery(
                ['total_count_documents'],
                () => getDataCount(),
                {
                        refetchInterval: 60 * 1000,
                        refetchIntervalInBackground: true,
                }
        )

        const { data: data_count } = useQueryApollo(total_all_documents, { pollInterval: 60 * 1000 }) as QueryResult<IPropsTotal>
        return (
                <FlatList
                        style={styles.container}
                        data={ITEMS({
                                total: data,
                                total_res: data_count
                        })}
                        renderItem={(item) => (
                                <View>
                                        <Text style={ styles.title }>{ t(item.item.title) }</Text>
                                        <ComponentsCarousel {...item.item} navigation={navigation} />
                                </View>
                        )}
                        keyExtractor={(item, index) => `${item.title}_${index}_item_${item.items[0].label}`}
                />
        )
}

export default IndexEDS

const styles = StyleSheet.create({
        container: {
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                padding: 10,
        },
        title: {
                fontWeight: '600',
                fontSize: 20,
                lineHeight: 24,
                color: COLORS.main,
                marginBottom: 10,
        },
})