import { useState, useEffect } from "react"
import { useQuery, useMutation } from "react-query"
import { useTranslation } from "react-i18next"
import { shallow } from "zustand/shallow"

import { ScrollView } from 'react-native'

import type { DataProtocolProps } from "types/document/protocol"
import type { TTypeTabs } from "types/types"

import Loader from "components/Loader"
import TitleDocs from "components/docs/TitleDocs"
import Steps from "components/base/Steps"
import { Main, Route, Subject, Solution, DecisionsTaken, Responsible, ValidForm } from "components/docs/protocol"
import PdfPreview from "components/PdfPreview"

import useUser from "store/user"
import { useQueryData } from "hooks/useQueryData"
import { protocol_about } from "apollo/protocol/query"
import { Upload } from "components/docs"

const Protocol = ({ navigation, route }: { navigation: any, route: any }) => {
        const { t } = useTranslation()
        const { uuid } = route.params
        const [loadingButtons, setLoadingButtons] = useState(false)
        const [active, setActive] = useState<TTypeTabs>('main')
        const { user, isDirector } = useUser(
                state => ({
                        user: state.user,
                        isDirector: state.isDirector,
                }), shallow
        )

        const { data, loading, refetch } = useQueryData<DataProtocolProps>(protocol_about, uuid)

        if (loading) return <Loader />
        if(data === undefined) return <Loader />

        return (
                <ScrollView>
                        <TitleDocs type="protocols" />
                        <Steps
                                type="protocol"
                                status={data?.protocol?.status}
                                red={data?.protocol?.status === "EXPIRED"}
                        />
                        {
                                active === "main"
                                        ? (
                                                <>
                                                        <Main data={data} />
                                                        <Route data={data} />
                                                        <Subject data={data} />
                                                        <Solution data={data} />
                                                        <DecisionsTaken data={data} navigation={navigation} />
                                                        <Upload uuid={uuid} upload={data?.protocol?.protocolfileSet} />
                                                        <Responsible data={data} />
                                                        <ValidForm data={data} />
                                                </>
                                        ): null
                        }
                        {
                                active === "preview"
                                        ? (
                                                <PdfPreview
                                                        type="protocol"
                                                        uuid={uuid}
                                                />
                                        ): null
                        }
                </ScrollView>
        )
}

export default Protocol