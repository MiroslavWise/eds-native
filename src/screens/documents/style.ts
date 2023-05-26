import { StyleSheet } from 'react-native'
import COLORS from '../../assets/colors'

export const stylesDocs = StyleSheet.create({
        wrapper: {
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
        },
        containerTitle: {
                display: 'flex',
                flexDirection: 'column',
        },
        title: {
                fontWeight: '500',
                fontSize: 14,
                lineHeight: 17,
                color: COLORS.main,
        },
        label: {
                fontWeight: '600',
                fontSize: 24,
                lineHeight: 27,
                color: COLORS.main,
        }
})