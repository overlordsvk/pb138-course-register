import * as React from "react";
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink,
    NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import { hasuraUrl } from "../utils/constants";

const ApolloProviderWithAuth0 = ({ children }: any) => {
    const { getAccessTokenSilently } = useAuth0();

    const httpLink = new HttpLink({
        uri: hasuraUrl,
    });

    const authLink = setContext(async (_, { headers, ...rest }) => {
        let token;
        try {
            token = await getAccessTokenSilently();
        } catch (error) {
            console.log(error);
        }

        if (!token) return { headers, ...rest };

        return {
            ...rest,
            headers: {
                ...headers,
                authorization: `Bearer ${token}`,
            },
        };
    });

    const client = React.useRef<ApolloClient<NormalizedCacheObject>>();

    if (!client.current) {
        client.current = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });
    }

    return (
        <ApolloProvider client={client.current}>
            {children}
        </ApolloProvider>
    );
};

export { ApolloProviderWithAuth0 };