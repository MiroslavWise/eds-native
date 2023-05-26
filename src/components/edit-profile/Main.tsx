import { FC, useMemo } from "react"
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { shallow } from "zustand/shallow";
import moment from "moment"

import { View, TextInput, Text } from 'react-native'

import type { Gender } from "types/graphql";

import CardComponentsForm, { IPropsForm } from "components/base/CardComponentsForm";

import useUser from "store/user";
import { styles } from './style'

interface IMainEdit{
        surname: string
        firstName: string
        patronymic: string
        dateOfBirth: string
        gender: Gender
        department: string
        jobTitle: string
}

interface IFullName{
        surname: string
        firstName: string
        patronymic: string
}

const EditMain: FC<{ navigation: any }> = ({ navigation }) => {
        const { t } = useTranslation()
        const { user } = useUser(
                (state) => ({
                        user: state.user,
                }), shallow
        )
        const fullName: IFullName = useMemo(() => {
                if (user?.me?.getFullNameRu) {
                        const split = user?.me?.getFullNameRu?.split(' ')

                        const last = split && split[0] ? split[0] : ''
                        const first = split && split[1] ? split[1] : ''
                        const middle = split && split[2] ? split[2] : ''
        
                        return {
                                surname: last,
                                firstName: first,
                                patronymic: middle
                        }
                }
                return {
                        surname: '',
                        firstName: '',
                        patronymic: ''
                }
        }, [user?.me?.getFullNameRu])

        const { control, handleSubmit, formState: { errors } } = useForm({
                defaultValues: {
                        surname: fullName.surname,
                        firstName: fullName.firstName,
                        patronymic: fullName.patronymic,
                        dateOfBirth: user?.me?.birthday ? moment(user?.me?.birthday) : '',
                        gender: user?.me?.gender || null,
                        department: user?.me?.department?.nameRu,
                        jobTitle: user?.me?.position?.nameRu,
                } as IMainEdit
        });

        const dataMain: IPropsForm = {
                title: 'main',
                control: control,
                items: [
                        {
                                label: 'surname',
                                name: 'surname',
                        },
                        {
                                label: 'firstName',
                                name: 'firstName',
                        },
                        {
                                label: 'patronymic',
                                name: 'patronymic',
                        },
                        {
                                label: 'dateOfBirth',
                                name: 'dateOfBirth',
                                disabled: true,
                        },
                        {
                                label: 'gender',
                                name: 'gender',
                                disabled: true,
                        },
                        {
                                label: 'department',
                                name: 'department',
                                disabled: true,
                        },
                        {
                                label: 'jobTitle',
                                name: 'jobTitle',
                                disabled: true,
                        }
                ]
        }

        const onSubmit = (values: IMainEdit) => {

        }

        return (
                <CardComponentsForm {...dataMain} />
        )
}

export default EditMain