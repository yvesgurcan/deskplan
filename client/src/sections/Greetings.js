import React, { Fragment, useMemo } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../queries/users';

import Error from '../components/Error';

export default () => {
    const { error: getUserError, data: { user } = {} } = useQuery(GET_USER);

    return (
        <Greetings>
            {getUserError ? (
                <Title>Welcome back!</Title>
            ) : user ? (
                <Title>Welcome back, {user.firstName}</Title>
            ) : null}

            <Error error={getUserError} />
        </Greetings>
    );
};

const Greetings = styled.section`
    padding-bottom: 2rem;
    text-align: center;
    min-height: 3rem;
`;

const Title = styled.h2`
    margin: 0;
`;
