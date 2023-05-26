import { useState } from 'react'

import { ScrollView } from 'react-native'

import type { IPropsInternalResolution } from "types/resolution/internal"
import type { TTypeTabs } from "types/types"

import Loader from 'components/Loader'
import TitleDocs from 'components/docs/TitleDocs'
import Steps from 'components/base/Steps'
import { MainResolution, Performers, Requisites, DeniedHistory } from 'components/resolutions'

import { useQueryData } from "hooks/useQueryData"

import { resolution_about } from "apollo/internal/query"

const InternalResolution = ({ navigation, route: { params: { uuid } } }: { navigation: any, route: { params: { uuid: string } } }) => {
        const [tab, setTab] = useState<TTypeTabs>('main')
        const { data, loading, refetch } = useQueryData<IPropsInternalResolution>(resolution_about, uuid)

        if (loading) return <Loader />
        if(data === undefined) return <Loader />

        return (
                <ScrollView>
                        <TitleDocs type="internal_resolution" docOrRes='res' />
                        <Steps
                                type="resolution"
                                status={data?.internalDocumentResolution?.status}
                                red={data?.internalDocumentResolution?.status === "EXPIRED"}
                        />
                        {
                                tab === "main"
                                        ? (
                                                <>
                                                        <MainResolution
                                                                data={data?.internalDocumentResolution}
                                                                navigateDocument="internal"
                                                        />
                                                        <Requisites
                                                                document={data?.internalDocumentResolution?.document}
                                                                type="internal"
                                                                title="internalDoc"
                                                                navigation={navigation}
                                                                uuid={uuid}
                                                        />
                                                        <Performers
                                                                data={data?.internalDocumentResolution}
                                                                type="internal"
                                                                executors="internalDocumentExecutors"
                                                                executorsExecutions="internaldocumentresolutionexecution"
                                                                executorsDenied="internaldocumentresolutiondenied"
                                                        />
                                                        {
                                                                data?.internalDocumentResolution?.internaldocumentresolutiondeniedSet?.length > 0
                                                                        ? (<DeniedHistory deniedHistory={data?.internalDocumentResolution?.internaldocumentresolutiondeniedSet} />)
                                                                        : null
                                                        }
                                                        
                                                </>
                                        ): null
                        }
                </ScrollView>
        )
}

export default InternalResolution