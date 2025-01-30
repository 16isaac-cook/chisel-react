import styled from "styled-components";

import { clickable } from "../../util/styles";

interface Props {
    fontSize?: number | string;
}

export const StyledLink = styled.button<Props>`
    display: flex;
    flex: 0 1 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 0;
    padding: 0;
    ${clickable.link};
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
    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;
