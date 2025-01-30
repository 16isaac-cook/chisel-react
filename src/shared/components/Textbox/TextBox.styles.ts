import styled from "styled-components";

interface Props {
    fontSize?: number | string;
    $margin?: boolean;
}

export const StyledTextBox = styled.textarea<Props>`
    background-color: ${(props) => props.theme.dark300};
    border: none;
    border-radius: 5px;
    padding: 0.3em;
    margin: ${(props) => (props.$margin ? `3px` : `0`)};
    font-size: ${(props) => {
        if (typeof props.fontSize === "string") {
            return props.fontSize;
        } else if (typeof props.fontSize === "number") {
            if (props.fontSize === 0) {
                return "inherit";
            } else {
                return `${props.fontSize}px`;
            }
        } else {
            return "inherit";
        }
    }};
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
