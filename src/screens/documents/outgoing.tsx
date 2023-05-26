import { useState, useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import { useMutation } from "@apollo/client"
import moment from 'moment'

import { FlatList, ScrollView, View } from "react-native"

import type { TypesOutgoingDocument } from 'types/document/outgoing'
import type { TTypeTabs } from "types/types"

import Loader from "components/Loader"
import Steps from "components/base/Steps"
import TitleDocs from "components/docs/TitleDocs"
import PdfPreview from 'components/PdfPreview'
import ButtonsOnCreateAndApproved from 'components/buttons/ButtonsOnCreateAndApproved'
import ButtonsApproved from 'components/buttons/ButtonsApproved'
import ButtonsSigned from 'components/buttons/ButtonsSigned'
import { RegisterMainInfo, Route, Summary } from 'components/docs/outgoing'
import { Upload } from 'components/docs'

import { useQueryData } from 'hooks/useQueryData'
import useUser from 'store/user'
import { outgoing_document_about } from 'apollo/outgoing/query'
import {
        delete_document,
        approved_and_signed,
        approved_document,
        refused_document_approver,
        refused_document_by_signer,
        sign_document,
        registration_document
} from 'apollo/outgoing/mutation'


const Outgoing = ({ navigation, route }: { navigation: any, route: { params: { uuid: string } } }) => {
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

        const { data, loading, refetch } = useQueryData<TypesOutgoingDocument>(outgoing_document_about, uuid)

        const [onDeleteDocument] = useMutation(delete_document, { variables: { id: uuid } })
        const [onOkApprovedSigned] = useMutation(approved_and_signed, { variables: { id: uuid } })
        const [refusedApprove] = useMutation(refused_document_approver)
        const [okApprove] = useMutation(approved_document) 
        const [refusedSigned] = useMutation(refused_document_by_signer)
        const [okSigned] = useMutation(sign_document)
        const [onDocumentRegistration] = useMutation(registration_document)

        const onDelete = async () => {
                setLoadingButtons(true)
                onDeleteDocument({ variables: { id: uuid } })
                        .catch((e) => {
                                throw new Error(e)
                        })
                        .finally(() => {
                                setLoadingButtons(false)
                                navigation.push(`outgoings`)
                        })
        }
        const onApproved = async () => {
                setLoadingButtons(true)
                onOkApprovedSigned({
                        variables: {
                                id: uuid,
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
                                id: data?.outgoingDocument?.approve?.find(item => item?.approvingBy?.uuid === user?.me?.uuid)?.uuid,
                                comment: value,
                                is_refused: true,
                        }
                })
                        .catch(e => {
                                throw new Error(e)
                        })
                        .finally(() => {
                                setTimeout(() => {
                                        refetch().finally(() => setLoadingButtons(false))
                                        navigation.push('outgoings')
                                }, 750)
                        })
        }
        const onApprovedActive = async () => {
                setLoadingButtons(true)
                okApprove({
                        variables: {
                                id: data?.outgoingDocument?.approve?.find(item => item?.approvingBy?.uuid === user?.me?.uuid)?.uuid,
                                is_approved: true
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

        const isApprove: boolean = useMemo(() => {
                return !!data?.outgoingDocument?.documentType?.uuid
                        &&  !!data?.outgoingDocument?.questionNature?.uuid
                        &&  (isDirector ? true : data?.outgoingDocument?.approversList?.length > 0)
                        &&  !!data?.outgoingDocument?.caseIndex?.uuid
                        &&  !!data?.outgoingDocument?.signer?.uuid
                        && !!data?.outgoingDocument?.summary
                        && (isDirector ? true : ['PAR', 'CONS'].includes(data?.outgoingDocument?.typeOfAgreement || ''))
                        &&  ((data?.outgoingDocument?.approversList?.length > 0 && data?.outgoingDocument?.typeOfAgreement === "EMPTY") ? true : (data?.outgoingDocument?.approversList?.length === 0 && isDirector) ? true : ['CONS', 'PAR']?.includes(data?.outgoingDocument?.typeOfAgreement))
                        && data?.outgoingDocument?.outgoingdocumentreceiverSet?.length > 0
                        && !!data?.outgoingDocument?.sheetsQuantity
        }, [data?.outgoingDocument, user?.me, isDirector])

        const isSendSigned: boolean = useMemo(() => {
                return data?.outgoingDocument?.typeOfAgreement === "EMPTY" && data?.outgoingDocument?.approversList?.length === 0 && !!isDirector
        }, [data?.outgoingDocument, isDirector])

        if (loading) return <Loader />
        if(data === undefined) return <Loader />

        return (
                <ScrollView>
                        <TitleDocs type="outgoings" />
                        <Steps
                                type="outgoing"
                                status={data?.outgoingDocument?.status}
                                red={data?.outgoingDocument?.status === "SEND_ERROR"}
                        />
                        {
                                (
                                        data?.outgoingDocument?.status === "DRAFT" || data?.outgoingDocument?.status === "REFUSED"
                                )
                                &&
                                (
                                        data?.outgoingDocument?.documentCreator?.uuid === user?.me?.uuid || data?.outgoingDocument?.author?.uuid === user?.me?.uuid
                                )
                                &&
                                <ButtonsOnCreateAndApproved
                                        isApproved={isApprove}
                                        isSendSigned={isSendSigned}
                                        onDelete={onDelete}
                                        onApproved={onApproved}
                                        loading={loadingButtons}
                                />
                        }
                        {
                                data?.outgoingDocument?.status === "PENDING_APPROVE"
                                &&
                                data?.outgoingDocument?.approve?.find(item => item?.approvingBy?.uuid === user?.me?.uuid)?.isActive
                                &&
                                <ButtonsApproved
                                        loading={loadingButtons}
                                        onRevision={onRevision}
                                        onApprovedActive={onApprovedActive}
                                />
                        }
                        {
                                active === "main"
                                        ? (
                                                <>
                                                        <RegisterMainInfo data={data} />
                                                        <Route data={data} />
                                                        <Summary data={data} /> 
                                                        <Upload uuid={uuid} upload={data?.outgoingDocument?.outgoingdocumentfileSet} />
                                                </>
                                        ): null
                        }

                </ScrollView>
        )
}

export default Outgoing