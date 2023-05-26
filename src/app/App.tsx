import { useEffect } from 'react';
import {
        QueryClient,
        QueryClientProvider,
} from 'react-query'
import { Authorization } from 'authorization';
import ApolloContext from 'context/ApolloContext';
import { ProviderAxios } from 'context/ContextAxios';

const queryClient = new QueryClient()

import 'react-native-gesture-handler';
import '@context/i18n'
import Layout from './Layout';

const App = () => {

        return (
                <Authorization>
                        <QueryClientProvider client={queryClient}>
                                <ApolloContext>
                                        <ProviderAxios>
                                                <Layout />
                                        </ProviderAxios>
                                </ApolloContext>
                        </QueryClientProvider>
                </Authorization>
        )
}

export default App