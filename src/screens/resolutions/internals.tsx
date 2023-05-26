import { shallow } from 'zustand/shallow';
import { useQuery } from "@apollo/client";

import Table from 'components/resolutions/Table';

import { useResolution } from 'store/use-resolution';

import { resolution_list_table } from 'apollo/internal/query';

const InternalsResolution = ({ navigation }: { navigation: any }) => {
        const { page, object_filter, setPage } = useResolution(state => ({
                page: state.page.internals,
                object_filter: state.object_filter.internals,
                setPage: state.setPage.internals,
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
                        data={data?.internalDocumentResolutions?.results}
                        loading={loading}
                        type="internals"
                        navigation={navigation}
                        pagination={{
                                total: data?.internalDocumentResolutions?.totalCount,
                                page: page,
                                setPage: setPage,
                                offset: 20,
                        }}
                        typeExecutors="internalDocumentExecutors"
                        typeDenied="internaldocumentresolutiondenied"
                />
        ) 
}

export default InternalsResolution