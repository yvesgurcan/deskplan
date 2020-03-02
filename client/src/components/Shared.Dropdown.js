import React from 'react';
import styled from 'styled-components';

export default ({ options, ...props }) => (
    <Dropdown {...props}>
        {options.map(option => (
            <Option key={option.value || option} value={option.value || option}>
                {option.text || option.value || option}
            </Option>
        ))}
    </Dropdown>
);

const Dropdown = styled.select`
    font-size: 110%;
`;

const Option = styled.option``;
