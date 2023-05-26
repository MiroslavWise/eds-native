import { useState } from 'react'

import { ScrollView } from 'react-native'

import type { IPropsProtocolResolution } from 'types/resolution/protocol'
import type { TTypeTabs } from "types/types"

import Loader from 'components/Loader'
import TitleDocs from 'components/docs/TitleDocs'
import Steps from 'components/base/Steps'
import { MainResolution, Performers, Requisites, DeniedHistory } from 'components/resolutions'

import { useQueryData } from "hooks/useQueryData"

import { resolution_about } from "apollo/protocol/query"

const ProtocolResolution = ({ navigation, route: { params: { uuid } } }: { navigation: any, route: { params: { uuid: string } } }) => {
        const [tab, setTab] = useState<TTypeTabs>('main')
        const { data, loading, refetch } = useQueryData<IPropsProtocolResolution>(resolution_about, uuid)
        
        if (loading) return <Loader />
        if (data === undefined) return <Loader />

        return (
                <ScrollView>
                        <TitleDocs type="protocol_resolution" docOrRes='res' />
                        <Steps
                                type="resolution"
                                status={data?.protocolResolution?.status}
                                red={data?.protocolResolution?.status === "EXPIRED"}
                        />
                        {
                                tab === "main"
                                        ? (
                                                <>
                                                        <MainResolution
                                                                data={data?.protocolResolution}
                                                                navigateDocument="internal"
                                                        />
                                                        <Requisites
                                                                //@ts-ignore
                                                                document={data?.protocolResolution?.document}
                                                                type="protocol"
                                                                title="protocol"
                                                                navigation={navigation}
                                                                uuid={uuid}
                                                        />
                                                        <Performers
                                                                data={data?.protocolResolution}
                                                                type="protocol"
                                                                executors="protocolExecutors"
                                                                executorsExecutions="protocolresolutionexecution"
                                                                executorsDenied="protocolresolutiondenied"
                                                        />
                                                        {
                                                                data?.protocolResolution?.protocolresolutiondeniedSet?.length > 0
                                                                        ? (<DeniedHistory deniedHistory={data?.protocolResolution?.protocolresolutiondeniedSet} />)
                                                                        : null
                                                        }
                                                        
                                                </>
                                        ): null
                        }
                </ScrollView>
        )
}

export default ProtocolResolution