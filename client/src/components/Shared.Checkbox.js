import React from 'react';
import styled from 'styled-components';

export default ({ children, checked, onChange, disabled }) => (
    <Checkbox checked={checked} disabled={disabled}>
        <span className="box" />
        <input
            disabled={disabled}
            type="checkbox"
            checked={checked}
            onChange={onChange}
        />
        {children}
    </Checkbox>
);

const Checkbox = styled.label`
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    margin: 0;

    input {
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
            props.disabled
                ? `rgb(200, 200, 200)`
                : props.checked
                ? `#2196f3`
                : `rgb(230, 230, 230)`};
    }

    &:hover .box {
        background-color: ${props =>
            props.disabled ? `rgb(200, 200, 200)` : `rgb(160, 160, 160)`};
    }
`;
