import {FC} from 'react'

import { ActivityIndicator, StyleSheet, View } from 'react-native';

import COLORS from 'assets/colors';

const Loader: FC = ({ }) => {
        return (
                <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator  color={COLORS.main} size="large" />
                </View>
        )
}

export default Loader

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: 'center',
                height: '70%',
        },
        horizontal: {
                display: 'flex',
                flexDirection: 'row',
                padding: 10,
        },
});