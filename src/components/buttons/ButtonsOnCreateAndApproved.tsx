import { DispatchWithoutAction, FC } from "react";

import { View, Text } from 'react-native'

import Button from "./ButtonBlue";

import { styleButton } from "./styles";

interface IProps{
        isApproved: boolean
        loading: boolean
        isSendSigned?: boolean

        onDelete: DispatchWithoutAction
        onApproved: DispatchWithoutAction
}


const ButtonsOnCreateAndApproved: FC<IProps> = ({ isApproved, loading, isSendSigned, onDelete, onApproved }) => {
        
        return (
                <View style={styleButton.containerButtons}>
                        {
                                isApproved ? (
                                        <Button
                                                label={isSendSigned ? 'sendInForSigned' : 'sendInForApproval'}
                                                onPress={onApproved}
                                                loading={loading}
                                                type="blue"
                                        />
                                ) : null
                        }
                        <Button
                                label="deleteDoc"
                                onPress={onDelete}
                                loading={loading}
                                type="secondary"
                        />
                </View>
        )
}

export default ButtonsOnCreateAndApproved