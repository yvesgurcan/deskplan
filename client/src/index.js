import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Home from './views/Home';

import ApolloClient from 'apollo-boost';

import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'http://localhost:4000'
});

const App = () => (
    <ApolloProvider client={client}>
        <HashRouter>
            <GlobalStyle />
            <Header>
                <AppName>deskplan</AppName>
            </Header>
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

ReactDOM.render(<App />, document.getElementById('app'));
