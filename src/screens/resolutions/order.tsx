import { useState } from 'react'

import { ScrollView } from 'react-native'

import type { IPropsOrderResolution } from 'types/resolution/order'
import type { TTypeTabs } from "types/types"

import Loader from 'components/Loader'
import TitleDocs from 'components/docs/TitleDocs'
import Steps from 'components/base/Steps'
import { MainResolution, Performers, Requisites, DeniedHistory } from 'components/resolutions'

import { useQueryData } from "hooks/useQueryData"

import { resolution_about } from "apollo/order/query"

const OrderResolution = ({ navigation, route: { params: { uuid } } }: { navigation: any, route: { params: { uuid: string } } }) => {
        const [tab, setTab] = useState<TTypeTabs>('main')
        const { data, loading, refetch } = useQueryData<IPropsOrderResolution>(resolution_about, uuid)

        if (loading) return <Loader />
        if(data === undefined) return <Loader />
        return (
                <ScrollView>
                        <TitleDocs type="order_resolution" docOrRes='res' />
                        <Steps
                                type="resolution"
                                status={data?.productionOrderResolution?.status}
                                red={data?.productionOrderResolution?.status === "EXPIRED"}
                        />
                        {
                                tab === "main"
                                        ? (
                                                <>
                                                        <MainResolution
                                                                data={data?.productionOrderResolution}
                                                                navigateDocument="order"
                                                        />
                                                        <Requisites
                                                                document={data?.productionOrderResolution?.document}
                                                                type="order"
                                                                title="productionOrder"
                                                                navigation={navigation}
                                                                uuid={uuid}
                                                        />
                                                        <Performers
                                                                data={data?.productionOrderResolution}
                                                                type="order"
                                                                executors="productionOrderExecutors"
                                                                executorsExecutions="productionorderresolutionexecution"
                                                                executorsDenied="productionorderresolutiondenied"
                                                        />
                                                        {
                                                                data?.productionOrderResolution?.productionOrderResolutionDeniedList?.length > 0
                                                                        ? (<DeniedHistory deniedHistory={data?.productionOrderResolution?.productionOrderResolutionDeniedList} />)
                                                                        : null
                                                        }
                                                        
                                                </>
                                        ): null
                        }
                </ScrollView>
        )
}

export default OrderResolution