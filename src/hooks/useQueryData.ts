import { DocumentNode, QueryResult, useQuery } from "@apollo/client"

export function useQueryData<T>(query: DocumentNode, uuid: string) {
        const context = useQuery(query, { variables: { id: uuid }, pollInterval: 30 * 1000 }) as QueryResult<T, { id: string }>

        return context
}