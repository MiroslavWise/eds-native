import { useState, useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import { useMutation } from "@apollo/client"
import moment from 'moment'

import { FlatList, ScrollView } from "react-native"

import type { PropsInternalDocument } from "types/document/internal"
import type { TTypeTabs } from "types/types"


import Loader from "components/Loader"
import Steps from "components/base/Steps"
import TitleDocs from "components/docs/TitleDocs"
import PdfPreview from 'components/PdfPreview'
import CardComponent, { IPropsCardComponent } from "components/base/CardComponent"
import ButtonsOnCreateAndApproved from 'components/buttons/ButtonsOnCreateAndApproved'
import ButtonsApproved from 'components/buttons/ButtonsApproved'
import ButtonsSigned from 'components/buttons/ButtonsSigned'
import { RegistrationDetails, DetailsSender, Route, Summary, Recipients } from 'components/docs/internal'
import { Upload } from 'components/docs'

import { useQueryData } from "hooks/useQueryData"
import useUser from 'store/user'
import { internal_document_about } from "apollo/internal/query"
import { languageContent } from 'functions/language'
import {
        delete_document,
        ok_approved,
        refused_approver,
        approved,
        refused_signer,
        __signed__,
} from 'apollo/internal/mutation'



const Internal = ({ navigation, route }: { navigation: any, route: { params: { uuid: string } } }) => {
        const { t } = useTranslation()
        const { uuid } = route?.params
        const [loadingButtons, setLoadingButtons] = useState(false)
        const [active, setActive] = useState<TTypeTabs>('main')
        const { user, isDirector } = useUser(
                state => ({
                        user: state.user,
                        isDirector: state.isDirector,
                }), shallow
        )

        const { data, loading, refetch } = useQueryData<PropsInternalDocument>(internal_document_about, uuid)

        const [onDeleteDocument] = useMutation(delete_document, { variables: { id: uuid } })
        const [onOkApprovedSigned] = useMutation(ok_approved, { variables: { id: uuid, status: 'PENDING_APPROVE' } })
        const [refusedApprove] = useMutation(refused_approver)
        const [okApprove] = useMutation(approved)
        const [refusedSigned] = useMutation(refused_signer)
        const [okSigned] = useMutation(__signed__)

        const onDelete = () => {
                setLoadingButtons(true)
                onDeleteDocument({ variables: { id: uuid } })
                        .catch((e) => {
                                throw new Error(e)
                        })
                        .finally(() => {
                                setLoadingButtons(false)
                                navigation.push(`internals`)
                        })
        }
        const onApproved = () => {
                setLoadingButtons(true)
                onOkApprovedSigned({
                        variables: {
                                id: uuid,
                                status: "PENDING_APPROVE",
                        }
                })
                        .then(() => {
                                setTimeout(() => {
                                        refetch().finally(() => setLoadingButtons(false))
                                }, 175)
                        })
                        .catch(e => {
                                setLoadingButtons(false)
                                throw new Error(e);
                        })
        }
        const onRevision = async (value: string) => {
                setLoadingButtons(true)
                return refusedApprove({
                        variables: {
                                id: data?.internalDocument?.approve.find(item => item?.approvingBy?.uuid === user?.me?.uuid)?.uuid,
                                comment: value
                        }
                })
                        .catch(e => {
                                throw new Error(e)
                        })
                        .finally(() => {
                                setTimeout(() => {
                                        refetch().finally(() => setLoadingButtons(false))
                                }, 750)
                        })
        }
        const onApprovedActive = () => {
                setLoadingButtons(true)
                okApprove({
                        variables: {
                                id: data?.internalDocument?.approve.find(item => item?.approvingBy?.uuid === user?.me?.uuid)?.uuid
                        }
                })
                        .catch(e => {
                                console.error('ERRor approve: ', e)
                                throw new Error(e)
                        })
                        .finally(() => {
                                setTimeout(() => {
                                        refetch().finally(() => setLoadingButtons(false))
                                }, 750)
                        })
        }

        const onRevisionSigned = async (value: string) => {
                setLoadingButtons(true)
                return refusedSigned({
                        variables: {
                                id: data?.internalDocument?.internaldocumentsign?.uuid,
                                comment: value
                        }
                })
                        .catch(e => {
                                throw new Error(e)
                        })
                        .finally(() => {
                                setTimeout(() => refetch().finally(() => setLoadingButtons(false)), 750)
                        })
        }

        const onSigned = () => {
                setLoadingButtons(true)
                okSigned({
                        variables: {
                                id: data?.internalDocument?.internaldocumentsign?.uuid
                        }
                })
                        .catch(e => {
                                throw new Error(e)
                        })
                        .finally(() => {
                                setTimeout(() => refetch().finally(() => setLoadingButtons(false)), 750)
                        })
        }

        const isApprove = !!data
                && data?.internalDocument?.internaldocumentreceiverSet?.length > 0
                && !!data?.internalDocument?.documentType
                && !!data?.internalDocument?.questionNature
                && !!data?.internalDocument?.caseIndex
                && !!data?.internalDocument?.signer
                && !!data?.internalDocument?.summary
                && (isDirector ? true : ['PAR', 'CONS'].includes(data?.internalDocument?.typeOfAgreement))
                && ((data?.internalDocument?.approversList?.length > 0 && data?.internalDocument?.typeOfAgreement === "EMPTY") ? true : (data?.internalDocument?.approversList?.length === 0 && isDirector) ? true : ['PAR', 'CONS']?.includes(data?.internalDocument?.typeOfAgreement))

        const isSendSigned: boolean = useMemo(() => data?.internalDocument?.typeOfAgreement === "EMPTY" && data?.internalDocument?.approversList?.length === 0 && !!isDirector, [data?.internalDocument, user?.me])

        if(loading) return <Loader />
        if (data === undefined) return <Loader />
        
        return (
                <ScrollView>
                        <TitleDocs title="internalDocument" />
                        <Steps
                                type="internal"
                                status={data?.internalDocument?.status}
                                red={data?.internalDocument?.status === "EXPIRED"}
                        />
                        {
                                data
                                &&
                                ["DRAFT", "REFUSED"].includes(data?.internalDocument?.status)
                                &&
                                (data?.internalDocument?.documentCreator?.uuid === user?.me?.uuid || data?.internalDocument?.author?.uuid === user?.me?.uuid)
                                        ? (
                                                <ButtonsOnCreateAndApproved
                                                        isApproved={isApprove}
                                                        loading={loadingButtons}
                                                        isSendSigned={isSendSigned}
                                                        onDelete={onDelete}
                                                        onApproved={onApproved}
                                                />
                                        ) : null
                        }
                        {
                                data?.internalDocument?.status === "PENDING_APPROVE"
                                &&
                                data?.internalDocument?.approve.some(item => item?.approvingBy?.uuid === user?.me?.uuid && item?.isActive)
                                &&
                                <ButtonsApproved
                                        loading={loadingButtons}
                                        onRevision={onRevision}
                                        onApprovedActive={onApprovedActive}
                                />
                        }
                        {
                                data?.internalDocument?.status === "PENDING_SIGNING"
                                &&
                                data?.internalDocument?.signer?.uuid === user?.me?.uuid
                                &&
                                <ButtonsSigned
                                        loading={loadingButtons}
                                        onRevisionSigned={onRevisionSigned}
                                        onSigned={onSigned}
                                />
                        }
                        {
                                active === "main"
                                        ? (
                                                <>
                                                        <RegistrationDetails data={data} />
                                                        <DetailsSender data={data} />
                                                        <Route data={data} />
                                                        <Summary data={data} />
                                                        <Upload uuid={uuid} upload={data?.internalDocument?.internaldocumentfileSet || []} />
                                                        <Recipients data={data} />
                                                </>
                                        ): null
                        }
                        {
                                active === "preview"
                                        ? (
                                                <PdfPreview
                                                        type="internal-document"
                                                        uuid={uuid}
                                                />
                                        ) : null
                        }
                </ScrollView>
        )
}

export default Internal