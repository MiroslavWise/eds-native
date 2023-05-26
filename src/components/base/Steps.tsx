import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet, Text } from 'react-native'

import type { StatusOutgoing, TDoc, TypeStatusIncoming } from 'types/graphql'
import type { StatusOrder } from 'types/document/order'
import type { StatusResolution } from 'types/types'
import type { TStatusHelp } from 'types/store/help-desk'

import { getStatus } from '../../functions/get-status'
import COLORS from '../../assets/colors'

type TStatus = TypeStatusIncoming | StatusOutgoing | StatusOrder | StatusResolution | TStatusHelp

interface IStepProps{
        loading?: boolean
        status: TStatus | undefined
        type: TDoc | 'resolution' | 'help'
        red?: boolean | undefined
}



const Steps: FC<IStepProps> = ({ loading, status, type, red }) => {
        const { t, i18n } = useTranslation()
        const { language } = i18n

        const isStatus: Record<(TDoc | 'resolution' | 'help'), Record<'title', string>[]> = useMemo(() => ({
                incoming: [
                        { title: status === "EXPIRED" ? t('expiredTime') : t('creating') },
                        { title: status === "REGISTRATION_REJECTED" ? t('registration_rejected') : status === "BAD_SIGNATURE" ? t('bad_signature') : t('onRegistration') },
                        { title:  t('registered') },
                        { title: status === "EXECUTING" ? t('executing') : t('execution') },
                        { title: t('executed') }
                ],
                outgoing: [
                        { title: t('creating') },
                        { title: status === "PENDING_APPROVE" ? t('pendingApprove') : t('reconciliation') },
                        { title: status === "PENDING_SIGNING" ? t('signingStatus') : (status === "ON_REGISTRATION" ||  status === "REGISTERED") ? t('signedet') : 'Подпись' },
                        { title: t('onRegistration') },
                        { title: t('registered') },
                        { title:  status === "SENT" ? t('sent') : status === "SEND_ERROR" ? t('send_error') : t('sending') }
                ],
                internal: [
                        { title: t('creating'), status: status === "EXPIRED" ? "error" : (status === "DRAFT" || status === "REFUSED") ? "process" : "finish" },
                        { title: status === "PENDING_APPROVE" && t('pendingApprove') || t('reconciliation') },
                        { title: status === "PENDING_SIGNING" ? t('signingStatus') : status === "SIGNED" ? t('signedet') : t('syncBy') },
                        { title: status === "EXECUTING" && t('executing') || t('execution') },
                        { title: status === "EXPIRED" && t('expired') || t('executed') }
                ],
                protocol: [
                        { title: t('creating'), status: status === "EXPIRED" ? "error" : (status === "DRAFT" || status === "REFUSED") ? "process" : "finish" },
                        { title: status === "PENDING_APPROVE" && t('pendingApprove') || t('reconciliation') },
                        { title: status === "PENDING_SIGNING" ? t('signingStatus') : status === "SIGNED" ? t('signedet') : t('syncBy') },
                        { title: status === "EXECUTING" && t('executing') || t('execution') },
                        { title: status === "EXPIRED" && t('expired') || t('executed') }
                ],
                order: [
                        { title: t('creating'), status: status === "EXPIRED" ? "error" : (status === "DRAFT" || status === "REFUSED") ? "process" : "finish" },
                        { title: status === "PENDING_APPROVE" && t('pendingApprove') || t('reconciliation') },
                        { title: status === "PENDING_SIGNING" ? t('signingStatus') : status === "SIGNED" ? t('signedet') : t('syncBy') },
                        { title: status === "EXECUTING" && t('executing') || t('execution') },
                        { title: status === "EXPIRED" && t('expired') || t('executed') }
                ],
                resolution: [
                        { title: status === "EXPIRED" ? t('expired') : t('executing') },
                        { title: t('executed') }
                ],
                help: [
                        { title: t('creating') },
                        { title: status === "SEND_ERROR" ? t('send_error') : t('execution') },
                        { title: t('Check') },
                        { title: status === "CLOSED" ? t('Closed') : t('Closure') }
                ],
                'undefined': []
        }), [status, i18n.language])

        const numberStatuses: number = useMemo(() => {
                const object: Record<TDoc | 'resolution' | 'help' , number> = {
                        incoming: 5,
                        outgoing: 6,
                        internal: 5,
                        protocol: 5,
                        order: 5,
                        resolution: 2,
                        help: 4,
                }
                return object[type]
        }, [type])

        const current: number = useMemo(() => {
                const object: Record<(TDoc | 'resolution' |'help'), number> = {
                        incoming: status === "DRAFT" ? 0
                                :  (status === "ON_REGISTRATION" || status === "BAD_SIGNATURE" || status === "REGISTRATION_REJECTED") ? 1
                                        : status === "REGISTERED" ? 2
                                                : status === "EXECUTING" ? 3
                                                        : status === "EXECUTED" ? 4
                                                                : 0,
                        outgoing: status === "DRAFT" ? 0
                                : status === "PENDING_APPROVE" ? 1
                                        : status === "PENDING_SIGNING" ? 2
                                                : status === "REFUSED" ? 0
                                                        : status === "APPROVED" ? 2
                                                                : status === "ON_REGISTRATION" ? 3
                                                                        : status === "REGISTERED" ? 4
                                                                                : (status === "SENT" || status === "SEND_ERROR") ? 5
                                                                                        : 0,
                        internal: status === "DRAFT" ? 0
                                : status === "PENDING_APPROVE" ? 1
                                        : status === "PENDING_SIGNING" ? 2
                                                : status === "REFUSED" ? 0
                                                        : status === "SIGNED" ? 2
                                                                : status === "APPROVED" ? 2
                                                                        : status === "EXECUTING" ? 3
                                                                                : status === "EXECUTED" ? 4
                                                                                        : status === "EXPIRED" ? 4
                                                                                                : 0,
                        protocol: status === "DRAFT" ? 0
                                : status === "PENDING_APPROVE" ? 1
                                        : status === "PENDING_SIGNING" ? 2
                                                : status === "REFUSED" ? 0
                                                        : status === "SIGNED" ? 2
                                                                : status === "APPROVED" ? 2
                                                                        : status === "EXECUTING" ? 3
                                                                                : status === "EXECUTED" ? 4
                                                                                        : status === "EXPIRED" ? 4
                                                                                                : 0,
                        order: status === "DRAFT" ? 0
                                : status === "PENDING_APPROVE" ? 1
                                        : status === "PENDING_SIGNING" ? 2
                                                : status === "REFUSED" ? 0
                                                        : status === "SIGNED" ? 2
                                                                : status === "APPROVED" ? 2
                                                                        : status === "EXECUTING" ? 3
                                                                                : status === "EXECUTED" ? 4
                                                                                        : status === "EXPIRED" ? 4
                                                                                                : 0,
                        resolution: status === "IN_PROCESS" ? 0 : status === "EXECUTED" ? 1 : 0,
                        help: status === "DRAFT" ? 0
                                : status === "SENT" ? 1
                                        : status === "SEND_ERROR" ? 1
                                                : status === "EXECUTING" ? 1
                                                        : status === "ON_CHECK" ? 2
                                                                : status === "DENIED" ? 1
                                                                        : status === "CLOSED" ? 3
                                                                                : 0
                }

                return object[type]
        }, [status])

        return (
                <View style={styles.container}>
                        {
                                isStatus[type].map((item, index) => (
                                        <View
                                                key={`${item.title}_status_header`}
                                                style={styles.row}
                                        >
                                                <View style={[
                                                        styles.__circle__,
                                                        //@ts-ignore
                                                        styles[getStatus(index, current)],
                                                        (index === current && styles.__success__),
                                                        (red && styles.__error__)
                                                ]}>
                                                        <Text style={[
                                                                styles.number,
                                                                //@ts-ignore
                                                                styles[getStatus(index, current)]?.text,
                                                                (index === current && styles.__success__.text),
                                                                (red && styles.__error__.text)
                                                        ]}>{index + 1}</Text>
                                                </View>
                                                <Text style={[
                                                        styles.text,
                                                        //@ts-ignore
                                                        styles[getStatus(index, current)]?.text,
                                                        (index === current && styles.__success__.text),
                                                        (red && styles.__error__.text)
                                                ]}>
                                                        {t(item.title)}
                                                </Text>
                                        </View>
                                ))
                        }
                </View>
        )
}

export default Steps

const styles = StyleSheet.create({
        container: {
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                padding: 10,
        },
        row: {
                display: 'flex',
                flexDirection: 'row',
                gap: 5,
        },
        text: {
                fontSize: 16,
                padding: 0,
                margin: 0,
                fontWeight: '600',
                color: COLORS.gray,
        },
        __circle__: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 22,
                width: 22,
                borderRadius: 11,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: COLORS.gray,
        },
        __success__: {
                borderColor: COLORS.green,
                text: {
                        color: COLORS.green,
                }
        },
        __process__: {
                borderColor: COLORS.gray,
                text: {
                        color: COLORS.gray,
                }
        },
        __error__: {
                borderColor: COLORS.expired,
                text: {
                        color: COLORS.expired,
                }
        },
        number: {
                color: COLORS.gray,
                fontSize: 16,
        },
})