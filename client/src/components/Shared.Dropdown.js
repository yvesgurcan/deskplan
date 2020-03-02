import React from 'react';
import styled from 'styled-components';

export default ({ options, ...props }) => (
    <Dropdown {...props}>
        {options.map(option => (
            <option key={option.value || option} value={option.value || option}>
                {option.text || option.value || option}
            </option>
        ))}
    </Dropdown>
);

const Dropdown = styled.select`
    font-size: 110%;
    font-family: 'Oxanium';
    height: 2.7rem;
}
`;
