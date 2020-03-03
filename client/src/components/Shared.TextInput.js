import styled from 'styled-components';

export default styled.input`
    appearance: textfield;
    font-size: 110%;
    font-family: 'Oxanium';
    padding: 0.3rem;

    &:disabled {
        background: rgb(200, 200, 200);
        border-color: rgb(150, 150, 150);
    }

    @media only screen and (max-width: 530px) {
        width: 100%;
    }
`;
