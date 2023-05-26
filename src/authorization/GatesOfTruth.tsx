import {FC, useEffect} from "react";

import {ActivityIndicator, StyleSheet, View} from 'react-native';

import { useAuth } from "./models";

import useStorage from "store/storage";

import COLORS from "assets/colors";

const GatesOfTruth: FC = () => {
        const { signOut, setAuthState } = useAuth()
        const token = useStorage(state => state.token)
        useEffect(() => {
                if (token) {
                        setAuthState('Main')
                } else {
                        setAuthState('SignIn')
                }
        }, [])

        return(
                <View style={styles.container}>
                        <ActivityIndicator size="large" color={COLORS.main} />
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: 'center',
        },
        horizontal: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
        },
});

export default  GatesOfTruth
