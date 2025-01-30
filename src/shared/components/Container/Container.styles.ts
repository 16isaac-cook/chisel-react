import styled from "styled-components";

interface Props {
    $column: boolean;
    $justify: string;
    $align: string;
    $padding: boolean;
    $background: boolean;
}

export const StyledContainer = styled.div<Props>`
    display: flex;
    flex-direction: ${(props) => (props.$column ? "column" : "row")};
    justify-content: ${(props) => props.$justify};
    align-items: ${(props) => props.$align};
    padding: ${(props) => (props.$padding ? "0.3em" : null)};
    background-color: ${(props) =>
        props.$background ? props.theme.dark100 : "transparent"};
    flex: 1 1 auto;
`;
