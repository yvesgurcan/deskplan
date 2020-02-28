import React from 'react';
import styled from 'styled-components';

export default ({ options, ...props }) => (
    <Dropdown {...props}>
        {options.map(({ value, text }) => (
            <Option key={value} value={value}>
                {text}
            </Option>
        ))}
    </Dropdown>
);

const Dropdown = styled.select`
    font-size: 110%;
`;

const Option = styled.option``;
