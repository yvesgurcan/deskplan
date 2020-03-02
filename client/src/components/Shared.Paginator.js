import React, { Fragment } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronRight,
    faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import { sliceData } from '../util';
import Button from './Shared.Button';

const Controls = ({ data, offset, setOffset, limit }) => (
    <ControlsContainer>
        {offset ? (
            <Button onClick={() => setOffset(offset - 1)}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </Button>
        ) : (
            <div />
        )}
        <div>
            Page {offset + 1} of {Math.ceil(data.length / limit)} -{' '}
            {data.length} {data.length < 2 ? 'item' : 'items'}
        </div>
        {data.length / limit >= offset + 1 ? (
            <Button onClick={() => setOffset(offset + 1)}>
                <FontAwesomeIcon icon={faChevronRight} />
            </Button>
        ) : (
            <div />
        )}
    </ControlsContainer>
);

export default ({ children, ...props }) => (
    <Fragment>
        <Controls {...props} />
        {children(sliceData(props))}
        <Controls {...props} />
    </Fragment>
);

const ControlsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
