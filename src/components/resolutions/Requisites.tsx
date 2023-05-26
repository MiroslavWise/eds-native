import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { View, Text, TouchableOpacity } from 'react-native'

import type { TypeNavigateDocument, TTitleResolutionDocument, ITypeDoc } from './types'

import CardComponent, { IPropsCardComponent } from 'components/base/CardComponent'
import { SplitName } from 'functions/split-name'
import { styleCards } from 'components/docs/protocol/style-cards'

interface IProps{
        document: ITypeDoc | undefined
        type: TypeNavigateDocument
        title: TTitleResolutionDocument
        subject?: string
        navigation: any
        uuid: string
}

export const Requisites: FC<IProps> = ({ document, type, subject, title, navigation, uuid }) => {
        const { t } = useTranslation()
        const handleNavigate = () => {
                navigation.navigate(type, { uuid: uuid })
        }
        const source: IPropsCardComponent = useMemo(() => {
                const obj: IPropsCardComponent = {
                        title: type === "protocol" ? "Details_of_the_original_protocol" : "Details_of_the_original_document",
                        items: [],
                }
                if (type === "incoming") {
                        obj.items.push({
                                label: 'correspondent',
                                info: document?.correspondent?.nameRu,
                        })
                }
                if (type !== "incoming") {
                        obj.items.push({
                                label: 'regAndNum',
                                info: document?.registerNumber?.stringNumber && `№ ${document?.registerNumber?.stringNumber}`,
                        })
                }
                if (type === "incoming") {
                        obj.items.push({
                                label: 'ref_number_and_date',
                                info: document?.originalNumber && document?.date && `№ ${document?.registerNumber?.stringNumber} от ${moment(document?.date).format('LL')}`
                        })
                }
                if (subject && type === "protocol") {
                        obj.items.push({
                                label: 'execSum',
                                info: subject,
                        })
                }
                if (document?.summary && ["internal", "incoming"].includes(type)) { 
                        obj.items.push({
                                label: 'execSum',
                                info: document?.summary,
                        })
                }
                if (["internal", "order"].includes(type) && document?.author && typeof document?.author !== "string") {
                        obj.items.push({
                                label: 'author',
                                info: `${SplitName(document?.author?.getFullNameRu)} (${document?.author?.position?.nameRu})`,
                        })
                }
                if (type === "incoming" && typeof document?.author === "string") {
                        obj.items.push({
                                label: 'author',
                                info: `${document?.author}`,
                        })
                }
                if (type === "protocol" && document?.secretary) { 
                        obj.items.push({
                                label: 'secretary',
                                info: `${SplitName(document?.secretary?.getFullNameRu)} (${document?.secretary?.position?.nameRu})`,
                        })
                }
                if (["internal", "order"].includes(type) && document?.signer) { 
                        obj.items.push({
                                label: 'signing',
                                info: `${SplitName(document?.signer?.getFullNameRu)} (${document?.signer?.position?.nameRu})`,
                        })
                }
                if (type === "protocol" && document?.chairman) {
                        obj.items.push({
                                label: 'chairman',
                                info: `${SplitName(document?.chairman?.getFullNameRu)} (${document?.chairman?.position?.nameRu})`,
                        })
                }
                if (type ==="order" && document?.approversListOrder && document?.approversListOrder?.length > 0) {
                        obj.items.push({
                                label: 'consonant',
                                info: document?.approversListOrder?.map((item) => `${SplitName(item?.person?.getFullNameRu)} (${item?.person?.position?.nameRu})`).join(', '),
                        })
                }
                if (type !== "order" && document?.approversList && document?.approversList?.length > 0) { 
                        obj.items.push({
                                label: 'consonant',
                                info: document?.approversList?.map((item, index) => `${SplitName(item?.person?.getFullNameRu)} (${item?.person?.position?.nameRu})`).join(', '),
                        })
                }
                if (type === "order") {
                        obj.items.push({
                                label: 'nameOfOrderRus',
                                info: document?.nameRu,
                        }, {
                                label: 'nameOfOrderKz',
                                info: document?.nameKz,
                        })
                }
                if (document?.replyingTo?.registerNumber?.stringNumber && type === "incoming") {
                        obj.items.push({
                                label: 'replyTo',
                                info: `${t('outgoingDocument')}: № ${document?.replyingTo?.registerNumber?.stringNumber}`,
                        })
                }
                obj.items.push({
                        label: "рas_a_link_to",
                        info: (
                                <View style={styleCards.content}>
                                        <Text style={styleCards.label}>{t('рas_a_link_to')}</Text>
                                        <TouchableOpacity onPress={handleNavigate}>
                                                <Text style={styleCards.info}>{t(title)}</Text>
                                        </TouchableOpacity>
                                </View>
                        ),
                        type: 'fc',
                })
                return obj
        }, [document, type])

        return (
                <CardComponent {...source} />
        )
}