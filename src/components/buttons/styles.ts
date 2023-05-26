import { StyleSheet } from 'react-native'
import COLORS from '../../assets/colors'

export const styleButton = StyleSheet.create({
        containerButtons: {
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                gap: 5,
                width: '100%',
                marginVertical: 5,
                paddingHorizontal: 10,
        },

        viewButton: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 8,
                paddingHorizontal: 16,
                gap: 10,
                borderRadius: 5,
                minWidth: 120,
        },
        blue: {
                backgroundColor: COLORS.main,
                text: {
                        color: COLORS.white,
                        fontSize: 14,
                },
        },
        secondary: {
                backgroundColor: COLORS.gray,
                text: {
                        color: COLORS.main,
                        fontSize: 14,
                },
        },
        green: {
                backgroundColor: COLORS.green,
                text: {
                        color: COLORS.white,
                        fontSize: 14,
                },
        }
})