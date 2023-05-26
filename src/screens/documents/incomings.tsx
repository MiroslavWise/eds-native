import { shallow } from 'zustand/shallow'
import { useQuery } from 'react-query'

import TableDocs from 'components/docs/TableDocs'

import useDocuments from 'store/use-docs'

const Incomings = ({ navigation }: { navigation: any }) => {
        const { page, input, filter, getData, setPage } = useDocuments((state => ({
                page: state.page.incoming,
                input: state.input.incoming,
                filter: state.type_filter.incoming,
                getData: state.setData.incoming,
                setPage: state.setPage.incoming,
        })), shallow)

        const { data, isLoading } = useQuery(['incomings', page, filter, input], async () => await getData(), {
                refetchInterval: 60 *  1000,
                refetchOnWindowFocus: false,
        })

        return (
                <TableDocs
                        data={data?.data || []}
                        navigation={navigation}
                        type="incomings"
                        loading={isLoading}
                        pagination={{
                                page: page,
                                total: data?.total,
                                setPage: setPage,
                        }}
                />
        ) 
}

export default Incomings