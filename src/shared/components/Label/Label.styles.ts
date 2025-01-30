import styled from "styled-components";

interface LabelProps {
    fontSize?: number | string;
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
    color: ${(props) => (props.color ? props.color : props.theme.font)};
`;
