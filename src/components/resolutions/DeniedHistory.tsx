import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { View, Text } from 'react-native'

import type { IDeniedPerson } from 'types/resolution/general'
import type { TypeNavigateDocument } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'
import { COLOR_RESOLUTION_EXECUTORS } from 'assets/colors'
import { styleCards } from 'components/docs/protocol/style-cards'
import { SplitName } from 'functions/split-name'

interface IProps{
        deniedHistory: IDeniedPerson[]
}

export const DeniedHistory: FC<IProps> = ({ deniedHistory }) => {
        const { t } = useTranslation()
        const source: IPropsCardComponent = useMemo(() => ({
                title: 'historyOfDeviations',
                items: [{
                        label: '',
                        info: (
                                <View style={styleCards.content}>
                                        {
                                                deniedHistory?.map(item => (
                                                        <View style={styleCards.item} key={item?.uuid}>
                                                                <Text style={styleCards.label}>{t('timeRejected')}</Text>
                                                                <Text style={[styleCards.info, { color: COLOR_RESOLUTION_EXECUTORS.warning }]}>{moment(item?.createdAt).format('LLL')}</Text>
                                                                <Text style={styleCards.label}>{t('rejectPerson')}</Text>
                                                                <Text style={[styleCards.info, { color: COLOR_RESOLUTION_EXECUTORS.warning }]}>{`${SplitName(item?.deniedPerson?.getFullNameRu)} (${item?.deniedPerson?.position?.nameRu })`}</Text>
                                                                <Text style={styleCards.label}>{t('reasonRejected')}</Text>
                                                                <Text style={[styleCards.info, { color: COLOR_RESOLUTION_EXECUTORS.warning }]}>{item?.comment}</Text>
                                                        </View>
                                                ))
                                        }
                                </View>
                        ),
                        type: 'fc',
                }],
        }), [])

        return (
                <CardComponent {...source} />
        )
}