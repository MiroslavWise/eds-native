import { FC, useMemo, Dispatch, useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from "react-native";


import { PaginationTotalPages } from "../functions/pagination-total-pages";
import COLORS from "../assets/colors";

interface IProps{
        page: number
        total: number | undefined
        offset?: number
        setPage: Dispatch<number>
}

const Pagination: FC<IProps> = ({ page, total, setPage, offset = 10 }) => {
        const [_total, _setTotal] = useState(total)
        useEffect(() => {
                _setTotal(prev => {
                        if (!total) return prev
                        return total
                })
        }, [total])
        const pages: number[] = useMemo(() => {
                return PaginationTotalPages(_total, offset)
        }, [_total])

        return (
                <View style={style.container}>
                        <FlatList
                                horizontal
                                style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        width: 100
                                }}
                                data={pages}
                                renderItem={item => <Item page={item.item} setPage={setPage} current={page} />}
                                keyExtractor={item => `${item}_pages`}
                        />
                </View>
        )
}

const Item = ({ page, setPage, current }: { page: number, setPage: Dispatch<number>, current: number }) => (
        <TouchableOpacity
                onPress={() => {
                        setPage(page)
                }}
                disabled={current === page}
        >
                <View
                        style={[
                                style.itemContainer,
                                {
                                        borderColor: current === page ? COLORS.main : COLORS.gray
                                }
                        ]}
                >
                        <Text style={{ color: current === page ? COLORS.main : COLORS.gray }}>{page}</Text>
                </View>
        </TouchableOpacity>
)

export default Pagination

const style = StyleSheet.create({
        container: {
                display: "flex",
                flexDirection: 'row',
                marginVertical: 10,
                marginHorizontal: 0,
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 5,
        },

        itemContainer: {
                display: 'flex',
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 5,
                marginLeft: 3,
        },
})