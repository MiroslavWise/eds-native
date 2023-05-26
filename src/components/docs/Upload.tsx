import { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { View, StyleSheet, Text, TouchableOpacity, Linking } from 'react-native'

import type { UploadsFiles } from 'types/graphql'

import COLORS from 'assets/colors'
import { SplitText } from 'functions/split-text'
import { url_file } from 'services/api-upload'

interface IProps{
        uuid: string
        upload: UploadsFiles[]
}

export const Upload: FC<IProps> = ({ upload, uuid }) => {
        const { t } = useTranslation()

        const handleFile = useCallback(async (file_uuid: string, file_name: string) => {
                const { data } = await url_file(uuid, file_uuid, file_name)
                await Linking.openURL(data)
        }, [])
        
        return (
                <View style={styles.container}>
                        <Text style={styles.title}>{t('apps')}</Text>
                        <View style={styles.items}>
                                {
                                        upload?.length > 0
                                                ?
                                                upload?.map(item => (
                                                        <TouchableOpacity
                                                                key={item.uuid}
                                                                onPress={() => { handleFile(item.uuid, item.fileName) }}
                                                        >
                                                                <View style={styles.file}>
                                                                        <Text style={styles.fileName}>{SplitText(item.fileName, 60)}</Text>
                                                                </View>
                                                        </TouchableOpacity>
                                                )) : null
                                }
                        </View>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                padding: 10,
                marginHorizontal: 10,
                marginBottom: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                backgroundColor: COLORS.bg_main,
        },
        title: {
                color: COLORS.main,
                fontSize: 16,
                fontWeight: '600',
        },
        items: {
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                paddingHorizontal: 10,
        },
        file: {
                padding: 5,
        },
        fileName: {
                color: COLORS.green,
        },
})