import { forwardRef, ReactNode, CSSProperties } from "react";

import { CommonStylePropsIcon } from "src/shared/util/styles";

import Icon from "../Icon/Icon";

import {
    StyledButton,
    StyledSubmitButton,
    ButtonVariants,
} from "./Button.styles";

interface Props extends CommonStylePropsIcon {
    children?: ReactNode;
    variant?: ButtonVariants;
    disabled?: boolean;
    active?: boolean;
    submit?: boolean;
    style?: CSSProperties;
    onClick?: () => void;
    [key: string]: any;
}

const Button = forwardRef<HTMLButtonElement, Props>(
    (
        {
            children,
            fontSize,
            color,
            icon,
            iconSize,
            variant = "none",
            disabled = false,
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
                    variant={variant}
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
                variant={variant}
                $active={active}
                disabled={disabled}
                style={style}
                ref={ref}
            >
                {icon && typeof icon === "string" ? (
                    <Icon
                        icon={icon}
                        fontSize={iconSize}
                        color={color}
                        right={!(variant === "vertical")}
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
