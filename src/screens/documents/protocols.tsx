import { shallow } from 'zustand/shallow'
import { useQuery } from 'react-query'

import TableDocs from '../../components/docs/TableDocs'

import useDocuments from '../../store/use-docs'

const Protocols = ({navigation}) => {
        const { page, input, filter, getData, setPage } = useDocuments((state => ({
                page: state.page.protocol,
                input: state.input.protocol,
                filter: state.type_filter.protocol,
                getData: state.setData.protocol,
                setPage: state.setPage.protocol,
        })), shallow)

        const { data, isLoading } = useQuery(['protocols', page, filter, input], () => getData(), {
                refetchInterval: 60 * 1000,
                refetchOnWindowFocus: false,
        })

        return (
                <TableDocs
                        data={data?.data || []}
                        navigation={navigation}
                        type="protocols"
                        loading={isLoading}
                        pagination={{
                                page: page,
                                total: data?.total,
                                setPage: setPage,
                        }}
                />
        ) 
}

export default Protocols