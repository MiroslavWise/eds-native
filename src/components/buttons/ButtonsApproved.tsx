import { FC, DispatchWithoutAction, useState } from "react";

import { View } from 'react-native'

import { styleButton } from "./styles";
import Button from "./ButtonBlue";
import ModalRefused from "./ModalRefused";

interface IProps{
        loading: boolean

        onRevision(value: string): Promise<any>
        onApprovedActive: DispatchWithoutAction
}

const ButtonsApproved: FC<IProps> = ({ loading, onRevision, onApprovedActive }) => {
        const [visible, setVisible] = useState(false)
        const [input, setInput] = useState('')

        return (
                <View style={styleButton.containerButtons}>
                        <Button
                                label="coordinate"
                                onPress={onApprovedActive}
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
                                onRevision={onRevision}
                        />
                </View>
        )
}

export default ButtonsApproved