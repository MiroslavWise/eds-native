import { StyleSheet, Dimensions } from 'react-native'

import COLORS from 'assets/colors'

export const styles = StyleSheet.create({
        container: {
                padding: 10,
                marginHorizontal: 10,
                marginVertical: 10,
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
        input: {
                width: Dimensions.get('window').width - 60,
                color: COLORS.black,
                borderColor: COLORS.gray,
                borderWidth: 1,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
        }
})