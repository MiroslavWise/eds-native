import { UseQueryResult, useQuery as useQueryReactQuery } from 'react-query'

import type { TDocumentLink } from 'types/store/pdf-document'

import { axiosInstance } from 'context/ContextAxios'
import { BASE_URL } from 'assets/url'

const getLinkData = async (type: TDocumentLink, uuid: string) => {

        return await axiosInstance.get(`${BASE_URL}/api/${type}/preview/${uuid}`)
                .then(response => {
                        return response?.data
                })
                .catch(e => {
                        console.error('ERROR: ', e)
                        return null
                })
}

export const useLink = (type: TDocumentLink, uuid: string) => {
        const context = useQueryReactQuery(
                ['preview', uuid, type],
                () => getLinkData(type, uuid),
                {
                        refetchInterval: 100 * 1000,
                }
        )

        return context as UseQueryResult
}

