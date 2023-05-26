import { FC } from "react";

import { View, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import { WebView } from 'react-native-webview';


import { TDocumentLink } from "types/store/pdf-document";

import { useLink } from "hooks/use-link-preview";

interface IProps{
        type: TDocumentLink
        uuid: string
}

const PdfPreview: FC<IProps> = ({ type, uuid }) => {
        const { data, isLoading } = useLink(type, uuid)

        return (
                <View style={styles.container}>
                        {
                                isLoading
                                        ? <ActivityIndicator size="large" />
                                        : (
                                                <WebView
                                                        source={{
                                                                uri: `https://docs.google.com/gview?url=${data}`,
                                                        }}
                                                        style={styles.pdf}
                                                />
                                        )
                        }
                </View>
        )
}

export default PdfPreview

const styles = StyleSheet.create({
        container: {
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: 10,
        },
        pdf: {
                flex:1,
                width:Dimensions.get('window').width,
                height:Dimensions.get('window').height,
        }
})