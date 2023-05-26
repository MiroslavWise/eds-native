import { FC, useMemo } from 'react'

import type { IPropsProtocolComponents } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'
import moment from 'moment'


export const Main: FC<IPropsProtocolComponents> = ({ data }) => {
        
        const main: IPropsCardComponent = useMemo(() => ({
                title: 'credentials',
                items: [
                        {
                                label: 'typeProtocol',
                                info: data?.protocol?.typeOfProtocol?.nameRu,
                        },
                        {
                                label: 'venue',
                                info: data?.protocol?.location,
                        },
                        {
                                label: 'present',
                                info: data && data?.protocol?.protocolattendedSet?.length > 0
                                        ? data?.protocol?.protocolattendedSet?.map(user => `${SplitName(user?.person?.getFullNameRu)} (${user?.person?.position?.nameRu})`)
                                        : "",
                        },
                        {
                                label: 'invitees',
                                info: data?.protocol?.invited,
                        },
                        {
                                label: 'date',
                                info: data?.protocol?.date && moment(data?.protocol?.date).format('LLL'),
                        },
                        {
                                label: 'secretary',
                                info: data?.protocol?.secretary ? `${SplitName(data?.protocol?.secretary?.getFullNameRu)} (${data?.protocol?.secretary?.position?.nameRu})` : "",
                        },
                        {
                                label: 'chairman',
                                info: data?.protocol?.chairman ? `${SplitName(data?.protocol?.chairman?.getFullNameRu)} (${data?.protocol?.chairman?.position?.nameRu})` : "",
                        },
                        {
                                label: 'dateExecution',
                                info: data?.protocol?.periodOfExecution && moment(data?.protocol?.periodOfExecution).format('LL'),
                        },
                ]
        }), [data?.protocol])

        return (
                <CardComponent {...main} />
        )
}