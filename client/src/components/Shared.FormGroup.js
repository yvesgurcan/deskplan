import styled from 'styled-components';

export default styled.label`
    margin: 0.25rem 0.4rem 0.25rem 0.4rem;
    display: flex;
    align-items: center;

    @media only screen and (max-width: 530px) {
        width: 100%;
        display: block;
    }
`;
