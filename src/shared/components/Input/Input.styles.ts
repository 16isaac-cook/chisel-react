import styled from "styled-components";

import { font, fontSizes } from "src/shared/util/styles";

interface Props {
    fontSize: number | keyof typeof fontSizes;
    $margin?: boolean;
}

export const StyledInput = styled.input<Props>`
    background-color: ${(props) => props.theme.dark300};
    border: none;
    border-radius: 5px;
    padding: 0.3em;
    margin: ${(props) => (props.$margin ? `3px` : `0`)};
    font-size: ${(props) =>
        props.fontSize === 0 ? "inherit" : font.size(props.fontSize)};
    &:not(:disabled) {
        &:hover {
            background-color: ${(props) => props.theme.dark400};
        }
        &:focus {
            outline: none;
            background-color: ${(props) => props.theme.dark400};
        }
    }
    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;
