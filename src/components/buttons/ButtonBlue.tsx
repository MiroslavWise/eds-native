import { FC, DispatchWithoutAction, ReactNode, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { TouchableOpacity, View, Text, ActivityIndicator  } from 'react-native'

import { styleButton } from './styles'

interface IProps{
        label: string
        loading?: boolean
        disabled?: boolean | undefined
        icon?: ReactNode
        type: 'green' | 'blue' | 'secondary'

        onPress?: DispatchWithoutAction
}

const Button: FC<IProps> = ({ label, loading, icon, onPress, type, disabled }) => {
        const { t } = useTranslation()

        const typeButton = useMemo(() => {
                if (type === "blue") {
                        return {
                                view: [styleButton.viewButton, styleButton.blue],
                                text: [styleButton.blue.text]
                        }
                }
                if (type === 'green') {
                        return {
                                view: [styleButton.viewButton, styleButton.green],
                                text: [styleButton.green.text]
                        }
                }
                if (type === 'secondary') {
                        return {
                                view: [styleButton.viewButton, styleButton.secondary],
                                text: [styleButton.secondary.text]
                        }
                }
                return {
                        view: [styleButton.viewButton, styleButton.secondary],
                        text: [styleButton.secondary.text]
                }
        }, [type])
        return (
                <TouchableOpacity onPress={onPress} disabled={loading || disabled}>
                        <View style={typeButton.view}>
                                {loading ? (<ActivityIndicator size="small" />) : null}
                                <Text style={typeButton.text}>{t(label)}</Text>
                        </View>
                </TouchableOpacity>
        )
}

export default Button