const HASURA_GRAPHQL_ENGINE_HOSTNAME = "https://suited-pup-54.hasura.app";

const scheme = (proto: string) => {
    return window.location.protocol === "https:" ? `${proto}s` : proto;
};

export const GRAPHQL_URL = `${scheme(
    "http"
)}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;

export const REALTIME_GRAPHQL_URL = `${scheme(
    "ws"
)}://${HASURA_GRAPHQL_ENGINE_HOSTNAME}/v1/graphql`;

export const authClientId = "hsOzJQmGkLHnpCHIX65T1K8HQzoi8Ag6";
export const authDomain = "dev-8-q69az8.eu.auth0.com";
export const callbackUrl = "https://localhost:3000/callback"; // modify `callbackUrl` to point to your localhost