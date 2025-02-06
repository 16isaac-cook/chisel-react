import styled from "styled-components";

import { font, fontSizes } from "src/shared/util/styles";

interface LabelProps {
    fontSize: number | keyof typeof fontSizes;
    color?: string;
    $center?: boolean;
}

export const StyledLabel = styled.div<LabelProps>`
    display: flex;
    flex: 0 1 0;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    ${(props) => (props.$center ? `text-align: center` : null)};
    font-size: ${(props) =>
        props.fontSize === 0 ? "inherit" : font.size(props.fontSize)};
    color: ${(props) => (props.color ? props.color : props.theme.font)};
`;
