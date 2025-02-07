import styled from "styled-components";

import { CommonStyleProps, commonStyles } from "src/shared/util/styles";

export const StyledInput = styled.input<CommonStyleProps>`
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
