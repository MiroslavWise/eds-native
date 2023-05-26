import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";

import { Text, TextInput, View } from "react-native";

import { styleFrom } from "./style";

export interface IPropsForm{
        title: string
        control: any
        items: {
                label: string
                name: string
                disabled?: boolean | undefined
        }[]
}


const CardComponentsForm: FC<IPropsForm> = ({ title, control, items }) => {
        const { t } = useTranslation()
        
        return (
                <View style={styleFrom.container}>
                        <Text style={styleFrom.title}>{t(title)}</Text>
                        <View style={styleFrom.items}>
                                {
                                        items.map(({ label, name, disabled }) => (
                                                <View style={styleFrom.content} key={`${name}_${label}_form`}>
                                                        <Text style={styleFrom.label}>{t(label)}</Text>
                                                        <Controller
                                                                name={name}
                                                                control={control}
                                                                rules={{ required: true }}
                                                                render={({ field: { onChange, onBlur, value } }) => (
                                                                        <TextInput
                                                                                editable={!disabled}
                                                                                style={[styleFrom.input, disabled ? styleFrom.disabled : {}]}
                                                                                placeholder={t(label) || ''}
                                                                                onBlur={onBlur}
                                                                                onChangeText={onChange}
                                                                                value={value}
                                                                        />
                                                                )}
                                                        />
                                                </View>
                                        ))
                                }
                        </View>
                </View>
        )
}

export default CardComponentsForm