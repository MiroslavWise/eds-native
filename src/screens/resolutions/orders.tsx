import { shallow } from 'zustand/shallow';
import { useQuery } from "@apollo/client";

import Table from 'components/resolutions/Table';

import { useResolution } from 'store/use-resolution';

import { resolution_list_table } from 'apollo/order/query';

const OrdersResolution = ({ navigation }: { navigation: any }) => {
        const { page, object_filter, setPage } = useResolution(state => ({
                page: state.page.orders,
                object_filter: state.object_filter.orders,
                setPage: state.setPage.orders,
        }), shallow)
        const { data, loading, refetch } = useQuery(resolution_list_table, {
                variables: {
                        offset: (page - 1) * 20,
                        ...object_filter,
                },
                pollInterval: 60 * 1000,
        })
        return (
                <Table
                        data={data?.productionOrderResolutions?.results}
                        loading={loading}
                        type="orders"
                        navigation={navigation}
                        pagination={{
                                total: data?.productionOrderResolutions?.totalCount,
                                page: page,
                                setPage: setPage,
                                offset: 20,
                        }}
                        typeExecutors="productionOrderExecutors"
                        typeDenied="productionorderresolutiondenied"
                />
        ) 
}

export default OrdersResolution