import styled from "styled-components";

export const StyledPlaceholder = styled.svg`
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
`;

export const StyledG = styled.g`
    fill: ${(props) => props.theme.dark100};
`;
