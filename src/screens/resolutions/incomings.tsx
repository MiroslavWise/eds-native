import { shallow } from 'zustand/shallow';
import { useQuery } from "@apollo/client";

import Table from 'components/resolutions/Table';

import { useResolution } from 'store/use-resolution';

import { resolution_list_table } from 'apollo/incoming/query';

const IncomingsResolution = ({ navigation }: { navigation: any }) => {
        const { page, object_filter, setPage } = useResolution(state => ({
                page: state.page.incomings,
                object_filter: state.object_filter.incomings,
                setPage: state.setPage.incomings,
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
                        data={data?.incomingDocumentResolutions?.results}
                        loading={loading}
                        type="incomings"
                        navigation={navigation}
                        pagination={{
                                total: data?.incomingDocumentResolutions?.totalCount,
                                page: page,
                                setPage: setPage,
                                offset: 20,
                        }}
                        typeExecutors="incomingDocumentExecutors"
                        typeDenied="incomingdocumentresolutiondenied"
                />
        ) 
}

export default IncomingsResolution