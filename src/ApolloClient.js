import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";

const httpLink = new HttpLink({
    //uri: "https://mudaya.herokuapp.com/",
    uri: "http://localhost:4000",
});

const wsLink = new WebSocketLink({
    //uri: `wss://mudaya.herokuapp.com/graphql`,
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true,
    },
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink,
});
