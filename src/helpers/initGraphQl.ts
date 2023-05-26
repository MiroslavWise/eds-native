import {ApolloClient, ApolloLink, FetchResult, from, HttpLink, InMemoryCache} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Observable } from '@apollo/client/utilities/observables/Observable';

import {BASE_URL} from "assets/url";

const authMiddleware = setContext(async (_, { headers }) => {
    return {
    };
});
const cancelRequestLink = new ApolloLink(
    (operation, forward) =>
        new Observable(observer => {
            const context = operation.getContext();
            const connectionHandle = forward(operation).subscribe({
                next: (...arg: FetchResult[]) => observer.next(...arg),
                error: (...arg) => {
                    cleanUp();
                    observer?.error(...arg);
                },
                complete: (...arg) => {
                    cleanUp();
                    observer.complete(...arg);
                },
            });
            const cleanUp = () => connectionHandle?.unsubscribe();

            if (context.cancelRequest) {
                const controller = new AbortController();
                controller.signal.onabort = cleanUp;
                controller?.abort();
            }

            return connectionHandle;
        }),
);

export default new ApolloClient({
    link: from([authMiddleware, cancelRequestLink, new HttpLink({ uri: `${BASE_URL}/graphql/`, credentials: 'include' })]),
    cache: new InMemoryCache(),
});
