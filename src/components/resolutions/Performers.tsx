import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { View, Text } from 'react-native'

import type { Person } from 'types/graphql'
import type { TypeNavigateDocument, TExecutorsResolution, TExecutorsExecutions, TExecutorsDenied } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { COLOR_RESOLUTION_EXECUTORS } from 'assets/colors'
import { styleCards } from 'components/docs/protocol/style-cards'
import { SplitName } from 'functions/split-name'

interface IProps{
        type: TypeNavigateDocument
        executors: TExecutorsResolution
        data: any
        executorsExecutions: TExecutorsExecutions
        executorsDenied: TExecutorsDenied
}

export const Performers: FC<IProps> = ({ type, data, executors, executorsExecutions, executorsDenied }) => {
        const { t } = useTranslation()
        
        const source: IPropsCardComponent = useMemo(() => ({
                title: 'contractors',
                items: [
                        {
                                label: "contractors",
                                info: (
                                        <View style={styleCards.content}>
                                                {
                                                        data[executors]?.map((item: any) => (
                                                                <View style={styleCards.item} key={item?.uuid}>
                                                                        <Text style={styleCards.label}>{t('timeAndStatus')}</Text>
                                                                        <Text
                                                                                style={[
                                                                                        styleCards.info,
                                                                                        {
                                                                                                color: item[executorsDenied]?.uuid
                                                                                                        ? COLOR_RESOLUTION_EXECUTORS.warning
                                                                                                        : item?.isExecuted && item?.isExpired
                                                                                                                ? COLOR_RESOLUTION_EXECUTORS.success
                                                                                                                : data?.children?.some((user: { author: Person }) => user?.author?.uuid === item?.person?.uuid) && item?.isExpired
                                                                                                                        ? COLOR_RESOLUTION_EXECUTORS.secondary
                                                                                                                        : item?.isExecuted
                                                                                                                                ? COLOR_RESOLUTION_EXECUTORS.success
                                                                                                                                : item?.isExpired
                                                                                                                                        ? COLOR_RESOLUTION_EXECUTORS.error
                                                                                                                                        : data?.children?.some((user: { author: Person }) => user?.author?.uuid === item?.person?.uuid)
                                                                                                                                                ? COLOR_RESOLUTION_EXECUTORS.primary
                                                                                                                                                : COLOR_RESOLUTION_EXECUTORS.primary
                                                                                        }
                                                                                ]}
                                                                        >
                                                                                {
                                                                                        item[executorsDenied]?.uuid
                                                                                        ? `${moment(item[executorsDenied]?.createdAt).format("DD.MM.YYYY HH:mm")} | ${t('rejected')}`
                                                                                                : item?.isExecuted && item?.isExpired
                                                                                                        ? `${moment(item[executorsExecutions]?.dateOfExecution).format("DD.MM.YYYY HH:mm")} | ${t('executedOutOfTime')}`
                                                                                                        : data?.children?.some((user: { author: Person }) => user?.author?.uuid === item?.person?.uuid) && item?.isExpired
                                                                                                                ? `${t('redirectedOutOfTime')}`
                                                                                                                : item?.isExecuted
                                                                                                                        ? `${moment(item[executorsExecutions]?.dateOfExecution).format("DD.MM.YYYY HH:mm")} | ${t('executedTime')}`
                                                                                                                        : item?.isExpired
                                                                                                                                ? `${t('expiredTime')}`
                                                                                                                                : data?.children?.some((user: { author: Person }) => user?.author?.uuid === item?.person?.uuid)
                                                                                                                                        ? `${t('redirectedOnExecute')}`
                                                                                                                                        : `${t('pendingExecution')}`
                                                                                }
                                                                        </Text>
                                                                        <Text style={styleCards.label}>{t('executors')}</Text>
                                                                        <Text
                                                                                style={[
                                                                                        styleCards.info,
                                                                                        {
                                                                                                color: item[executorsDenied]?.uuid
                                                                                                        ? COLOR_RESOLUTION_EXECUTORS.warning
                                                                                                        : item?.isExecuted && item?.isExpired
                                                                                                                ? COLOR_RESOLUTION_EXECUTORS.success
                                                                                                                : data?.children?.some((user: { author: Person }) => user?.author?.uuid === item?.person?.uuid) && item?.isExpired
                                                                                                                        ? COLOR_RESOLUTION_EXECUTORS.secondary
                                                                                                                        : item?.isExecuted && !item?.isExpired
                                                                                                                                ? COLOR_RESOLUTION_EXECUTORS.success
                                                                                                                                : item?.isExpired && !item?.isExecuted 
                                                                                                                                        ? COLOR_RESOLUTION_EXECUTORS.error
                                                                                                                                        : data?.children?.some((user: { author: Person }) => user?.author?.uuid === item?.person?.uuid)
                                                                                                                                                ? COLOR_RESOLUTION_EXECUTORS.primary
                                                                                                                                                : COLOR_RESOLUTION_EXECUTORS.primary
                                                                                        }
                                                                                ]}
                                                                        >
                                                                                {`${SplitName(item?.person?.getFullNameRu)} (${item?.person?.position?.nameRu})`}
                                                                        </Text>
                                                                        {
                                                                                (
                                                                                        data?.children?.some((user: { author: Person }) => user?.author?.uuid === item?.person?.uuid)
                                                                                        ||
                                                                                        data[executors]?.find((user: { person: Person }) => user?.person?.uuid === item?.person?.uuid)[executorsDenied]?.comment
                                                                                )
                                                                                        ? (
                                                                                                <>
                                                                                                        <Text style={styleCards.label}>{t('reassignmentOrRejection')}</Text>
                                                                                                        {
                                                                                                                data?.children?.some((user: { author: Person }) => user?.author?.uuid === item?.person?.uuid)
                                                                                                                &&
                                                                                                                (
                                                                                                                        <Text
                                                                                                                                style={[
                                                                                                                                        styleCards.info,
                                                                                                                                        {
                                                                                                                                                color: 'black'
                                                                                                                                                // color: data?.children?.some((user: { author: Person }) => user?.author?.uuid === item?.person?.uuid)
                                                                                                                                                //         ? data?.children?.filter((user: any) => user?.author?.uuid === item?.person?.uuid)?.map((exec: any, i: number) => (
                                                                                                                                                //                 exec[executors]?.map((obj: any, i: number) => (
                                                                                                                                                //                         item?.isExecuted && !item?.isExpired
                                                                                                                                                //                                 ? COLOR_RESOLUTION_EXECUTORS.success
                                                                                                                                                //                                 : item?.isExpired && !item?.isExecuted
                                                                                                                                                //                                         ? COLOR_RESOLUTION_EXECUTORS.error
                                                                                                                                                //                                         : item?.isExpired && item?.isExecuted
                                                                                                                                                //                                                 ? COLOR_RESOLUTION_EXECUTORS.primary
                                                                                                                                                //                                                 : COLOR_RESOLUTION_EXECUTORS.primary
                                                                                                                                                //                 ))))
                                                                                                                                                //         : COLOR_RESOLUTION_EXECUTORS.primary
                                                                                                                                        }
                                                                                                                                ]}
                                                                                                                        >
                                                                                                                                {
                                                                                                                                        data?.children?.some((user: { author: Person }) => user?.author?.uuid === item?.person?.uuid)
                                                                                                                                                ?
                                                                                                                                                data?.children
                                                                                                                                                        ?.filter((user: any) => user?.author?.uuid === item?.person?.uuid)
                                                                                                                                                        ?.map((exec: any) => (exec[executors]
                                                                                                                                                                ?.map((obj: any) => `${SplitName(obj?.person?.getFullNameRu)} (${obj?.person?.position?.nameRu})`)?.join(', ')))
                                                                                                                                                : ""
                                                                                                                                }
                                                                                                                        </Text>
                                                                                                                )
                                                                                                        }
                                                                                                        {
                                                                                                                data[executors]?.find((user: { person: Person }) => user?.person?.uuid === item?.person?.uuid)[executorsDenied]?.comment
                                                                                                                &&
                                                                                                                (
                                                                                                                        <Text
                                                                                                                                style={[
                                                                                                                                        styleCards.info,
                                                                                                                                        {
                                                                                                                                                color: COLOR_RESOLUTION_EXECUTORS.warning,
                                                                                                                                        }
                                                                                                                                ]}
                                                                                                                        >
                                                                                                                                {data[executors]?.find((user:{person: Person})=>user?.person?.uuid === item?.person?.uuid)[executorsDenied]?.comment}
                                                                                                                        </Text>
                                                                                                                )
                                                                                                        }
                                                                                                </>
                                                                                        ) : null
                                                                        }
                                                                </View>
                                                        ))
                                                }
                                        </View>
                                ),
                                type: 'fc',
                        }
                ]
        }), [data])

        return (
                <CardComponent {...source} />
        )
}