import { useMemo } from "react";
import { shallow } from "zustand/shallow";
import { useTranslation } from "react-i18next";
import { QueryResult, useQuery } from "@apollo/client";
import moment from "moment";

import { View, ScrollView, SafeAreaView, StyleSheet, Dimensions, Image, Text  } from "react-native";

import type { IPropsCardComponent } from "components/base/CardComponent";
import type { TypesSignature } from "types/user";

import CardComponent from "components/base/CardComponent";

import useUser from "store/user";
import { useAuth } from "authorization/models";

import COLORS from "assets/colors";
import { my_auth_signature } from "apollo/user";
import Button from "components/buttons/ButtonBlue";
const anonimIMG = require('assets/image/anonim.png')

interface IFullName{
        last_name: string
        first_name: string
        middle_name: string
}

const SexType: Record<'MALE' | 'FEMALE' | 'null', string> = {
        MALE: 'Male',
        FEMALE: 'Female',
        null: '',
}

const IndexProfile = ({ navigation }: { navigation: any }) => {
        const { t } = useTranslation()
        const { user, photo } = useUser(
                state => ({
                        user: state.user,
                        photo: state.user?.me?.photo,
                }),
                shallow
        )
        const { data: signature, loading } = useQuery(my_auth_signature) as QueryResult<TypesSignature>
        const { signOut } = useAuth()

        const fullName: IFullName = useMemo(() => {
                if (user?.me?.getFullNameRu) {
                        const split = user?.me?.getFullNameRu?.split(' ')
                        const last = split && split[0] ? split[0] : ''
                        const first = split && split[1] ? split[1] : ''
                        const middle = split && split[2] ? split[2] : ''
                        return {
                                last_name: last,
                                first_name: first,
                                middle_name: middle
                        }
                }
                return {
                        last_name: "",
                        first_name: "",
                        middle_name: "",
                }
        }, [user?.me?.getFullNameRu])

        const main: IPropsCardComponent = {
                title: 'main',
                items: [
                        {
                                label: 'surname',
                                info:  fullName.last_name,
                        },
                        {
                                label: 'firstName',
                                info: fullName.first_name,
                        },
                        {
                                label: 'patronymic',
                                info: fullName.middle_name,
                        },
                        {
                                label: 'dateOfBirth',
                                info: user?.me?.birthday ? moment(user?.me?.birthday).format('LL') : null
                        },
                        {
                                label: 'gender',
                                info: SexType.hasOwnProperty(user?.me?.gender || '') ? t(SexType[`${user?.me?.gender || 'null'}`]) : ''
                        },
                        {
                                label: 'department',
                                info: user?.me?.department?.nameRu,
                        },
                        {
                                label: 'jobTitle',
                                info: user?.me?.position?.nameRu,
                        }
                ]
        }

        const electronic: IPropsCardComponent = {
                title: 'electronicData',
                items: [
                        {
                                label: 'Email',
                                info: user?.me?.user?.email,
                        },
                        {
                                label: 'work_p',
                                info: user?.me?.workPhone,
                        },
                        {
                                label: 'inner_p',
                                info: user?.me?.innerPhone,
                        },
                        {
                                label: 'mobile_p',
                                info: user?.me?.mobilePhone,
                        },
                ]
        }

        const keyEDS: IPropsCardComponent = {
                title: 'keyEDS',
                items: 
                        signature 
                                ? [
                                        {
                                                label: 'surnameNameOfTheEDSowner',
                                                info: signature?.myAuthSignature?.commonName,
                                        },
                                        {
                                                label: 'EDSownersIIN',
                                                info: signature?.myAuthSignature?.iin,
                                        },
                                        {
                                                label: 'EDSOwnerOrganization',
                                                info: signature?.myAuthSignature?.organization,
                                        },
                                        {
                                                label: 'BINofTheEDSownersOrganization',
                                                info: signature?.myAuthSignature?.bin,
                                        }
                                ] : []
        }

        const onEdit = () => {
                navigation.push('edit-profile')
        }

        const photoImg = useMemo(() => {
                        return photo ? {uri: photo} : anonimIMG
                }, [photo])

        return (
                <SafeAreaView style={styles.container}>
                        <ScrollView>
                                <View style={styles.imgContainer}>
                                        <Image
                                                style={styles.photo}
                                                source={photoImg}
                                        />
                                </View>
                                <CardComponent {...main} />
                                <CardComponent {...electronic} />
                                <CardComponent {...keyEDS} />
                                <View style={styles.buttonExit}>
                                        <Button
                                                label="edit"
                                                type="green"
                                                onPress={onEdit}
                                        />
                                        <Button
                                                label="Exit"
                                                type="secondary"
                                                onPress={signOut}
                                        />
                                </View>
                        </ScrollView>
                </SafeAreaView>
        )
}

export default IndexProfile

const styles = StyleSheet.create({
        container: {
                position: 'relative',
                margin: 10,
                padding: 5,
                backgroundColor: COLORS.white,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
        },
        imgContainer: {
                position: 'absolute',
                top: 20,
                right: 20,
                zIndex: 150,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: 100,
                marginBottom: 10,
        },
        photo: {
                width: 120,
                height: 120,
                position: 'relative',
                borderRadius: 60,
        },
        buttonExit: {
                position: 'absolute',
                top: 140,
                right: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
        },
})