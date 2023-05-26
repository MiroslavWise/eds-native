import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import type { TTitleDocs } from "types/store/documents";
import type { TResolution } from "types/graphql";

import { stylesDocs } from "screens/documents/style";

interface IProps{
        docOrRes?: 'doc' | 'res'
        type?: TTitleDocs | TResolution
        title?: string
}

const TitleDocs: FC<IProps> = ({ type, title, docOrRes = 'doc' }) => {
        const { t } = useTranslation()
        
        const titleResolution: Record<TResolution & TTitleDocs, string> = useMemo(() => ({
                incomings: 'incomings',
                outgoings: 'outgoings',
                internals: 'internals',
                protocols: 'protocols',
                productionOrders: 'productionOrders',
                incoming_resolution: 'Resolution_to_the_incoming_document',
                internal_resolution: 'Resolution_to_the_internal_document',
                protocol_resolution: 'minutesResolution',
                order_resolution: 'res_order_'
        }), [type])

        return (
                <View style={stylesDocs.wrapper}> 
                        <View style={stylesDocs.containerTitle}>
                                <Text style={stylesDocs.title}>{t(docOrRes === "doc" ? 'My_documents' : 'My_resolutions')}</Text>
                                <Text style={stylesDocs.label}>{t(type && titleResolution[type as TResolution & TTitleDocs] || title || "")}</Text>
                        </View>
                </View>
        )
}

export default TitleDocs