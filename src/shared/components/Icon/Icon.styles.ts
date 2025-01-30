import styled from "styled-components";

interface Props {
    className?: string;
    size?: number | string;
    $right?: boolean;
}

export const StyledIcon = styled.i<Props>`
    font-size: ${(props) => {
        if (typeof props.size === "string") {
            return props.size;
        } else if (typeof props.size === "number") {
            if (props.size === 0) {
                return "inherit";
            } else {
                return `${props.size}px`;
            }
        } else {
            return "inherit";
        }
    }};
    color: ${(props) => `${props.color};`};
    ${(props) => (props.$right ? `margin-right: 0.3em;` : "")}
`;
