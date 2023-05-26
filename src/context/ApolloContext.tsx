import {FC, ReactNode} from "react"
import { setContext } from '@apollo/client/link/context'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    DefaultOptions
} from "@apollo/client"

import useStorage from "store/storage"
import { BASE_URL } from "assets/url"

const ApolloContext: FC<{ children: ReactNode }> = ({ children }) => {
    const httpLink = createHttpLink({ uri: `${BASE_URL}/graphql/` })
    const token = useStorage(state => state.token)
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                Authorization: token ? `JWT ${token}` : null
            }
        }
    })

    const defaultOptions:DefaultOptions = {
        watchQuery: {
            fetchPolicy: "cache-and-network",
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: "standby",
            errorPolicy: 'all',
        },
    }

    const clientApollo = new ApolloClient({
        link :authLink.concat(httpLink),
        cache: new InMemoryCache(),
        credentials: 'include',
        connectToDevTools: true,
        defaultOptions: defaultOptions,
    })
    return(
        <ApolloProvider client={clientApollo}>
            {children}
        </ApolloProvider>
    )
}

export default ApolloContext
