import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

import Home from './views/Home';
import { ErrorContainer } from './components/Error';

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    uri: 'http://localhost:4000'
});

const App = () => {
    const [offlineAccess, setOfflineAccess] = useState(false);
    const [offline, setOffline] = useState(!navigator.onLine);

    useEffect(() => {
        async function getOfflineAccess() {
            const workerRegistered = await navigator.serviceWorker
                .getRegistrations()
                .then(function(reg) {
                    return reg.length > 0;
                });
            setOfflineAccess(workerRegistered || false);
        }

        window.addEventListener('offline', () => {
            setOffline(true);
        });
        window.addEventListener('online', () => {
            setOffline(false);
        });

        getOfflineAccess();
    }, []);

    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <GlobalStyle />
                <Header>
                    <AppName>deskplan</AppName>
                </Header>
                {offline && (
                    <Error>
                        You're offline.{' '}
                        {offlineAccess
                            ? 'You can continue to use the application but changes will not be saved.'
                            : 'You will not be able to access the application if you reload the page.'}
                    </Error>
                )}

                {!offline && (
                    <OfflineAccess>
                        <label>
                            <input
                                type="checkbox"
                                checked={offlineAccess}
                                onChange={() => {
                                    const updatedOfflineAccess = !offlineAccess;
                                    if (updatedOfflineAccess) {
                                        navigator.serviceWorker.register(
                                            '/service-worker.js'
                                        );
                                    } else {
                                        navigator.serviceWorker
                                            .getRegistrations()
                                            .then(function(registrations) {
                                                for (let registration of registrations) {
                                                    registration.unregister();
                                                }
                                            });
                                    }
                                    setOfflineAccess(updatedOfflineAccess);
                                }}
                            />{' '}
                            Enable offline access.
                        </label>
                    </OfflineAccess>
                )}
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
    }
`;

const Header = styled.header`
    background: rgb(80, 80, 80);
`;

const OfflineAccess = styled.div`
    text-align: right;
    padding-right: 1rem;
`;

const Error = styled(ErrorContainer)`
    text-align: center;
`;

const AppName = styled.h1`
    padding: 1rem;
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
