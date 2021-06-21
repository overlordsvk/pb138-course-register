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
//import jwt_decode from "jwt-decode";

const ApolloProviderWithAuth0 = ({ children }: any) => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [appUser, setUserState] = useRecoilState(userState);
    const httpLink = new HttpLink({
        uri: hasuraUrl,
    });

    React.useEffect(() => {
        if (user) {
            const u = { id: user.sub ?? "", name: user.name ?? "", role: appUser.role ?? "", email: user.email ?? "", picture: user.picture ?? "" };
            setUserState(u);
        }
    }, [user]);
    /*
    React.useEffect(() => {
        async () => {
            try {
                const token = await getAccessTokenSilently();
                const decoded = jwt_decode(token, { header: true });
                console.log(token);
                console.log("decoded");
                console.log(decoded);
                console.log(decoded ? ["X-Hasura-Default-Role"] : "NOTHING");
                //appUser.role = "";
                //setUserState(appUser);
            } catch (error) {
                console.log("THIS error");
                console.log(error);
            }
        };

    }, []);*/

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