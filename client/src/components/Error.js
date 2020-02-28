import React, { useMemo } from 'react';
import styled from 'styled-components';
import { parseApolloErrors } from '../util';

export default ({ error }) => {
    if (!error) {
        return null;
    }

    const parsedError = useMemo(() => parseApolloErrors(error), [error]);
    const listOfErrors = useMemo(
        () =>
            parsedError.map(error => (
                <div key={error.message || error}>{error.message || error}</div>
            )),
        [error]
    );

    return <ErrorContainer>{listOfErrors}</ErrorContainer>;
};

const ErrorContainer = styled.div`
    color: orange;
`;
