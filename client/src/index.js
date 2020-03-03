import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { usePrevious } from './util';
import Home from './views/Home';
import Header from './components/Shared.Header';
import Error from './components/Shared.Error';

const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    uri: 'http://localhost:4000'
});

const App = () => {
    const [offlineAccess, setOfflineAccess] = useState(false);
    const [offline, setOffline] = useState(!navigator.onLine);
    const prevOffline = usePrevious(offline);

    useEffect(() => {
        async function getOfflineAccess() {
            const workerRegistered = await navigator.serviceWorker
                .getRegistrations()
                .then(function(reg) {
                    return reg.length > 0;
                });
            setOfflineAccess(workerRegistered || false);
        }
        getOfflineAccess();

        window.addEventListener('offline', () => {
            setOffline(true);
        });
        window.addEventListener('online', () => {
            setOffline(false);
        });
    }, []);

    return (
        <ApolloProvider client={client}>
            <HashRouter>
                <GlobalStyle />
                <Error
                    error={
                        offline ? (
                            <div>
                                You're offline.{' '}
                                {offlineAccess
                                    ? 'You can continue to use the application but changes will not be saved.'
                                    : 'You will not be able to access the application if you reload the page.'}
                            </div>
                        ) : prevOffline ? (
                            <div>You're back online!</div>
                        ) : null
                    }
                />
                <Header
                    offline={offline}
                    offlineAccess={offlineAccess}
                    setOfflineAccess={setOfflineAccess}
                />
                <Switch>
                    <Route path="/" render={() => <Home offline={offline} />} />
                </Switch>
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
        background: radial-gradient(circle, rgb(35, 35, 35) 0%, rgb(10, 10, 10) 100%);
        color: white;
        font-family: 'Oxanium';
        padding-bottom: 5rem;
        box-sizing: border-box;
    }
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
