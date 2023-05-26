import { useState, useMemo } from 'react'
import { shallow } from 'zustand/shallow'
import { useTranslation } from 'react-i18next'
import { useMutation } from "@apollo/client"
import moment from 'moment'

import { ScrollView } from "react-native"

import type { PropsOrderAbout } from 'types/document/order'
import type { TTypeTabs } from "types/types"

import { useQueryData } from "hooks/useQueryData"

import Loader from "components/Loader"
import Steps from "components/base/Steps"
import TitleDocs from "components/docs/TitleDocs"
import PdfPreview from 'components/PdfPreview'
import ButtonsOnCreateAndApproved from 'components/buttons/ButtonsOnCreateAndApproved'
import ButtonsApproved from 'components/buttons/ButtonsApproved'
import ButtonsSigned from 'components/buttons/ButtonsSigned'
import { ExecutersAndFamiliarization, OneCredentials, Responsible, Route, TwoCredentials } from 'components/docs/order'

import useUser from 'store/user'
import { order_about } from 'apollo/order/query'
import {
        delete_order,
        update_to_approve,
        refused_approve,
        approved_active,
        refused_signed,
        signed_active,
        create_resolution,
        update_resolution,
        person_resolution,
        update_resolution_final
} from 'apollo/order/mutation'
import { Upload } from 'components/docs'

const Order = ({ navigation, route }: { navigation: any, route: { params: { uuid: string } } }) => {
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
        const { data, loading, refetch } = useQueryData<PropsOrderAbout>(order_about, uuid)
        const [onDeleteDocument] = useMutation(delete_order, { variables: { id: uuid } })
        const [onOkApprovedSigned] = useMutation(update_to_approve, { variables: { id: uuid, } })
        const [refusedApprove] = useMutation(refused_approve)
        const [okApprove] = useMutation(approved_active)
        const [refusedSigned] = useMutation(refused_signed)
        const [okSigned] = useMutation(signed_active)

        const [onCreateResolution] = useMutation(create_resolution)
        const [updateResolution] = useMutation(update_resolution)
        const [updatePersonResolution] = useMutation(person_resolution)
        const [updateFinalResolution] = useMutation(update_resolution_final)

        const onDelete = () => {
                setLoadingButtons(true)
                onDeleteDocument({ variables: { id: uuid } })
                        .catch((e) => {
                                throw new Error(e)
                        })
                        .finally(() => {
                                setLoadingButtons(false)
                                navigation.push(`orders`)
                        })
        }

        const onApproved = () => {
                setLoadingButtons(true)
                onOkApprovedSigned()
                        .catch(e => {
                                setLoadingButtons(false)
                                throw new Error(e);
                        })
                        .finally(() => {
                                setTimeout(() => {
                                        refetch().finally(() => setLoadingButtons(false))
                                }, 175)
                        })
        }

        const onRevision = async (value: string) => {
                setLoadingButtons(true)
                return refusedApprove({
                        variables: {
                                id: data?.productionOrder?.approve.find(item => item?.approvingBy?.uuid === user?.me?.uuid)?.uuid,
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
                                id: data?.productionOrder?.approve.find(item => item?.approvingBy?.uuid === user?.me?.uuid)?.uuid
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
                                id: data?.productionOrder?.ordersign?.uuid,
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
                                id: data?.productionOrder?.ordersign?.uuid,
                        }
                })
                        .catch(e => {
                                throw new Error(e)
                        })
                        .finally(() => {
                                setTimeout(() => refetch().finally(() => setLoadingButtons(false)), 750)
                        })
        }


        const isApprove: boolean = useMemo(() => [
                !!data?.productionOrder?.caseIndex?.uuid,
                !!data?.productionOrder?.nameRu,
                !!data?.productionOrder?.nameKz,
                !!data?.productionOrder?.signer?.uuid,
                data && data?.productionOrder?.orderreceiverSet?.length > 0,
                (isDirector ? true : ['PAR', 'CONS'].includes(data?.productionOrder?.typeOfAgreement || '')),
                ((data && data?.productionOrder?.approversListOrder?.length > 0 && data?.productionOrder?.typeOfAgreement === "EMPTY") ? true : (data?.productionOrder?.approversListOrder?.length === 0 && isDirector) ? true : ['PAR', 'CONS']?.includes(data?.productionOrder?.typeOfAgreement || '')),
                (isDirector ? true : data && data?.productionOrder?.approversListOrder?.length > 0),
        ]
        .every(item => item === true), [data?.productionOrder])
        const isSendSigned: boolean = useMemo(() => data?.productionOrder?.typeOfAgreement === "EMPTY" && data?.productionOrder?.approversListOrder?.length === 0 && !!isDirector, [data?.productionOrder, user?.me])

        if (loading) return <Loader />
        if (data === undefined) return <Loader />

        return (
                <ScrollView>
                        <TitleDocs type="productionOrders" />
                        <Steps
                                type="order"
                                status={data?.productionOrder?.status}
                                loading={loading}
                                red={data?.productionOrder?.status === "EXPIRED"}
                        />
                        {
                                (data?.productionOrder?.status === "DRAFT" || data?.productionOrder?.status === "REFUSED")
                                &&
                                data?.productionOrder?.author?.uuid === user?.me?.uuid
                                &&
                                <ButtonsOnCreateAndApproved
                                        isApproved={isApprove}
                                        loading={loadingButtons}
                                        isSendSigned={isSendSigned}
                                        onDelete={onDelete}
                                        onApproved={onApproved}
                                />
                        }
                        {
                                data?.productionOrder?.approve?.some(item => item?.approvingBy?.uuid === user?.me?.uuid && item?.isActive)
                                &&
                                data?.productionOrder?.status === "PENDING_APPROVE"
                                &&
                                <ButtonsApproved
                                        loading={loadingButtons}
                                        onRevision={onRevision}
                                        onApprovedActive={onApprovedActive}
                                />
                        }
                        {
                                data?.productionOrder?.status === "PENDING_SIGNING"
                                &&
                                data?.productionOrder?.signer?.uuid === user?.me?.uuid
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
                                                        <OneCredentials data={data} />
                                                        <TwoCredentials data={data} />
                                                        <Route data={data} />
                                                        <Upload uuid={uuid} upload={data?.productionOrder?.orderfileSet} />
                                                        <ExecutersAndFamiliarization data={data} />
                                                        <Responsible data={data} />
                                                </>
                                        ): null
                        }
                </ScrollView>
        )
}

export default Order