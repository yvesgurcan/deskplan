import React from 'react';
import styled from 'styled-components';
import Button from './Shared.Button';

const Controls = ({ data, offset, setOffset, limit }) => (
    <Container>
        <Button disabled={!offset} onClick={() => setOffset(offset - 1)}>
            Previous
        </Button>
        <div>
            Page {offset + 1} of {Math.ceil(data.length / limit)}
        </div>
        <Button
            disabled={data.length / limit <= offset + 1}
            onClick={() => setOffset(offset + 1)}
        >
            Next
        </Button>
    </Container>
);

const sliceData = ({ data, offset, limit }) =>
    data.slice(offset * limit, (offset + 1) * limit);

export default ({ children, ...props }) => (
    <div>
        <Controls {...props} />
        {children(sliceData(props))}
        <Controls {...props} />
    </div>
);

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;
