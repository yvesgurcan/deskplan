import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

import Home from './views/Home';
import Header from './components/Shared.Header';
import OfflineHandling from './components/Shared.OfflineHandling';

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    uri: 'http://localhost:4000'
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <GlobalStyle />
                <Header />
                <OfflineHandling />
                <Container>
                    <Main>
                        <Switch>
                            <Route path="/" component={Home} />
                        </Switch>
                    </Main>
                </Container>
            </HashRouter>
        </ApolloProvider>
    );
};

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-size: 130%;
        min-height: 100vh;
        background: black;
        color: white;
        font-family: 'Oxanium';
    }
`;

const Container = styled.main`
    display: flex;
    justify-content: center;
`;

const Main = styled.div`
    max-width: 100%;
    width: 1200px;
    padding: 1rem;
`;

const setupAndRender = async () => {
    await persistCache({
        cache,
        storage: window.localStorage,
        debug: true
    });
    ReactDOM.render(<App />, document.getElementById('app'));
};

setupAndRender();
