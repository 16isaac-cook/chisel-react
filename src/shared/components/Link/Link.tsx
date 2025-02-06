import { forwardRef, ReactNode } from "react";

import { CommonStylePropsIcon } from "src/shared/util/styles";

import Icon, { IconName } from "../Icon/Icon";

import { StyledLink } from "./Link.styles";

interface Props extends CommonStylePropsIcon {
    children?: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    [key: string]: any;
}

const Link = forwardRef<HTMLButtonElement, Props>(
    (
        {
            children,
            fontSize = 0,
            icon,
            iconSize = 0,
            disabled,
            onClick,
            ...buttonProps
        }: Props,
        ref
    ) => {
        const handleClick = () => {
            if (!disabled && onClick) {
                onClick();
            }
        };

        return (
            <StyledLink
                {...buttonProps}
                onClick={handleClick}
                fontSize={fontSize}
                disabled={disabled}
                ref={ref}
            >
                {icon && typeof icon === "string" ? (
                    <Icon icon={icon} fontSize={iconSize} right />
                ) : (
                    icon
                )}
                {children && children}
            </StyledLink>
        );
    }
);

export default Link;
