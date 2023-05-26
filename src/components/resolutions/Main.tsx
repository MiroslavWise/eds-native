import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { View, Text } from 'react-native'

import type { TypeNavigateDocument } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'

import { SplitName } from 'functions/split-name'
import { styleCards } from 'components/docs/protocol/style-cards'

interface IProps{
        data: any
        navigateDocument: TypeNavigateDocument
}

export const MainResolution: FC<IProps> = ({ data, navigateDocument }) => {
        const { t } = useTranslation()
        const source: IPropsCardComponent = useMemo(() => ({
                title: 'resolution',
                items: [
                        {
                                label: 'textResolution',
                                info: (
                                        <View style={styleCards.content}>
                                                <Text style={styleCards.label}>{t('textResolution')}</Text>
                                                <Text style={styleCards.info}>{data?.text?.text}</Text>
                                                {
                                                        data?.text?.text && data?.subject ? (<View style={styleCards.divider} />) : null
                                                }
                                                {
                                                        data?.subject ? (<Text style={styleCards.info}>{data?.subject}</Text>) : null
                                                }
                                        </View>
                                ),
                                type: 'fc',
                        },
                        {
                                label: 'authorResolution',
                                info: data?.author?.getFullNameRu ? `${SplitName(data?.author?.getFullNameRu)} (${data?.author?.position?.nameRu})` : "",
                        },
                        {
                                label: 'dateExecution',
                                info: data?.executedDate && moment(data?.executedDate).format('LL'),
                        },
                ]
        }), [data])

        return (
                <CardComponent {...source} />
        )
}