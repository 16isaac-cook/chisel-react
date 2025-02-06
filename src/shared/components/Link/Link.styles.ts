import styled from "styled-components";

import { clickable, font, fontSizes } from "../../util/styles";

interface Props {
    fontSize: number | keyof typeof fontSizes;
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
    font-size: ${(props) =>
        props.fontSize === 0 ? "inherit" : font.size(props.fontSize)};
    &:disabled {
        opacity: 0.6;
        cursor: default;
    }
`;
