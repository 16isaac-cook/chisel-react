import { forwardRef, ReactNode, CSSProperties } from "react";

import Icon, { IconName } from "../Icon/Icon";

import {
    StyledButton,
    StyledSubmitButton,
    ButtonVariants,
} from "./Button.styles";

type Props = {
    children?: ReactNode;
    fontSize?: number | string;
    color?: string;
    icon?: IconName;
    iconSize?: number;
    variant?: ButtonVariants;
    disabled?: boolean;
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
    active?: boolean;
    submit?: boolean;
    onClick?: () => void;
    style?: CSSProperties;
    [key: string]: any;
};

const Button = forwardRef<HTMLButtonElement, Props>(
    (
        {
            children = undefined,
            fontSize = 0,
            color,
            icon = undefined,
            iconSize = 0,
            variant = "none",
            disabled = false,
            top = false,
            right = false,
            bottom = false,
            left = false,
            active = false,
            submit = false,
            onClick = () => {},
            style = undefined,
            ...buttonProps
        }: Props,
        ref
    ) => {
        const handleClick = () => {
            if (!disabled && onClick) {
                onClick();
            }
        };

        if (submit) {
            return (
                <StyledSubmitButton
                    {...buttonProps}
                    onClick={handleClick}
                    fontSize={fontSize}
                    color={color}
                    $variant={variant}
                    $top={top}
                    $right={right}
                    $bottom={bottom}
                    $left={left}
                    $active={active}
                    disabled={disabled}
                    style={style}
                    type="submit"
                    value={String(children)}
                />
            );
        }

        return (
            <StyledButton
                {...buttonProps}
                onClick={handleClick}
                fontSize={fontSize}
                color={color}
                $variant={variant}
                $top={top}
                $right={right}
                $bottom={bottom}
                $left={left}
                $active={active}
                disabled={disabled}
                style={style}
                ref={ref}
            >
                {icon && typeof icon === "string" ? (
                    <Icon
                        icon={icon}
                        size={iconSize}
                        color={color}
                        right={variant === "vertical" ? false : true}
                    />
                ) : (
                    icon
                )}
                {children}
            </StyledButton>
        );
    }
);

export default Button;
