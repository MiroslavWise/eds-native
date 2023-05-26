import { FC } from "react";
import { useTranslation } from 'react-i18next'
import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity, FlatList  } from "react-native";
import type { IPropsItemsEDS, ICardProps } from "types/item-eds";

import COLORS from "assets/colors";

const screenWidth = Math.round(Dimensions.get('window').width);

const ComponentsCarousel: FC<IPropsItemsEDS & { navigation: any }> = (item) => {

        return (
                <View style={{ marginBottom: 15 }}>
                        <FlatList
                                horizontal
                                data={item.items}
                                keyExtractor={(item) => `${item?.label}_carousel`}
                                renderItem={(_item) => <ItemCarousel {..._item} navigation={item.navigation} />}
                        />
                </View>
        )
}
export default ComponentsCarousel

const ItemCarousel: FC<{item: ICardProps, navigation: any}> = ({ item, navigation } ) => {
        const { t } = useTranslation()

        return (
                <TouchableOpacity onPress={() => { navigation.push(item.path) }}>
                        <View style={styles.container}>
                                <View style={styles.header}>
                                        <Text style={styles.label}>{t(item.label)}</Text>
                                        <Image source={item.img}/>
                                </View>
                                <View style={styles.totalView}>
                                        <Text style={styles.totalNumber}>{item.total}</Text>
                                        <Text style={styles.totalDescription}>{ t('total_documents') }</Text>
                                </View>
                                <View style={[styles.totalView, styles.totalViewHeight]}>
                                        {
                                                item.other.map((tot, index) => (
                                                        <View key={`${item.label}_${tot[0]}`} style={styles.otherContainer}>
                                                                <Text style={[styles.totalDescription, styles.widthDescription]}>{ t(tot[0]).toLowerCase() }</Text>
                                                                <Text style={{ ...styles.otherNumber, color: index !== item.other.length - 1 ? COLORS.main : COLORS.expired }}>{ tot[1] }</Text>
                                                        </View>
                                                ))
                                        }
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.footer}>
                                        <Text style={styles.textFooter}>{ t('More_detailed') }</Text>
                                </View>
                        </View>
                </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
        container: {
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                paddingVertical: 15,
                width: screenWidth - 20,
                borderRadius: 5,
                backgroundColor: '#FFFFFF',
                margin: 5,
                maxWidth: 280,
        },
        header: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 15,
        },
        label: {
                fontWeight: '600',
                fontSize: 14,
                lineHeight: 17,
                color: COLORS.main,
                maxWidth: 180,
        },
        totalView: {
                display: 'flex',
                flexDirection: 'column',
                paddingHorizontal: 15,
        },
        totalViewHeight: {
                height: 70,
        },
        totalNumber: {
                fontWeight: '700',
                fontSize: 20,
                lineHeight: 24,
                color: COLORS.main,
        },
        totalDescription: {
                fontWeight: '500',
                fontSize: 12,
                lineHeight: 14,
                color: COLORS.gray,
        },
        otherContainer: {
                display: 'flex',
                flexDirection: 'row',
        },
        otherNumber: {
                fontWeight: '700',
                fontSize: 11,
                lineHeight: 13,
        },
        widthDescription: {
                width: 100,
        },
        divider: {
                width: '100%',
                backgroundColor: COLORS.gray,
                height: 1,
        },
        footer: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingHorizontal: 15,
        },
        textFooter: {
                fontWeight: '600',
                fontSize: 12,
                lineHeight: 14,
                color: COLORS.green,
        },
})