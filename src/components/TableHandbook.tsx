import { Dispatch, FC, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next'
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Pagination from './Pagination';

interface IProps{
        page: number
        total?: number
        col_one: string
        col_two: string
        col_desc: string
        data: [string, string, string][]

        setPage: Dispatch<number>
}

const TableHandbook: FC<IProps> = ({ col_one, col_two, col_desc, data, total, page, setPage }) => {
        const { t } = useTranslation()
        const tableHead = [t(col_one), t(col_two), t(col_desc)]
        
        return (
                <View style={styles.container}>
                        <View style={styles.header}>
                                {
                                        tableHead.map(item => (
                                                <View style={styles.col} key={`${item}_header`}>
                                                        <Text style={styles.textCol}>{ item }</Text>
                                                </View>
                                        ))
                                }
                        </View>
                        <FlatList style={styles.flatList}
                                data={data}
                                renderItem={({ item }) => (
                                        <View style={styles.row} key={`${item[1]}_${item[0]}_row`}>
                                                {
                                                        item?.map((row, index) => (
                                                                <View style={styles.col} key={`item_row${row}_row`}>
                                                                        <Text style={styles.textCol}>{ row }</Text>
                                                                </View>
                                                        ))
                                                }
                                        </View>
                                )}
                                keyExtractor={item => `item_row${item}_row`}
                        />
                        <Pagination
                                offset={20}
                                page={page}
                                total={total}
                                setPage={setPage}
                        />
                </View>
        )
}

export default TableHandbook
 
const styles = StyleSheet.create({
        container: {
                flex: 1, padding: 5, paddingTop: 5, backgroundColor: '#fff', 
                width: '100%',
        },
        header: {
                height: 40,
                backgroundColor: '#f1f8ff',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: '100%',
                marginBottom: 5,
        },
        flatList: {
                width: '100%',
                marginBottom: 5,
        },
        row: {
                backgroundColor: '#ddd',
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: '100%',
                borderBottomColor: 'black',
                borderBottomWidth: 1,
        },
        col: {
                width: "33%",
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
        },
        textCol: {
                color: '#111'
        }
});