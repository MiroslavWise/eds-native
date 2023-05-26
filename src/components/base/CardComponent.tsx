import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { View, StyleSheet, Text } from "react-native";

import COLORS from "assets/colors";

export interface IPropsCardComponent{
        title: string
        items: {
                label: string
                info: any
                type?: 'fc' | undefined
        }[]
}

const ListCardComponents: FC<IPropsCardComponent[]> = (props) => {

        return (
                <></>
        )
}

const DefaultCard: FC<{ label: string, info: any }> = ({ label, info }) => {
        const { t } = useTranslation()

        return (
                <View style={styles.content}>
                        <Text style={styles.label}>{t(label)}</Text>
                        <Text style={styles.info}>{info}</Text>
                </View>
        )
}

const CardComponent: FC<IPropsCardComponent> = ({ title, items }) => {
        const { t } = useTranslation()

        return (
                <View style={styles.container}>
                        <Text style={styles.title}>{t(title)}</Text>
                        <View style={styles.items}>
                                {
                                        items?.map(item => {
                                                if (item?.type === "fc") return item?.info
                                                if(typeof item.info === "string") return <DefaultCard {...item} key={`${item?.label}_${item.info}`} />
                                                return <DefaultCard {...item} key={`${item?.label}_${item.info}`} />
                                        })
                                }
                        </View>
                </View>
        )
}

export default CardComponent

const styles = StyleSheet.create({
        container: {
                padding: 10,
                marginHorizontal: 10,
                marginBottom: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                backgroundColor: COLORS.bg_main,
        },
        title: {
                color: COLORS.main,
                fontSize: 16,
                fontWeight: '600',
        },
        items: {
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                paddingHorizontal: 10,
        },
        content: {
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
        },
        label: {
                color: COLORS.gray,
                fontSize: 14,
                fontWeight: '600',
        },
        info: {
                color: COLORS.main,
                fontSize: 13,
                fontWeight: '500',
        },
})