import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { parseApolloErrors } from '../util';

export default ({ error }) => {
    const [node, setNode] = useState(null);

    useEffect(() => {
        if (error) {
            const parsedError = parseApolloErrors(error);
            const listOfErrors =
                parsedError.length > 0
                    ? parsedError.map(error => (
                          <div key={error.message || error}>
                              {error.message || error}
                          </div>
                      ))
                    : error;

            setNode(
                <ErrorContainer>
                    <ErrorList>{listOfErrors || error}</ErrorList>
                </ErrorContainer>
            );

            setTimeout(() => setNode(null), 5000);
        }
    }, [error]);

    if (!error || error.length === 0) {
        return null;
    }

    const mount = document.getElementById('notice');
    return createPortal(node, mount);
};

const ErrorContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0.6rem;
`;

const ErrorList = styled.div`
    color: rgb(120, 60, 0);
    background: rgb(220, 120, 10);
    border: 1px solid rgb(120, 60, 0);
    padding: 1rem;
    text-align: center;
    border-radius: 0.5rem;
`;
