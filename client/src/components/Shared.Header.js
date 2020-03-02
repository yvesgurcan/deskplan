import React from 'react';
import styled from 'styled-components';
import OfflineHandling from './Shared.OfflineHandling';

export default () => (
    <Header>
        <AppName>
            desk<Accent>plan</Accent>
        </AppName>

        <OfflineHandling />
    </Header>
);

const Header = styled.header`
    padding: 1rem;
    background: linear-gradient(rgb(110, 110, 110), rgb(85, 85, 85));
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AppName = styled.h1`
    font-size: 220%;
    margin: 0;
    -webkit-text-stroke-width: 0.1px;
    -webkit-text-stroke-color: black;
    -webkit-font-smoothing: antialiased;
`;

const Accent = styled.span`
    color: rgb(150, 125, 0);
`;
