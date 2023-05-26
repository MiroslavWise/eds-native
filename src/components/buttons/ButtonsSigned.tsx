import { FC, DispatchWithoutAction, useState } from 'react'

import { View } from 'react-native'

import { styleButton } from "./styles";
import Button from "./ButtonBlue";
import ModalRefused from "./ModalRefused";

interface IProps{
        loading: boolean

        onRevisionSigned(value: string): Promise<any>
        onSigned: DispatchWithoutAction
}

const ButtonsSigned: FC<IProps> = ({ loading, onRevisionSigned, onSigned }) => {
        const [visible, setVisible] = useState(false)
        const [input, setInput] = useState('')

        return (
                <View style={styleButton.containerButtons}>
                        <Button
                                label="sign"
                                onPress={onSigned}
                                loading={loading}
                                type="blue"
                        />
                        <Button
                                label="sendInForRevision"
                                onPress={() => setVisible(true)}
                                loading={loading}
                                type="secondary"
                        />
                        <ModalRefused
                                loading={loading}
                                visible={visible}
                                input={input}
                                setVisible={setVisible}
                                setInput={setInput}
                                onRevision={onRevisionSigned}
                        />
                </View>
        )
}

export default ButtonsSigned