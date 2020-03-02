import React from 'react';
import styled from 'styled-components';

export default ({ children, checked, onChange }) => (
    <Checkbox checked={checked}>
        <span className="box" />
        <input type="checkbox" checked={checked} onChange={onChange} />
        {children}
    </Checkbox>
);

const Checkbox = styled.label`
    & {
        position: relative;
        padding-left: 25px;
        cursor: pointer;
    }

    & input {
        position: absolute;
        opacity: 0;
        height: 0;
        width: 0;
    }

    .box {
        position: absolute;
        top: 1;
        left: 0;
        height: 16px;
        width: 16px;
        background-color: rgb(230, 230, 230);
        background-color: ${props =>
            props.checked ? `#2196f3` : `rgb(230, 230, 230)`};
    }

    &:hover .box {
        background-color: rgb(160, 160, 160);
    }
`;
