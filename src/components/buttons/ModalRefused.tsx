import { FC, Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal, View, StyleSheet, TextInput } from 'react-native'

import Button from './ButtonBlue'

import COLORS from 'assets/colors'
import { styleButton } from './styles'

interface IProps {
        loading: boolean
        visible: boolean
        input: string

        setVisible: Dispatch<SetStateAction<boolean>>
        setInput: Dispatch<SetStateAction<string>>
        onRevision(value: string): Promise<any>
}

const ModalRefused: FC<IProps> = ({ onRevision, setVisible, visible, input, setInput, loading }) => {
        const { t } = useTranslation()

        return (
                <Modal
                                visible={visible}
                                animationType="fade"
                                transparent={true}
                        >
                                <View style={styleModal.mask}>
                                        <View style={styleModal.container}>
                                                <TextInput
                                                        editable
                                                        multiline
                                                        numberOfLines={4}
                                                        placeholder={t('enterCauseOfDeviation') || ''}
                                                        style={styleModal.textInput}
                                                        maxLength={256}
                                                        onChangeText={value => setInput(value)}
                                                        value={input}
                                                />
                                                <View style={styleButton.containerButtons}>
                                                        <Button
                                                                label="cancelDoc"
                                                                onPress={() => setVisible(false)}
                                                                loading={loading}
                                                                type="secondary"
                                                        />
                                                        <Button
                                                                label="sendInForRevision"
                                                                onPress={() => {
                                                                        onRevision(input)
                                                                                .finally(() => {
                                                                                        setVisible(false)
                                                                                })
                                                                }}
                                                                loading={loading}
                                                                disabled={input.length < 11}
                                                                type="blue"
                                                        />
                                                </View>
                                        </View>
                                </View>
                        </Modal>
        )
}

export default ModalRefused

const styleModal = StyleSheet.create({
        mask: {
                height: '100%',
                width: '100%',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(1, 1, 1, 0.2)',
        },
        container: {
                margin: 20,
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 5,
                backgroundColor: COLORS.white,
                borderRadius: 15,
        },
        textInput: {
                borderRadius: 10,
                borderColor: COLORS.gray,
                borderWidth: 1,
                borderStyle: 'solid',
                padding: 5,
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'flex-start',
                color: COLORS.main,
        },
})