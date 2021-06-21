import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { audienceUrl, authClientId, authDomain } from "./utils/constants";
import { ApolloProviderWithAuth0 } from "./auth/ApolloProvider";
import { RecoilRoot } from "recoil";

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <Auth0Provider
                domain={authDomain}
                clientId={authClientId}
                redirectUri={window.location.origin}
                audience={audienceUrl}
                scope="read:current_user update:current_user_metadata">
                <ApolloProviderWithAuth0>
                    <App />
                </ApolloProviderWithAuth0>
            </Auth0Provider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById("root"), 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
