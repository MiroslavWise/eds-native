import { shallow } from 'zustand/shallow';
import { useQuery } from "@apollo/client";

import Table from 'components/resolutions/Table';

import { useResolution } from 'store/use-resolution';

import { resolution_list_table } from 'apollo/protocol/query';

const ProtocolsResolution = ({ navigation }: { navigation: any }) => {
        const { page, object_filter, setPage } = useResolution(state => ({
                page: state.page.protocols,
                object_filter: state.object_filter.protocols,
                setPage: state.setPage.protocols,
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
                        data={data?.protocolResolutions?.results}
                        loading={loading}
                        type="protocols"
                        navigation={navigation}
                        pagination={{
                                total: data?.protocolResolutions?.totalCount,
                                page: page,
                                setPage: setPage,
                                offset: 20,
                        }}
                        typeExecutors="protocolExecutors"
                        typeDenied="protocolresolutiondenied"
                />
        ) 
}

export default ProtocolsResolution