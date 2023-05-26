import { FC, useEffect, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow'
import { useQuery } from "@apollo/client";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Image, StyleSheet, Text } from "react-native";

import { TABS } from "models/stack-tabs";

import useUser from "store/user";
import { profile } from "apollo/user";
import COLORS from "assets/colors";

const Tab = createBottomTabNavigator();

const Layout: FC = () => {
        const { t } = useTranslation()
        const { data: profileData, loading: loadingProfile, refetch: refetchProfile } = useQuery(profile)

        const { setRefetch, setDataUser, setLoadingUser } = useUser(
                (state) => ({
                        setRefetch: state.setRefetch,
                        setDataUser: state.setUserData,
                        setLoadingUser: state.setLoading,
                }), shallow
        )

        useEffect(() => {
                setRefetch(refetchProfile)
        }, [])
        useEffect(() => { setLoadingUser(loadingProfile) }, [loadingProfile])
        useEffect(() => {
                if (profileData) {
                        setDataUser(profileData)
                }
        }, [profileData])

        
        const photo: string | null = useMemo(() => profileData?.me?.photo || null, [profileData])
        return (
                <NavigationContainer>
                        <Tab.Navigator
                                initialRouteName="СЭД"
                        >
                                {
                                        TABS.map(item => (
                                                <Tab.Screen
                                                        key={item.name}
                                                        name={item.name}
                                                        component={item.component}
                                                        options={{
                                                                headerTitle: (item) => {
                                                                        return <Text style={{color: COLORS.main, fontSize: 22,}}>{item.children}</Text>
                                                                },
                                                                title: t(item.name) || "",
                                                                tabBarIcon: ({ color }) => {
                                                                        if (item?.name === "My_Profile" && photo) {
                                                                                return (
                                                                                        <Image
                                                                                                source={{ uri: photo }}
                                                                                                style={{ height: 27, width: 27, borderRadius: 3 }}
                                                                                        />
                                                                                )
                                                                        }
                                                                        if (!!item?.icon) {
                                                                                return (
                                                                                        <Image
                                                                                                source={item.icon}
                                                                                                style={style.icon}
                                                                                        />
                                                                                )
                                                                        }
                                                                        return undefined
                                                                },
                                                        }}
                                                />
                                        ))
                                }
                        </Tab.Navigator>
                </NavigationContainer>
        )
}

export default Layout

const style = StyleSheet.create({
        icon: {
                width: 27,
                height: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
        },
})