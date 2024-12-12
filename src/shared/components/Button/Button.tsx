import { forwardRef, ReactNode } from "react";

import Icon from "../Icon/Icon";

import { StyledButton, ButtonVariants } from "./Button.styles";

type Props = {
	children?: ReactNode;
	fontSize?: number;
	color?: string;
	icon?: string;
	iconSize?: number;
	variant?: ButtonVariants;
	disabled?: boolean;
	margin?: boolean;
	active?: boolean;
	onClick?: () => void;
	[key: string]: any;
};

const Button = forwardRef<HTMLButtonElement, Props>(
	(
		{
			children = undefined,
			fontSize = 0,
			color = "#fff",
			icon = undefined,
			iconSize = 0,
			variant = "primary",
			disabled = false,
			margin = true,
			active = false,
			onClick = () => {},
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
			<StyledButton
				{...buttonProps}
				onClick={handleClick}
				fontSize={fontSize}
				color={color}
				$variant={variant}
				$margin={margin}
				$active={active}
				disabled={disabled}
				ref={ref}
			>
				{icon && typeof icon === "string" ? (
					<Icon
						icon={icon}
						size={iconSize}
						color={color}
						right={variant === "bigIcon" || variant === "giantIcon" ? false : true}
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
