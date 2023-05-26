import { useState, useMemo } from 'react'
import { useQuery, useMutation } from "react-query"
import { useTranslation } from 'react-i18next'
import { View, FlatList, ScrollView } from "react-native"

import type { PropsIncoming } from 'types/document/incoming'
import type { TTypeTabs } from "types/types"

import Loader from 'components/Loader'
import TitleDocs from 'components/docs/TitleDocs'
import Steps from 'components/base/Steps'
import { Main, Summary, InternalsPerformers } from 'components/docs/incoming'
import { Upload } from 'components/docs'

import { useQueryData } from "hooks/useQueryData"


import { incoming_document_about } from 'apollo/incoming/query'

const Incoming = ({ navigation, route }: { navigation: any, route: any }) => {
        const { uuid } = route?.params
        const [active, setActive] = useState<TTypeTabs>('main')

        const { data, loading, refetch } = useQueryData<PropsIncoming>(incoming_document_about, uuid)

        if (loading) return <Loader />
        if (data === undefined) return <Loader />
        
        return (
                <ScrollView>
                        <TitleDocs title="incomingDocument" />
                        <Steps
                                type="internal"
                                status={data?.incomingDocument?.status}
                                loading={loading}
                                red={data?.incomingDocument?.status === "EXPIRED"}
                        />
                        {
                                active === "main"
                                        ? (
                                                <>
                                                        <Main data={data} />
                                                        <Summary data={data} refetch={refetch} navigation={navigation} />
                                                        <Upload uuid={uuid} upload={data?.incomingDocument?.incomingdocumentfileSet} />
                                                        <InternalsPerformers data={data} />
                                                </>
                                        ): null
                        }
                </ScrollView>
        )
}

export default Incoming