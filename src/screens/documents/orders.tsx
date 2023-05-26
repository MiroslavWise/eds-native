import { shallow } from 'zustand/shallow'
import { useQuery } from 'react-query'

import TableDocs from 'components/docs/TableDocs'

import useDocuments from 'store/use-docs'

const Orders = ({navigation}: {navigation: any}) => {
        const { page, input, filter, getData, setPage } = useDocuments((state => ({
                page: state.page.order,
                input: state.input.order,
                filter: state.type_filter.order,
                getData: state.setData.order,
                setPage: state.setPage.order,
        })), shallow)

        const { data, isLoading } = useQuery(['orders', page, filter, input], () => getData(), {
                refetchInterval: 60 * 1000,
                refetchOnWindowFocus: false,
        })

        return (
                <TableDocs
                        data={data?.data || []}
                        navigation={navigation}
                        type="productionOrders"
                        loading={isLoading}
                        pagination={{
                                page: page,
                                total: data?.total,
                                setPage: setPage,
                        }}
                />
        ) 
}

export default Orders