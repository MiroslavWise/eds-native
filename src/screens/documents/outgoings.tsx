import { shallow } from 'zustand/shallow'
import { useQuery } from 'react-query'

import TableDocs from '../../components/docs/TableDocs'

import useDocuments from '../../store/use-docs'

const Outgoings = ({ navigation }) => {
        const { page, input, filter, getData, setPage } = useDocuments((state => ({
                page: state.page.outgoing,
                input: state.input.outgoing,
                filter: state.type_filter.outgoing,
                getData: state.setData.outgoing,
                setPage: state.setPage.outgoing,
        })), shallow)

        const { data, isLoading } = useQuery(['outgoings', page, filter, input], () => getData(), {
                refetchInterval: 60 * 1000,
                refetchOnWindowFocus: false,
        })

        return (
                <TableDocs
                        data={data?.data || []}
                        navigation={navigation}
                        type="outgoings"
                        loading={isLoading}
                        pagination={{
                                page: page,
                                total: data?.total,
                                setPage: setPage,
                        }}
                />
        ) 
}

export default Outgoings