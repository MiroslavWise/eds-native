import COLORS from 'assets/colors';
import {useTranslation} from 'react-i18next'
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

interface IRoute{
        title: string,
        route: string
}

const HANDBOOKS: IRoute[] = [
        {
                title: 'correspondents',
                route: 'correspondent',
        },
        {
                title: 'typeControl',
                route: 'control',
        },
        {
                title: 'indexCase',
                route: 'casein',
        },
        {
                title: 'typeDoc',
                route: 'doc-type',
        },
        {
                title: 'questionNat',
                route: 'question',
        },
        {
                title: 'nomenclatureCase',
                route: 'nomenclature',
        },
        {
                title: 'positions',
                route: 'position',
        },
]

const IndexHandbooks = ({ navigation }: { navigation: any }) => {
        const { t } = useTranslation()
        
        const onPress = (route: string) => {
                navigation.push(route)
        }

        return (
                <View style={styles.container}>
                        {
                                HANDBOOKS.map(item => (
                                        <TouchableOpacity
                                                key={`${item.route}_button`}
                                                onPress={() => onPress(item.route)}
                                        >
                                                <View style={styles.button}>
                                                        <Text style={styles.text}>{ t(item.title) }</Text>
                                                </View>
                                        </TouchableOpacity>
                                ))
                        }
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                display: "flex",
                flexDirection: "column",
                gap: 10,
                width: '100%',
                padding: 10,
        },
        button: {
                width: '100%',
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 15,
                borderColor: COLORS.main,
                borderWidth: 1,
                borderRadius: 10,
        },
        text: {
                color: COLORS.main
        },
})

export default IndexHandbooks