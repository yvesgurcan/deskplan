import React from 'react';
import styled from 'styled-components';

export default () => (
    <Header>
        <AppName>
            desk<Accent>plan</Accent>
        </AppName>
    </Header>
);

const Header = styled.header`
    background: linear-gradient(rgb(110, 110, 110), rgb(60, 60, 60));
`;

const AppName = styled.h1`
    padding: 1rem;
`;

const Accent = styled.span`
    color: rgb(150, 125, 0);
`;
