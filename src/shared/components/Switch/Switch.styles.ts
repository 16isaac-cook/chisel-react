import styled from "styled-components";

import { clickable, commonStyles, CommonStyleProps } from "../../util/styles";

export const StyledSwitch = styled.label<CommonStyleProps>`
    position: relative;
    display: inline-block;
    width: 2em;
    height: 1em;
    ${commonStyles}
`;

export const SwitchContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SwitchLabel = styled.div<CommonStyleProps>`
    margin-right: 0.3em;
    ${commonStyles}
`;

export const SwitchInput = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

export const SwitchSlider = styled.span`
    position: absolute;
    ${clickable.basic}
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.dark600};
    transition: 0.4s;
    border-radius: 34px;

    &::before {
        position: absolute;
        content: "";
        height: 0.75em;
        width: 0.75em;
        left: 0.125em;
        bottom: 0.125em;
        background-color: white;
        transition: 0.2s;
        border-radius: 50%;
    }

    input:checked + & {
        background-color: ${(props) => props.theme.primary300};
    }

    input:focus + & {
        box-shadow: 0 0 1px ${(props) => props.theme.primary300};
    }

    input:checked + &::before {
        transform: translateX(1em);
    }
`;
