import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

import {SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, ActivityIndicator, View} from "react-native";

import { useAuth } from "./models";
import useStorage from 'store/storage'

import COLORS from "assets/colors";

const SignIn: FC = () => {
        const { t } = useTranslation()
        const [loading, setLoading] = useState(false)
        const { control, handleSubmit, formState: { errors } } = useForm({
                defaultValues: {
                        email: '',
                        password: ''
                }
        });
        const {setAuthState} = useAuth()
        const useLogin = useStorage(state => state.useLogin)

        const onPress = async (data: { email: string, password: string }) => {
                setLoading(true)
                useLogin({
                        email: data.email,
                        password: data.password,
                })
                        .then(res => {
                                if (res.login) {
                                        setAuthState("Main")
                                } else {
                                        setAuthState("SignIn")
                                }
                        })
                        .finally(() => {
                                setLoading(false)
                        })
        }

        return(
                <View style={styles.container}>
                        <SafeAreaView style={styles.form}>
                                <View style={styles.formDiv}>
                                        <Text style={styles.label}>{t('enterEmail')}</Text>
                                        <Controller
                                                name="email"
                                                control={control}
                                                rules={{ required: true, }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                                textContentType="emailAddress"
                                                                value={value}
                                                                onBlur={onBlur}
                                                                onChangeText={onChange}
                                                                placeholder={t('enterEmail') || ""}
                                                                style={styles.input}
                                                        />
                                                )}
                                        />
                                        {errors.email && <Text style={{ color: COLORS.expired, fontSize: 12, textAlign: 'left' }}>Это поле важно</Text>}
                                </View>
                                <View style={styles.formDiv}>
                                        <Text style={styles.label}>{t('password')}</Text>
                                        <Controller
                                                name="password"
                                                control={control}
                                                rules={{ required: true, }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                        <TextInput
                                                                secureTextEntry
                                                                textContentType="password"
                                                                onChangeText={onChange}
                                                                value={value}
                                                                onBlur={onBlur}
                                                                placeholder={t('password') || ""}
                                                                style={styles.input}
                                                        />
                                                )}
                                        />
                                        {errors.password && <Text style={{ color: COLORS.expired, fontSize: 12, textAlign: 'left' }}>Это поле важно</Text>}
                                </View>
                                <TouchableOpacity
                                        style={styles.button}
                                        onPress={handleSubmit(onPress)}
                                        disabled={loading}
                                >
                                        {
                                                loading
                                                        ? (
                                                                <ActivityIndicator size="small" />
                                                        ) : null
                                        } 
                                        <Text style={styles.textButton}>{t('enter')}</Text>
                                </TouchableOpacity>
                        </SafeAreaView>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
        },
        form: {
                display: "flex",
                flexDirection: "column",
                gap: 15,
                width: "80%",
        },
        formDiv: {
                display: "flex",
                flexDirection: "column",
                gap: 5,
        },
        label: {
                color: COLORS.main,
        },
        input:{
                paddingVertical: 7,
                paddingHorizontal: 11,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "#d9d9d9",
                borderRadius: 10,
                color: COLORS.black,
        },
        button:{
                backgroundColor: COLORS.main,
                height: 40,
                borderRadius: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
        },
        textButton:{
                fontWeight: "500",
                fontSize: 14,
                color: COLORS.white,

        },
});

export default SignIn
