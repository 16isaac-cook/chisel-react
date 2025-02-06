import styled from "styled-components";

import { font, fontSizes } from "src/shared/util/styles";

interface Props {
    className?: string;
    size: number | keyof typeof fontSizes;
    $right?: boolean;
}

export const StyledIcon = styled.i<Props>`
    font-size: ${(props) =>
        props.size === 0 ? "inherit" : font.size(props.size)};
    color: ${(props) => `${props.color};`};
    ${(props) => (props.$right ? `margin-right: 0.3em;` : "")}
`;
