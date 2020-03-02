import styled from 'styled-components';

export default styled.input`
    appearance: textfield;
    padding: 0.3rem;
    font-size: 110%;
    font-family: 'Oxanium';

    &:disabled {
        background: rgb(200, 200, 200);
        border-color: rgb(150, 150, 150);
    }
`;
