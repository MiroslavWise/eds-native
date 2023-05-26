import { shallow } from 'zustand/shallow'
import { useQuery } from 'react-query'

import TableDocs from 'components/docs/TableDocs'

import useDocuments from 'store/use-docs'

const Internals = ({ navigation }: { navigation: any }) => {
        const { page, input, filter, getData, setPage, } = useDocuments((state => ({
                page: state.page.internal,
                input: state.input.internal,
                filter: state.type_filter.internal,
                getData: state.setData.internal,
                setPage: state.setPage.internal
        })), shallow)

        const { data, isLoading } = useQuery(['internals', page, filter, input], () => getData(), {
                refetchInterval: 60 * 1000,
                refetchOnWindowFocus: false,
        })

        return (
                <TableDocs 
                        data={data?.data || []}
                        navigation={navigation}
                        type="internals"
                        loading={isLoading}
                        pagination={{
                                page: page,
                                total: data?.total,
                                setPage: setPage,
                        }}
                />
        ) 
}

export default Internals