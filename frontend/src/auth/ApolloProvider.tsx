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
import { useRecoilState } from "recoil";
import { userState } from "../state/userState";

const ApolloProviderWithAuth0 = ({ children }: any) => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [appUser, setUserState] = useRecoilState(userState);
    const httpLink = new HttpLink({
        uri: hasuraUrl,
    });

    React.useEffect(() => {
        if (user) {
            const tmpUser = { id: user.sub ?? "", name: user.name ?? "", role: appUser.role ?? "", email: user.email ?? "", picture: user.picture ?? "" };
            setUserState(tmpUser);
        }
    }, [user]);
 
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