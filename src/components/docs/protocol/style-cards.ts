import { StyleSheet } from 'react-native'

import COLORS from 'assets/colors'

export const styleCards = StyleSheet.create({
        content: {
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
        },
        item: {
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                borderRadius: 7,
                padding: 7,
                borderColor: COLORS.gray,
                borderStyle: 'solid',
                borderWidth: 1,
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
        divider: {
                width: '100%',
                borderBottomColor: COLORS.gray,
                borderBottomWidth: 1,
                borderStyle: 'solid',
        }
})