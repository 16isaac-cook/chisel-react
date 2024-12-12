import { forwardRef, ReactNode } from "react";

import Icon, { IconName } from "../Icon/Icon";

import { StyledLink } from "./Link.styles";

type Props = {
	children?: ReactNode;
	fontSize?: number;
	icon?: IconName;
	iconSize?: number;
	disabled?: boolean;
	onClick?: () => void;
	[key: string]: any;
};

const Link = forwardRef<HTMLButtonElement, Props>(
	(
		{
			children,
			fontSize,
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
					<Icon
						icon={icon}
						size={iconSize}
						color="inherit"
						right={true}
					/>
				) : (
					icon
				)}
				{children && children}
			</StyledLink>
		);
	}
);

export default Link;
