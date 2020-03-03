import React from 'react';
import styled from 'styled-components';
import OfflineHandling from './Shared.OfflineHandling';

export default ({ offline, offlineAccess, setOfflineAccess }) => (
    <Header>
        <AppName>
            <div>desk</div>
            <Accent>plan</Accent>
        </AppName>
        <OfflineHandling
            offline={offline}
            offlineAccess={offlineAccess}
            setOfflineAccess={setOfflineAccess}
        />
    </Header>
);

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(rgb(110, 110, 110), rgb(85, 85, 85));
    padding: 1rem;

    @media only screen and (max-width: 475px) {
        display: block;
    }
`;

const AppName = styled.h1`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    line-height: 100%;
    font-size: 220%;
    margin: 0;
    margin-bottom: 0.1rem;
    -webkit-text-stroke-width: 0.1px;
    -webkit-text-stroke-color: black;
    -webkit-font-smoothing: antialiased;
`;

const Accent = styled.div`
    color: rgb(150, 125, 0);
`;
