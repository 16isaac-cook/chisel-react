import styled from "styled-components";

import {
    font,
    fontSizes,
    commonStyles,
    CommonStyleProps,
} from "src/shared/util/styles";

export const StyledTextBox = styled.textarea<CommonStyleProps>`
    border: none;
    border-radius: 5px;
    padding: 0.3em;
    ${commonStyles}
    background-color: ${(props) => props.theme.dark300};
    &:not(:disabled) {
        &:hover {
            background-color: ${(props) => props.theme.dark400};
        }
        &:focus {
            outline: none;
            background-color: ${(props) => props.theme.dark400};
        }
    }
`;
