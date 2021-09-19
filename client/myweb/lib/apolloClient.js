//import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

//let apolloClient;

const uri = 'http://localhost:4000/graphql';

export const createApolloClient = () => {
    return new ApolloClient({
        //ssrMode: typeof window === "undefined",
        link: new HttpLink({
            uri: uri,
        }),
        cache: new InMemoryCache(),
    });
};
/*
export const initializeApollo = (iniitialState = null) => {
    const _apolloClient = apolloClient ?? createApolloClient();

    if(iniitialState) {
        const existingCache = _apolloClient.extract();

        _apolloClient.cache.restore({ ...existingCache, ...iniitialState});
    }

    if(typeof window === "undefined") return _apolloClient;

    if(!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
};

export const useApollo = (iniitialState) => {
    const store = useMemo(() => initializeApollo(iniitialState), [iniitialState]);
    return store;
}
*/